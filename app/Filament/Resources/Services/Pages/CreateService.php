<?php

namespace App\Filament\Resources\Services\Pages;

use App\Filament\Concerns\HasFlexibleImage;
use App\Filament\Resources\Services\ServiceResource;
use Filament\Resources\Pages\CreateRecord;

class CreateService extends CreateRecord
{
    use HasFlexibleImage;

    protected static string $resource = ServiceResource::class;

    protected static bool $canCreateAnother = false;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        return $this->consolidateFlexibleImage($data, 'image_url');
    }
}
