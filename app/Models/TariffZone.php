<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;

class TariffZone extends Model
{
    use HasSortOrder;

    protected $fillable = [
        'slug',
        'label',
        'rate_per_kg',
        'min_kg',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
