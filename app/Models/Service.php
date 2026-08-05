<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Service extends Model
{
    use HasSortOrder;

    protected $fillable = [
        'title',
        'short_title',
        'slug',
        'service_category_id',
        'description',
        'details',
        'image_url',
        'image_alt',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'details' => 'array',
        'is_active' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $model) {
            if (empty($model->slug)) {
                $model->slug = static::uniqueSlug(Str::slug($model->title));
            }

            if (empty($model->image_alt)) {
                $model->image_alt = $model->title;
            }

            if (empty($model->short_title)) {
                $model->short_title = $model->title;
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

    public function category(): BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class, 'service_category_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }

    /**
     * Narrow the list to one category, identified by its slug. An unknown or
     * empty slug is a no-op so the public page can pass the query string
     * straight through without validating it first.
     */
    public function scopeInCategory($query, ?string $categorySlug)
    {
        return $query->when(
            filled($categorySlug),
            fn ($q) => $q->whereHas('category', fn ($c) => $c->where('slug', $categorySlug)),
        );
    }
}
