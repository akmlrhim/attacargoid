<?php

namespace App\Filament\Resources\ServiceCategories\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ServiceCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Informasi Kategori')
                ->description('Kategori dipakai sebagai filter di halaman Layanan.')
                ->schema([
                    TextInput::make('name')
                        ->label('Nama Kategori')
                        ->required()
                        ->maxLength(255)
                        ->placeholder('Contoh: Distribusi Retail')
                        ->helperText('Nama ini yang muncul sebagai tombol filter di halaman Layanan.')
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                    TextInput::make('slug')
                        ->hidden()
                        ->dehydrated(),

                    TextInput::make('description')
                        ->label('Deskripsi Singkat')
                        ->maxLength(255)
                        ->placeholder('Opsional, sebagai catatan internal.'),

                    Toggle::make('is_active')
                        ->label('Aktif')
                        ->helperText('Nonaktifkan untuk menyembunyikan kategori dari filter halaman Layanan.')
                        ->default(true)
                        ->inline(false),
                ])->columns(2),
        ]);
    }
}
