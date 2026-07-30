<?php

namespace App\Services;

use Illuminate\Contracts\Cache\LockTimeoutException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GooglePlacesService
{
    private const CACHE_KEY = 'serp_google_all';

    private const LOCK_KEY = 'serp_google_all_lock';

    private const FRESH_TTL = 60 * 60 * 24; // data dianggap fresh 24 jam

    private const API_URL = 'https://serpapi.com/search.json';

    private readonly TestimonialsStore $store;

    public function __construct(
        private readonly string $apiKey = '',
        private readonly string $dataId = '',
        ?TestimonialsStore $store = null,
    ) {
        $this->store = $store ?? new TestimonialsStore;
    }

    /**
     * Reviews that qualify for display (5 stars, non-empty text), merged
     * into and served from the durable JSON store in `storage/app/testimonials.json`.
     *
     * @return array<int, array{name: string, avatar: string|null, rating: int, text: string, date: string}>
     */
    public function getReviews(): array
    {
        if (! $this->apiKey || ! $this->dataId) {
            return $this->store->read();
        }

        return $this->store->sync($this->getData()['reviews'] ?? []);
    }

    public function getRating(): ?array
    {
        if (! $this->apiKey || ! $this->dataId) {
            return null;
        }

        return $this->getData()['rating'] ?? null;
    }

    /**
     * Reviews + rating in one call, so callers needing both don't pay for two
     * separate cache/lock round trips (see getReviews()/getRating() above).
     *
     * @return array{reviews: array<int, array{name: string, avatar: string|null, rating: int, text: string, date: string}>, rating: array{rating: mixed, total: mixed}|null}
     */
    public function getReviewsAndRating(): array
    {
        if (! $this->apiKey || ! $this->dataId) {
            return ['reviews' => $this->store->read(), 'rating' => null];
        }

        $data = $this->getData();

        return [
            'reviews' => $this->store->sync($data['reviews'] ?? []),
            'rating' => $data['rating'] ?? null,
        ];
    }

    /**
     * Ambil data review dengan pola stale-while-revalidate + lock.
     *
     * Cache disimpan tanpa kadaluarsa; kesegaran dikontrol lewat `fetched_at`.
     * Saat data sudah basi, hanya SATU proses (pemegang lock) yang memanggil
     * SerpAPI, sementara pengunjung lain tetap dilayani data lama. Ini mencegah
     * cache stampede yang bisa membakar banyak kredit sekaligus secara tiba-tiba.
     *
     * @return array{reviews: array<int, array<string, mixed>>, rating: array{rating: mixed, total: mixed}|null, fetched_at?: int}
     */
    private function getData(): array
    {
        $cached = Cache::get(self::CACHE_KEY);
        $isFresh = is_array($cached) && (time() - ($cached['fetched_at'] ?? 0)) < self::FRESH_TTL;

        if ($isFresh) {
            return $cached;
        }

        $lock = Cache::lock(self::LOCK_KEY, 180);

        // Kalau ada data lama, jangan menunggu - sajikan yang lama dan biarkan
        // satu proses lain yang me-refresh. Kalau belum ada data sama sekali,
        // tunggu sebentar supaya hasil pertama sempat terisi.
        try {
            $acquired = is_array($cached) ? $lock->get() : $lock->block(15);
        } catch (LockTimeoutException) {
            return is_array($cached) ? $cached : ['reviews' => [], 'rating' => null];
        }

        if (! $acquired) {
            return is_array($cached) ? $cached : ['reviews' => [], 'rating' => null];
        }

        try {
            // Proses lain mungkin sudah mengisi cache selagi kita menunggu lock.
            $recheck = Cache::get(self::CACHE_KEY);
            if (is_array($recheck) && (time() - ($recheck['fetched_at'] ?? 0)) < self::FRESH_TTL) {
                return $recheck;
            }

            $data = $this->fetchAll();

            // Jangan timpa data lama yang valid dengan hasil kosong (mis. API error).
            if (empty($data['reviews']) && is_array($cached) && ! empty($cached['reviews'])) {
                return $cached;
            }

            $data['fetched_at'] = time();
            Cache::forever(self::CACHE_KEY, $data);

            return $data;
        } finally {
            $lock->release();
        }
    }

    /**
     * SerpAPI returns reviews one page (~8) at a time. Walk every page via the
     * pagination token so we collect the full review list instead of just the
     * first page, capped to keep API usage bounded.
     */
    private const MAX_PAGES = 100;

    /**
     * @return array{reviews: array<int, array{name: string, avatar: string|null, rating: int, text: string, date: string}>, rating: array{rating: mixed, total: mixed}|null}
     */
    private function fetchAll(): array
    {
        try {
            $reviews = [];
            $rating = null;
            $pageToken = null;

            for ($page = 0; $page < self::MAX_PAGES; $page++) {
                $params = [
                    'engine' => 'google_maps_reviews',
                    'data_id' => $this->dataId,
                    'hl' => 'id',
                    'sort_by' => 'newestFirst',
                    'api_key' => $this->apiKey,
                ];

                if ($pageToken) {
                    $params['next_page_token'] = $pageToken;
                }

                $response = Http::timeout(12)->get(self::API_URL, $params);

                if (! $response->successful()) {
                    Log::warning('SerpAPI request failed', ['status' => $response->status(), 'page' => $page]);
                    break;
                }

                $body = $response->json();

                if ($rating === null && ($info = $body['place_info'] ?? null)) {
                    $rating = [
                        'rating' => $info['rating'] ?? null,
                        'total' => $info['reviews'] ?? null,
                    ];
                }

                foreach ($body['reviews'] ?? [] as $r) {
                    if (empty($r['description'] ?? $r['snippet'] ?? '')) {
                        continue;
                    }

                    $reviews[] = [
                        'name' => $r['username'] ?? ($r['user']['name'] ?? 'Anonim'),
                        'avatar' => $r['user']['thumbnail'] ?? null,
                        'rating' => (int) ($r['rating'] ?? 5),
                        'text' => $r['description'] ?? ($r['snippet'] ?? ''),
                        'date' => $r['date'] ?? '',
                    ];
                }

                $pageToken = $body['serpapi_pagination']['next_page_token'] ?? null;

                if (! $pageToken) {
                    break;
                }
            }

            return [
                'reviews' => $reviews,
                'rating' => $rating,
            ];
        } catch (\Throwable $e) {
            Log::error('SerpAPI fetchAll failed', ['error' => $e->getMessage()]);

            return ['reviews' => [], 'rating' => null];
        }
    }
}
