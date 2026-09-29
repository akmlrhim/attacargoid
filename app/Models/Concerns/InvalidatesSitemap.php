<?php

namespace App\Models\Concerns;

use Illuminate\Support\Facades\Cache;

trait InvalidatesSitemap
{
    protected static function bootInvalidatesSitemap(): void
    {
        $flush = function (): void {
            Cache::forget('sitemap.xml');
        };

        static::saved($flush);
        static::deleted($flush);
    }
}
