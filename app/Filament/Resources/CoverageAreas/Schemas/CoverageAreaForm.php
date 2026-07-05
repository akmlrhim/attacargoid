<?php

namespace App\Filament\Resources\CoverageAreas\Schemas;

use App\Models\CoverageArea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class CoverageAreaForm
{
    /**
     * Short-name suggestions per province so the code auto-fills when a
     * province is typed, while staying editable for anything new.
     *
     * @var array<string, string>
     */
    private const PROVINCE_SHORT = [
        'Kalimantan Selatan' => 'Kalsel',
        'Kalimantan Tengah' => 'Kalteng',
        'Kalimantan Timur' => 'Kaltim',
        'Kalimantan Barat' => 'Kalbar',
        'Kalimantan Utara' => 'Kalut',
    ];

    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Wilayah')
                ->description('Provinsi tempat kota ini dikelompokkan pada peta jangkauan.')
                ->schema([
                    TextInput::make('province')
                        ->label('Provinsi')
                        ->required()
                        ->maxLength(255)
                        ->placeholder('Contoh: Kalimantan Selatan')
                        ->datalist(array_keys(self::PROVINCE_SHORT))
                        ->helperText('Kota dengan provinsi sama akan dikelompokkan dalam satu tab.')
                        ->live(onBlur: true)
                        ->afterStateUpdated(function ($state, Set $set) {
                            if (isset(self::PROVINCE_SHORT[$state])) {
                                $set('province_short', self::PROVINCE_SHORT[$state]);
                            }
                        }),

                    TextInput::make('province_short')
                        ->label('Singkatan Provinsi')
                        ->required()
                        ->maxLength(20)
                        ->placeholder('Contoh: Kalsel')
                        ->helperText('Label pendek yang tampil pada tombol tab peta.'),
                ])->columns(2),

            Section::make('Lokasi Kota')
                ->description('Masukkan URL Google Maps untuk mengisi koordinat secara otomatis.')
                ->schema([
                    TextInput::make('city')
                        ->label('Nama Kota')
                        ->required()
                        ->maxLength(255)
                        ->placeholder('Contoh: Banjarmasin')
                        ->columnSpanFull(),

                    TextInput::make('google_maps_url')
                        ->label('URL Google Maps')
                        ->url()
                        ->dehydrated(false)
                        ->placeholder('Tempel link Google Maps, contoh: https://maps.google.com/...@-3.3194,114.5906')
                        ->helperText('Buka lokasi di Google Maps, salin URL-nya, lalu tempel di sini. Latitude & longitude akan terisi otomatis.')
                        ->live(onBlur: true)
                        ->afterStateUpdated(function ($state, Set $set) {
                            $coords = CoverageArea::parseGoogleMapsUrl($state);

                            if ($coords) {
                                $set('latitude', $coords['latitude']);
                                $set('longitude', $coords['longitude']);
                            }
                        })
                        ->columnSpanFull(),

                    TextInput::make('latitude')
                        ->label('Latitude')
                        ->required()
                        ->numeric()
                        ->minValue(-90)
                        ->maxValue(90)
                        ->step('any')
                        ->helperText('Otomatis dari URL, atau isi manual.'),

                    TextInput::make('longitude')
                        ->label('Longitude')
                        ->required()
                        ->numeric()
                        ->minValue(-180)
                        ->maxValue(180)
                        ->step('any')
                        ->helperText('Otomatis dari URL, atau isi manual.'),
                ])->columns(2),

            Section::make('Pengaturan')
                ->schema([
                    Toggle::make('is_hub')
                        ->label('Hub Utama')
                        ->helperText('Tandai jika kota ini adalah hub utama (ditandai khusus di peta).')
                        ->default(false)
                        ->inline(false),

                    Toggle::make('is_active')
                        ->label('Aktif')
                        ->helperText('Nonaktifkan untuk menyembunyikan kota dari peta.')
                        ->default(true)
                        ->inline(false),
                ])->columns(2),
        ]);
    }
}
