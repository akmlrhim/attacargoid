<?php

namespace App\Filament\Resources\Services\Pages;

use App\Filament\Concerns\HasFlexibleImage;
use App\Filament\Resources\Services\ServiceResource;
use Filament\Resources\Pages\EditRecord;

class EditService extends EditRecord
{
    use HasFlexibleImage;

    protected static string $resource = ServiceResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        return $this->fillFlexibleImage($data, 'image_url');
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        return $this->consolidateFlexibleImage($data, 'image_url');
    }
}
