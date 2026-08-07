<!DOCTYPE html>
<html lang="id">

<head>
  <!-- Google Tag Manager -->
  <script>
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    // Deferred until the page is idle/loaded so GTM's request doesn't compete
    // with the LCP image and critical CSS for bandwidth on the initial load.
    function loadGtm() {
      var f = document.getElementsByTagName('script')[0],
        j = document.createElement('script');
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MRNC9C4X&l=dataLayer';
      f.parentNode.insertBefore(j, f);
    }

    if (document.readyState === 'complete') {
      loadGtm();
    } else {
      window.addEventListener('load', function() {
        ('requestIdleCallback' in window) ? requestIdleCallback(loadGtm, {
          timeout: 4000
        }) : setTimeout(loadGtm, 1);
      });
    }
  </script>
  <!-- End Google Tag Manager -->


  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csp-nonce" content="{{ Vite::cspNonce() }}">

  @php
    $appName = config('app.name', 'ATTA Cargo');
    $defaultDescription =
        'ATTA Cargo - jasa ekspedisi & cargo terpercaya, hub di Banjarmasin. Melayani pengiriman barang, distribusi & logistik ke seluruh Kalimantan Selatan & Tengah.';

    $seo = array_merge(
        [
            'title' => $appName,
            'description' => $defaultDescription,
            'canonical' => url()->current(),
            'og_type' => 'website',
            'image' => \App\Services\SocialImage::url('/images/hero/hero-1200.webp'),
            'image_alt' => $appName,
            'image_width' => \App\Services\SocialImage::WIDTH,
            'image_height' => \App\Services\SocialImage::HEIGHT,
            'image_type' => 'image/jpeg',
            // Error pages (403/404/419/429/500/503) render the ErrorPage component
            // via Inertia::handleExceptionsUsing() and never call pageSeo(), so this
            // is the only place to keep them out of the index.
            'robots' => ($page['component'] ?? null) === 'ErrorPage' ? 'noindex, nofollow' : 'index, follow',
        ],
        $seo ?? [],
    );

    $fullTitle = $seo['title'] === $appName ? $seo['title'] : $seo['title'] . ' - ' . $appName;

    // WhatsApp and Instagram truncate preview titles at roughly 65 characters,
    // so share cards use the bare title and let og:site_name carry the brand
    // instead of spending those characters on a " - ATTA Cargo" suffix.
    $shareTitle = $seo['share_title'] ?? $seo['title'];
  @endphp

  <title data-inertia>{{ $fullTitle }}</title>
  <meta data-inertia="description" name="description" content="{{ $seo['description'] }}">
  <meta name="robots" content="{{ $seo['robots'] }}">
  <link data-inertia="canonical" rel="canonical" href="{{ $seo['canonical'] }}">

  {{-- Open Graph. WhatsApp and Instagram only read what the server renders
       (their crawlers don't run JS), so every share-critical tag lives here. --}}
  <meta data-inertia="og-type" property="og:type" content="{{ $seo['og_type'] }}">
  <meta property="og:site_name" content="{{ $appName }}">
  <meta data-inertia="og-title" property="og:title" content="{{ $shareTitle }}">
  <meta data-inertia="og-description" property="og:description" content="{{ $seo['description'] }}">
  <meta data-inertia="og-url" property="og:url" content="{{ $seo['canonical'] }}">
  <meta property="og:locale" content="id_ID">

  {{-- og:image. WhatsApp needs an explicit type + dimensions to render the
       large card instead of the small thumbnail, and refuses to guess. --}}
  <meta data-inertia="og-image" property="og:image" content="{{ $seo['image'] }}">
  <meta data-inertia="og-image-secure" property="og:image:secure_url" content="{{ $seo['image'] }}">
  <meta data-inertia="og-image-type" property="og:image:type" content="{{ $seo['image_type'] }}">
  <meta data-inertia="og-image-width" property="og:image:width" content="{{ $seo['image_width'] }}">
  <meta data-inertia="og-image-height" property="og:image:height" content="{{ $seo['image_height'] }}">
  <meta data-inertia="og-image-alt" property="og:image:alt" content="{{ $seo['image_alt'] }}">

  @if ($seo['og_type'] === 'article')
    <meta data-inertia="article-published" property="article:published_time" content="{{ $seo['published_time'] ?? '' }}">
    <meta data-inertia="article-modified" property="article:modified_time" content="{{ $seo['modified_time'] ?? '' }}">
    <meta data-inertia="article-section" property="article:section" content="{{ $seo['section'] ?? 'Logistik' }}">
    <meta data-inertia="article-author" property="article:author" content="{{ $appName }}">
  @endif

  {{-- Twitter Card --}}
  <meta name="twitter:card" content="summary_large_image">
  <meta data-inertia="twitter-title" name="twitter:title" content="{{ $shareTitle }}">
  <meta data-inertia="twitter-description" name="twitter:description" content="{{ $seo['description'] }}">
  <meta data-inertia="twitter-image" name="twitter:image" content="{{ $seo['image'] }}">
  <meta data-inertia="twitter-image-alt" name="twitter:image:alt" content="{{ $seo['image_alt'] }}">

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

  {{-- Preload the LCP hero image (self-hosted WebP): only on the page where it's actually rendered --}}
  @php
    $heroPreloads = [
        'Home' => 'hero/hero',
        'Services/Index' => 'layanan-hero',
        'Contact' => 'kontak-hero',
        'Calculator' => 'cek-ongkir-hero',
        'About' => 'tentang-hero',
    ];
    $heroSlug = $heroPreloads[$page['component'] ?? null] ?? null;
  @endphp
  @if ($heroSlug)
    <link rel="preload" as="image" fetchpriority="high" href="/images/{{ $heroSlug }}-1200.webp"
      imagesrcset="/images/{{ $heroSlug }}-800.webp 800w,
                           /images/{{ $heroSlug }}-1200.webp 1200w,
                           /images/{{ $heroSlug }}-1920.webp 1920w"
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

  {{-- WebSite structured data (site identity signal for Google Sitelinks) --}}
  <script type="application/ld+json">
            {!! json_encode([
                '@context' => 'https://schema.org',
                '@type' => 'WebSite',
                '@id' => url('/').'#website',
                'name' => 'ATTA Cargo',
                'url' => url('/'),
                'publisher' => ['@id' => url('/').'#organization'],
                'inLanguage' => 'id-ID',
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

  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MRNC9C4X" height="0" width="0"
      style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  @inertia
</body>

</html>
