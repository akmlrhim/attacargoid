<?php

namespace App\Filament\Widgets;

use App\Models\PageVisit;
use Carbon\Carbon;
use Filament\Widgets\Concerns\InteractsWithPageFilters;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class TrafficOverview extends StatsOverviewWidget
{
	use InteractsWithPageFilters;

	protected function getStats(): array
	{
		[$start, $end] = $this->getDateRange();

		$visitsInRange = PageVisit::query()
			->whereBetween('created_at', [$start, $end]);

		$uniqueVisitorsInRange = (clone $visitsInRange)->distinct('ip_address')->count('ip_address');

		return [
			Stat::make('Kunjungan hari ini', PageVisit::whereDate('created_at', today())->count()),
			Stat::make('Kunjungan pada rentang', $visitsInRange->count()),
			Stat::make('Pengunjung unik pada rentang', $uniqueVisitorsInRange),
		];
	}

	/**
	 * @return array{0: Carbon, 1: Carbon}
	 */
	protected function getDateRange(): array
	{
		$start = Carbon::parse($this->pageFilters['startDate'] ?? today()->subDays(13))->startOfDay();
		$end = Carbon::parse($this->pageFilters['endDate'] ?? today())->endOfDay();

		if ($start->gt($end)) {
			[$start, $end] = [$end, $start];
		}

		return [$start, $end];
	}
}
