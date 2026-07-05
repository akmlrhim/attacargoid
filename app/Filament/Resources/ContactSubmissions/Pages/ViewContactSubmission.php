<?php

namespace App\Filament\Resources\ContactSubmissions\Pages;

use App\Filament\Resources\ContactSubmissions\ContactSubmissionResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewContactSubmission extends ViewRecord
{
    protected static string $resource = ContactSubmissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        if (! $data['is_read']) {
            $this->record->update(['is_read' => true]);
            $data['is_read'] = true;
        }

        return $data;
    }
}
