<?php

namespace App\Filament\Resources\ProcessStepResource\Pages;

use App\Filament\Resources\ProcessStepResource;
use Filament\Resources\Pages\CreateRecord;

class CreateProcessStep extends CreateRecord
{
    protected static string $resource = ProcessStepResource::class;

    protected static bool $canCreateAnother = false;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
