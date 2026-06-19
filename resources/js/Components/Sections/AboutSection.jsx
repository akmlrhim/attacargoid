import { Link } from "@inertiajs/react";
import useScrollReveal from "../../hooks/useScrollReveal";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80";

export default function AboutSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="tentang"
      ref={ref}
      className="relative overflow-hidden min-h-[75vh] flex items-center"
    >
      {/* Background image */}
      <img
        src={ABOUT_IMAGE}
        alt="ATTA Cargo operations"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient overlay — gelap di kiri, transparan di kanan */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/60 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
        <div className="sr sr-left max-w-lg">
          <span className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
            Sekilas ATTA Cargo
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Tentang Kami
          </h2>

          <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-10">
            Mitra distribusi terpercaya yang menghubungkan bisnis Anda dengan
            jaringan logistik andal di seluruh wilayah Kalimantan — dari
            Banjarmasin hingga pelosok Kalimantan Tengah.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white text-white text-sm font-semibold hover:bg-white hover:text-navy-dark transition-colors duration-200"
            >
              Selengkapnya
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>

            <Link
              href="/tentang-kami#visi"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/50 text-white text-sm font-semibold hover:border-white hover:bg-white/10 transition-colors duration-200"
            >
              Visi &amp; Misi
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
