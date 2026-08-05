<?php

namespace App\Filament\Resources\CoverageAreas\Pages;

use App\Filament\Resources\CoverageAreas\CoverageAreaResource;
use Filament\Resources\Pages\EditRecord;

class EditCoverageArea extends EditRecord
{
    protected static string $resource = CoverageAreaResource::class;

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
