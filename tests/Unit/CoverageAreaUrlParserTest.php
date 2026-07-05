<?php

use App\Models\CoverageArea;

it('extracts coordinates from the map center (@lat,lng) form', function () {
    expect(CoverageArea::parseGoogleMapsUrl('https://www.google.com/maps/@-3.3194,114.5906,15z'))
        ->toBe(['latitude' => -3.3194, 'longitude' => 114.5906]);
});

it('extracts coordinates from the place data payload (!3d!4d)', function () {
    $url = 'https://www.google.com/maps/place/Banjarmasin/@-3.3,114.5,12z/data=!3m1!4b1!3d-3.3194!4d114.5906';

    expect(CoverageArea::parseGoogleMapsUrl($url))
        ->toBe(['latitude' => -3.3194, 'longitude' => 114.5906]);
});

it('extracts coordinates from a query parameter', function () {
    expect(CoverageArea::parseGoogleMapsUrl('https://maps.google.com/?q=-3.3194,114.5906'))
        ->toBe(['latitude' => -3.3194, 'longitude' => 114.5906]);
});

it('extracts coordinates from a bare lat,lng string', function () {
    expect(CoverageArea::parseGoogleMapsUrl('-3.3194, 114.5906'))
        ->toBe(['latitude' => -3.3194, 'longitude' => 114.5906]);
});

it('returns null for a URL without coordinates', function () {
    expect(CoverageArea::parseGoogleMapsUrl('https://www.google.com/maps/place/Banjarmasin'))
        ->toBeNull();
});

it('returns null for empty input', function () {
    expect(CoverageArea::parseGoogleMapsUrl(null))->toBeNull()
        ->and(CoverageArea::parseGoogleMapsUrl(''))->toBeNull();
});
