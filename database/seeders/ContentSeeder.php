<?php

namespace Database\Seeders;

use App\Models\Advantage;
use App\Models\ProcessStep;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        Service::truncate();
        Advantage::truncate();
        ProcessStep::truncate();

        $services = [
            [
                'title' => 'Mitra Penerusan Barang',
                'short_title' => 'Penerusan',
                'description' => 'Partner distribusi area Kalimantan untuk ekspedisi nasional dan regional. Kami menjadi jembatan antara ekspedisi besar dengan tujuan pengiriman di pelosok Kalimantan.',
                'details' => [['item' => 'Kerjasama dengan ekspedisi nasional'], ['item' => 'Distribusi ke seluruh Kalsel & Kalteng'], ['item' => 'Sistem tracking terintegrasi'], ['item' => 'Penanganan dokumen pengiriman']],
                'image_url' => 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80',
                'image_alt' => 'Truk pengiriman di jalan tol',
                'sort_order' => 1,
            ],
            [
                'title' => 'Distribusi Retail & Modern Trade',
                'short_title' => 'Retail & MT',
                'description' => 'Pengiriman ke Distribution Center (DC) Indomarco, Alfamart, Indogrosir, dan jaringan retail modern lainnya di Kalimantan.',
                'details' => [['item' => 'DC Indomarco & Alfamart'], ['item' => 'Indogrosir & retail modern'], ['item' => 'Standar packing retail'], ['item' => 'Jadwal pengiriman rutin']],
                'image_url' => 'https://images.unsplash.com/photo-1578575436955-ef29da568c6d?auto=format&fit=crop&w=900&q=80',
                'image_alt' => 'Distribusi retail dan modern trade',
                'sort_order' => 2,
            ],
            [
                'title' => 'Pengiriman B2B',
                'short_title' => 'B2B',
                'description' => 'Distribusi antar pelaku bisnis — dari supplier, distributor, pabrik, hingga toko besar dengan volume muatan besar dan konsisten.',
                'details' => [['item' => 'Supplier ke distributor'], ['item' => 'Pabrik ke toko besar'], ['item' => 'Volume muatan fleksibel'], ['item' => 'Kontrak pengiriman berkala']],
                'image_url' => 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
                'image_alt' => 'Pengiriman B2B antar bisnis',
                'sort_order' => 3,
            ],
            [
                'title' => 'Pengiriman Proyek & Industri',
                'short_title' => 'Proyek',
                'description' => 'Layanan khusus untuk material konstruksi, sparepart mesin, dan kebutuhan industri dengan penanganan ekstra hati-hati.',
                'details' => [['item' => 'Material konstruksi'], ['item' => 'Sparepart & mesin industri'], ['item' => 'Handling barang berat/besar'], ['item' => 'Koordinasi tim lapangan']],
                'image_url' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
                'image_alt' => 'Material proyek dan industri',
                'sort_order' => 4,
            ],
            [
                'title' => 'Pengiriman Khusus',
                'short_title' => 'Custom',
                'description' => 'Solusi custom sesuai kebutuhan operasional pelanggan — kami siap merancang skema distribusi yang paling efisien untuk bisnis Anda.',
                'details' => [['item' => 'Konsultasi kebutuhan khusus'], ['item' => 'Skema distribusi custom'], ['item' => 'SLA pengiriman fleksibel'], ['item' => 'Dukungan tim dedicated']],
                'image_url' => 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80',
                'image_alt' => 'Armada pengiriman khusus',
                'sort_order' => 5,
            ],
        ];

        foreach ($services as $service) {
            Service::create(array_merge($service, ['is_active' => true]));
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

        $processSteps = [
            [
                'step_number' => '01',
                'title' => 'Penerimaan & Koordinasi',
                'description' => 'Barang diterima melalui pelabuhan, gudang transit, atau titik distribusi sesuai instruksi pelanggan. Tim kami melakukan pengecekan dokumen, detail pengiriman, dan penyesuaian kebutuhan operasional.',
                'sort_order' => 1,
            ],
            [
                'step_number' => '02',
                'title' => 'Sortir & Preparasi',
                'description' => 'Barang diproses untuk penyesuaian rute distribusi, grouping area, pengecekan kondisi fisik, dan persiapan loading.',
                'sort_order' => 2,
            ],
            [
                'step_number' => '03',
                'title' => 'Distribusi & Pengiriman',
                'description' => 'Barang dikirim menggunakan armada yang sesuai dengan kebutuhan jenis muatan, volume, dan area tujuan.',
                'sort_order' => 3,
            ],
            [
                'step_number' => '04',
                'title' => 'Monitoring & Update',
                'description' => 'Tim operasional memberikan update status pengiriman secara aktif hingga barang diterima.',
                'sort_order' => 4,
            ],
        ];

        foreach ($processSteps as $step) {
            ProcessStep::create(array_merge($step, ['is_active' => true]));
        }
    }
}
