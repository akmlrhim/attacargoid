<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * In-app browsers (Instagram, Facebook, TikTok) send User-Agent strings well
     * over the 255 character limit of the original column, which made MySQL in
     * strict mode reject the insert and turn every such visit into a 500.
     */
    public function up(): void
    {
        Schema::table('page_visits', function (Blueprint $table): void {
            $table->text('user_agent')->nullable()->change();
            $table->text('referer')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('page_visits', function (Blueprint $table): void {
            $table->string('user_agent')->nullable()->change();
            $table->string('referer')->nullable()->change();
        });
    }
};
