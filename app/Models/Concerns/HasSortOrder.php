<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Model;

/**
 * Auto-assigns `sort_order` on creation so new records land at the end of the
 * list without the admin having to type a number. Existing order is preserved,
 * and drag-and-drop reordering in Filament tables still works as before.
 */
trait HasSortOrder
{
    protected static function bootHasSortOrder(): void
    {
        static::creating(function (Model $model): void {
            if ($model->sort_order === null) {
                $model->sort_order = ((int) static::query()->max('sort_order')) + 1;
            }
        });
    }
}
