<?php

namespace App\Filament\Resources\TariffServices\Pages;

use App\Filament\Resources\TariffServices\TariffServiceResource;
use Filament\Resources\Pages\EditRecord;

class EditTariffService extends EditRecord
{
    protected static string $resource = TariffServiceResource::class;

    /**
     * Mirrors the form's own submit button into the page header so a long form
     * can be saved without scrolling to the bottom first.
     */
    protected function getHeaderActions(): array
    {
        return [
            $this->getSaveFormAction()->formId('form'),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
