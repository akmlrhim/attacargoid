<?php

namespace App\Filament\Resources\TariffZones\Pages;

use App\Filament\Resources\TariffZones\TariffZoneResource;
use Filament\Resources\Pages\EditRecord;

class EditTariffZone extends EditRecord
{
    protected static string $resource = TariffZoneResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
