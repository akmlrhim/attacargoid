<?php

namespace App\Filament\Resources\Advantages\Pages;

use App\Filament\Resources\Advantages\AdvantageResource;
use Filament\Resources\Pages\EditRecord;

class EditAdvantage extends EditRecord
{
    protected static string $resource = AdvantageResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
