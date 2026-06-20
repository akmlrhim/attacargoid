import { useEffect, useState } from "react";
import WhatsAppButton from "../Shared/WhatsAppButton";
import BlurText from "../ReactBits/BlurText";
import FloatingLines from "../ReactBits/FloatingLines";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80";

export default function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(
      !window.matchMedia("(hover: none) and (pointer: coarse)").matches,
    );
  }, []);

  const scrollToLayanan = (e) => {
    e.preventDefault();
    document.getElementById("layanan")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-dark">
      {/* ── Background photo ── */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layer overlay: dark base + left-side vignette for text readability */}
        <div className="absolute inset-0 bg-navy-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/60 via-navy-dark/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 via-transparent to-navy-dark/20" />
      </div>

      {/* FloatingLines — animated wave lines over dark background */}
      <div className="absolute inset-0" style={{ opacity: 0.35 }}>
        <FloatingLines
          linesGradient={["#1e40af", "#3b82f6", "#93c5fd", "#f5a623"]}
          enabledWaves={["middle", "bottom"]}
          lineCount={[6, 4]}
          lineDistance={[5, 4]}
          animationSpeed={0.5}
          bendRadius={4.0}
          bendStrength={-0.4}
          interactive={isDesktop}
          parallax={isDesktop}
          parallaxStrength={0.08}
          mixBlendMode="screen"
        />
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 sm:pb-24 w-full">
        <div className="max-w-3xl">
          {/* Headline */}
          <h1 className="text-[2rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-black text-white leading-[1.1] sm:leading-[1.02] tracking-tight mb-4 sm:mb-6">
            <BlurText text="Solusi" animateOnMount delay={0.25} />{" "}
            <BlurText
              text="Logistik"
              className="text-orange"
              animateOnMount
              delay={0.35}
            />
            <br />
            <BlurText text="Terpercaya," animateOnMount delay={0.47} />
            <br />
            <BlurText text="Distribusi" animateOnMount delay={0.58} />{" "}
            <BlurText
              text="Andal"
              className="text-orange"
              animateOnMount
              delay={0.68}
            />
          </h1>

          {/* Tagline */}
          <p className="hero-anim-sub text-white/60 text-[0.9rem] sm:text-lg lg:text-xl max-w-2xl mb-7 sm:mb-10 leading-relaxed">
            Bisnis Tumbuh Bersama — Mitra penerusan barang &amp; last mile
            distribution dengan hub strategis di Banjarmasin.
          </p>

          {/* CTAs */}
          <div className="hero-anim-ctas flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-14">
            <WhatsAppButton
              label="Konsultasi Gratis"
              size="lg"
              className="w-full sm:w-auto justify-center"
            />
            <a
              href="#layanan"
              onClick={scrollToLayanan}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/25 hover:border-white/60 text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base rounded-xl transition-all duration-200 hover:bg-white/[0.06] backdrop-blur-sm"
            >
              Lihat Layanan
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
