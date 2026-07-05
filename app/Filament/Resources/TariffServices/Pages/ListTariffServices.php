<?php

namespace App\Filament\Resources\TariffServices\Pages;

use App\Filament\Resources\TariffServices\TariffServiceResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTariffServices extends ListRecords
{
    protected static string $resource = TariffServiceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
