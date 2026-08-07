<?php

use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

function makeDetailService(string $title, array $attributes = []): Service
{
    return Service::create(array_merge([
        'title' => $title,
        'short_title' => $title,
        'description' => "<p>Deskripsi {$title} &amp; distribusinya.</p>",
        'is_active' => true,
    ], $attributes));
}

it('renders the detail page for an active service', function () {
    $category = ServiceCategory::create(['name' => 'Distribusi & Penerusan', 'is_active' => true]);
    $service = makeDetailService('Mitra Penerusan Barang', [
        'service_category_id' => $category->id,
        'details' => [['item' => 'Armada terjadwal']],
    ]);

    $this->get("/layanan/{$service->slug}")
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Services/Show')
            ->where('service.title', 'Mitra Penerusan Barang')
            ->where('service.category.slug', 'distribusi-penerusan')
            ->where('service.details.0.item', 'Armada terjadwal')
            ->has('shareImage')
        );
});

it('sends a plain-text meta description built from the rich text body', function () {
    $service = makeDetailService('Pengiriman B2B');

    $this->get("/layanan/{$service->slug}")
        ->assertInertia(fn ($page) => $page
            ->where('metaDescription', 'Deskripsi Pengiriman B2B & distribusinya.')
        );
});

it('drops the category chip when the category was deactivated', function () {
    $category = ServiceCategory::create(['name' => 'Kategori Nonaktif', 'is_active' => false]);
    $service = makeDetailService('Pengiriman Khusus', ['service_category_id' => $category->id]);

    $this->get("/layanan/{$service->slug}")
        ->assertInertia(fn ($page) => $page->where('service.category', null));
});

it('hides an inactive service behind a 404', function () {
    $service = makeDetailService('Layanan Nonaktif', ['is_active' => false]);

    $this->get("/layanan/{$service->slug}")->assertNotFound();
});

it('404s an unknown slug instead of falling through to the list page', function () {
    $this->get('/layanan/tidak-ada')->assertNotFound();
});

it('puts services from the same category first among the related ones', function () {
    $category = ServiceCategory::create(['name' => 'Proyek & Industri', 'is_active' => true]);
    $service = makeDetailService('Pengiriman Proyek', ['service_category_id' => $category->id]);

    makeDetailService('Pengiriman Retail');
    makeDetailService('Pengiriman Industri', ['service_category_id' => $category->id]);
    makeDetailService('Pengiriman Khusus');
    makeDetailService('Pengiriman Ekstra');

    $this->get("/layanan/{$service->slug}")
        ->assertInertia(fn ($page) => $page
            ->has('relatedServices', 3)
            ->where('relatedServices.0.title', 'Pengiriman Industri')
            ->missing('relatedServices.0.description')
        );
});

it('lists every active service in the sitemap', function () {
    $service = makeDetailService('Mitra Penerusan Barang');
    $hidden = makeDetailService('Layanan Nonaktif', ['is_active' => false]);

    $this->get('/sitemap.xml')
        ->assertOk()
        ->assertSee(url("/layanan/{$service->slug}"))
        ->assertDontSee(url("/layanan/{$hidden->slug}"));
});
