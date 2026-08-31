<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cek Status Pengiriman - ATTA Cargo</title>
    <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico">
    <link rel="stylesheet" href="{{ asset('css/tracking.css') }}">
</head>
<body>

<div class="container">

    <div class="header">
        <img src="{{ asset('logo.webp') }}" alt="ATTA Cargo" class="logo">
        <h1>Cek Status Pengiriman</h1>
        <p>Masukkan nomor Resi untuk melihat status dan riwayat pengiriman</p>
    </div>

    <div class="search-card">
        <label class="search-label" for="awbInput">Nomor Resi</label>

        <div class="search-row">
            <input type="text" id="awbInput" class="search-input" autocomplete="off" spellcheck="false">
            <button id="searchButton" class="search-button" onclick="searchAWB()">Cari</button>
        </div>

        <div id="message" class="message"></div>
    </div>

    <div id="result" class="result">

        <div class="result-header">
            <div class="result-title">Informasi Pengiriman</div>
            <div class="status-badge">
                <span class="status-dot"></span>
                Data ditemukan
            </div>
        </div>

        <div class="shipment-info">
            <div class="info-box">
                <div class="info-label">No Resi</div>
                <div id="resultAWB" class="info-value">-</div>
            </div>

            <div class="info-box">
                <div class="info-label">Nama Pengirim</div>
                <div id="resultSender" class="info-value">-</div>
            </div>

            <div class="info-box">
                <div class="info-label">Nama Penerima</div>
                <div id="resultReceiver" class="info-value">-</div>
            </div>

            <div class="info-box">
                <div class="info-label">Tanggal Kirim</div>
                <div id="resultDate" class="info-value">-</div>
            </div>
        </div>

        <div class="route-box">
            <div class="route">
                <div class="route-point">
                    <div class="route-label">From</div>
                    <div id="resultFrom" class="route-value">-</div>
                </div>

                <div class="route-arrow">&rarr;</div>

                <div class="route-point">
                    <div class="route-label">To</div>
                    <div id="resultTo" class="route-value">-</div>
                </div>
            </div>
        </div>

        <div class="timeline-section">
            <div class="timeline-title">Riwayat lokasi Pengiriman</div>
            <div id="timeline" class="timeline"></div>
        </div>

    </div>

    <div class="footer">Sistem Informasi Status Pengiriman</div>

</div>

<script src="{{ asset('js/tracking.js') }}"></script>
</body>
</html>
