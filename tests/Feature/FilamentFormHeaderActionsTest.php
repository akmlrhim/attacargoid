<?php

use App\Filament\Pages\ManageCompanySettings;
use App\Filament\Resources\Advantages\Pages\CreateAdvantage;
use App\Filament\Resources\Advantages\Pages\EditAdvantage;
use App\Filament\Resources\Articles\Pages\CreateArticle;
use App\Filament\Resources\Articles\Pages\EditArticle;
use App\Filament\Resources\CoverageAreas\Pages\CreateCoverageArea;
use App\Filament\Resources\CoverageAreas\Pages\EditCoverageArea;
use App\Filament\Resources\ServiceCategories\Pages\CreateServiceCategory;
use App\Filament\Resources\ServiceCategories\Pages\EditServiceCategory;
use App\Filament\Resources\Services\Pages\CreateService;
use App\Filament\Resources\Services\Pages\EditService;
use App\Filament\Resources\TariffServices\Pages\CreateTariffService;
use App\Filament\Resources\TariffServices\Pages\EditTariffService;
use App\Filament\Resources\TariffZones\Pages\CreateTariffZone;
use App\Filament\Resources\TariffZones\Pages\EditTariffZone;
use App\Models\Advantage;
use App\Models\Article;
use App\Models\CompanySetting;
use App\Models\CoverageArea;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\TariffService;
use App\Models\TariffZone;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

/**
 * The header button is an HTML submit bound to the form by id, so it cannot be
 * exercised with `callAction()` - that only invokes PHP action callbacks. What
 * makes it work in the browser is the pairing asserted here: a `<form id="form">`
 * on the page and a `type="submit" form="form"` button outside it.
 */
function assertHeaderSubmitsForm(string $html): void
{
    expect($html)->toContain('id="form"');
    expect($html)->toMatch('/<button[^>]*form="form"[^>]*type="submit"/');
}

it('puts a submit button in the header of every create page', function (string $page) {
    assertHeaderSubmitsForm(Livewire::test($page)->assertOk()->html());
})->with([
    CreateAdvantage::class,
    CreateArticle::class,
    CreateCoverageArea::class,
    CreateServiceCategory::class,
    CreateService::class,
    CreateTariffService::class,
    CreateTariffZone::class,
]);

it('puts a submit button in the header of every edit page', function (string $page, string $model, array $attributes) {
    $record = $model::create($attributes);

    assertHeaderSubmitsForm(
        Livewire::test($page, ['record' => $record->getRouteKey()])->assertOk()->html(),
    );
})->with([
    'advantage' => [
        EditAdvantage::class,
        Advantage::class,
        ['title' => 'Lokasi Strategis', 'description' => 'Hub Banjarmasin.', 'is_active' => true],
    ],
    'article' => [
        EditArticle::class,
        Article::class,
        ['title' => 'Kabar Pengiriman', 'excerpt' => 'Ringkasan.', 'content' => '<p>Isi.</p>'],
    ],
    'coverage area' => [
        EditCoverageArea::class,
        CoverageArea::class,
        ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Banjarmasin', 'latitude' => -3.3, 'longitude' => 114.6, 'is_active' => true],
    ],
    'service category' => [
        EditServiceCategory::class,
        ServiceCategory::class,
        ['name' => 'Distribusi & Penerusan', 'is_active' => true],
    ],
    'service' => [
        EditService::class,
        Service::class,
        ['title' => 'Mitra Penerusan', 'short_title' => 'Penerusan', 'description' => '<p>Deskripsi.</p>', 'is_active' => true],
    ],
    'tariff service' => [
        EditTariffService::class,
        TariffService::class,
        ['label' => 'Reguler', 'note' => '3-5 hari', 'multiplier' => 1, 'is_active' => true],
    ],
    'tariff zone' => [
        EditTariffZone::class,
        TariffZone::class,
        ['label' => 'Zona A', 'rate_per_kg' => 3000, 'min_kg' => 5, 'is_active' => true],
    ],
]);

it('saves an edit through the form handler the header button submits', function () {
    $category = ServiceCategory::create(['name' => 'Lama', 'is_active' => true]);

    Livewire::test(EditServiceCategory::class, [
        'record' => $category->getRouteKey(),
    ])
        ->fillForm(['name' => 'Baru'])
        ->call('save')
        ->assertHasNoFormErrors();

    expect($category->fresh()->name)->toBe('Baru');
});

it('saves the company settings from its header action', function () {
    Livewire::test(ManageCompanySettings::class)
        ->fillForm([
            'phone' => '0811 000 111',
            'email' => 'kontak@example.com',
            'whatsapp_number' => '628110001110',
        ])
        ->callAction('saveHeader')
        ->assertHasNoFormErrors();

    expect(CompanySetting::first()->phone)->toBe('0811 000 111');
});

it('offers no "create another" button on any create page', function (string $page) {
    // `$canCreateAnother` is protected, so it is only reachable by reflection.
    expect((new ReflectionProperty($page, 'canCreateAnother'))->getValue())->toBeFalse();
})->with([
    CreateAdvantage::class,
    CreateArticle::class,
    CreateCoverageArea::class,
    CreateServiceCategory::class,
    CreateService::class,
    CreateTariffService::class,
    CreateTariffZone::class,
]);
