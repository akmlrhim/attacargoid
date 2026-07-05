<?php

namespace App\Filament\Resources\ContactSubmissions;

use App\Models\ContactSubmission;
use Carbon\Carbon;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ContactSubmissionResource extends Resource
{
    protected static ?string $model = ContactSubmission::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-envelope';

    protected static ?string $navigationLabel = 'Pesan Masuk';

    protected static ?string $modelLabel = 'Pesan';

    protected static ?string $pluralModelLabel = 'Pesan Masuk';

    protected static ?int $navigationSort = 10;

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Detail Pengirim')
                ->schema([
                    TextInput::make('name')
                        ->label('Nama')
                        ->disabled(),

                    TextInput::make('company')
                        ->label('Perusahaan')
                        ->disabled(),

                    TextInput::make('phone')
                        ->label('No. HP')
                        ->disabled(),

                    TextInput::make('destination_city')
                        ->label('Kota Tujuan')
                        ->disabled(),
                ])->columnSpanFull(),

            Section::make('Kebutuhan')
                ->schema([
                    Textarea::make('needs')
                        ->label('Kebutuhan')
                        ->disabled()
                        ->rows(4),
                ]),

            Section::make('Status')
                ->schema([
                    Toggle::make('is_read')
                        ->label('Sudah Dibaca'),

                    TextInput::make('created_at')
                        ->label('Diterima Pada')
                        ->disabled()
                        ->formatStateUsing(fn ($state) => $state ? Carbon::parse($state)->format('d M Y H:i') : '-'),
                ])->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                IconColumn::make('is_read')
                    ->label('Dibaca')
                    ->boolean()
                    ->width(70),

                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('company')
                    ->label('Perusahaan')
                    ->searchable()
                    ->placeholder('-'),

                TextColumn::make('phone')
                    ->label('No. HP'),

                TextColumn::make('destination_city')
                    ->label('Kota Tujuan')
                    ->placeholder('-'),

                TextColumn::make('needs')
                    ->label('Kebutuhan')
                    ->limit(50),

                TextColumn::make('created_at')
                    ->label('Diterima')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                TernaryFilter::make('is_read')->label('Status Baca'),
            ])
            ->recordActions([
                ViewAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactSubmissions::route('/'),
            'view' => Pages\ViewContactSubmission::route('/{record}'),
        ];
    }
}
