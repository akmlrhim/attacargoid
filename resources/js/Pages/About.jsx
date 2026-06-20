import { Head } from "@inertiajs/react";
import AppLayout from "../Components/Layout/AppLayout";
import SectionHeading from "../Components/Shared/SectionHeading";
import useScrollReveal from "../hooks/useScrollReveal";
import DotField from "../Components/ReactBits/DotField";
import { WA_URL, misiItems, nilaiItems, heroStats, heroBullets } from "../constants/about";

export default function About() {
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();

  return (
    <>
      <Head title="Tentang Kami — ATTA Cargo" />
      <AppLayout>
        <section className="bg-white pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left */}
              <div>
                <p className="inline-flex items-center gap-2 text-orange text-xs font-bold uppercase tracking-widest mb-4">
                  Tentang Kami
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-navy leading-tight mb-5">
                  Mitra Distribusi Terpercaya di Kalimantan
                </h1>
                <p className="text-gray-900 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                  Menghubungkan bisnis Anda dengan solusi distribusi yang andal,
                  efisien, dan terpercaya di seluruh wilayah Kalimantan.
                </p>
                <ul className="space-y-3.5">
                  {heroBullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                          <path
                            d="M2.5 6l2.5 2.5L9.5 3"
                            stroke="#f5a623"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-700 font-medium leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: stats card */}
              <div className="rounded-3xl border border-gray-200 overflow-hidden bg-gray-50 p-8 sm:p-10">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                  Profil Singkat
                </p>
                <div className="grid grid-cols-2 gap-5">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100">
                      <p className="text-2xl sm:text-3xl font-black text-navy mb-1">{stat.value}</p>
                      <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 bg-navy rounded-2xl px-5 py-4">
                  <div className="w-8 h-8 rounded-xl bg-orange flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 16 16" fill="white" className="w-4 h-4">
                      <path d="M8 1L10 6h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5L8 1z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-black">PT. Tumbuh Kuat Sejahtera</p>
                    <p className="text-white/50 text-[11px]">Banjarmasin, Kalimantan Selatan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Profil Perusahaan ── */}
        <section className="bg-white py-20 sm:py-28" ref={ref1}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              <div className="sr sr-left">
                <SectionHeading tag="Profil Perusahaan" title="Mengenal ATTA Cargo" center={false} />
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                  <p>
                    <span className="font-semibold text-navy">ATTA Cargo</span>{" "}
                    adalah perusahaan jasa logistik di bawah{" "}
                    <span className="font-semibold text-navy">PT. Tumbuh Kuat Sejahtera</span>{" "}
                    yang berfokus pada layanan{" "}
                    <span className="text-orange font-semibold">penerusan barang</span>{" "}
                    dan{" "}
                    <span className="text-orange font-semibold">last mile distribution</span>{" "}
                    di wilayah Kalimantan.
                  </p>
                  <p>
                    Berbasis di{" "}
                    <span className="font-semibold">Banjarmasin, Kalimantan Selatan</span>
                    , kami melayani distribusi barang retail, FMCG, kebutuhan
                    industri, material proyek, hingga pengiriman khusus sesuai
                    kebutuhan operasional pelanggan.
                  </p>
                  <p>
                    Dengan jaringan yang terus berkembang di Kalimantan Selatan
                    dan Kalimantan Tengah, kami berkomitmen menjadi mitra
                    logistik pilihan yang mengedepankan kepercayaan, ketepatan,
                    dan profesionalisme.
                  </p>
                </div>
              </div>

              <div className="sr sr-right">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80"
                    alt="ATTA Cargo warehouse operations"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-navy-dark/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-bold text-sm">PT. Tumbuh Kuat Sejahtera</p>
                    <p className="text-white/60 text-xs mt-0.5">Banjarmasin, Kalimantan Selatan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Visi & Misi ── */}
        <section className="bg-gray-50 py-20 sm:py-28 relative overflow-hidden" ref={ref2}>
          <div className="absolute inset-0 pointer-events-none">
            <DotField
              dotRadius={1.5}
              dotSpacing={20}
              bulgeStrength={60}
              glowRadius={140}
              gradientFrom="rgba(11,31,77,0.18)"
              gradientTo="rgba(245,166,35,0.10)"
              glowColor="rgba(11,31,77,0.06)"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="sr">
              <SectionHeading tag="Arah Kami" title="Visi &amp; Misi" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-4">
              {/* Visi */}
              <div className="sr sr-left bg-navy rounded-3xl p-8 sm:p-10 text-white">
                <div className="inline-flex items-center gap-2.5 mb-5">
                  <span className="text-orange font-bold text-sm uppercase tracking-widest">Visi</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black leading-snug mb-4">
                  Menjadi perusahaan logistik pilihan utama di Kalimantan
                </h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  Menjadi mitra distribusi terdepan yang menghubungkan pelaku
                  bisnis di Kalimantan dengan solusi logistik yang andal,
                  efisien, dan terpercaya — mendukung setiap rantai pasok dari
                  hulu hingga hilir untuk pertumbuhan bisnis yang berkelanjutan.
                </p>
              </div>

              {/* Misi */}
              <div className="sr sr-right bg-white rounded-3xl p-8 sm:p-10 border border-gray-100">
                <div className="inline-flex items-center gap-2.5 mb-5">
                  <span className="text-orange font-bold text-sm uppercase tracking-widest">Misi</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-navy leading-snug mb-6">
                  Langkah nyata menuju visi bersama
                </h3>
                <ul className="space-y-3">
                  {misiItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Nilai-nilai Perusahaan ── */}
        <section className="bg-white py-20 sm:py-28" ref={ref3}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="sr">
              <SectionHeading
                tag="Nilai Kami"
                title="Prinsip yang Kami Pegang"
                subtitle="Enam nilai inti yang menjadi landasan setiap langkah operasional ATTA Cargo."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-4">
              {nilaiItems.map((item, i) => (
                <div
                  key={item.title}
                  className="sr flex flex-col p-5 rounded-2xl"
                  style={{ backgroundColor: item.bg, transitionDelay: `${i * 60}ms` }}
                >
                  <h3 className="text-xl font-black leading-tight mb-2" style={{ color: item.titleColor }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  {item.illustration}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl py-16 sm:py-24 px-6"
            style={{ background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 35%, #f5f8ff 65%, #ffffff 100%)" }}
          >
            {/* Pixel grid — left */}
            <svg className="pointer-events-none absolute left-0 top-0 h-full w-52 sm:w-72" aria-hidden="true" preserveAspectRatio="xMinYMid slice">
              <defs>
                <pattern id="dots-left" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                  <rect x="3" y="3" width="5" height="5" rx="1" fill="#3b82f6" fillOpacity="0.45" />
                </pattern>
                <linearGradient id="fade-left" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <mask id="mask-left">
                  <rect width="100%" height="100%" fill="url(#fade-left)" />
                </mask>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots-left)" mask="url(#mask-left)" />
            </svg>

            {/* Pixel grid — right */}
            <svg className="pointer-events-none absolute right-0 top-0 h-full w-52 sm:w-72" aria-hidden="true" preserveAspectRatio="xMaxYMid slice">
              <defs>
                <pattern id="dots-right" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                  <rect x="3" y="3" width="5" height="5" rx="1" fill="#3b82f6" fillOpacity="0.45" />
                </pattern>
                <linearGradient id="fade-right" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <mask id="mask-right">
                  <rect width="100%" height="100%" fill="url(#fade-right)" />
                </mask>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots-right)" mask="url(#mask-right)" />
            </svg>

            {/* Content */}
            <div className="relative max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-dark leading-tight mb-5">
                Mulai Distribusi yang Andal
                <br />
                Bersama ATTA Cargo
              </h2>
              <p className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto mb-10">
                Setiap paket terjamin, setiap pengiriman terpantau, dan setiap
                mitra mendapat pelayanan terbaik di seluruh Kalimantan.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-navy-dark hover:bg-navy text-white font-bold px-7 py-3.5 rounded-full text-sm transition-colors"
                >
                  Konsultasi via WhatsApp
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                    <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="/#kontak"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-navy-dark font-bold px-7 py-3.5 rounded-full text-sm transition-colors border border-gray-200"
                >
                  Hubungi Tim Kami
                </a>
              </div>
            </div>
          </div>
        </section>
      </AppLayout>
    </>
  );
}
