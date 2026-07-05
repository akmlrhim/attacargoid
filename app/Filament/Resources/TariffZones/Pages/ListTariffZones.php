<?php

namespace App\Filament\Resources\TariffZones\Pages;

use App\Filament\Resources\TariffZones\TariffZoneResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTariffZones extends ListRecords
{
    protected static string $resource = TariffZoneResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
