<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\Article;
use App\Models\ContactSubmission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;

uses(RefreshDatabase::class);

beforeEach(function () {
    RateLimiter::clear('site:127.0.0.1');
    RateLimiter::clear('contact:burst:127.0.0.1');
    RateLimiter::clear('contact:hour:127.0.0.1');
    RateLimiter::clear('contact:day:127.0.0.1');
    RateLimiter::clear('search:127.0.0.1');
    RateLimiter::clear('admin-login:127.0.0.1');
});

it('lets normal browsing through under the site limit', function () {
    $this->get('/')->assertOk();
    $this->get('/layanan')->assertOk();
    $this->get('/artikel')->assertOk();
});

it('blocks a flood of page views with 429 once the site limit is passed', function () {
    for ($i = 0; $i < 120; $i++) {
        $this->get('/')->assertOk();
    }

    $this->get('/')
        ->assertStatus(429)
        ->assertHeader('Retry-After');
});

it('throttles repeated contact form submissions', function () {
    $payload = [
        'name' => 'Budi',
        'needs' => 'Kirim barang ke Jakarta',
        'phone' => '08123456789',
    ];

    $this->post('/kontak', $payload)->assertRedirect();
    $this->post('/kontak', $payload)->assertRedirect();
    $this->post('/kontak', $payload)->assertRedirect();

    $this->post('/kontak', $payload)->assertStatus(429);

    expect(ContactSubmission::count())->toBe(3);
});

it('renders the branded error page for a throttled Inertia request', function () {
    $version = app(HandleInertiaRequests::class)->version(request());

    for ($i = 0; $i < 120; $i++) {
        $this->get('/')->assertOk();
    }

    $this->get('/', headers: ['X-Inertia' => 'true', 'X-Inertia-Version' => (string) $version])
        ->assertStatus(429)
        ->assertHeader('X-Inertia', 'true')
        ->assertHeader('Retry-After');
});

it('throttles article searches but not pagination', function () {
    Article::create(['title' => 'Artikel Contoh', 'content' => '<p>Isi.</p>', 'is_active' => true]);

    for ($i = 0; $i < 30; $i++) {
        $this->get('/artikel?q=contoh')->assertOk();
    }

    $this->get('/artikel?q=contoh')->assertStatus(429);

    $this->get('/artikel')->assertOk();
    $this->get('/artikel?page=1')->assertOk();
});

it('throttles the admin login page', function () {
    for ($i = 0; $i < 20; $i++) {
        $this->get('/admin/login')->assertOk();
    }

    $this->get('/admin/login')->assertStatus(429);
});

it('caches the sitemap and rebuilds it when content changes', function () {
    Cache::forget('sitemap.xml');

    $this->get('/sitemap.xml')
        ->assertOk()
        ->assertHeader('Content-Type', 'application/xml');

    expect(Cache::has('sitemap.xml'))->toBeTrue();

    Article::create(['title' => 'Artikel Baru', 'content' => '<p>Isi.</p>', 'is_active' => true]);

    expect(Cache::has('sitemap.xml'))->toBeFalse();
});
