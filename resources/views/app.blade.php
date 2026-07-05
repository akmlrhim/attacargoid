<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  @php
    $appName = config('app.name', 'ATTA Cargo');
    $defaultDescription =
        'ATTA Cargo — mitra penerusan barang & last mile distribution terpercaya dengan hub di Banjarmasin, menjangkau Kalimantan Selatan & Tengah.';

    $seo = array_merge(
        [
            'title' => $appName,
            'description' => $defaultDescription,
            'canonical' => url()->current(),
            'og_type' => 'website',
            'image' => url('/images/hero/hero-1200.webp'),
            'robots' => 'index, follow',
        ],
        $seo ?? [],
    );

    $fullTitle = $seo['title'] === $appName ? $seo['title'] : $seo['title'] . ' - ' . $appName;
  @endphp

  <title inertia>{{ $fullTitle }}</title>
  <meta name="description" content="{{ $seo['description'] }}">
  <meta name="robots" content="{{ $seo['robots'] }}">
  <link rel="canonical" href="{{ $seo['canonical'] }}">

  {{-- Open Graph --}}
  <meta property="og:type" content="{{ $seo['og_type'] }}">
  <meta property="og:site_name" content="{{ $appName }}">
  <meta property="og:title" content="{{ $fullTitle }}">
  <meta property="og:description" content="{{ $seo['description'] }}">
  <meta property="og:url" content="{{ $seo['canonical'] }}">
  <meta property="og:image" content="{{ $seo['image'] }}">
  <meta property="og:locale" content="id_ID">

  {{-- Twitter Card --}}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ $fullTitle }}">
  <meta name="twitter:description" content="{{ $seo['description'] }}">
  <meta name="twitter:image" content="{{ $seo['image'] }}">

  {{-- Favicon --}}
  <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico">
  <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
  <link rel="manifest" href="/favicon/site.webmanifest">
  <meta name="theme-color" content="#060f26">

  {{-- Early connection hints --}}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  {{-- Non-blocking font load: preload the CSS, swap rel on load --}}
  <link rel="preload" as="style"
    href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
    onload="this.onload=null;this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap">
  </noscript>

  {{-- Preload hero image (self-hosted WebP): only on the Home page, where it's actually rendered --}}
  @if (($page['component'] ?? null) === 'Home')
    <link rel="preload" as="image" fetchpriority="high" href="/images/hero/hero-1200.webp"
      imagesrcset="/images/hero/hero-800.webp 800w,
                           /images/hero/hero-1200.webp 1200w,
                           /images/hero/hero-1920.webp 1920w"
      imagesizes="100vw">
  @endif

  {{-- Organization / LocalBusiness structured data --}}
  <script type="application/ld+json">
            {!! json_encode([
                '@context' => 'https://schema.org',
                '@type' => 'LocalBusiness',
                '@id' => url('/').'#organization',
                'name' => 'ATTA Cargo',
                'legalName' => 'PT. Tumbuh Kuat Sejahtera',
                'description' => $defaultDescription,
                'url' => url('/'),
                'logo' => url('/logo.webp'),
                'image' => url('/images/hero/hero-1200.webp'),
                'telephone' => '+'.ltrim($company->whatsapp_number, '+'),
                'email' => $company->email,
                'address' => [
                    '@type' => 'PostalAddress',
                    'streetAddress' => 'Jl. Raya Purna Sakti, Basirih, Kec. Banjarmasin Barat',
                    'addressLocality' => 'Banjarmasin',
                    'addressRegion' => 'Kalimantan Selatan',
                    'postalCode' => '70245',
                    'addressCountry' => 'ID',
                ],
                'areaServed' => [
                    ['@type' => 'AdministrativeArea', 'name' => 'Kalimantan Selatan'],
                    ['@type' => 'AdministrativeArea', 'name' => 'Kalimantan Tengah'],
                ],
                'sameAs' => array_values(array_filter([
                    'https://wa.me/'.$company->whatsapp_number,
                    ...array_column($company->social_links ?? [], 'url'),
                ])),
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
        </script>

  {{-- Breadcrumb structured data (inner pages) --}}
  @if (!empty($seo['breadcrumbs']))
    <script type="application/ld+json">
                {!! json_encode([
                    '@context' => 'https://schema.org',
                    '@type' => 'BreadcrumbList',
                    'itemListElement' => collect($seo['breadcrumbs'])->map(fn ($crumb, $i) => [
                        '@type' => 'ListItem',
                        'position' => $i + 1,
                        'name' => $crumb['name'],
                        'item' => $crumb['url'],
                    ])->all(),
                ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
      </script>
  @endif

  {{-- Page-specific structured data (e.g. Service list) --}}
  @if (!empty($seo['jsonld']))
    <script type="application/ld+json">
                {!! json_encode($seo['jsonld'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
            </script>
  @endif

  @viteReactRefresh
  @vite('resources/js/app.jsx')
  @inertiaHead
</head>

<body class="font-sans antialiased">
  @inertia
</body>

</html>
