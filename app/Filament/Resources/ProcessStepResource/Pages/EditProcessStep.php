<?php

namespace App\Filament\Resources\ProcessStepResource\Pages;

use App\Filament\Resources\ProcessStepResource;
use Filament\Resources\Pages\EditRecord;

class EditProcessStep extends EditRecord
{
    protected static string $resource = ProcessStepResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
