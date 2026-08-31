<?php

namespace App\Http\Controllers;

use App\Models\Advantage;
use App\Models\Article;
use App\Models\CompanySetting;
use App\Models\CoverageArea;
use App\Models\Service;
use App\Services\GooglePlacesService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
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
    }
}
