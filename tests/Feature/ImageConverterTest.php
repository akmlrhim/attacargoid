<?php

use App\Services\ImageConverter;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
});

it('converts an uploaded image to a compressed webp file', function () {
    $file = UploadedFile::fake()->image('photo.jpg', 800, 600);

    $path = ImageConverter::toWebp($file, 'services');

    expect($path)->toEndWith('.webp')
        ->and($path)->toStartWith('services/');

    Storage::disk('public')->assertExists($path);

    $contents = Storage::disk('public')->get($path);
    $info = getimagesizefromstring($contents);

    expect($info['mime'])->toBe('image/webp')
        ->and($info[0])->toBe(800)
        ->and($info[1])->toBe(600);
});

it('scales down images wider than the max width', function () {
    $file = UploadedFile::fake()->image('wide.jpg', 3200, 1600);

    $path = ImageConverter::toWebp($file, 'advantages');

    $contents = Storage::disk('public')->get($path);
    $info = getimagesizefromstring($contents);

    expect($info[0])->toBe(1600)
        ->and($info[1])->toBe(800);
});

it('falls back to storing the original file when it cannot be decoded as an image', function () {
    $file = UploadedFile::fake()->create('not-an-image.jpg', 10);

    $path = ImageConverter::toWebp($file, 'services');

    expect($path)->not->toEndWith('.webp');

    Storage::disk('public')->assertExists($path);
});
