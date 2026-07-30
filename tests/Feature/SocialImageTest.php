<?php

use App\Services\SocialImage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
});

/**
 * Write a real WebP file into public/ and return its web path plus a cleanup
 * closure. The site stores every upload as WebP, which is exactly the format
 * WhatsApp fails to unfurl, so the local-source path has to be covered.
 *
 * @return array{0: string, 1: Closure}
 */
function fakePublicWebp(string $name, int $width = 900, int $height = 900): array
{
    $image = imagecreatetruecolor($width, $height);
    imagefill($image, 0, 0, imagecolorallocate($image, 10, 31, 77));

    ob_start();
    imagewebp($image);
    $contents = ob_get_clean();
    imagedestroy($image);

    $absolute = public_path($name);
    file_put_contents($absolute, $contents);

    return ["/{$name}", fn () => @unlink($absolute)];
}

function generatedPath(string $url): string
{
    return 'social/'.basename((string) parse_url($url, PHP_URL_PATH));
}

it('converts a local webp source into a 1200x630 jpeg', function () {
    [$source, $cleanup] = fakePublicWebp('social-test-source.webp');

    $url = SocialImage::url($source);

    expect($url)->toContain('/social/')->toEndWith('.jpg');

    Storage::disk('public')->assertExists(generatedPath($url));

    $info = getimagesizefromstring(Storage::disk('public')->get(generatedPath($url)));

    expect($info['mime'])->toBe('image/jpeg')
        ->and($info[0])->toBe(SocialImage::WIDTH)
        ->and($info[1])->toBe(SocialImage::HEIGHT);

    $cleanup();
});

it('upscales a source smaller than the share dimensions rather than shipping an undersized card', function () {
    [$source, $cleanup] = fakePublicWebp('social-test-small.webp', 320, 200);

    $info = getimagesizefromstring(
        Storage::disk('public')->get(generatedPath(SocialImage::url($source)))
    );

    expect($info[0])->toBe(SocialImage::WIDTH)
        ->and($info[1])->toBe(SocialImage::HEIGHT);

    $cleanup();
});

it('reuses the cached derivative instead of regenerating it', function () {
    [$source, $cleanup] = fakePublicWebp('social-test-cache.webp');

    $first = SocialImage::url($source);
    $second = SocialImage::url($source);

    expect($second)->toBe($first)
        ->and(Storage::disk('public')->files('social'))->toHaveCount(1);

    $cleanup();
});

it('downloads a remote source and converts it', function () {
    $image = imagecreatetruecolor(1600, 900);
    ob_start();
    imagejpeg($image);
    $jpeg = ob_get_clean();
    imagedestroy($image);

    Http::fake(['images.example.com/*' => Http::response($jpeg, 200)]);

    $info = getimagesizefromstring(
        Storage::disk('public')->get(generatedPath(SocialImage::url('https://images.example.com/photo.jpg')))
    );

    expect($info['mime'])->toBe('image/jpeg')
        ->and($info[0])->toBe(SocialImage::WIDTH)
        ->and($info[1])->toBe(SocialImage::HEIGHT);
});

it('falls back to the original url when the source cannot be fetched', function () {
    Http::fake(['images.example.com/*' => Http::response('', 404)]);

    expect(SocialImage::url('https://images.example.com/missing.jpg'))
        ->toBe('https://images.example.com/missing.jpg')
        ->and(Storage::disk('public')->files('social'))->toBeEmpty();
});

it('returns null when there is no source at all', function () {
    expect(SocialImage::url(null))->toBeNull()
        ->and(SocialImage::url(''))->toBeNull();
});

it('exposes share-ready jpeg metadata through pageSeo', function () {
    [$source, $cleanup] = fakePublicWebp('social-test-seo.webp');

    $seo = pageSeo('Judul Halaman', 'Deskripsi halaman.', '/contoh', $source, 'Alt gambar');

    expect($seo['image'])->toEndWith('.jpg')
        ->and($seo['image_type'])->toBe('image/jpeg')
        ->and($seo['image_width'])->toBe(SocialImage::WIDTH)
        ->and($seo['image_height'])->toBe(SocialImage::HEIGHT)
        ->and($seo['image_alt'])->toBe('Alt gambar');

    $cleanup();
});
