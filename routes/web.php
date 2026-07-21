<?php

use App\Http\Controllers\ContactController;
use App\Models\Advantage;
use App\Models\CompanySetting;
use App\Models\CoverageArea;
use App\Models\Service;
use App\Models\TariffService;
use App\Models\TariffZone;
use App\Services\GooglePlacesService;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $services = Service::active()->get(['id', 'title', 'short_title', 'description', 'details', 'image_url', 'image_alt'])
        ->map(fn ($s) => array_merge($s->toArray(), ['image_url' => resolveImageUrl($s->image_url)]));

    $advantages = Advantage::active()->get(['id', 'title', 'description', 'image_url'])
        ->map(fn ($a) => array_merge($a->toArray(), ['image_url' => resolveImageUrl($a->image_url)]));

    $coverageRegions = CoverageArea::active()
        ->get(['province', 'province_short', 'city', 'latitude', 'longitude', 'is_hub'])
        ->groupBy('province')
        ->map(fn ($cities) => [
            'name' => $cities->first()->province,
            'shortName' => $cities->first()->province_short,
            'cities' => $cities->map(fn ($c) => [
                'name' => $c->city,
                'lat' => $c->latitude,
                'lng' => $c->longitude,
                'hub' => $c->is_hub,
            ])->values(),
        ])
        ->values();

    $places = new GooglePlacesService(
        apiKey: config('services.google_places.key', ''),
        dataId: config('services.google_places.place_id', ''),
    );

    return Inertia::render('Home', [
        'services' => $services,
        'advantages' => $advantages,
        'coverageRegions' => $coverageRegions,
        'reviews' => $places->getReviews(),
        'googleRating' => $places->getRating(),
    ])->withViewData(['seo' => array_merge(
        pageSeo(
            'Mitra Logistik Terpercaya di Kalimantan',
            'ATTA Cargo, mitra penerusan barang & last mile distribution dengan hub di Banjarmasin. Distribusi cepat, aman, dan terpantau ke seluruh Kalimantan Selatan & Tengah.',
            '/',
        ),
        ['jsonld' => faqSchemaJsonLd(CompanySetting::current())],
    )]);
})->name('home');

Route::get('/tentang-kami', function () {
    return Inertia::render('About')->withViewData(['seo' => array_merge(
        pageSeo(
            'Tentang Kami',
            'Mengenal ATTA Cargo (PT. Tumbuh Kuat Sejahtera), perusahaan jasa logistik penerusan barang & last mile distribution berbasis di Banjarmasin, Kalimantan Selatan.',
            '/tentang-kami',
        ),
        ['breadcrumbs' => [
            ['name' => 'Beranda', 'url' => url('/')],
            ['name' => 'Tentang Kami', 'url' => url('/tentang-kami')],
        ]],
    )]);
})->name('about');

Route::get('/layanan', function () {
    $services = Service::active()->get(['id', 'title', 'short_title', 'description', 'details', 'image_url', 'image_alt'])
        ->map(fn ($s) => array_merge($s->toArray(), ['image_url' => resolveImageUrl($s->image_url)]));

    $serviceSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'ItemList',
        'itemListElement' => $services->values()->map(fn ($service, $i) => [
            '@type' => 'ListItem',
            'position' => $i + 1,
            'item' => [
                '@type' => 'Service',
                'name' => $service['title'],
                'description' => trim(strip_tags($service['description'] ?? '')),
                'serviceType' => 'Logistik & Distribusi Barang',
                'areaServed' => 'Kalimantan',
                'provider' => [
                    '@type' => 'Organization',
                    'name' => 'ATTA Cargo',
                    '@id' => url('/').'#organization',
                ],
            ],
        ])->all(),
    ];

    return Inertia::render('Services', ['services' => $services])
        ->withViewData(['seo' => array_merge(
            pageSeo(
                'Layanan',
                'Solusi distribusi lengkap ATTA Cargo: penerusan barang, distribusi retail & modern trade, pengiriman B2B, proyek & industri, hingga pengiriman khusus di seluruh Kalimantan.',
                '/layanan',
                '/images/layanan.webp',
            ),
            [
                'breadcrumbs' => [
                    ['name' => 'Beranda', 'url' => url('/')],
                    ['name' => 'Layanan', 'url' => url('/layanan')],
                ],
                'jsonld' => $serviceSchema,
            ],
        )]);
})->name('services');

Route::get('/kalkulator', function () {
    return Inertia::render('Calculator', [
        'tariffZones' => TariffZone::active()->get(['id', 'slug', 'label', 'rate_per_kg', 'min_kg']),
        'tariffServices' => TariffService::active()->get(['id', 'slug', 'label', 'note', 'multiplier']),
    ])->withViewData(['seo' => array_merge(
        pageSeo(
            'Kalkulator Estimasi Tarif',
            'Hitung perkiraan biaya distribusi ATTA Cargo secara instan berdasarkan zona tujuan, berat, dan jenis layanan di wilayah Kalimantan.',
            '/kalkulator',
        ),
        ['breadcrumbs' => [
            ['name' => 'Beranda', 'url' => url('/')],
            ['name' => 'Kalkulator', 'url' => url('/kalkulator')],
        ]],
    )]);
})->name('calculator');

Route::get('/kontak', function () {
    $office = config('company.office');
    $company = CompanySetting::current();

    return Inertia::render('Contact', [
        'location' => [
            'label' => $office['label'],
            'address' => $office['address'],
            'position' => [$office['latitude'], $office['longitude']],
            'zoom' => $office['zoom'],
        ],
    ])->withViewData(['seo' => array_merge(
        pageSeo(
            'Kontak',
            "Hubungi ATTA Cargo untuk kebutuhan distribusi dan penerusan barang Anda. Hub Banjarmasin — telepon {$company->phone} atau email {$company->email}.",
            '/kontak',
        ),
        ['breadcrumbs' => [
            ['name' => 'Beranda', 'url' => url('/')],
            ['name' => 'Kontak', 'url' => url('/kontak')],
        ]],
    )]);
})->name('contact');

Route::post('/kontak', ContactController::class);

Route::get('/robots.txt', function () {
    $content = "User-agent: *\nAllow: /\n\nSitemap: ".url('/sitemap.xml')."\n";

    return response($content, 200, ['Content-Type' => 'text/plain']);
});

Route::get('/sitemap.xml', function () {
    $latestService = Service::max('updated_at');

    $pages = [
        ['path' => '/', 'priority' => '1.0', 'changefreq' => 'weekly', 'lastmod' => $latestService],
        ['path' => '/layanan', 'priority' => '0.9', 'changefreq' => 'weekly', 'lastmod' => $latestService],
        ['path' => '/kalkulator', 'priority' => '0.7', 'changefreq' => 'monthly', 'lastmod' => null],
        ['path' => '/tentang-kami', 'priority' => '0.6', 'changefreq' => 'monthly', 'lastmod' => null],
        ['path' => '/kontak', 'priority' => '0.6', 'changefreq' => 'monthly', 'lastmod' => null],
    ];

    $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";
    foreach ($pages as $page) {
        $xml .= '  <url><loc>'.e(url($page['path'])).'</loc>';
        if ($page['lastmod']) {
            $xml .= '<lastmod>'.Carbon::parse($page['lastmod'])->toAtomString().'</lastmod>';
        }
        $xml .= '<changefreq>'.$page['changefreq'].'</changefreq>';
        $xml .= '<priority>'.$page['priority'].'</priority>';
        $xml .= '</url>'."\n";
    }
    $xml .= '</urlset>'."\n";

    return response($xml, 200, ['Content-Type' => 'application/xml']);
});
