<?php

use App\Http\Controllers\ContactController;
use App\Models\Advantage;
use App\Models\Article;
use App\Models\CompanySetting;
use App\Models\CoverageArea;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\TariffService;
use App\Models\TariffZone;
use App\Services\GooglePlacesService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
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
    $placesData = $places->getReviewsAndRating();

    $articles = Article::published()->limit(5)->get(['id', 'title', 'slug', 'excerpt', 'image_url', 'image_alt', 'published_at'])
        ->map(fn ($a) => array_merge($a->toArray(), ['image_url' => resolveImageUrl($a->image_url)]));

    return Inertia::render('Home', [
        'services' => $services,
        'advantages' => $advantages,
        'coverageRegions' => $coverageRegions,
        'reviews' => $placesData['reviews'],
        'googleRating' => $placesData['rating'],
        'articles' => $articles,
    ])->withViewData(['seo' => array_merge(
        pageSeo(
            'Jasa Ekspedisi Banjarmasin & Cargo Kalimantan Terpercaya',
            'ATTA Cargo, jasa ekspedisi & cargo Banjarmasin terpercaya, melayani pengiriman barang, distribusi & logistik ke Kalimantan Selatan & Kalimantan Tengah.',
            '/',
        ),
        ['jsonld' => faqSchemaJsonLd(CompanySetting::current())],
    )]);
})->name('home');

Route::get('/tentang-kami', function () {
    return Inertia::render('About')->withViewData(['seo' => array_merge(
        pageSeo(
            'Profil Perusahaan & Mitra Penerusan Barang Banjarmasin',
            'Mengenal ATTA Cargo (PT. Tumbuh Kuat Sejahtera), vendor logistik & mitra penerusan barang di Banjarmasin, melayani ekspedisi ke Kalimantan Selatan & Tengah.',
            '/tentang-kami',
        ),
        ['breadcrumbs' => [
            ['name' => 'Beranda', 'url' => url('/')],
            ['name' => 'Tentang Kami', 'url' => url('/tentang-kami')],
        ]],
    )]);
})->name('about');

