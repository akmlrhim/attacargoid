<?php

namespace App\Filament\Resources\CoverageAreas\Pages;

use App\Filament\Resources\CoverageAreas\CoverageAreaResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCoverageArea extends CreateRecord
{
    protected static string $resource = CoverageAreaResource::class;

    protected static bool $canCreateAnother = false;

    /**
     * Mirrors the form's own submit button into the page header so a long form
     * can be saved without scrolling to the bottom first.
     */
    protected function getHeaderActions(): array
    {
        return [
            $this->getCreateFormAction()->formId('form'),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
