<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProcessStepResource\Pages;
use App\Models\ProcessStep;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProcessStepResource extends Resource
{
	protected static ?string $model = ProcessStep::class;

	protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-list-bullet';

	protected static ?string $navigationLabel = 'Tahap Proses';

	protected static ?string $modelLabel = 'Tahap Proses';

	protected static ?string $pluralModelLabel = 'Tahap Proses';

	protected static ?int $navigationSort = 3;

	public static function form(Schema $schema): Schema
	{
		return $schema->schema([
			Section::make('Informasi Tahap')
				->schema([
					TextInput::make('step_number')
						->label('Nomor Langkah')
						->required()
						->maxLength(10)
						->placeholder('Contoh: 01'),

					TextInput::make('title')
						->label('Judul Tahap')
						->required()
						->maxLength(255)
						->placeholder('Contoh: Konsultasi Kebutuhan')
						->live(onBlur: true)
						->afterStateUpdated(fn($state, callable $set) => $set('slug', Str::slug($state))),

					TextInput::make('slug')
						->hidden()
						->dehydrated(),

					RichEditor::make('description')
						->label('Deskripsi')
						->required()
						->toolbarButtons(['bold', 'italic', 'bulletList', 'orderedList'])
						->extraInputAttributes(['style' => 'min-height: 14rem'])
						->columnSpanFull(),

					TextInput::make('sort_order')
						->label('Urutan Tampil')
						->numeric()
						->default(0)
						->placeholder('0'),

					Toggle::make('is_active')
						->label('Aktif')
						->default(true)
						->inline(false),
				])->columnSpanFull(),
		]);
	}

	public static function table(Table $table): Table
	{
		return $table
			->columns([
				TextColumn::make('step_number')
					->label('No.')
					->sortable()
					->width(60),

				TextColumn::make('title')
					->label('Judul Tahap')
					->searchable()
					->sortable(),

				TextColumn::make('description')
					->label('Deskripsi')
					->limit(60)
					->formatStateUsing(fn($state) => strip_tags($state)),

				IconColumn::make('is_active')
					->label('Aktif')
					->boolean(),
			])
			->defaultSort('sort_order')
			->filters([
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

	public static function getPages(): array
	{
		return [
			'index' => Pages\ListProcessSteps::route('/'),
			'create' => Pages\CreateProcessStep::route('/create'),
			'edit' => Pages\EditProcessStep::route('/{record}/edit'),
		];
	}
}
