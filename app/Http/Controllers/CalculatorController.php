<?php

namespace App\Http\Controllers;

use App\Models\TariffService;
use App\Models\TariffZone;
use Inertia\Inertia;
use Inertia\Response;

class CalculatorController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Calculator', [
            'tariffZones' => TariffZone::active()->get(['id', 'slug', 'label', 'rate_per_kg', 'min_kg']),
            'tariffServices' => TariffService::active()->get(['id', 'slug', 'label', 'note', 'multiplier']),
        ])->withViewData(['seo' => array_merge(
            pageSeo(
                'Cek Ongkir & Ekspedisi Murah Banjarmasin',
                'Cek estimasi ongkir ekspedisi & cargo murah Banjarmasin ke Jakarta, Surabaya, dan kota lain secara instan berdasarkan zona, berat, dan jenis layanan.',
                '/cek-ongkir',
            ),
            ['breadcrumbs' => [
                ['name' => 'Beranda', 'url' => url('/')],
                ['name' => 'Cek Ongkir', 'url' => url('/cek-ongkir')],
            ]],
        )]);
    }
}
