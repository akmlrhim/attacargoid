<?php

namespace App\Filament\Resources\CoverageAreas;

use App\Filament\Resources\CoverageAreas\Pages\CreateCoverageArea;
use App\Filament\Resources\CoverageAreas\Pages\EditCoverageArea;
use App\Filament\Resources\CoverageAreas\Pages\ListCoverageAreas;
use App\Filament\Resources\CoverageAreas\Schemas\CoverageAreaForm;
use App\Filament\Resources\CoverageAreas\Tables\CoverageAreasTable;
use App\Models\CoverageArea;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CoverageAreaResource extends Resource
{
    protected static ?string $model = CoverageArea::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedMapPin;

    protected static ?string $navigationLabel = 'Area Jangkauan';

    protected static ?string $modelLabel = 'Area Jangkauan';

    protected static ?string $pluralModelLabel = 'Area Jangkauan';

    protected static ?int $navigationSort = 4;

    public static function form(Schema $schema): Schema
    {
        return CoverageAreaForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CoverageAreasTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCoverageAreas::route('/'),
            'create' => CreateCoverageArea::route('/create'),
            'edit' => EditCoverageArea::route('/{record}/edit'),
        ];
    }
}
