<?php

namespace App\Filament\Resources\CoverageAreas\Tables;

use App\Models\CoverageArea;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class CoverageAreasTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sort_order')
                    ->label('#')
                    ->sortable()
                    ->width(50),

                TextColumn::make('city')
                    ->label('Kota')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('province_short')
                    ->label('Provinsi')
                    ->badge()
                    ->sortable(),

                TextColumn::make('latitude')
                    ->label('Latitude')
                    ->toggleable(),

                TextColumn::make('longitude')
                    ->label('Longitude')
                    ->toggleable(),

                IconColumn::make('is_hub')
                    ->label('Hub')
                    ->boolean(),

                IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),

                TextColumn::make('updated_at')
                    ->label('Diperbarui')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('sort_order')
            ->filters([
                SelectFilter::make('province')
                    ->label('Provinsi')
                    ->options(fn () => CoverageArea::query()
                        ->distinct()
                        ->orderBy('province')
                        ->pluck('province', 'province')
                        ->all()),
                TernaryFilter::make('is_hub')->label('Hub Utama'),
                TernaryFilter::make('is_active')->label('Status Aktif'),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->reorderable('sort_order');
    }
}
