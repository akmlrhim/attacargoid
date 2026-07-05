<?php

namespace Database\Seeders;

use App\Models\TariffZone;
use Illuminate\Database\Seeder;

class TariffZoneSeeder extends Seeder
{
    public function run(): void
    {
        $zones = [
            ['slug' => 'bjm', 'label' => 'Banjarmasin & Sekitarnya', 'rate_per_kg' => 3000, 'min_kg' => 5, 'sort_order' => 1],
            ['slug' => 'kalsel', 'label' => 'Kalimantan Selatan (Luar Kota)', 'rate_per_kg' => 5000, 'min_kg' => 10, 'sort_order' => 2],
            ['slug' => 'kalteng', 'label' => 'Kalimantan Tengah', 'rate_per_kg' => 7000, 'min_kg' => 10, 'sort_order' => 3],
            ['slug' => 'kaltim', 'label' => 'Kalimantan Timur', 'rate_per_kg' => 9000, 'min_kg' => 10, 'sort_order' => 4],
            ['slug' => 'kalbar', 'label' => 'Kalimantan Barat', 'rate_per_kg' => 11000, 'min_kg' => 10, 'sort_order' => 5],
            ['slug' => 'kalut', 'label' => 'Kalimantan Utara', 'rate_per_kg' => 12000, 'min_kg' => 10, 'sort_order' => 6],
        ];

        foreach ($zones as $zone) {
            TariffZone::updateOrCreate(['slug' => $zone['slug']], array_merge($zone, ['is_active' => true]));
        }
    }
}
