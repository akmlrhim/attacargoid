<?php

namespace App\Filament\Resources\Articles\Pages;

use App\Filament\Concerns\HasFlexibleImage;
use App\Filament\Resources\Articles\ArticleResource;
use Filament\Resources\Pages\CreateRecord;

class CreateArticle extends CreateRecord
{
    use HasFlexibleImage;

    protected static string $resource = ArticleResource::class;

    protected static bool $canCreateAnother = false;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        return $this->consolidateFlexibleImage($data, 'image_url');
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
