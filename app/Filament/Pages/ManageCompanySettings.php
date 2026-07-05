<?php

namespace App\Filament\Pages;

use App\Models\CompanySetting;
use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Actions;
use Filament\Schemas\Components\Form;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

/**
 * @property-read Schema $form
 */
class ManageCompanySettings extends Page
{
	protected string $view = 'filament.pages.manage-company-settings';

	protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-building-office-2';

	protected static ?string $navigationLabel = 'Kontak & Sosial Media';

	protected static ?string $title = 'Kontak & Sosial Media';

	protected static ?int $navigationSort = 20;

	/**
	 * Known platforms get a matching icon on the frontend; anything else
	 * falls back to a generic link icon using the custom label below.
	 *
	 * @var array<string, string>
	 */
	public const PLATFORMS = [
		'instagram' => 'Instagram',
		'facebook' => 'Facebook',
		'tiktok' => 'TikTok',
		'youtube' => 'YouTube',
		'twitter' => 'Twitter / X',
		'linkedin' => 'LinkedIn',
		'other' => 'Lainnya',
	];

	/**
	 * @var array<string, mixed>|null
	 */
	public ?array $data = [];

	public function mount(): void
	{
		$this->form->fill($this->getRecord()->attributesToArray());
	}

	public function form(Schema $schema): Schema
	{
		return $schema
			->components([
				Form::make([
					Section::make('Kontak')
						->schema([
							TextInput::make('phone')
								->label('Nomor Telepon (tampilan)')
								->required()
								->maxLength(50)
								->placeholder('Contoh: 0811 510 808'),

							TextInput::make('whatsapp_number')
								->label('Nomor WhatsApp')
								->required()
								->maxLength(20)
								->placeholder('Contoh: 62811510808')
								->helperText('Format internasional tanpa "+" atau "0" di depan, dipakai untuk semua tombol WhatsApp.'),

							TextInput::make('email')
								->label('Email')
								->email()
								->required()
								->maxLength(255),
						])->columns(2),

					Section::make('Sosial Media')
						->description('Tambahkan sebanyak yang dibutuhkan : Instagram, Facebook, TikTok, dan lainnya.')
						->schema([
							Repeater::make('social_links')
								->label('')
								->schema([
									Select::make('platform')
										->label('Platform')
										->options(self::PLATFORMS)
										->required()
										->live()
										->columnSpan(1),

									TextInput::make('label')
										->label('Nama Tampilan')
										->placeholder('Contoh: Threads')
										->visible(fn(callable $get) => $get('platform') === 'other')
										->required(fn(callable $get) => $get('platform') === 'other')
										->columnSpan(1),

									TextInput::make('url')
										->label('Link')
										->url()
										->required()
										->placeholder('https://...')
										->columnSpan(fn(callable $get) => $get('platform') === 'other' ? 1 : 2),
								])
								->columns(3)
								->reorderable()
								->addActionLabel('Tambah Sosial Media')
								->defaultItems(0)
								->itemLabel(fn(array $state) => self::PLATFORMS[$state['platform'] ?? null] ?? 'Sosial Media'),
						]),
				])
					->livewireSubmitHandler('save')
					->footer([
						Actions::make([
							Action::make('save')
								->submit('save')
								->keyBindings(['mod+s']),
						]),
					]),
			])
			->record($this->getRecord())
			->statePath('data');
	}

	public function save(): void
	{
		$data = $this->form->getState();

		$this->getRecord()->fill($data)->save();

		Notification::make()
			->success()
			->title('Pengaturan disimpan')
			->send();
	}

	public function getRecord(): CompanySetting
	{
		return CompanySetting::query()->firstOrNew();
	}
}
