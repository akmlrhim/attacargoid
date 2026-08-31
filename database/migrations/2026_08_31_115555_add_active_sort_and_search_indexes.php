<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
		Schema::table('services', function (Blueprint $table) {
			$table->index(['is_active', 'sort_order']);
		});

		Schema::table('service_categories', function (Blueprint $table) {
			$table->index(['is_active', 'sort_order']);
		});

		Schema::table('advantages', function (Blueprint $table) {
			$table->index(['is_active', 'sort_order']);
		});

		Schema::table('coverage_areas', function (Blueprint $table) {
			$table->index(['is_active', 'sort_order']);
		});

		Schema::table('tariff_services', function (Blueprint $table) {
			$table->index(['is_active', 'sort_order']);
		});

		Schema::table('tariff_zones', function (Blueprint $table) {
			$table->index(['is_active', 'sort_order']);
		});

		Schema::table('articles', function (Blueprint $table) {
			$table->index(['is_active', 'published_at']);
		});

		/**
		 * SQLite (used in tests) has no fulltext grammar, so this only runs on
		 * MySQL; ArticleController falls back to a LIKE search on other drivers.
		 */
		if (Schema::getConnection()->getDriverName() === 'mysql') {
			Schema::table('articles', function (Blueprint $table) {
				$table->fullText(['title', 'excerpt']);
			});
		}
	}

	public function down(): void
	{
		Schema::table('services', function (Blueprint $table) {
			$table->dropIndex(['is_active', 'sort_order']);
		});

		Schema::table('service_categories', function (Blueprint $table) {
			$table->dropIndex(['is_active', 'sort_order']);
		});

		Schema::table('advantages', function (Blueprint $table) {
			$table->dropIndex(['is_active', 'sort_order']);
		});

		Schema::table('coverage_areas', function (Blueprint $table) {
			$table->dropIndex(['is_active', 'sort_order']);
		});

		Schema::table('tariff_services', function (Blueprint $table) {
			$table->dropIndex(['is_active', 'sort_order']);
		});

		Schema::table('tariff_zones', function (Blueprint $table) {
			$table->dropIndex(['is_active', 'sort_order']);
		});

		if (Schema::getConnection()->getDriverName() === 'mysql') {
			Schema::table('articles', function (Blueprint $table) {
				$table->dropFullText(['title', 'excerpt']);
			});
		}

		Schema::table('articles', function (Blueprint $table) {
			$table->dropIndex(['is_active', 'published_at']);
		});
	}
};
