import { Link } from "@inertiajs/react";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function ServicesSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="layanan"
      ref={ref}
      className="relative overflow-hidden min-h-[75vh] flex items-center"
    >
      {/* Background image */}
      <img
        src="/images/layanan.webp"
        alt="ATTA Cargo distribution services"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient overlay — dark on right, transparent on left */}
      <div className="absolute inset-0 bg-gradient-to-l from-navy-dark/90 via-navy-dark/60 to-transparent" />

      {/* Content — right-aligned */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full flex justify-end">
        <div className="sr sr-right max-w-lg">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Layanan Kami
          </h2>

          <p className="text-white text-base sm:text-lg leading-relaxed mb-10">
            Lima kategori layanan logistik dan paket distribusi siap pakai
            dirancang khusus untuk memenuhi kebutuhan bisnis Anda di seluruh
            wilayah Kalimantan.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/layanan"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white text-white text-sm font-semibold hover:bg-white hover:text-navy-dark transition-colors duration-200"
            >
              Lihat Layanan
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
