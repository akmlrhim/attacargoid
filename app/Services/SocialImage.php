<?php

namespace App\Services;

use GdImage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Throwable;

/**
 * Builds the 1200x630 JPEG derivative used for `og:image`.
 *
 * The site stores every image as WebP, but the WhatsApp link-preview generator
 * renders WebP unreliably (previews arrive blank) and Instagram's story/DM
 * unfurler behaves the same way. Meta's crawlers also expect a 1.91:1 aspect
 * ratio; anything else gets centre-cropped by the client, so cropping
 * deliberately here is the only way to control what people actually see.
 *
 * Derivatives are written once to the public disk under `social/` and reused on
 * later requests. Any failure falls back to the original image URL, so a
 * missing GD feature or an unreachable remote source can never break a page.
 */
class SocialImage
{
    /**
     * Open Graph recommended share image dimensions (1.91:1).
     */
    public const WIDTH = 1200;

    public const HEIGHT = 630;

    /**
     * JPEG quality. 82 keeps a 1200x630 photo comfortably under the ~300KB
     * that WhatsApp will fetch when building a preview.
     */
    private const QUALITY = 82;

    private const DIRECTORY = 'social';

    /**
     * Resolve a share-ready absolute JPEG URL for the given image source.
     *
     * Accepts a `/images/...` path inside `public/`, a public-disk URL, or an
     * absolute remote URL. Returns an absolute URL either way.
     */
    public static function url(?string $source): ?string
    {
        if (! $source) {
            return null;
        }

        try {
            $path = self::generate($source);
        } catch (Throwable) {
            $path = null;
        }

        if ($path === null) {
            return str_starts_with($source, 'http') ? $source : url($source);
        }

        return url(Storage::disk('public')->url($path));
    }

    /**
     * Generate (or reuse) the cached derivative and return its public-disk path.
     */
    private static function generate(string $source): ?string
    {
        $localPath = self::resolveLocalPath($source);
        $fingerprint = $localPath !== null
            ? sha1($localPath.'|'.(@filemtime($localPath) ?: 0))
            : sha1($source);

        $path = self::DIRECTORY.'/'.$fingerprint.'.jpg';
        $disk = Storage::disk('public');

        if ($disk->exists($path)) {
            return $path;
        }

        $contents = $localPath !== null
            ? @file_get_contents($localPath)
            : self::fetchRemote($source);

        if ($contents === false || $contents === null || $contents === '') {
            return null;
        }

        $image = @imagecreatefromstring($contents);

        if (! $image instanceof GdImage) {
            return null;
        }

        $canvas = self::coverCrop($image);

        ob_start();
        imagejpeg($canvas, null, self::QUALITY);
        $jpeg = ob_get_clean();
        imagedestroy($canvas);

        if ($jpeg === false || $jpeg === '') {
            return null;
        }

        $disk->put($path, $jpeg);

        return $path;
    }

    /**
     * Map a source string to a readable file on this machine, or null when it
     * points at another host and has to be downloaded.
     */
    private static function resolveLocalPath(string $source): ?string
    {
        if (str_starts_with($source, 'http://') || str_starts_with($source, 'https://')) {
            $appHost = parse_url((string) config('app.url'), PHP_URL_HOST);
            $sourceHost = parse_url($source, PHP_URL_HOST);

            if ($sourceHost === null || $sourceHost !== $appHost) {
                return null;
            }

            $source = parse_url($source, PHP_URL_PATH) ?: '';
        }

        $candidate = public_path(ltrim($source, '/'));

        return is_file($candidate) ? $candidate : null;
    }

    private static function fetchRemote(string $url): ?string
    {
        $response = Http::timeout(8)->get($url);

        return $response->successful() ? $response->body() : null;
    }

    /**
     * Scale to cover 1200x630 and centre-crop the overflow, flattening any
     * transparency onto white (JPEG has no alpha channel).
     */
    private static function coverCrop(GdImage $image): GdImage
    {
        $sourceWidth = imagesx($image);
        $sourceHeight = imagesy($image);

        $canvas = imagecreatetruecolor(self::WIDTH, self::HEIGHT);
        imagefill($canvas, 0, 0, imagecolorallocate($canvas, 255, 255, 255));

        $scale = max(self::WIDTH / $sourceWidth, self::HEIGHT / $sourceHeight);
        $scaledWidth = (int) round($sourceWidth * $scale);
        $scaledHeight = (int) round($sourceHeight * $scale);

        imagecopyresampled(
            $canvas,
            $image,
            (int) round((self::WIDTH - $scaledWidth) / 2),
            (int) round((self::HEIGHT - $scaledHeight) / 2),
            0,
            0,
            $scaledWidth,
            $scaledHeight,
            $sourceWidth,
            $sourceHeight,
        );

        imagedestroy($image);

        return $canvas;
    }
}
