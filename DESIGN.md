---
name: ATTA Cargo
description: Situs marketing mitra penerusan barang & last-mile distribution dengan hub di Banjarmasin, Kalimantan Selatan
colors:
  navy: "#0b1f4d"
  navy-light: "#1a3a7a"
  navy-dark: "#060f26"
  orange: "#f5a623"
  orange-light: "#f7bc5a"
  orange-dark: "#d4881a"
  ink: "#000000"
  surface: "#ffffff"
  surface-muted: "#f9fafb"
  border-subtle: "#f3f4f6"
  border-default: "#e5e7eb"
typography:
  display:
    fontFamily: "Google Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Google Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 900
    lineHeight: 1.2
  body:
    fontFamily: "Google Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Google Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.02em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.orange-dark}"
  button-secondary:
    backgroundColor: "{colors.navy}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.navy-light}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "14px 32px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
---

# Design System: ATTA Cargo

## 1. Overview

**Creative North Star: "Hub Kalimantan"**

ATTA Cargo adalah simpul, bukan sekadar rute: navy tegas sebagai otoritas berdiri diam di dasar setiap layar, orange sebagai satu-satunya warna yang bergerak — arah, aksi, ajakan menghubungi. Sistem ini melayani dua audiens dalam satu tarikan napas: pemilik UMKM yang membuka situs dari HP di sela kerja, dan distributor besar yang mengevaluasi kredibilitas dari desktop. Keduanya butuh hal yang sama — kejelasan cepat tentang siapa yang mereka ajak bicara, bukan dekorasi yang menunda jawaban.

Sistem ini menolak dua arah sekaligus: (1) kesan startup SaaS generik — gradient text, kartu ikon seragam, hero-metric template, eyebrow uppercase di atas tiap section — karena itu membuat mitra logistik lokal terlihat seperti template AS yang di-*localize*; dan (2) kesan situs pemerintah/birokratis-kaku — karena UMKM harus merasa bisa langsung menghubungi, bukan mengisi formulir dinas. Navy dan orange yang sudah ada dipertahankan sebagai identitas; yang berubah adalah bagaimana keduanya dieksekusi — lebih spesifik ke konteks Banjarmasin/Kalimantan, lebih jarang mengulang pola kartu yang sama.

**Key Characteristics:**
- Navy sebagai warna otoritas (heading, dasar gelap, teks penting); orange dipakai selektif — CTA utama, kata kunci dalam heading, ikon aksen.
- Flat-by-default: permukaan datar dengan border tipis saat diam; shadow hanya muncul sebagai respons hover/focus.
- Rounded generous (12–24px) tapi tidak playful-berlebihan — tetap terasa institusional.
- Motion terarah: scroll-reveal per-section (`.sr`), bukan satu animasi seragam ditempel ke semua elemen.
- Copy berbahasa Indonesia, langsung, hangat — bukan korporat-kaku.

## 2. Colors

Palet dua-warna yang sengaja terbatas: navy sebagai fondasi kepercayaan, orange sebagai satu-satunya sinyal aksi.

### Primary
- **Navy** (`#0b1f4d`): warna otoritas. Dipakai untuk heading (`text-navy`), latar gelap penuh (hero, footer via `navy-dark`), dan tombol sekunder. Ini adalah "suara" brand — tegas, institusional, bukan playful.
- **Navy Light** (`#1a3a7a`): hover state untuk elemen navy (tombol sekunder, link aktif).
- **Navy Dark** (`#060f26`): latar penuh untuk section bernuansa "malam"/otoritatif — hero background, footer.

### Secondary
- **Orange** (`#f5a623`): satu-satunya warna aksi. CTA utama ("Konsultasi Sekarang"), kata kunci di dalam heading (`<span className="text-orange">`), ikon aksen kecil. Dipakai **selektif** — bukan warna latar besar.
- **Orange Dark** (`#d4881a`): hover state tombol orange.
- **Orange Light** (`#f7bc5a`): dipakai tipis untuk highlight/glow dekoratif (mis. gradient DotField), bukan untuk teks atau tombol solid.

### Neutral
- **Ink** (`#000000`, via `text-black`): body text di atas latar terang. Kontras tinggi disengaja — hindari abu-abu medium untuk body text.
- **Surface** (`#ffffff`): latar kartu, form, section terang.
- **Surface Muted** (`#f9fafb`, `bg-gray-50`): latar section alternating (testimoni, kontak) untuk memberi ritme tanpa border tambahan.
- **Border Subtle** (`#f3f4f6`, `border-gray-100`) / **Border Default** (`#e5e7eb`, `border-gray-200`): satu-satunya alat pemisah permukaan flat; tidak ada shadow permanen.

