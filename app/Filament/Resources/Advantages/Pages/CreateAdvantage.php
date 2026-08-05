<?php

namespace App\Filament\Resources\Advantages\Pages;

use App\Filament\Concerns\HasFlexibleImage;
use App\Filament\Resources\Advantages\AdvantageResource;
use Filament\Resources\Pages\CreateRecord;

class CreateAdvantage extends CreateRecord
{
    use HasFlexibleImage;

    protected static string $resource = AdvantageResource::class;

    protected static bool $canCreateAnother = false;

    /**
     * Mirrors the form's own submit button into the page header so a long form
     * can be saved without scrolling to the bottom first.
     */
    protected function getHeaderActions(): array
    {
        return [
            $this->getCreateFormAction()->formId('form'),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        return $this->consolidateFlexibleImage($data, 'image_url');
    }
}
