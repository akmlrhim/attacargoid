<?php

use App\Models\CompanySetting;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('company_settings', function (Blueprint $table) {
            $table->json('social_links')->nullable()->after('whatsapp_number');
        });

        CompanySetting::query()->get()->each(function (CompanySetting $setting) {
            $links = [];

            if ($setting->instagram_url) {
                $links[] = ['platform' => 'instagram', 'label' => null, 'url' => $setting->instagram_url];
            }

            if ($setting->facebook_url) {
                $links[] = ['platform' => 'facebook', 'label' => null, 'url' => $setting->facebook_url];
            }

            $setting->update(['social_links' => $links]);
        });

        Schema::table('company_settings', function (Blueprint $table) {
            $table->dropColumn(['instagram_url', 'facebook_url']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company_settings', function (Blueprint $table) {
            $table->string('instagram_url')->nullable();
            $table->string('facebook_url')->nullable();
        });

        CompanySetting::query()->get()->each(function (CompanySetting $setting) {
            $links = collect($setting->social_links ?? []);

            $setting->update([
                'instagram_url' => $links->firstWhere('platform', 'instagram')['url'] ?? null,
                'facebook_url' => $links->firstWhere('platform', 'facebook')['url'] ?? null,
            ]);
        });

        Schema::table('company_settings', function (Blueprint $table) {
            $table->dropColumn('social_links');
        });
    }
};
