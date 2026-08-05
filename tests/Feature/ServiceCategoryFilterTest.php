<?php

use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

function makeCategory(string $name, bool $isActive = true): ServiceCategory
{
    return ServiceCategory::create(['name' => $name, 'is_active' => $isActive]);
}

function makeService(string $title, ?ServiceCategory $category = null, bool $isActive = true): Service
{
    return Service::create([
        'title' => $title,
        'short_title' => $title,
        'description' => "<p>Deskripsi {$title}</p>",
        'service_category_id' => $category?->id,
        'is_active' => $isActive,
    ]);
}

it('derives a unique slug for a category from its name', function () {
    expect(makeCategory('Proyek & Industri')->slug)->toBe('proyek-industri')
        ->and(makeCategory('Proyek & Industri')->slug)->toBe('proyek-industri-1');
});

it('sends each service with its category to the services page', function () {
    $category = makeCategory('Distribusi & Penerusan');
    makeService('Mitra Penerusan Barang', $category);
    makeService('Pengiriman Khusus');

    $this->get('/layanan')
        ->assertInertia(fn ($page) => $page
            ->component('Services')
            ->has('services', 2)
            ->where('services.0.category.slug', 'distribusi-penerusan')
            ->where('services.0.category.name', 'Distribusi & Penerusan')
            ->where('services.1.category', null)
        );
});

it('lists only categories that have a visible service, with their counts', function () {
    $used = makeCategory('Distribusi & Penerusan');
    makeCategory('Kategori Kosong');
    $inactiveCategory = makeCategory('Kategori Nonaktif', isActive: false);

    makeService('Mitra Penerusan Barang', $used);
    makeService('Distribusi Retail', $used);
    makeService('Layanan Nonaktif', $used, isActive: false);
    makeService('Layanan Tanpa Chip', $inactiveCategory);

    $this->get('/layanan')
        ->assertInertia(fn ($page) => $page
            ->has('categories', 1)
            ->where('categories.0.slug', 'distribusi-penerusan')
            ->where('categories.0.count', 2)
        );
});

it('treats a service whose category was deactivated as uncategorised', function () {
    makeService('Layanan Tanpa Chip', makeCategory('Kategori Nonaktif', isActive: false));

    $this->get('/layanan')
        ->assertInertia(fn ($page) => $page
            ->has('services', 1)
            ->where('services.0.category', null)
        );
});

it('preselects the category from the query string', function () {
    makeService('Mitra Penerusan Barang', makeCategory('Distribusi & Penerusan'));

    $this->get('/layanan?kategori=distribusi-penerusan')
        ->assertInertia(fn ($page) => $page->where('activeCategory', 'distribusi-penerusan'));
});

it('falls back to no category when the query string slug is unknown', function () {
    makeService('Mitra Penerusan Barang', makeCategory('Distribusi & Penerusan'));

    $this->get('/layanan?kategori=tidak-ada')
        ->assertInertia(fn ($page) => $page
            ->where('activeCategory', null)
            ->has('services', 1)
        );
});

it('keeps every service on the page regardless of the query string', function () {
    $category = makeCategory('Distribusi & Penerusan');
    makeService('Mitra Penerusan Barang', $category);
    makeService('Pengiriman Khusus');

    $this->get('/layanan?kategori=distribusi-penerusan')
        ->assertInertia(fn ($page) => $page->has('services', 2));
});

it('seeds the search box from the query string', function () {
    makeService('Mitra Penerusan Barang');

    $this->get('/layanan?q=penerusan')
        ->assertInertia(fn ($page) => $page->where('activeSearch', 'penerusan'));
});

it('trims and caps the seeded search term', function () {
    makeService('Mitra Penerusan Barang');

    $this->get('/layanan?q='.urlencode('  '.str_repeat('a', 120).'  '))
        ->assertInertia(fn ($page) => $page->where('activeSearch', str_repeat('a', 80)));
});

it('defaults the search box to an empty string', function () {
    makeService('Mitra Penerusan Barang');

    $this->get('/layanan')
        ->assertInertia(fn ($page) => $page->where('activeSearch', ''));
});

it('narrows a query to one category through the scope', function () {
    $category = makeCategory('Distribusi & Penerusan');
    makeService('Mitra Penerusan Barang', $category);
    makeService('Pengiriman Khusus');

    expect(Service::inCategory('distribusi-penerusan')->pluck('title')->all())
        ->toBe(['Mitra Penerusan Barang'])
        ->and(Service::inCategory(null)->count())->toBe(2);
});
