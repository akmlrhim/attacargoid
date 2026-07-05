<?php

namespace Database\Seeders;

use App\Models\CompanySetting;
use Illuminate\Database\Seeder;

class CompanySettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CompanySetting::query()->firstOrCreate([], [
            'phone' => '0811 510 808',
            'whatsapp_number' => '62811510808',
            'email' => 'cargo.atta@gmail.com',
            'social_links' => [],
        ]);
    }
}
