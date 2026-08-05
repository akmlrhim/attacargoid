<?php

namespace Database\Seeders;

use App\Models\Advantage;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        Service::truncate();
        Advantage::truncate();

        /**
         * Deleted rather than truncated: `services.service_category_id` points
         * here, and MySQL refuses to truncate a table a foreign key references
         * even once the referencing rows are gone.
         */
        ServiceCategory::query()->delete();

        $categories = collect([
            ['name' => 'Distribusi & Penerusan', 'sort_order' => 1],
            ['name' => 'Bisnis & Korporat', 'sort_order' => 2],
            ['name' => 'Proyek & Industri', 'sort_order' => 3],
        ])->mapWithKeys(fn (array $category) => [
            $category['name'] => ServiceCategory::create(array_merge($category, ['is_active' => true])),
        ]);

        $services = [
            [
                'title' => 'Mitra Penerusan Barang',
                'category' => 'Distribusi & Penerusan',
                'short_title' => 'Penerusan',
                'description' => 'Partner distribusi area Kalimantan untuk ekspedisi nasional dan regional. Kami menjadi jembatan antara ekspedisi besar dengan tujuan pengiriman di pelosok Kalimantan.',
                'details' => [['item' => 'Kerjasama dengan ekspedisi nasional'], ['item' => 'Distribusi ke seluruh Kalsel & Kalteng'], ['item' => 'Respon cepat & komunikasi aktif'], ['item' => 'Penanganan dokumen pengiriman']],
                'image_url' => 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80',
                'image_alt' => 'Truk pengiriman di jalan tol',
                'sort_order' => 1,
            ],
            [
                'title' => 'Distribusi Retail & Modern Trade',
                'category' => 'Distribusi & Penerusan',
                'short_title' => 'Retail & MT',
                'description' => 'Pengiriman ke Distribution Center (DC) Indomarco, Alfamart, Indogrosir, dan jaringan retail modern lainnya di Kalimantan.',
                'details' => [['item' => 'DC Indomarco & Alfamart'], ['item' => 'Indogrosir & retail modern'], ['item' => 'Standar packing retail'], ['item' => 'Jadwal pengiriman rutin']],
                'image_url' => 'https://images.unsplash.com/photo-1578575436955-ef29da568c6d?auto=format&fit=crop&w=900&q=80',
                'image_alt' => 'Distribusi retail dan modern trade',
                'sort_order' => 2,
            ],
            [
                'title' => 'Pengiriman B2B',
                'category' => 'Bisnis & Korporat',
                'short_title' => 'B2B',
                'description' => 'Distribusi antar pelaku bisnis, dari supplier, distributor, pabrik, hingga toko besar dengan volume muatan besar dan konsisten.',
                'details' => [['item' => 'Supplier ke distributor'], ['item' => 'Pabrik ke toko besar'], ['item' => 'Volume muatan fleksibel'], ['item' => 'Kontrak pengiriman berkala']],
                'image_url' => 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
                'image_alt' => 'Pengiriman B2B antar bisnis',
                'sort_order' => 3,
            ],
            [
                'title' => 'Pengiriman Proyek & Industri',
                'category' => 'Proyek & Industri',
                'short_title' => 'Proyek',
                'description' => 'Layanan khusus untuk material konstruksi, sparepart mesin, dan kebutuhan industri dengan penanganan ekstra hati-hati.',
                'details' => [['item' => 'Material konstruksi'], ['item' => 'Sparepart & mesin industri'], ['item' => 'Handling barang berat/besar'], ['item' => 'Koordinasi tim lapangan']],
                'image_url' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
                'image_alt' => 'Material proyek dan industri',
                'sort_order' => 4,
            ],
            [
                'title' => 'Pengiriman Khusus',
                'category' => 'Proyek & Industri',
                'short_title' => 'Custom',
                'description' => 'Solusi custom sesuai kebutuhan operasional pelanggan. Kami siap merancang skema distribusi yang paling efisien untuk bisnis Anda.',
                'details' => [['item' => 'Konsultasi kebutuhan khusus'], ['item' => 'Skema distribusi custom'], ['item' => 'SLA pengiriman fleksibel'], ['item' => 'Dukungan tim dedicated']],
                'image_url' => 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80',
                'image_alt' => 'Armada pengiriman khusus',
                'sort_order' => 5,
            ],
        ];

        foreach ($services as $service) {
            $category = $categories[$service['category']];

            Service::create(array_merge(
                Arr::except($service, 'category'),
                ['service_category_id' => $category->id, 'is_active' => true],
            ));
        }

        $advantages = [
            ['title' => 'Lokasi Strategis', 'description' => 'Banjarmasin sebagai hub utama distribusi Kalimantan.', 'image_url' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80', 'sort_order' => 1],
            ['title' => 'Pengalaman Operasional', 'description' => 'Berpengalaman menangani distribusi retail, bisnis, dan proyek.', 'image_url' => 'https://images.unsplash.com/photo-1578575436955-ef29da568c6d?auto=format&fit=crop&w=900&q=80', 'sort_order' => 2],
            ['title' => 'Tim Profesional', 'description' => 'Dikelola oleh tim operasional yang memahami kebutuhan logistik.', 'image_url' => 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80', 'sort_order' => 3],
            ['title' => 'Respon Cepat', 'description' => 'Komunikasi aktif untuk update pengiriman.', 'image_url' => 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80', 'sort_order' => 4],
            ['title' => 'Fleksibel', 'description' => 'Solusi distribusi dapat disesuaikan dengan kebutuhan pelanggan.', 'image_url' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80', 'sort_order' => 5],
            ['title' => 'Mitra Terpercaya', 'description' => 'Menjadi partner forwarding bagi berbagai kebutuhan distribusi regional.', 'image_url' => 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80', 'sort_order' => 6],
        ];

        foreach ($advantages as $advantage) {
            Advantage::create(array_merge($advantage, ['is_active' => true]));
        }
    }
}
