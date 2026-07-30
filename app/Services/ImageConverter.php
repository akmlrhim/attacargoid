<?php

namespace App\Services;

use GdImage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageConverter
{
    /**
     * Default maximum width (in pixels) for stored images. Larger images are scaled down.
     */
    private const MAX_WIDTH = 1600;

    /**
     * WebP compression quality (0-100).
     */
    private const QUALITY = 80;

    /**
     * Convert an uploaded image to a compressed WebP file on the public disk.
     *
     * Returns the stored relative path (e.g. "services/abc.webp"). If the file
     * cannot be decoded as an image, it is stored as-is as a safe fallback.
     *
     * $maxWidth should match roughly 2x the widest the image is ever rendered at
     * (retina headroom) - not the source photo's native resolution, otherwise
     * the browser downloads far more bytes than the layout can ever show.
     */
    public static function toWebp(UploadedFile $file, string $directory, ?int $maxWidth = null): string
    {
        $directory = trim($directory, '/');

        $image = self::createImageFromFile($file);

        if (! $image instanceof GdImage) {
            return $file->store($directory, 'public');
        }

        $image = self::scaleDown($image, $maxWidth ?? self::MAX_WIDTH);

        ob_start();
        imagewebp($image, null, self::QUALITY);
        $contents = ob_get_clean();
        imagedestroy($image);

        $path = $directory.'/'.Str::uuid()->toString().'.webp';
        Storage::disk('public')->put($path, $contents);

        return $path;
    }

    private static function createImageFromFile(UploadedFile $file): ?GdImage
    {
        $path = $file->getRealPath();

        if ($path === false) {
            return null;
        }

        $info = @getimagesize($path);

        if ($info === false) {
            return null;
        }

        $image = match ($info[2]) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($path),
            IMAGETYPE_PNG => @imagecreatefrompng($path),
            IMAGETYPE_GIF => @imagecreatefromgif($path),
            IMAGETYPE_WEBP => @imagecreatefromwebp($path),
            default => null,
        };

        return $image instanceof GdImage ? $image : null;
    }

    private static function scaleDown(GdImage $image, int $maxWidth): GdImage
    {
        $width = imagesx($image);
        $height = imagesy($image);

        if ($width <= $maxWidth) {
            return $image;
        }

        $newWidth = $maxWidth;
        $newHeight = (int) round($height * ($newWidth / $width));

        $resized = imagecreatetruecolor($newWidth, $newHeight);
        imagealphablending($resized, false);
        imagesavealpha($resized, true);
        imagecopyresampled($resized, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        imagedestroy($image);

        return $resized;
    }
}
