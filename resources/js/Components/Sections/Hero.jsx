import { lazy, Suspense, useEffect, useState } from "react";

// Lightweight canvas dot-field (no Three.js) - deferred until after first paint.
const DotField = lazy(() => import("../ReactBits/DotField"));

export default function HeroSection() {
  const [showFx, setShowFx] = useState(false);

  useEffect(() => {
    // Defer the canvas FX until after first paint so LCP is not blocked
    const id = setTimeout(() => setShowFx(true), 300);
    return () => clearTimeout(id);
  }, []);

  const scrollToLayanan = (e) => {
    e.preventDefault();
    document.getElementById("layanan")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-dark">
      {/* Background photo - self-hosted WebP, responsive srcSet, preloaded in <head> */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero-1200.webp"
          srcSet="/images/hero/hero-800.webp 800w, /images/hero/hero-1200.webp 1200w, /images/hero/hero-1920.webp 1920w"
          sizes="100vw"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/60 via-navy-dark/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 via-transparent to-navy-dark/20" />
      </div>

      {/* DotField (canvas) - deferred until after first paint */}
      {showFx && (
        <div className="absolute inset-0 pointer-events-none">
          <Suspense fallback={null}>
            <DotField
              dotRadius={1.5}
              dotSpacing={22}
              bulgeStrength={70}
              glowRadius={180}
              gradientFrom="rgba(245,166,35,0.30)"
              gradientTo="rgba(147,197,253,0.18)"
              glowColor="rgba(245,166,35,0.10)"
            />
          </Suspense>
        </div>
      )}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 sm:pb-24 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* H1 rendered immediately - no opacity:0, LCP records at first paint */}
          <h1 className="hero-anim-title text-[2rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-black text-white leading-[1.1] sm:leading-[1.02] tracking-tight mb-4 sm:mb-6">
            Solusi <span className="text-orange">Logistik</span>
            <br />
            Terpercaya,
            <br />
            Distribusi <span className="text-orange">Andal</span>
          </h1>

          <p className="hero-anim-sub text-white text-[0.9rem] sm:text-md lg:text-lg max-w-2xl mx-auto mb-7 sm:mb-10 leading-relaxed">
            Bisnis Tumbuh Bersama. Mitra penerusan barang &amp; last mile
            delivery Kalimantan Selatan dengan hub strategis di Banjarmasin.
          </p>

          <div className="hero-anim-ctas flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-14 justify-center">
            <a
              href="/kontak"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-navy-dark font-semibold px-8 py-4 text-base rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Konsultasi Sekarang
            </a>
            <a
              href="#layanan"
              onClick={scrollToLayanan}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/25 hover:border-white/60 text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base rounded-xl transition-all duration-200 hover:bg-white/[0.06] backdrop-blur-sm"
            >
              Lihat Layanan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
