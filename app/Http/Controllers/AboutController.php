<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('About')->withViewData(['seo' => array_merge(
            pageSeo(
                'Profil Perusahaan & Mitra Penerusan Barang Banjarmasin',
                'Mengenal ATTA Cargo (PT. Tumbuh Kuat Sejahtera), vendor logistik & mitra penerusan barang di Banjarmasin, melayani ekspedisi ke Kalimantan Selatan & Tengah.',
                '/tentang-kami',
            ),
            ['breadcrumbs' => [
                ['name' => 'Beranda', 'url' => url('/')],
                ['name' => 'Tentang Kami', 'url' => url('/tentang-kami')],
            ]],
        )]);
    }
}