Route::get('/layanan', function (Request $request) {
    /**
     * Cards only show a trimmed excerpt; the full description and the detail
     * points live on the service's own page, so the excerpt is built server
     * side where the raw HTML can be stripped safely.
     */
    $excerptLimit = 100;

    $services = Service::active()
        ->with('category:id,name,slug,is_active')
        ->get(['id', 'service_category_id', 'title', 'short_title', 'slug', 'description', 'details', 'image_url', 'image_alt'])
        ->map(function ($s) use ($excerptLimit) {
            /**
             * A service whose category was deactivated has no chip to sit
             * under, so it is treated as uncategorised and only appears in
             * "Semua" rather than disappearing from the page entirely.
             */
            $category = $s->category?->is_active ? $s->category : null;

            return array_merge($s->toArray(), [
                'image_url' => resolveImageUrl($s->image_url),
                'description_excerpt' => Str::limit(richTextToPlainText($s->description), $excerptLimit, preserveWords: true),
                'category' => $category ? ['name' => $category->name, 'slug' => $category->slug] : null,
            ]);
        });

    /**
     * Only categories that actually have a visible service get a filter chip -
     * an empty one would just be a dead end for the visitor.
     */
    $usedCategorySlugs = $services->pluck('category.slug')->filter()->unique();

    $categories = ServiceCategory::active()
        ->whereIn('slug', $usedCategorySlugs)
        ->get(['name', 'slug'])
        ->map(fn ($c) => [
            'name' => $c->name,
            'slug' => $c->slug,
            'count' => $services->where('category.slug', $c->slug)->count(),
        ])
        ->values();

    /** Unknown slugs fall back to "Semua Kategori" instead of an empty list. */
    $activeCategory = $request->query('kategori');
    $activeCategory = $usedCategorySlugs->contains($activeCategory) ? $activeCategory : null;

    /**
     * The search box filters in the browser; this only seeds its initial value
     * so a shared `?q=` link opens already filtered. Capped because the whole
     * string is echoed back into the page as an input value.
     */
    $activeSearch = Str::limit(trim((string) $request->query('q')), 80, '');

    $serviceSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'ItemList',
        'itemListElement' => $services->values()->map(fn ($service, $i) => [
            '@type' => 'ListItem',
            'position' => $i + 1,
            'item' => [
                '@type' => 'Service',
                'name' => $service['title'],
                'description' => richTextToPlainText($service['description'] ?? ''),
                'serviceType' => 'Ekspedisi, Cargo & Distribusi Barang',
                'areaServed' => 'Kalimantan',
                'url' => url("/layanan/{$service['slug']}"),
                'provider' => [
                    '@type' => 'Organization',
                    'name' => 'ATTA Cargo',
                    '@id' => url('/').'#organization',
                ],
            ],
        ])->all(),
    ];

    return Inertia::render('Services/Index', [
        'services' => $services,
        'categories' => $categories,
        'activeCategory' => $activeCategory,
        'activeSearch' => $activeSearch,
    ])
        ->withViewData(['seo' => array_merge(
            pageSeo(
                'Layanan Ekspedisi & Cargo Door to Door Kalimantan',
                'Layanan ekspedisi ATTA Cargo: jasa distribusi barang Kalimantan Selatan, pengiriman B2B, proyek & industri, hingga ekspedisi barang besar ke Kalimantan Tengah.',
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

Route::get('/layanan/{slug}', function (string $slug) {
    $service = Service::active()
        ->with('category:id,name,slug,is_active')
        ->where('slug', $slug)
        ->firstOrFail();

    $service->image_url = resolveImageUrl($service->image_url);

    /** A deactivated category has no filter chip to link back to. */
    $category = $service->category?->is_active ? $service->category : null;

    /** Meta descriptions are cut off around 160 characters in the SERP. */
    $description = Str::limit(richTextToPlainText($service->description), 155, preserveWords: true);

    /**
     * Siblings from the same category come first so the block reads as "more
     * like this", then the rest of the catalogue fills the row.
     */
    $relatedServices = Service::query()
        ->where('is_active', true)
        ->where('id', '!=', $service->id)
        ->when(
            $service->service_category_id,
            fn ($q) => $q->orderByRaw(
                'CASE WHEN service_category_id = ? THEN 0 ELSE 1 END',
                [$service->service_category_id],
            ),
        )
        ->orderBy('sort_order')
        ->limit(3)
        ->get(['id', 'title', 'slug', 'description', 'image_url', 'image_alt'])
        ->map(fn ($s) => [
            'id' => $s->id,
            'title' => $s->title,
            'slug' => $s->slug,
            'image_url' => resolveImageUrl($s->image_url),
            'image_alt' => $s->image_alt,
            'description_excerpt' => Str::limit(richTextToPlainText($s->description), 90, preserveWords: true),
        ]);

    $serviceSeo = pageSeo(
        $service->title,
        $description,
        "/layanan/{$service->slug}",
        $service->image_url,
        $service->image_alt ?: $service->title,
    );

    return Inertia::render('Services/Show', [
        'service' => array_merge($service->toArray(), [
            'category' => $category ? ['name' => $category->name, 'slug' => $category->slug] : null,
        ]),
        'relatedServices' => $relatedServices,
        'metaDescription' => $description,
        'shareImage' => $serviceSeo['image'],
    ])->withViewData(['seo' => array_merge(
        $serviceSeo,
        [
            'share_title' => $service->title,
            'breadcrumbs' => [
                ['name' => 'Beranda', 'url' => url('/')],
                ['name' => 'Layanan', 'url' => url('/layanan')],
                ['name' => $service->title, 'url' => url("/layanan/{$service->slug}")],
            ],
            'jsonld' => [
                '@context' => 'https://schema.org',
                '@type' => 'Service',
                'name' => $service->title,
                'description' => $description,
                'serviceType' => $category?->name ?? 'Ekspedisi, Cargo & Distribusi Barang',
                'areaServed' => 'Kalimantan',
                'url' => url("/layanan/{$service->slug}"),
                'image' => array_values(array_filter([$serviceSeo['image'], $service->image_url])),
                'provider' => [
                    '@type' => 'Organization',
                    'name' => 'ATTA Cargo',
                    '@id' => url('/').'#organization',
                ],
            ],
        ],
    )]);
})->name('services.show');

Route::permanentRedirect('/kalkulator', '/cek-ongkir');

Route::get('/cek-ongkir', function () {
    return Inertia::render('Calculator', [
        'tariffZones' => TariffZone::active()->get(['id', 'slug', 'label', 'rate_per_kg', 'min_kg']),
        'tariffServices' => TariffService::active()->get(['id', 'slug', 'label', 'note', 'multiplier']),
    ])->withViewData(['seo' => array_merge(
        pageSeo(
            'Cek Ongkir & Ekspedisi Murah Banjarmasin',
            'Cek estimasi ongkir ekspedisi & cargo murah Banjarmasin ke Jakarta, Surabaya, dan kota lain secara instan berdasarkan zona, berat, dan jenis layanan.',
            '/cek-ongkir',
        ),
        ['breadcrumbs' => [
            ['name' => 'Beranda', 'url' => url('/')],
            ['name' => 'Cek Ongkir', 'url' => url('/cek-ongkir')],
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
            'Kontak Jasa Cargo & Ekspedisi Banjarmasin',
            "Hubungi ATTA Cargo, jasa pengiriman barang Banjarmasin & ekspedisi Kalimantan Selatan. Telepon {$company->phone} atau email {$company->email}.",
            '/kontak',
        ),
        ['breadcrumbs' => [
            ['name' => 'Beranda', 'url' => url('/')],
            ['name' => 'Kontak', 'url' => url('/kontak')],
        ]],
    )]);
})->name('contact');

Route::post('/kontak', ContactController::class);

Route::get('/artikel', function () {
    $articles = Article::published()
        ->paginate(9, ['id', 'title', 'slug', 'excerpt', 'image_url', 'image_alt', 'published_at'])
        ->withQueryString()
        ->through(fn ($a) => array_merge($a->toArray(), ['image_url' => resolveImageUrl($a->image_url)]));

    return Inertia::render('Articles/Index', ['articles' => $articles])
        ->withViewData(['seo' => array_merge(
            pageSeo(
                'Artikel & Berita Seputar Ekspedisi Kalimantan',
                'Kumpulan artikel dan berita terbaru seputar jasa ekspedisi, cargo, dan logistik dari ATTA Cargo untuk wilayah Kalimantan Selatan & Tengah.',
                '/artikel',
            ),
            ['breadcrumbs' => [
                ['name' => 'Beranda', 'url' => url('/')],
                ['name' => 'Artikel', 'url' => url('/artikel')],
            ]],
        )]);
})->name('articles.index');

Route::get('/artikel/{slug}', function (string $slug) {
    $article = Article::published()->where('slug', $slug)->firstOrFail();
    $article->image_url = resolveImageUrl($article->image_url);

    $relatedArticles = Article::published()
        ->where('id', '!=', $article->id)
        ->limit(3)
        ->get(['id', 'title', 'slug', 'excerpt', 'image_url', 'image_alt', 'published_at'])
        ->map(fn ($a) => array_merge($a->toArray(), ['image_url' => resolveImageUrl($a->image_url)]));

    $articleSeo = pageSeo(
        $article->title,
        $article->excerpt,
        "/artikel/{$article->slug}",
        $article->image_url,
        $article->image_alt ?: $article->title,
    );

    return Inertia::render('Articles/Show', [
        'article' => $article,
        'relatedArticles' => $relatedArticles,
        'shareImage' => $articleSeo['image'],
    ])->withViewData(['seo' => array_merge(
        $articleSeo,
        [
            'og_type' => 'article',
            'share_title' => $article->title,
            'published_time' => $article->published_at?->toAtomString(),
            'modified_time' => $article->updated_at?->toAtomString(),
            'breadcrumbs' => [
                ['name' => 'Beranda', 'url' => url('/')],
                ['name' => 'Artikel', 'url' => url('/artikel')],
                ['name' => $article->title, 'url' => url("/artikel/{$article->slug}")],
            ],
            'jsonld' => [
                '@context' => 'https://schema.org',
                '@type' => 'Article',
                'headline' => $article->title,
                'description' => $article->excerpt,

                'image' => array_values(array_filter([$articleSeo['image'], $article->image_url])),
                'datePublished' => $article->published_at?->toAtomString(),
                'dateModified' => $article->updated_at?->toAtomString(),
                'author' => [
                    '@type' => 'Organization',
                    'name' => 'ATTA Cargo',
                    '@id' => url('/').'#organization',
                ],
                'publisher' => [
                    '@type' => 'Organization',
                    'name' => 'ATTA Cargo',
                    '@id' => url('/').'#organization',
                ],
                'mainEntityOfPage' => url("/artikel/{$article->slug}"),
            ],
        ],
    )]);
})->name('articles.show');

Route::get('/robots.txt', function () {
    $content = "User-agent: *\nAllow: /\n\nSitemap: ".url('/sitemap.xml')."\n";

    return response($content, 200, ['Content-Type' => 'text/plain']);
});

Route::get('/sitemap.xml', function () {
    $latestService = Service::max('updated_at');
    $latestArticle = Article::published()->max('updated_at');

    $pages = [
        ['path' => '/', 'priority' => '1.0', 'changefreq' => 'weekly', 'lastmod' => $latestService],
        ['path' => '/layanan', 'priority' => '0.9', 'changefreq' => 'weekly', 'lastmod' => $latestService],
        ['path' => '/artikel', 'priority' => '0.8', 'changefreq' => 'daily', 'lastmod' => $latestArticle],
        ['path' => '/cek-ongkir', 'priority' => '0.7', 'changefreq' => 'monthly', 'lastmod' => null],
        ['path' => '/tentang-kami', 'priority' => '0.6', 'changefreq' => 'monthly', 'lastmod' => null],
        ['path' => '/kontak', 'priority' => '0.6', 'changefreq' => 'monthly', 'lastmod' => null],
    ];

    foreach (Service::active()->get(['slug', 'updated_at']) as $service) {
        $pages[] = [
            'path' => "/layanan/{$service->slug}",
            'priority' => '0.7',
            'changefreq' => 'monthly',
            'lastmod' => $service->updated_at,
        ];
    }

    foreach (Article::published()->get(['slug', 'updated_at']) as $article) {
        $pages[] = [
            'path' => "/artikel/{$article->slug}",
            'priority' => '0.6',
            'changefreq' => 'monthly',
            'lastmod' => $article->updated_at,
        ];
    }

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
