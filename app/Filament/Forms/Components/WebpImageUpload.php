<?php

namespace App\Filament\Forms\Components;

use App\Services\ImageConverter;
use Filament\Forms\Components\FileUpload;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class WebpImageUpload
{
    /**
     * A pre-configured image upload field that compresses every uploaded image
     * and converts it to WebP before storing it on the public disk.
     *
     * $maxWidth caps the stored image at ~2x the widest it's ever displayed
     * (retina headroom); pass it when the field's display context is much
     * narrower than the service-wide default (see ImageConverter::toWebp()).
     */
    public static function make(string $name, string $directory, string $label = 'Gambar', ?int $maxWidth = null): FileUpload
    {
        return FileUpload::make($name)
            ->label($label)
            ->image()
            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
            ->maxSize(8192)
            ->disk('public')
            ->directory($directory)
            ->imageEditor()
            ->imagePreviewHeight('150')
            ->helperText('Unggah gambar (JPG, PNG, WebP). Akan otomatis dikompres & diubah ke format WebP.')
            ->saveUploadedFileUsing(
                fn (TemporaryUploadedFile $file): string => ImageConverter::toWebp($file, $directory, $maxWidth)
            );
    }
}
