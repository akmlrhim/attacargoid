<?php

use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

function makePublishedArticles(int $count): void
{
    foreach (range(1, $count) as $i) {
        Article::create([
            'title' => "Artikel Nomor {$i}",
            'content' => "<p>Isi artikel nomor {$i}.</p>",
            'is_active' => true,
        ]);
    }
}

it('canonicalises each paginated page to itself', function () {
    makePublishedArticles(12);

    $this->get('/artikel?page=2')
        ->assertOk()
        ->assertSee('rel="canonical" href="'.url('/artikel?page=2').'"', false)
        ->assertSee('<title data-inertia>Artikel &amp; Berita Seputar Ekspedisi Kalimantan - Halaman 2', false);
});

it('keeps the bare canonical on the first page', function () {
    makePublishedArticles(12);

    $this->get('/artikel')
        ->assertOk()
        ->assertSee('rel="canonical" href="'.url('/artikel').'"', false)
        ->assertDontSee('Halaman 1', false);
});

it('returns 404 for a page beyond the last one', function () {
    makePublishedArticles(12);

    $this->get('/artikel?page=99')->assertNotFound();
});

it('still renders an empty first page when there are no articles', function () {
    $this->get('/artikel')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Articles/Index')
            ->where('articles.data', [])
        );
});
