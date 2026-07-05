<?php

namespace Database\Seeders;

use App\Models\TariffService;
use Illuminate\Database\Seeder;

class TariffServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['slug' => 'reguler', 'label' => 'Reguler', 'note' => 'Estimasi 3–6 hari', 'multiplier' => 1.00, 'sort_order' => 1],
            ['slug' => 'ekspres', 'label' => 'Ekspres', 'note' => 'Estimasi 1–3 hari', 'multiplier' => 1.60, 'sort_order' => 2],
            ['slug' => 'kargo', 'label' => 'Kargo / Proyek', 'note' => 'Volume besar / khusus', 'multiplier' => 0.85, 'sort_order' => 3],
        ];

        foreach ($services as $service) {
            TariffService::updateOrCreate(['slug' => $service['slug']], array_merge($service, ['is_active' => true]));
        }
    }
}
