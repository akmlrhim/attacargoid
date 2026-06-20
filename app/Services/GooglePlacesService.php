<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GooglePlacesService
{
    private const CACHE_KEY = 'serp_google_all';

    private const CACHE_TTL = 60 * 60 * 24; // 24 jam

    private const API_URL = 'https://serpapi.com/search.json';

    public function __construct(
        private readonly string $apiKey = '',
        private readonly string $dataId = '',
    ) {}

    public function getReviews(): array
    {
        if (! $this->apiKey || ! $this->dataId) {
            return [];
        }

        return Cache::remember(self::CACHE_KEY, self::CACHE_TTL, fn () => $this->fetchAll())['reviews'] ?? [];
    }

    public function getRating(): ?array
    {
        if (! $this->apiKey || ! $this->dataId) {
            return null;
        }

        return Cache::remember(self::CACHE_KEY, self::CACHE_TTL, fn () => $this->fetchAll())['rating'];
    }

    private function fetchAll(): array
    {
        try {
            $response = Http::timeout(12)->get(self::API_URL, [
                'engine' => 'google_maps_reviews',
                'data_id' => $this->dataId,
                'hl' => 'id',
                'api_key' => $this->apiKey,
            ]);

            if (! $response->successful()) {
                Log::warning('SerpAPI request failed', ['status' => $response->status()]);

                return ['reviews' => [], 'rating' => null];
            }

            $body = $response->json();
            $info = $body['place_info'] ?? null;
            $raw = $body['reviews'] ?? [];

            $reviews = array_values(array_map(
                fn ($r) => [
                    'name' => $r['username'] ?? ($r['user']['name'] ?? 'Anonim'),
                    'avatar' => $r['user']['thumbnail'] ?? null,
                    'rating' => (int) ($r['rating'] ?? 5),
                    'text' => $r['description'] ?? ($r['snippet'] ?? ''),
                    'date' => $r['date'] ?? '',
                ],
                array_filter($raw, fn ($r) => ! empty($r['description'] ?? $r['snippet'] ?? '')),
            ));

            return [
                'reviews' => $reviews,
                'rating' => $info ? [
                    'rating' => $info['rating'] ?? null,
                    'total' => $info['reviews'] ?? null,
                ] : null,
            ];
        } catch (\Throwable $e) {
            Log::error('SerpAPI fetchAll failed', ['error' => $e->getMessage()]);

            return ['reviews' => [], 'rating' => null];
        }
    }
}
