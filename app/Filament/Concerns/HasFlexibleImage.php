<?php

namespace App\Filament\Concerns;

/**
 * Pairs with WebpImageUpload::flexible() on the resource form. That factory
 * splits one image column into three transient fields ({name}_source,
 * {name}_file, {name}_link) so the admin can toggle between uploading a file
 * and pasting an external URL; this trait translates between that transient
 * shape and the single `{name}` column the model actually persists.
 */
trait HasFlexibleImage
{
    protected function fillFlexibleImage(array $data, string $name): array
    {
        $value = $data[$name] ?? null;
        $isLink = (bool) $value && preg_match('#^https?://#', $value);

        $data["{$name}_source"] = $isLink ? 'link' : 'upload';
        $data["{$name}_link"] = $isLink ? $value : null;
        $data["{$name}_file"] = $isLink ? null : $value;

        return $data;
    }

    protected function consolidateFlexibleImage(array $data, string $name): array
    {
        $data[$name] = ($data["{$name}_source"] ?? 'upload') === 'link'
            ? ($data["{$name}_link"] ?? null)
            : ($data["{$name}_file"] ?? null);

        unset($data["{$name}_source"], $data["{$name}_link"], $data["{$name}_file"]);

        return $data;
    }
}
