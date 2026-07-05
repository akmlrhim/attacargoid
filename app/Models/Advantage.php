<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Advantage extends Model
{
    use HasSortOrder;

    protected $fillable = ['title', 'slug', 'description', 'image_url', 'sort_order', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $model) {
            if (empty($model->slug)) {
                $model->slug = static::uniqueSlug(Str::slug($model->title));
            }
        });
    }

    protected static function uniqueSlug(string $base, ?int $ignoreId = null): string
    {
        $slug = $base;
        $i = 1;
        while (
            static::where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
