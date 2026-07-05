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
      <AppLayout>
        {/* ── Hero ── */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-dark">
          {/* Background photo */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1920&q=80"
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
        <section className="bg-navy-dark py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
              Tidak yakin layanan mana yang tepat?
            </h2>
            <p className="text-white mb-8 text-base sm:text-lg">
              Tim kami siap membantu Anda menemukan solusi distribusi terbaik
              sesuai kebutuhan bisnis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.visit("/kontak")}
                className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors"
              >
                Konsultasi Gratis
              </button>
              <button
                onClick={() => router.visit("/kalkulator")}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors"
              >
                Hitung Tarif
              </button>
            </div>
          </div>
        </section>
      </AppLayout>
    </>
  );
}
