<?php

use App\Models\CompanySetting;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('shares the configured company settings with every Inertia page', function () {
    CompanySetting::create([
        'phone' => '0812 3456 7890',
        'whatsapp_number' => '628123456789',
        'email' => 'kontak@example.com',
        'social_links' => [
            ['platform' => 'instagram', 'label' => null, 'url' => 'https://instagram.com/example'],
            ['platform' => 'tiktok', 'label' => null, 'url' => 'https://tiktok.com/@example'],
            ['platform' => 'other', 'label' => 'Threads', 'url' => 'https://threads.net/@example'],
        ],
    ]);

    $this->get('/')
        ->assertInertia(fn ($page) => $page
            ->where('company.phone', '0812 3456 7890')
            ->where('company.whatsapp_number', '628123456789')
            ->where('company.email', 'kontak@example.com')
            ->where('company.social_links.0.platform', 'instagram')
            ->where('company.social_links.1.platform', 'tiktok')
            ->where('company.social_links.2.label', 'Threads')
        );
});

it('falls back to sensible defaults when no settings row exists yet', function () {
    $this->get('/')
        ->assertInertia(fn ($page) => $page
            ->where('company.phone', '0811 510 808')
            ->where('company.whatsapp_number', '62811510808')
            ->where('company.email', 'cargo.atta@gmail.com')
        );
});

it('reflects updated settings immediately without a stale cache', function () {
    $setting = CompanySetting::create([
        'phone' => '0812 3456 7890',
        'whatsapp_number' => '628123456789',
        'email' => 'kontak@example.com',
    ]);

    expect(CompanySetting::current()->phone)->toBe('0812 3456 7890');

    $setting->update(['phone' => '0899 9999 0000']);

    expect(CompanySetting::current()->phone)->toBe('0899 9999 0000');
});
