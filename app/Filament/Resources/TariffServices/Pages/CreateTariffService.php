<?php

namespace App\Filament\Resources\TariffServices\Pages;

use App\Filament\Resources\TariffServices\TariffServiceResource;
use Filament\Resources\Pages\CreateRecord;

class CreateTariffService extends CreateRecord
{
    protected static string $resource = TariffServiceResource::class;

    protected static bool $canCreateAnother = false;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
