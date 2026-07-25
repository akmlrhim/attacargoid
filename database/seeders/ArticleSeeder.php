<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        Article::truncate();

        $articles = [
            [
                'title' => 'Tips Mengemas Barang Agar Aman Selama Pengiriman Cargo',
                'excerpt' => 'Pengemasan yang tepat adalah kunci utama agar barang sampai ke tujuan dengan aman. Berikut panduan praktis dari tim ATTA Cargo.',
                'content' => '<p>Pengemasan yang tepat adalah kunci utama agar barang sampai ke tujuan dengan aman, terutama untuk pengiriman jarak jauh ke seluruh wilayah Kalimantan. Berikut beberapa tips praktis dari tim operasional ATTA Cargo.</p>'
                    .'<h2>1. Gunakan Kemasan Sesuai Jenis Barang</h2>'
                    .'<p>Barang pecah belah membutuhkan lapisan pelindung tambahan seperti bubble wrap, sementara barang berat sebaiknya menggunakan kotak kayu atau palet untuk menjaga kestabilan selama proses bongkar muat.</p>'
                    .'<h2>2. Perhatikan Label & Dokumen</h2>'
                    .'<ul><li>Tuliskan alamat tujuan secara lengkap dan jelas</li><li>Sertakan nomor kontak penerima yang aktif</li><li>Tempelkan label "Fragile" pada barang mudah pecah</li></ul>'
                    .'<h2>3. Hindari Ruang Kosong dalam Kemasan</h2>'
                    .'<p>Ruang kosong di dalam kardus dapat menyebabkan barang bergeser dan berbenturan selama perjalanan. Gunakan kertas koran, foam, atau bubble wrap untuk mengisi celah yang ada.</p>'
                    .'<blockquote>Pengemasan yang baik bukan hanya melindungi barang, tapi juga mempercepat proses sortir dan bongkar muat di setiap titik distribusi.</blockquote>'
                    .'<p>Dengan mengikuti tips di atas, risiko kerusakan barang selama pengiriman dapat diminimalkan secara signifikan.</p>',
                'image_url' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
                'image_alt' => 'Proses pengemasan kotak kargo',
                'published_at' => Carbon::now()->subDays(2),
            ],
            [
                'title' => 'Memahami Alur Distribusi Barang dari Hub Banjarmasin ke Seluruh Kalimantan',
                'excerpt' => 'Banjarmasin menjadi hub utama distribusi ATTA Cargo. Simak bagaimana barang diproses hingga sampai ke berbagai kota di Kalimantan Selatan & Tengah.',
                'content' => '<p>Sebagai hub utama, Banjarmasin memegang peran penting dalam kelancaran distribusi barang ke seluruh Kalimantan Selatan dan Tengah. Berikut gambaran alur distribusi yang diterapkan ATTA Cargo.</p>'
                    .'<h2>Penerimaan di Hub</h2>'
                    .'<p>Setiap barang yang masuk akan melalui proses pengecekan dokumen dan kondisi fisik sebelum disortir berdasarkan zona tujuan.</p>'
                    .'<h2>Sortir Berdasarkan Zona</h2>'
                    .'<p>Barang dikelompokkan sesuai wilayah tujuan, mulai dari Banjarbaru, Martapura, Kotabaru, hingga Palangka Raya dan Sampit, agar proses pengiriman lebih efisien.</p>'
                    .'<h2>Pengiriman ke Titik Tujuan</h2>'
                    .'<p>Armada yang disesuaikan dengan volume dan jenis muatan akan mengantarkan barang langsung ke titik tujuan, dengan update status yang dipantau tim operasional.</p>',
                'image_url' => 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
                'image_alt' => 'Truk distribusi di jalan raya Kalimantan',
                'published_at' => Carbon::now()->subDays(7),
            ],
            [
                'title' => 'Perbedaan Layanan Reguler dan Ekspres pada Pengiriman Cargo',
                'excerpt' => 'Bingung memilih layanan reguler atau ekspres? Kenali perbedaan keduanya agar pengiriman barang Anda lebih tepat sasaran.',
                'content' => '<p>Memilih jenis layanan pengiriman yang tepat dapat membantu efisiensi biaya dan waktu. Berikut perbandingan layanan reguler dan ekspres.</p>'
                    .'<h2>Layanan Reguler</h2>'
                    .'<p>Cocok untuk pengiriman dengan tenggat waktu fleksibel, dengan estimasi waktu tempuh 3–6 hari tergantung zona tujuan. Layanan ini umumnya lebih hemat biaya.</p>'
                    .'<h2>Layanan Ekspres</h2>'
                    .'<p>Diperuntukkan bagi pengiriman yang membutuhkan kecepatan lebih tinggi, dengan prioritas penanganan di setiap titik distribusi.</p>'
                    .'<h2>Cara Memilih Layanan yang Tepat</h2>'
                    .'<ul><li>Pertimbangkan urgensi barang yang dikirim</li><li>Sesuaikan dengan anggaran pengiriman</li><li>Gunakan fitur Cek Ongkir untuk membandingkan estimasi biaya</li></ul>',
                'image_url' => 'https://images.unsplash.com/photo-1578575436955-ef29da568c6d?auto=format&fit=crop&w=1200&q=80',
                'image_alt' => 'Petugas gudang memeriksa paket',
                'published_at' => Carbon::now()->subDays(14),
            ],
            [
                'title' => 'ATTA Cargo Perkuat Layanan Distribusi Retail & Modern Trade di Kalimantan',
                'excerpt' => 'ATTA Cargo terus memperluas jangkauan layanan distribusi ke jaringan retail modern demi mendukung kelancaran rantai pasok di Kalimantan.',
                'content' => '<p>Sebagai bagian dari komitmen memperkuat rantai distribusi, ATTA Cargo terus memperluas kerja sama dengan jaringan Distribution Center (DC) retail modern di wilayah Kalimantan Selatan dan Tengah.</p>'
                    .'<h2>Kerja Sama dengan Jaringan Retail</h2>'
                    .'<p>Kolaborasi ini mencakup pengiriman rutin ke berbagai DC dengan standar penanganan barang yang sesuai ketentuan masing-masing mitra retail.</p>'
                    .'<h2>Manfaat bagi Pelaku Bisnis</h2>'
                    .'<p>Dengan jadwal pengiriman yang konsisten, pelaku bisnis dapat menjaga ketersediaan stok di berbagai titik penjualan tanpa hambatan distribusi.</p>',
                'image_url' => 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80',
                'image_alt' => 'Gudang distribusi retail modern',
                'published_at' => Carbon::now()->subDays(21),
            ],
            [
                'title' => 'Panduan Menghitung Estimasi Ongkir Cargo Sebelum Mengirim Barang',
                'excerpt' => 'Sebelum mengirim barang, ada baiknya menghitung estimasi biaya terlebih dahulu. Berikut cara mudah menghitung ongkir cargo.',
                'content' => '<p>Menghitung estimasi ongkir sebelum mengirim barang membantu Anda merencanakan anggaran logistik dengan lebih baik. Berikut faktor-faktor yang memengaruhi tarif pengiriman cargo.</p>'
                    .'<h2>Faktor Penentu Tarif</h2>'
                    .'<ul><li>Zona atau wilayah tujuan pengiriman</li><li>Berat dan volume barang</li><li>Jenis layanan yang dipilih (reguler/ekspres)</li></ul>'
                    .'<h2>Cara Menghitung dengan Cepat</h2>'
                    .'<p>Anda dapat menggunakan fitur Cek Ongkir di website ATTA Cargo dengan memasukkan zona tujuan, berat barang, dan jenis layanan untuk mendapatkan estimasi biaya secara instan.</p>',
                'image_url' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
                'image_alt' => 'Kalkulasi berat dan biaya pengiriman barang',
                'published_at' => Carbon::now()->subDays(30),
            ],
            [
                'title' => 'Mengenal Proses Bongkar Muat Barang Proyek & Industri yang Aman',
                'excerpt' => 'Pengiriman material proyek dan industri membutuhkan penanganan khusus. Simak proses bongkar muat yang diterapkan ATTA Cargo.',
                'content' => '<p>Material konstruksi dan sparepart industri memiliki karakteristik yang berbeda dari barang pada umumnya, sehingga membutuhkan penanganan bongkar muat yang lebih hati-hati.</p>'
                    .'<h2>Persiapan Sebelum Bongkar Muat</h2>'
                    .'<p>Tim lapangan melakukan pengecekan kondisi barang serta menyiapkan alat bantu seperti forklift atau crane sesuai kebutuhan muatan.</p>'
                    .'<h2>Koordinasi dengan Tim Lapangan</h2>'
                    .'<p>Komunikasi yang baik antara pengemudi, tim gudang, dan penerima barang menjadi kunci kelancaran proses bongkar muat di lokasi proyek.</p>'
                    .'<blockquote>Keselamatan kerja dan keamanan barang selalu menjadi prioritas utama dalam setiap proses bongkar muat.</blockquote>',
                'image_url' => 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
                'image_alt' => 'Bongkar muat material proyek dan industri',
                'published_at' => Carbon::now()->subDays(45),
            ],
        ];

        foreach ($articles as $article) {
            Article::create(array_merge($article, ['is_active' => true]));
        }
    }
}
