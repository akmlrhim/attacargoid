<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class TestimonialsStore
{
    private const FILE = 'testimonials.json';

    /**
     * Cap on stored entries so the file doesn't grow without bound.
     */
    private const MAX_ENTRIES = 100;

    /**
     * Merge freshly-fetched reviews that meet the display criteria (5 stars,
     * non-empty text) into the persisted JSON store, then return the full
     * curated list.
     *
     * This is a durable fallback independent of the cache store: testimonials
     * survive a `cache:clear` or a failed SerpAPI call, since the JSON file
     * is only ever added to, never wiped by a fetch that returns nothing new.
     *
     * @param  array<int, array{name: string, avatar: string|null, rating: int, text: string, date: string}>  $reviews
     * @return array<int, array{name: string, avatar: string|null, rating: int, text: string, date: string}>
     */
    public function sync(array $reviews): array
    {
        $existing = $this->read();
        $qualifying = array_values(array_filter($reviews, $this->qualifies(...)));

        $known = array_flip(array_map($this->fingerprint(...), $existing));
        $new = array_values(array_filter(
            $qualifying,
            fn (array $review): bool => ! isset($known[$this->fingerprint($review)])
        ));

        if ($new === []) {
            return $existing !== [] ? $existing : $qualifying;
        }

        $merged = array_slice([...$new, ...$existing], 0, self::MAX_ENTRIES);

        Storage::disk('local')->put(self::FILE, json_encode([
            'updated_at' => now()->toIso8601String(),
            'reviews' => $merged,
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        return $merged;
    }

    /**
     * @return array<int, array{name: string, avatar: string|null, rating: int, text: string, date: string}>
     */
    public function read(): array
    {
        if (! Storage::disk('local')->exists(self::FILE)) {
            return [];
        }

        $data = json_decode(Storage::disk('local')->get(self::FILE), true);

        return $data['reviews'] ?? [];
    }

    private function qualifies(array $review): bool
    {
        return (int) ($review['rating'] ?? 0) === 5 && trim((string) ($review['text'] ?? '')) !== '';
    }

    private function fingerprint(array $review): string
    {
        return md5(($review['name'] ?? '').'|'.($review['date'] ?? '').'|'.($review['text'] ?? ''));
    }
}
