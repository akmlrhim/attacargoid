<?php

use App\Filament\Resources\ServiceCategories\Pages\CreateServiceCategory;
use App\Filament\Resources\ServiceCategories\Pages\ListServiceCategories;
use App\Filament\Resources\Services\Pages\CreateService;
use App\Filament\Resources\Services\Pages\ListServices;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->actingAs(User::factory()->create());

    $this->category = ServiceCategory::create(['name' => 'Distribusi & Penerusan', 'is_active' => true]);

    $this->service = Service::create([
        'title' => 'Mitra Penerusan Barang',
        'short_title' => 'Penerusan',
        'description' => '<p>Partner distribusi area Kalimantan.</p>',
        'service_category_id' => $this->category->id,
        'is_active' => true,
    ]);
});

it('lists the categories with the number of services in each', function () {
    Livewire::test(ListServiceCategories::class)
        ->assertOk()
        ->assertCanSeeTableRecords([$this->category])
        ->assertCanRenderTableColumn('services_count');
});

it('creates a category and derives its slug', function () {
    Livewire::test(CreateServiceCategory::class)
        ->fillForm(['name' => 'Proyek & Industri', 'is_active' => true])
        ->call('create')
        ->assertHasNoFormErrors();

    expect(ServiceCategory::where('slug', 'proyek-industri')->exists())->toBeTrue();
});

it('shows the category on the services table and filters by it', function () {
    $other = Service::create([
        'title' => 'Pengiriman Khusus',
        'short_title' => 'Custom',
        'description' => '<p>Solusi custom.</p>',
        'is_active' => true,
    ]);

    Livewire::test(ListServices::class)
        ->assertOk()
        ->assertCanRenderTableColumn('category.name')
        ->filterTable('service_category_id', $this->category->id)
        ->assertCanSeeTableRecords([$this->service])
        ->assertCanNotSeeTableRecords([$other]);
});

it('offers the category select when creating a service', function () {
    Livewire::test(CreateService::class)
        ->assertOk()
        ->assertFormFieldExists('service_category_id');
});
