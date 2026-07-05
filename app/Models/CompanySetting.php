<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanySetting extends Model
{
    protected $fillable = [
        'phone',
        'whatsapp_number',
        'email',
        'social_links',
    ];

    protected $casts = [
        'social_links' => 'array',
    ];

    /**
     * The single settings record, editable via the admin panel.
     *
     * Falls back to the site's original hardcoded contact details if the
     * table hasn't been seeded yet, so nothing breaks before the settings
     * row exists.
     */
    public static function current(): self
    {
        return static::query()->first() ?? new self([
            'phone' => '0811 510 808',
            'whatsapp_number' => '62811510808',
            'email' => 'cargo.atta@gmail.com',
            'social_links' => [],
        ]);
    }
}
