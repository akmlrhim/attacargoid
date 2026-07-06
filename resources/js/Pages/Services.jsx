import { lazy, Suspense } from "react";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AppLayout from "../Components/Layout/AppLayout";
import { ServicesListSkeleton } from "../Components/Skeletons/SectionSkeletons";

const ServicesList = lazy(() => import("../Components/Sections/ServicesList"));

export default function Services({ services = [] }) {
  return (
    <>
      <Head title="Layanan" />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-dark">
        {/* Background photo */}
        <div className="absolute inset-0">
          <img
            src="/images/layanan-hero-1200.webp"
            srcSet="/images/layanan-hero-800.webp 800w, /images/layanan-hero-1200.webp 1200w, /images/layanan-hero-1920.webp 1920w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-dark/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-navy-dark/20 to-transparent" />
        </div>

        {/* Dot grid — left */}
        <svg
          className="pointer-events-none absolute left-0 top-0 h-full w-48 sm:w-72"
          aria-hidden="true"
          preserveAspectRatio="xMinYMid slice"
        >
          <defs>
            <pattern
              id="layanan-dots-left"
              x="0"
              y="0"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="3"
                y="3"
                width="5"
                height="5"
                rx="1"
                fill="white"
                fillOpacity="0.07"
              />
            </pattern>
            <linearGradient
              id="layanan-fade-left"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="layanan-mask-left">
              <rect
                width="100%"
                height="100%"
                fill="url(#layanan-fade-left)"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#layanan-dots-left)"
            mask="url(#layanan-mask-left)"
          />
        </svg>

        {/* Dot grid — right */}
        <svg
          className="pointer-events-none absolute right-0 top-0 h-full w-48 sm:w-72"
          aria-hidden="true"
          preserveAspectRatio="xMaxYMid slice"
        >
          <defs>
            <pattern
              id="layanan-dots-right"
              x="0"
              y="0"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="3"
                y="3"
                width="5"
                height="5"
                rx="1"
                fill="white"
                fillOpacity="0.07"
              />
            </pattern>
            <linearGradient
              id="layanan-fade-right"
              x1="1"
              y1="0"
              x2="0"
              y2="0"
            >
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="layanan-mask-right">
              <rect
                width="100%"
                height="100%"
                fill="url(#layanan-fade-right)"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#layanan-dots-right)"
            mask="url(#layanan-mask-right)"
          />
        </svg>

        {/* Content */}
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <nav
            aria-label="Breadcrumb"
            className="hero-anim-badge flex items-center justify-center gap-1.5 text-sm mb-6"
          >
            <a
              href="/"
              className="text-white hover:text-white/90 transition-colors"
            >
              Beranda
            </a>
            <span className="text-white select-none">/</span>
            <span className="text-orange font-medium">Layanan</span>
          </nav>
          <h1 className="hero-anim-title text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Layanan Kami
          </h1>
          <p className="hero-anim-sub text-white text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Solusi distribusi lengkap untuk kebutuhan bisnis Anda di seluruh
            wilayah Kalimantan.
          </p>
        </div>
      </section>

      {/* Services List */}
      <Suspense fallback={<ServicesListSkeleton />}>
        <ServicesList services={services} />
      </Suspense>

      {/* CTA Section */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl py-16 sm:py-24 px-6"
          style={{
            background:
              "linear-gradient(135deg, #dbeafe 0%, #eff6ff 35%, #f5f8ff 65%, #ffffff 100%)",
          }}
        >
          {/* Pixel grid — left */}
          <svg
            className="pointer-events-none absolute left-0 top-0 h-full w-52 sm:w-72"
            aria-hidden="true"
            preserveAspectRatio="xMinYMid slice"
          >
            <defs>
              <pattern
                id="services-cta-dots-left"
                x="0"
                y="0"
                width="14"
                height="14"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="3"
                  y="3"
                  width="5"
                  height="5"
                  rx="1"
                  fill="#3b82f6"
                  fillOpacity="0.45"
                />
              </pattern>
              <linearGradient
                id="services-cta-fade-left"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="services-cta-mask-left">
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#services-cta-fade-left)"
                />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#services-cta-dots-left)"
              mask="url(#services-cta-mask-left)"
            />
          </svg>

          {/* Pixel grid — right */}
          <svg
            className="pointer-events-none absolute right-0 top-0 h-full w-52 sm:w-72"
            aria-hidden="true"
            preserveAspectRatio="xMaxYMid slice"
          >
            <defs>
              <pattern
                id="services-cta-dots-right"
                x="0"
                y="0"
                width="14"
                height="14"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="3"
                  y="3"
                  width="5"
                  height="5"
                  rx="1"
                  fill="#3b82f6"
                  fillOpacity="0.45"
                />
              </pattern>
              <linearGradient
                id="services-cta-fade-right"
                x1="1"
                y1="0"
                x2="0"
                y2="0"
              >
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="services-cta-mask-right">
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#services-cta-fade-right)"
                />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#services-cta-dots-right)"
              mask="url(#services-cta-mask-right)"
            />
          </svg>

          {/* Content */}
          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black-dark leading-tight mb-5">
              Tidak Yakin Layanan Mana yang Tepat?
            </h2>
            <p className="text-black text-base sm:text-lg max-w-lg mx-auto mb-10">
              Tim kami siap membantu Anda menemukan solusi distribusi terbaik
              sesuai kebutuhan bisnis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.visit("/kontak")}
                className="inline-flex items-center justify-center gap-2 bg-navy-dark hover:bg-navy text-white font-bold px-7 py-3.5 rounded-full text-sm transition-colors"
              >
                Konsultasi Sekarang
              </button>
              <button
                onClick={() => router.visit("/kalkulator")}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-black-dark font-bold px-7 py-3.5 rounded-full text-sm transition-colors border border-navy-dark/15"
              >
                Hitung Tarif
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Services.layout = (page) => <AppLayout>{page}</AppLayout>;
