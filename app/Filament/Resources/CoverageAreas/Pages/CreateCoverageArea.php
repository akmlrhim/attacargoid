<?php

namespace App\Filament\Resources\CoverageAreas\Pages;

use App\Filament\Resources\CoverageAreas\CoverageAreaResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCoverageArea extends CreateRecord
{
    protected static string $resource = CoverageAreaResource::class;

    protected static bool $canCreateAnother = false;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
