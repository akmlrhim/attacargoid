<?php

namespace App\Filament\Resources\TariffServices;

use App\Filament\Resources\TariffServices\Pages\CreateTariffService;
use App\Filament\Resources\TariffServices\Pages\EditTariffService;
use App\Filament\Resources\TariffServices\Pages\ListTariffServices;
use App\Filament\Resources\TariffServices\Schemas\TariffServiceForm;
use App\Filament\Resources\TariffServices\Tables\TariffServicesTable;
use App\Models\TariffService;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TariffServiceResource extends Resource
{
    protected static ?string $model = TariffService::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRocketLaunch;

    protected static ?string $navigationLabel = 'Jenis Layanan';

    protected static ?string $modelLabel = 'Jenis Layanan';

    protected static ?string $pluralModelLabel = 'Jenis Layanan';

    protected static \UnitEnum|string|null $navigationGroup = 'Cek Ongkir';

    protected static ?int $navigationSort = 4;

    public static function form(Schema $schema): Schema
    {
        return TariffServiceForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TariffServicesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTariffServices::route('/'),
            'create' => CreateTariffService::route('/create'),
            'edit' => EditTariffService::route('/{record}/edit'),
        ];
    }
}
