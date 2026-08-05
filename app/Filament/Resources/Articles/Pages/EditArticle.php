<?php

namespace App\Filament\Resources\Articles\Pages;

use App\Filament\Concerns\HasFlexibleImage;
use App\Filament\Resources\Articles\ArticleResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditArticle extends EditRecord
{
    use HasFlexibleImage;

    protected static string $resource = ArticleResource::class;

    /**
     * Save is mirrored from the form into the header so a long article can be
     * saved without scrolling to the bottom first.
     */
    protected function getHeaderActions(): array
    {
        return [
            $this->getSaveFormAction()->formId('form'),
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        return $this->fillFlexibleImage($data, 'image_url');
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        return $this->consolidateFlexibleImage($data, 'image_url');
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
