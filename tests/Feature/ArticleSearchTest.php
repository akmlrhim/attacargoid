<?php

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('filters published articles by title', function () {
    Article::create(['title' => 'Tips Mengemas Barang Pecah Belah', 'content' => '<p>Isi.</p>', 'is_active' => true]);
    Article::create(['title' => 'Jadwal Kapal Banjarmasin', 'content' => '<p>Isi.</p>', 'is_active' => true]);

    $this->get('/artikel?q=pecah')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Articles/Index')
            ->has('articles.data', 1)
            ->where('articles.data.0.title', 'Tips Mengemas Barang Pecah Belah')
            ->where('activeSearch', 'pecah')
        );
});

it('matches on excerpt as well as title', function () {
    Article::create([
        'title' => 'Panduan Ekspedisi',
        'content' => '<p>Konten umum.</p>',
        'excerpt' => 'Cara memilih jasa ekspedisi kalimantan terpercaya',
        'is_active' => true,
    ]);

    $this->get('/artikel?q=terpercaya')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->has('articles.data', 1));
});

it('returns an empty result set for a search with no matches', function () {
    Article::create(['title' => 'Jadwal Kapal Banjarmasin', 'content' => '<p>Isi.</p>', 'is_active' => true]);

    $this->get('/artikel?q=tidak-ada-yang-cocok')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('articles.data', 0)
            ->where('activeSearch', 'tidak-ada-yang-cocok')
        );
});

it('ignores unpublished articles when searching', function () {
    Article::create(['title' => 'Draft Belum Terbit', 'content' => '<p>Isi.</p>', 'is_active' => false]);

    $this->get('/artikel?q=draft')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->has('articles.data', 0));
});

it('filters by a single from date', function () {
    Article::create(['title' => 'Artikel Lama', 'content' => '<p>Isi.</p>', 'is_active' => true, 'published_at' => '2026-01-10']);
    Article::create(['title' => 'Artikel Baru', 'content' => '<p>Isi.</p>', 'is_active' => true, 'published_at' => '2026-03-10']);

    $this->get('/artikel?from=2026-02-01')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('articles.data', 1)
            ->where('articles.data.0.title', 'Artikel Baru')
            ->where('activeDateFrom', '2026-02-01')
        );
});

it('filters by a single to date', function () {
    Article::create(['title' => 'Artikel Lama', 'content' => '<p>Isi.</p>', 'is_active' => true, 'published_at' => '2026-01-10']);
    Article::create(['title' => 'Artikel Baru', 'content' => '<p>Isi.</p>', 'is_active' => true, 'published_at' => '2026-03-10']);

    $this->get('/artikel?to=2026-02-01')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('articles.data', 1)
            ->where('articles.data.0.title', 'Artikel Lama')
        );
});

it('filters by a full date range', function () {
    Article::create(['title' => 'Terlalu Lama', 'content' => '<p>Isi.</p>', 'is_active' => true, 'published_at' => '2026-01-01']);
    Article::create(['title' => 'Di Tengah Rentang', 'content' => '<p>Isi.</p>', 'is_active' => true, 'published_at' => '2026-02-15']);
    Article::create(['title' => 'Terlalu Baru', 'content' => '<p>Isi.</p>', 'is_active' => true, 'published_at' => '2026-04-01']);

    $this->get('/artikel?from=2026-02-01&to=2026-03-01')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('articles.data', 1)
            ->where('articles.data.0.title', 'Di Tengah Rentang')
        );
});

it('ignores a malformed date filter instead of erroring', function () {
    Article::create(['title' => 'Artikel', 'content' => '<p>Isi.</p>', 'is_active' => true, 'published_at' => '2026-02-15']);

    $this->get('/artikel?from=not-a-date')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('articles.data', 1)
            ->where('activeDateFrom', null)
        );
});
