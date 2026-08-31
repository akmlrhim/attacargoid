<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(Request $request): Response
    {
        $excerptLimit = 100;

        $services = Service::active()
            ->with('category:id,name,slug,is_active')
            ->get(['id', 'service_category_id', 'title', 'short_title', 'slug', 'description', 'details', 'image_url', 'image_alt'])
            ->map(function ($s) use ($excerptLimit) {
                $category = $s->category?->is_active ? $s->category : null;

                return array_merge($s->toArray(), [
                    'image_url' => resolveImageUrl($s->image_url),
                    'description_excerpt' => Str::limit(richTextToPlainText($s->description), $excerptLimit, preserveWords: true),
                    'category' => $category ? ['name' => $category->name, 'slug' => $category->slug] : null,
                ]);
            });

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

        $activeCategory = $request->query('kategori');
        $activeCategory = $usedCategorySlugs->contains($activeCategory) ? $activeCategory : null;

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
    }

    public function show(string $slug): Response
    {
        $service = Service::active()
            ->with('category:id,name,slug,is_active')
            ->where('slug', $slug)
            ->firstOrFail();

        $service->image_url = resolveImageUrl($service->image_url);

        $category = $service->category?->is_active ? $service->category : null;

        $description = Str::limit(richTextToPlainText($service->description), 155, preserveWords: true);

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
    }
}