### Named Rules
**The Selective Orange Rule.** Orange tidak pernah menjadi warna latar section atau warna body text. Ia hanya boleh muncul di: tombol CTA, satu-dua kata kunci dalam heading, dan ikon aksen kecil (≤10% dari luas layar mana pun). Kelangkaannya adalah maksudnya — begitu orange dipakai berlebihan, ia berhenti terasa seperti "tombol untuk ditekan" dan mulai terasa generik.

**The No-Gray-Body Rule.** Body text di atas latar terang memakai `text-black`, bukan abu-abu medium. Placeholder form tetap harus terbaca (≥4.5:1), tidak didefaultkan ke abu-abu terlalu terang demi "elegan".

## 3. Typography

**Display/Body Font:** Google Sans (fallback: ui-sans-serif, system-ui, sans-serif)

**Character:** Satu keluarga font di berbagai berat — geometris, netral, mudah dibaca di semua ukuran layar. Kontras hierarki dibangun lewat berat (font-black 900 untuk heading vs font-normal/medium untuk body), bukan lewat pergantian typeface.

### Hierarchy
- **Display** (900, `clamp(2rem, 5vw, 5.5rem)`, leading 1.05–1.1, tracking -0.02em): hero H1 satu-satunya tempat ukuran ini dipakai. Tidak boleh melebihi ~88px pada breakpoint manapun — uji ulang di tablet agar tidak overflow.
- **Headline** (900, `clamp(1.5rem, 3vw, 2.25rem)`, leading 1.2): H2 tiap section (`SectionHeading`).
- **Title** (800, `text-xl`/`text-md`, leading tight): H3 dalam kartu/komponen (nama testimoni, judul keunggulan).
- **Body** (400, `0.875–0.9375rem`, leading relaxed, maks ~65ch): paragraf deskriptif, subtitle section.
- **Label** (700, `0.75–0.8125rem`, tracking wide, kadang uppercase): label form, kategori jam operasional, badge kecil.

### Named Rules
**The Weight-Not-Family Rule.** Hierarki dibangun dengan mengganti font-weight (400 → 700 → 900), bukan mengganti typeface atau menambah warna gradient pada teks. Gradient text (`background-clip: text`) tidak pernah dipakai di sistem ini.

## 4. Elevation

Flat-by-default. Section dan kartu memakai border tipis satu-warna (`border-gray-100`/`border-gray-200`) untuk memisahkan permukaan saat diam — tidak ada shadow permanen di kondisi default. Shadow hanya muncul sebagai respons state: hover pada kartu keunggulan (`hover:shadow-xl hover:shadow-slate-300/40` + `-translate-y-2`), atau `shadow-sm` tipis pada elemen mengambang kecil (tombol "lihat semua ulasan"). Kedalaman visual utama dicapai lewat kontras warna (navy-dark solid vs surface putih), bukan lapisan bayangan.

### Shadow Vocabulary
- **Hover-lift** (`box-shadow` via `shadow-xl shadow-slate-300/40`, dipasangkan dengan `-translate-y-2`): respons hover pada kartu interaktif (Advantages). Tidak pernah dipasang permanen di kondisi diam.
- **Ambient-small** (`shadow-sm`): elemen mengambang ringan (chip "lihat semua", tombol scroll), dipakai jarang.

### Named Rules
**The Flat-At-Rest Rule.** Setiap kartu dan section dimulai flat (border saja). Shadow adalah jawaban atas interaksi (hover/focus), bukan dekorasi bawaan — jika sebuah kartu punya shadow permanen tanpa alasan interaktif, itu bug, bukan gaya.

## 5. Components

### Buttons
- **Shape:** rounded-xl (12px) untuk tombol CTA utama; rounded-full untuk tombol pill kecil di navbar.
- **Primary (orange):** `bg-orange hover:bg-orange-dark`, teks putih tebal (font-semibold), padding besar (`px-8 py-4`), `hover:scale-105 active:scale-95` sebagai umpan balik tekan. Dipakai untuk satu CTA per section paling banyak.
- **Secondary (navy):** `bg-navy hover:bg-navy-light`, dipakai untuk submit form dan aksi yang perlu terasa "resmi"/otoritatif dibanding orange yang lebih "ajakan santai".
- **Ghost (outline putih):** `border-2 border-white/25 hover:border-white/60`, dipakai di atas latar navy-dark (hero secondary CTA) — tidak pernah di atas latar putih.
- **Hover/Focus:** semua tombol solid memakai transisi warna + scale halus (200ms); tidak ada efek bounce/elastic.

