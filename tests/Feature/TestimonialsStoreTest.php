<?php

use App\Services\TestimonialsStore;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('local');
    $this->store = new TestimonialsStore;
});

it('returns an empty array when nothing has been stored yet', function () {
    expect($this->store->read())->toBe([]);
});

it('only persists reviews that are 5 stars with non-empty text', function () {
    $result = $this->store->sync([
        ['name' => 'Budi', 'avatar' => null, 'rating' => 5, 'text' => 'Mantap, cepat sampai!', 'date' => '1 minggu lalu'],
        ['name' => 'Siti', 'avatar' => null, 'rating' => 4, 'text' => 'Lumayan bagus', 'date' => '1 minggu lalu'],
        ['name' => 'Andi', 'avatar' => null, 'rating' => 5, 'text' => '', 'date' => '1 minggu lalu'],
    ]);

    expect($result)->toHaveCount(1)
        ->and($result[0]['name'])->toBe('Budi');

    expect($this->store->read())->toBe($result);
});

it('merges newly qualifying reviews into the existing store without dropping old ones', function () {
    $this->store->sync([
        ['name' => 'Budi', 'avatar' => null, 'rating' => 5, 'text' => 'Mantap, cepat sampai!', 'date' => '2 minggu lalu'],
    ]);

    $result = $this->store->sync([
        ['name' => 'Budi', 'avatar' => null, 'rating' => 5, 'text' => 'Mantap, cepat sampai!', 'date' => '2 minggu lalu'],
        ['name' => 'Wati', 'avatar' => null, 'rating' => 5, 'text' => 'Pelayanan ramah dan cepat', 'date' => '1 hari lalu'],
    ]);

    expect($result)->toHaveCount(2)
        ->and(collect($result)->pluck('name')->all())->toBe(['Wati', 'Budi']);
});

it('does not duplicate a review that is fetched again unchanged', function () {
    $review = ['name' => 'Budi', 'avatar' => null, 'rating' => 5, 'text' => 'Mantap, cepat sampai!', 'date' => '2 minggu lalu'];

    $this->store->sync([$review]);
    $result = $this->store->sync([$review]);

    expect($result)->toHaveCount(1);
});

it('keeps serving the last saved reviews when a later fetch returns nothing qualifying', function () {
    $this->store->sync([
        ['name' => 'Budi', 'avatar' => null, 'rating' => 5, 'text' => 'Mantap, cepat sampai!', 'date' => '2 minggu lalu'],
    ]);

    $result = $this->store->sync([]);

    expect($result)->toHaveCount(1)
        ->and($result[0]['name'])->toBe('Budi');
});
