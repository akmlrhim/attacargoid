<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Office / Hub Location
    |--------------------------------------------------------------------------
    |
    | Koordinat lokasi kantor/hub utama yang ditampilkan pada peta halaman
    | Kontak. Diubah lewat .env agar posisi peta bisa berpindah tanpa
    | menyentuh kode frontend.
    |
    */

    'office' => [
        'label' => env('OFFICE_LABEL', 'ATTA Cargo Hub Banjarmasin'),
        'address' => env('OFFICE_ADDRESS', 'Jl. Raya Purna Sakti, Basirih, Kec. Banjarmasin Bar., Kota Banjarmasin, Kalimantan Selatan 70245'),
        'latitude' => (float) env('OFFICE_LATITUDE', -3.3333094966414754),
        'longitude' => (float) env('OFFICE_LONGITUDE', 114.56958427497203),
        'zoom' => (int) env('OFFICE_ZOOM', 16),
    ],

];
