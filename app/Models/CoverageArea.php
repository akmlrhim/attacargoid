<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;

class CoverageArea extends Model
{
    use HasSortOrder;

    protected $fillable = [
        'province',
        'province_short',
        'city',
        'latitude',
        'longitude',
        'is_hub',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'is_hub' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }

    /**
     * Extract a latitude/longitude pair from a Google Maps URL.
     *
     * Supports the common URL shapes:
     * - `.../@-3.3194,114.5906,15z` (map center)
     * - `...!3d-3.3194!4d114.5906` (place data payload)
     * - `?q=-3.3194,114.5906` / `?query=...` / `?ll=...` (query params)
     * - a bare `-3.3194,114.5906` string
     *
     * @return array{latitude: float, longitude: float}|null
     */
    public static function parseGoogleMapsUrl(?string $url): ?array
    {
        if (! $url) {
            return null;
        }

        $patterns = [
            '/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/',
            '/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/',
            '/[?&](?:q|query|ll|sll|daddr|destination)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/',
            '/^\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\s*$/',
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                return [
                    'latitude' => (float) $matches[1],
                    'longitude' => (float) $matches[2],
                ];
            }
        }

        return null;
    }
}
