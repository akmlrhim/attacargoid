<?php

namespace App\Filament\Resources\AdvantageResource\Pages;

use App\Filament\Resources\AdvantageResource;
use Filament\Resources\Pages\CreateRecord;

class CreateAdvantage extends CreateRecord
{
    protected static string $resource = AdvantageResource::class;

    protected static bool $canCreateAnother = false;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
