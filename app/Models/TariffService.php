<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;

class TariffService extends Model
{
    use HasSortOrder;

    protected $fillable = [
        'slug',
        'label',
        'note',
        'multiplier',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'multiplier' => 'float',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
