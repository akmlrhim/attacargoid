<?php

namespace App\Filament\Resources\TariffZones\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class TariffZoneForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Informasi Zona')
                ->description('Nama zona tujuan pengiriman yang akan ditampilkan di fitur Cek Ongkir.')
                ->schema([
                    TextInput::make('label')
                        ->label('Nama Zona')
                        ->required()
                        ->maxLength(255)
                        ->placeholder('Contoh: Banjarmasin & Sekitarnya')
                        ->helperText('Nama ini yang akan muncul di dropdown Cek Ongkir.')
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state)))
                        ->columnSpanFull(),

                    TextInput::make('slug')
                        ->hidden()
                        ->dehydrated(),
                ]),

            Section::make('Tarif & Pengaturan')
                ->description('Atur harga per kilogram dan bobot minimum untuk zona ini.')
                ->schema([
                    TextInput::make('rate_per_kg')
                        ->label('Tarif per Kg (Rp)')
                        ->required()
                        ->numeric()
                        ->minValue(0)
                        ->placeholder('Contoh: 3000')
                        ->helperText('Harga dasar per kilogram dalam Rupiah.')
                        ->prefix('Rp'),

                    TextInput::make('min_kg')
                        ->label('Minimum Berat (kg)')
                        ->required()
                        ->numeric()
                        ->minValue(1)
                        ->default(5)
                        ->placeholder('Contoh: 5')
                        ->helperText('Berat minimum yang dikenakan tarif, meski berat aktual lebih kecil.')
                        ->suffix('kg'),

                    Toggle::make('is_active')
                        ->label('Aktif')
                        ->helperText('Nonaktifkan untuk menyembunyikan zona dari fitur Cek Ongkir.')
                        ->default(true)
                        ->inline(false),
                ])->columns(2),
        ]);
    }
}
