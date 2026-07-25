<?php

use App\Models\PageVisit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;

uses(RefreshDatabase::class);

it('records a page visit when a public page is loaded', function () {
    $this->get('/')->assertOk();

    expect(PageVisit::query()->where('path', '/')->exists())->toBeTrue();
});

it('does not record visits to the admin panel', function () {
    $this->get('/admin/login');

    expect(PageVisit::query()->count())->toBe(0);
});

it('records visits from in-app browsers with an over-long user agent', function () {
    $userAgent = 'Mozilla/5.0 (Linux; Android 13; SM-A536E Build/TP1A.220624.014; wv) '
        .'AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.6045.163 '
        .'Mobile Safari/537.36 Instagram 309.1.0.41.113 Android (33/13; 450dpi; '
        .'1080x2176; samsung; SM-A536E; a53x; s5e8825; id_ID; 541000000)';

    expect(strlen($userAgent))->toBeGreaterThan(255);

    $this->withHeader('User-Agent', $userAgent)->get('/')->assertOk();

    expect(PageVisit::query()->value('user_agent'))->toBe($userAgent);
});

it('still serves the page when the visit cannot be recorded', function () {
    Schema::drop('page_visits');

    $this->get('/')->assertOk();
});
