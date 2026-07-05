<?php

use App\Models\PageVisit;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('records a page visit when a public page is loaded', function () {
    $this->get('/')->assertOk();

    expect(PageVisit::query()->where('path', '/')->exists())->toBeTrue();
});

it('does not record visits to the admin panel', function () {
    $this->get('/admin/login');

    expect(PageVisit::query()->count())->toBe(0);
});
