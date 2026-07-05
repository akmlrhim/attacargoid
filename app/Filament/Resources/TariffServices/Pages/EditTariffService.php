<?php

namespace App\Filament\Resources\TariffServices\Pages;

use App\Filament\Resources\TariffServices\TariffServiceResource;
use Filament\Resources\Pages\EditRecord;

class EditTariffService extends EditRecord
{
    protected static string $resource = TariffServiceResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
