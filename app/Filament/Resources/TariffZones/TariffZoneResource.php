<?php

namespace App\Filament\Resources\TariffZones;

use App\Filament\Resources\TariffZones\Pages\CreateTariffZone;
use App\Filament\Resources\TariffZones\Pages\EditTariffZone;
use App\Filament\Resources\TariffZones\Pages\ListTariffZones;
use App\Filament\Resources\TariffZones\Schemas\TariffZoneForm;
use App\Filament\Resources\TariffZones\Tables\TariffZonesTable;
use App\Models\TariffZone;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TariffZoneResource extends Resource
{
    protected static ?string $model = TariffZone::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedMapPin;

    protected static ?string $navigationLabel = 'Zona Tarif';

    protected static ?string $modelLabel = 'Zona Tarif';

    protected static ?string $pluralModelLabel = 'Zona Tarif';

    protected static \UnitEnum|string|null $navigationGroup = 'Cek Ongkir';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return TariffZoneForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TariffZonesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTariffZones::route('/'),
            'create' => CreateTariffZone::route('/create'),
            'edit' => EditTariffZone::route('/{record}/edit'),
        ];
    }
}
