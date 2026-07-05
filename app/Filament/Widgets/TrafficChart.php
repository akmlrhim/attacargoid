<?php

namespace App\Filament\Widgets;

use App\Models\PageVisit;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Illuminate\Support\Facades\DB;

class TrafficChart extends ChartWidget
{
	use InteractsWithPageFilters;

	protected ?string $heading = 'Traffic Web';

	protected int|string|array $columnSpan = 'full';

	protected ?string $maxHeight = '300px';

	protected function getData(): array
	{
		[$start, $end] = $this->getDateRange();

		$visits = PageVisit::query()
			->whereBetween('created_at', [$start->copy()->startOfDay(), $end->copy()->endOfDay()])
			->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as aggregate'))
			->groupBy('date')
			->pluck('aggregate', 'date');

		$labels = [];
		$data = [];

		for ($date = $start->copy(); $date->lte($end); $date->addDay()) {
			$key = $date->toDateString();
			$labels[] = $date->translatedFormat('d M');
			$data[] = (int) ($visits[$key] ?? 0);
		}

		return [
			'datasets' => [
				[
					'label' => 'Kunjungan',
					'data' => $data,
					'borderColor' => '#f59e0b',
					'backgroundColor' => 'rgba(245, 158, 11, 0.1)',
					'fill' => true,
				],
			],
			'labels' => $labels,
		];
	}

	protected function getType(): string
	{
		return 'line';
	}

	/**
	 * @return array{0: Carbon, 1: Carbon}
	 */
	protected function getDateRange(): array
	{
		$start = Carbon::parse($this->pageFilters['startDate'] ?? today()->subDays(13));
		$end = Carbon::parse($this->pageFilters['endDate'] ?? today());

		if ($start->gt($end)) {
			[$start, $end] = [$end, $start];
		}

		return [$start, $end];
	}
}
