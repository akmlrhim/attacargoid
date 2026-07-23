import { lazy, Suspense } from "react";
import { Link } from "@inertiajs/react";
import AppLayout from "../../Components/Layout/AppLayout";
import PageHead from "../../Components/Shared/PageHead";
import { ArticlesGridSkeleton } from "../../Components/Skeletons/SectionSkeletons";

const ArticlesGrid = lazy(() => import("../../Components/Sections/ArticlesGrid"));

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <PageHead
        title="Artikel & Berita Seputar Ekspedisi Kalimantan"
        tabTitle="Artikel"
        description="Kumpulan artikel dan berita terbaru seputar jasa ekspedisi, cargo, dan logistik dari ATTA Cargo untuk wilayah Kalimantan Selatan & Tengah."
        path="/artikel"
      />

      {/* ── Hero ── */}
      <section className="relative flex flex-col justify-center overflow-hidden bg-navy-dark py-32 sm:py-40">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 0%, #1a3a7a 0%, #060f26 65%)",
          }}
        />

        {/* Dot grid — left */}
        <svg
          className="pointer-events-none absolute left-0 top-0 h-full w-48 sm:w-72"
          aria-hidden="true"
          preserveAspectRatio="xMinYMid slice"
        >
          <defs>
            <pattern
              id="artikel-dots-left"
              x="0"
              y="0"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <rect x="3" y="3" width="5" height="5" rx="1" fill="white" fillOpacity="0.07" />
            </pattern>
            <linearGradient id="artikel-fade-left" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="artikel-mask-left">
              <rect width="100%" height="100%" fill="url(#artikel-fade-left)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#artikel-dots-left)" mask="url(#artikel-mask-left)" />
        </svg>

        {/* Dot grid — right */}
        <svg
          className="pointer-events-none absolute right-0 top-0 h-full w-48 sm:w-72"
          aria-hidden="true"
          preserveAspectRatio="xMaxYMid slice"
        >
          <defs>
            <pattern
              id="artikel-dots-right"
              x="0"
              y="0"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <rect x="3" y="3" width="5" height="5" rx="1" fill="white" fillOpacity="0.07" />
            </pattern>
            <linearGradient id="artikel-fade-right" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="artikel-mask-right">
              <rect width="100%" height="100%" fill="url(#artikel-fade-right)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#artikel-dots-right)" mask="url(#artikel-mask-right)" />
        </svg>

        {/* Content */}
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-sm mb-6">
            <Link href="/" className="text-white hover:text-white/90 transition-colors">
              Beranda
            </Link>
            <span className="text-white select-none">/</span>
            <span className="text-orange font-medium">Artikel</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Artikel &amp; Berita
          </h1>
          <p className="text-white text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Informasi dan wawasan terbaru seputar ekspedisi, cargo, dan logistik dari ATTA Cargo.
          </p>
        </div>
      </section>

      {/* Grid */}
      <Suspense fallback={<ArticlesGridSkeleton />}>
        <ArticlesGrid articles={articles} />
      </Suspense>
    </>
  );
}

ArticlesIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
