<?php

namespace App\Filament\Resources\TariffZones\Pages;

use App\Filament\Resources\TariffZones\TariffZoneResource;
use Filament\Resources\Pages\CreateRecord;

class CreateTariffZone extends CreateRecord
{
    protected static string $resource = TariffZoneResource::class;

    protected static bool $canCreateAnother = false;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
