<?php

namespace App\Filament\Forms\Components;

use App\Services\ImageConverter;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Radio;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Component;
use Filament\Schemas\Components\Utilities\Get;
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
        return static::configureUpload(FileUpload::make($name), $directory, $label, $maxWidth);
    }

    /**
     * Same as make(), but lets the admin pick between uploading a file or
     * pasting an external image URL. Both write to the same `$name` column -
     * pair this with HasFlexibleImage in the resource's Create/Edit pages to
     * translate between the two on fill/save.
     *
     * @return array<int, Component>
     */
    public static function flexible(string $name, string $directory, string $label = 'Gambar', ?int $maxWidth = null): array
    {
        return [
            Radio::make("{$name}_source")
                ->label('Sumber Gambar')
                ->options([
                    'upload' => 'Unggah File',
                    'link' => 'Link URL',
                ])
                ->inline()
                ->live()
                ->default('upload')
                ->columnSpanFull(),

            static::configureUpload(FileUpload::make("{$name}_file"), $directory, $label, $maxWidth)
                ->visible(fn (Get $get) => $get("{$name}_source") !== 'link')
                ->dehydrated(fn (Get $get) => $get("{$name}_source") !== 'link'),

            TextInput::make("{$name}_link")
                ->label('Link URL Gambar')
                ->url()
                ->maxLength(2048)
                ->placeholder('https://contoh.com/gambar.jpg')
                ->helperText('Gunakan gambar dari sumber eksternal tanpa upload.')
                ->visible(fn (Get $get) => $get("{$name}_source") === 'link')
                ->dehydrated(fn (Get $get) => $get("{$name}_source") === 'link')
                ->columnSpanFull(),
        ];
    }

    protected static function configureUpload(FileUpload $field, string $directory, string $label, ?int $maxWidth): FileUpload
    {
        return $field
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
