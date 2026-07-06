<?php

use Illuminate\Support\Facades\Storage;

if (! function_exists('resolveImageUrl')) {
    function resolveImageUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}

if (! function_exists('pageSeo')) {
    /**
     * Build the per-page SEO payload consumed by the root Blade template.
     *
     * @return array{title: string, description: string, canonical: string, og_type: string, image: string}
     */
    function pageSeo(string $title, string $description, string $path, ?string $image = null): array
    {
        return [
            'title' => $title,
            'description' => $description,
            'canonical' => url($path),
            'og_type' => 'website',
            'image' => url($image ?? '/images/hero/hero-1200.webp'),
        ];
    }
}