### Cards
- **Corner Style:** rounded-2xl (16px) hingga rounded-3xl (24px) untuk kartu besar (Advantages), rounded-2xl untuk kartu form/testimoni.
- **Background:** putih solid, kadang gradient tint sangat halus (`linear-gradient(165deg, tint 0%, white 55%)`) — bukan warna solid pastel penuh.
- **Shadow Strategy:** flat-at-rest, shadow muncul di hover (lihat Elevation).
- **Border:** `border-gray-100` tipis pada kartu yang duduk di atas latar `gray-50` (testimoni, form kontak), dihilangkan pada kartu yang sudah punya kontras dari gradient tint sendiri.
- **Internal Padding:** `p-5` (mobile) → `p-7/p-8` (desktop).

### Inputs / Fields
- **Style:** `rounded-xl border border-gray-200`, latar putih, placeholder abu-abu yang tetap kontras.
- **Focus:** `focus:border-navy focus:ring-2 focus:ring-navy/10` — cincin fokus navy tipis, bukan glow orange.
- **Error:** teks `text-red-500` kecil di bawah field, bukan border merah tebal.

### Navigation
- Navbar `fixed`, transparan + teks putih di atas hero (belum scroll), berubah jadi putih solid + blur + teks hitam setelah `scrollY > 60`. Logo di-invert (`brightness-0 invert`) saat transparan agar tetap terbaca di atas foto hero.
- Link aktif: `text-navy font-bold` (solid) atau `text-white/90` (transparan) tergantung state scroll.
- Mobile: overlay penuh layar putih, item nav sebagai blok besar (`py-3.5`) — bukan dropdown kecil.

### Section Rhythm (signature pattern)
Section terang (`bg-white`) dan section muted (`bg-gray-50`) berselang-seling secara vertikal untuk memberi ritme tanpa border eksplisit antar section. Section gelap (`bg-navy-dark`) dipakai hanya di hero dan footer — dua "bookend" di halaman, bukan tersebar.

## 6. Do's and Don'ts

### Do:
- **Do** jaga orange sebagai warna langka — CTA, kata kunci heading, ikon aksen saja (The Selective Orange Rule).
- **Do** gunakan `text-black` untuk body text di atas latar terang, bukan abu-abu medium (The No-Gray-Body Rule).
- **Do** biarkan kartu flat saat diam; shadow hanya sebagai respons hover/focus (The Flat-At-Rest Rule).
- **Do** hormati `prefers-reduced-motion` di semua animasi (hero, `.sr` scroll-reveal, DotField) — sediakan alternatif crossfade/instant.
- **Do** buat copy dan detail visual spesifik ke konteks Banjarmasin/Kalimantan (hub, rute, jam operasional WITA), bukan template logistik generik.
- **Do** bangun hierarki lewat font-weight (400/700/900), bukan gradient text atau ganti-ganti typeface.

### Don't:
- **Don't** pakai gradient text (`background-clip: text` + gradient) untuk emphasis — dilarang total di sistem ini.
- **Don't** ulangi pola "grid kartu identik" (ikon + judul + teks, seragam) sebagai jawaban default untuk menampilkan fitur/keunggulan — variasikan bentuk atau jumlah per section.
- **Don't** tambahkan eyebrow uppercase kecil ("LAYANAN", "TENTANG") di atas tiap heading section — ini scaffolding SaaS generik yang harus dihindari.
- **Don't** pakai side-stripe border (`border-left`/`border-right` tebal berwarna) sebagai aksen kartu atau alert.
- **Don't** buat hero-metric template (angka besar + label kecil + gradient accent) — bukan bahasa visual brand ini.
- **Don't** tambahkan shadow permanen pada kartu di kondisi diam — shadow harus selalu jawaban atas interaksi.
- **Don't** pakai orange sebagai warna latar section penuh atau warna body text panjang — ia kehilangan fungsi sebagai sinyal aksi begitu jadi dekorasi.
