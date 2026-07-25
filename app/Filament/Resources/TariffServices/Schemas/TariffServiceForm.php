<?php

namespace App\Filament\Resources\TariffServices\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class TariffServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Informasi Layanan')
                ->description('Nama dan keterangan jenis layanan yang ditampilkan di fitur Cek Ongkir.')
                ->schema([
                    TextInput::make('label')
                        ->label('Nama Layanan')
                        ->required()
                        ->maxLength(100)
                        ->placeholder('Contoh: Reguler')
                        ->helperText('Nama singkat yang muncul sebagai pilihan layanan.')
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                    TextInput::make('note')
                        ->label('Keterangan')
                        ->required()
                        ->maxLength(255)
                        ->placeholder('Contoh: Estimasi 3–6 hari')
                        ->helperText('Teks pendek di bawah nama layanan, misalnya estimasi waktu.'),

                    TextInput::make('slug')
                        ->hidden()
                        ->dehydrated(),
                ])->columns(2),

            Section::make('Pengali Tarif & Pengaturan')
                ->description('Pengali dikalikan terhadap tarif zona untuk menghitung estimasi akhir.')
                ->schema([
                    TextInput::make('multiplier')
                        ->label('Pengali Tarif')
                        ->required()
                        ->numeric()
                        ->minValue(0.01)
                        ->step(0.01)
                        ->placeholder('Contoh: 1.6')
                        ->helperText('Contoh: 1.0 = harga normal, 1.6 = 160% dari tarif zona, 0.85 = diskon 15%.'),

                    Toggle::make('is_active')
                        ->label('Aktif')
                        ->helperText('Nonaktifkan untuk menyembunyikan layanan dari fitur Cek Ongkir.')
                        ->default(true)
                        ->inline(false),
                ])->columns(2),
        ]);
    }
}
