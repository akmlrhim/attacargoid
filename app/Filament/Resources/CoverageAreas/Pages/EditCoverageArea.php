<?php

namespace App\Filament\Resources\CoverageAreas\Pages;

use App\Filament\Resources\CoverageAreas\CoverageAreaResource;
use Filament\Resources\Pages\EditRecord;

class EditCoverageArea extends EditRecord
{
    protected static string $resource = CoverageAreaResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
