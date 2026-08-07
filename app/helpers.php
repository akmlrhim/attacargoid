<?php

use App\Models\CompanySetting;
use App\Services\SocialImage;
use Illuminate\Support\Facades\Storage;

if (! function_exists('resolveImageUrl')) {
    function resolveImageUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}

if (! function_exists('richTextToPlainText')) {
    /**
     * Flatten RichEditor HTML into a single line of readable text.
     *
     * `strip_tags` drops the tags but leaves entities untouched, so an
     * ampersand stored as `&amp;` would literally read "&amp;" once rendered
     * as plain text - hence the decode. `\x{00A0}` is spelled out because a
     * decoded `&nbsp;` is not matched by `\s`, and the editor emits those
     * freely.
     */
    function richTextToPlainText(?string $html): string
    {
        return trim(preg_replace(
            '/[\s\x{00A0}]+/u',
            ' ',
            html_entity_decode(strip_tags((string) $html), ENT_QUOTES | ENT_HTML5, 'UTF-8'),
        ));
    }
}

if (! function_exists('pageSeo')) {
    /**
     * Build the per-page SEO payload consumed by the root Blade template.
     *
     * `image` is always a 1200x630 JPEG derivative rather than the site's own
     * WebP asset: WhatsApp and Instagram unfurl WebP unreliably, so sharing a
     * link would otherwise show no thumbnail at all. See App\Services\SocialImage.
     *
     * @return array{title: string, description: string, canonical: string, og_type: string, image: string, image_alt: string, image_width: int, image_height: int, image_type: string}
     */
    function pageSeo(string $title, string $description, string $path, ?string $image = null, ?string $imageAlt = null): array
    {
        return [
            'title' => $title,
            'description' => $description,
            'canonical' => url($path),
            'og_type' => 'website',
            'image' => SocialImage::url($image ?? '/images/hero/hero-1200.webp'),
            'image_alt' => $imageAlt ?? $title,
            'image_width' => SocialImage::WIDTH,
            'image_height' => SocialImage::HEIGHT,
            'image_type' => 'image/jpeg',
        ];
    }
}

if (! function_exists('faqSchemaJsonLd')) {
    /**
     * Build FAQPage JSON-LD for the home page FAQ section.
     *
     * Mirrors the questions/answers in resources/js/constants/faq.js -
     * keep both in sync manually if the FAQ content changes.
     *
     * @return array<string, mixed>
     */
    function faqSchemaJsonLd(CompanySetting $company): array
    {
        $items = [
            ['q' => 'Apa itu ATTA Cargo dan layanan apa saja yang ditawarkan?', 'a' => 'ATTA Cargo (PT. Tumbuh Kuat Sejahtera) adalah mitra penerusan barang & last mile distribution dengan hub utama di Banjarmasin. Kami melayani distribusi general cargo, FMCG, dan pengiriman antar kota untuk kebutuhan bisnis maupun perorangan ke seluruh Kalimantan Selatan & Tengah.'],
            ['q' => 'Wilayah mana saja yang dijangkau ATTA Cargo?', 'a' => 'Jaringan distribusi kami mencakup puluhan kota di Kalimantan Selatan (Banjarmasin sebagai hub, Banjarbaru, Martapura, Kotabaru, dan lainnya) serta Kalimantan Tengah (Palangka Raya, Sampit, Pangkalan Bun, dan lainnya).'],
            ['q' => 'Bagaimana cara menghitung estimasi biaya pengiriman?', 'a' => 'Gunakan fitur Cek Ongkir di website: pilih zona tujuan dan jenis layanan, lalu masukkan berat barang. Estimasi dihitung dari tarif per kilogram zona dikalikan pengali layanan, dengan berat minimum tertentu.'],
            ['q' => 'Berapa lama estimasi waktu pengiriman?', 'a' => 'Waktu pengiriman bergantung pada zona tujuan dan jenis layanan yang dipilih (contoh: layanan Reguler estimasi 3–6 hari). Estimasi waktu setiap layanan tampil di fitur Cek Ongkir.'],
            ['q' => 'Apakah saya bisa memantau status pengiriman?', 'a' => 'Bisa. Tim operasional memberikan update status secara aktif, mulai dari barang tiba di hub, dimuat ke armada, hingga diterima dengan konfirmasi penerima.'],
            ['q' => 'Jenis barang apa saja yang bisa dikirim?', 'a' => 'Kami menangani general cargo, FMCG, dan berbagai jenis muatan dengan armada yang disesuaikan volume serta area tujuan.'],
            ['q' => 'Apakah ATTA Cargo melayani pengiriman rutin untuk bisnis?', 'a' => 'Tentu. Kami terbiasa menangani distribusi general cargo dan FMCG untuk kebutuhan bisnis, termasuk pengiriman rutin dengan volume tertentu.'],
            ['q' => 'Bagaimana cara memulai pengiriman atau berkonsultasi?', 'a' => "Silakan hubungi tim kami melalui layanan WhatsApp atau telepon di {$company->phone}, via email ke {$company->email}, atau dengan mengisi formulir pesan di halaman Kontak."],
        ];

        return [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => array_map(fn (array $item) => [
                '@type' => 'Question',
                'name' => $item['q'],
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text' => $item['a'],
                ],
            ], $items),
        ];
    }
}
