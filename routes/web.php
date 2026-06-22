<?php

use App\Http\Controllers\ContactController;
use App\Models\Advantage;
use App\Models\ProcessStep;
use App\Models\Service;
use App\Services\GooglePlacesService;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

function resolveImageUrl(?string $path): ?string
{
    if (! $path) {
        return null;
    }
    if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
        return $path;
    }

    return Storage::disk('public')->url($path);
}

Route::get('/', function () {
    $services = Service::active()->get(['id', 'title', 'short_title', 'description', 'details', 'image_url', 'image_alt'])
        ->map(fn ($s) => array_merge($s->toArray(), ['image_url' => resolveImageUrl($s->image_url)]));

    $advantages = Advantage::active()->get(['id', 'title', 'description', 'image_url'])
        ->map(fn ($a) => array_merge($a->toArray(), ['image_url' => resolveImageUrl($a->image_url)]));

    $places = new GooglePlacesService(
        apiKey: config('services.google_places.key', ''),
        dataId: config('services.google_places.place_id', ''),
    );

    return Inertia::render('Home', [
        'services' => $services,
        'advantages' => $advantages,
        'processSteps' => ProcessStep::active()->get(['id', 'step_number', 'title', 'description']),
        'reviews' => $places->getReviews(),
        'googleRating' => $places->getRating(),
    ]);
});

Route::get('/tentang-kami', function () {
    return Inertia::render('About');
});

Route::get('/kalkulator', function () {
    return Inertia::render('Calculator');
});

Route::get('/kontak', function () {
    return Inertia::render('Contact');
});

Route::post('/kontak', ContactController::class);
