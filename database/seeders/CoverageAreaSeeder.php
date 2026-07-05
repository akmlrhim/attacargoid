<?php

namespace Database\Seeders;

use App\Models\CoverageArea;
use Illuminate\Database\Seeder;

class CoverageAreaSeeder extends Seeder
{
    public function run(): void
    {
        $areas = [
            // Kalimantan Selatan
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Banjarmasin', 'latitude' => -3.3194, 'longitude' => 114.5906, 'is_hub' => true],
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Banjarbaru', 'latitude' => -3.4572, 'longitude' => 114.8410],
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Martapura', 'latitude' => -3.4109, 'longitude' => 114.8592],
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Pelaihari', 'latitude' => -3.7969, 'longitude' => 114.7739],
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Batulicin', 'latitude' => -3.4400, 'longitude' => 115.9750],
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Kotabaru', 'latitude' => -3.2445, 'longitude' => 116.1631],
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Kandangan', 'latitude' => -2.7889, 'longitude' => 115.2631],
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Barabai', 'latitude' => -2.5896, 'longitude' => 115.3831],
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Amuntai', 'latitude' => -2.4183, 'longitude' => 115.2494],
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Tanjung', 'latitude' => -2.1861, 'longitude' => 115.3831],
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Paringin', 'latitude' => -2.2497, 'longitude' => 115.1839],
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Rantau', 'latitude' => -2.9247, 'longitude' => 115.1508],
            ['province' => 'Kalimantan Selatan', 'province_short' => 'Kalsel', 'city' => 'Marabahan', 'latitude' => -3.0025, 'longitude' => 114.7592],

            // Kalimantan Tengah
            ['province' => 'Kalimantan Tengah', 'province_short' => 'Kalteng', 'city' => 'Palangka Raya', 'latitude' => -2.2088, 'longitude' => 113.9213],
            ['province' => 'Kalimantan Tengah', 'province_short' => 'Kalteng', 'city' => 'Sampit', 'latitude' => -2.5375, 'longitude' => 112.9508],
            ['province' => 'Kalimantan Tengah', 'province_short' => 'Kalteng', 'city' => 'Pangkalan Bun', 'latitude' => -2.6833, 'longitude' => 111.6167],
            ['province' => 'Kalimantan Tengah', 'province_short' => 'Kalteng', 'city' => 'Kuala Kapuas', 'latitude' => -3.0089, 'longitude' => 114.3878],
            ['province' => 'Kalimantan Tengah', 'province_short' => 'Kalteng', 'city' => 'Pulang Pisau', 'latitude' => -2.7442, 'longitude' => 114.2769],
            ['province' => 'Kalimantan Tengah', 'province_short' => 'Kalteng', 'city' => 'Kasongan', 'latitude' => -1.9917, 'longitude' => 113.3906],
            ['province' => 'Kalimantan Tengah', 'province_short' => 'Kalteng', 'city' => 'Muara Teweh', 'latitude' => -0.9539, 'longitude' => 114.8925],
            ['province' => 'Kalimantan Tengah', 'province_short' => 'Kalteng', 'city' => 'Buntok', 'latitude' => -1.7208, 'longitude' => 114.8397],
            ['province' => 'Kalimantan Tengah', 'province_short' => 'Kalteng', 'city' => 'Puruk Cahu', 'latitude' => -0.5850, 'longitude' => 114.5850],
        ];

        foreach ($areas as $index => $area) {
            CoverageArea::updateOrCreate(
                ['province' => $area['province'], 'city' => $area['city']],
                array_merge($area, [
                    'is_hub' => $area['is_hub'] ?? false,
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]),
            );
        }
    }
}
