import { lazy, Suspense } from "react";
import AppLayout from "../Components/Layout/AppLayout";
import PageHead from "../Components/Shared/PageHead";
import useCompany from "../hooks/useCompany";
import { ContactSkeleton } from "../Components/Skeletons/SectionSkeletons";

const ContactSection = lazy(() => import("../Components/Sections/Contact"));

export default function Kontak() {
  const { phone, email } = useCompany();

  return (
    <>
      <PageHead
        title="Kontak Jasa Cargo & Ekspedisi Banjarmasin"
        tabTitle="Kontak"
        description={`Hubungi ATTA Cargo, jasa pengiriman barang Banjarmasin & ekspedisi Kalimantan Selatan. Telepon ${phone} atau email ${email}.`}
        path="/kontak"
      />

      {/* Hero */}
      <section className="relative flex flex-col justify-center overflow-hidden bg-navy-dark py-32 sm:py-40">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 0%, #1a3a7a 0%, #060f26 65%)",
          }}
        />

        {/* Dot grid - left */}
        <svg
          className="pointer-events-none absolute left-0 top-0 h-full w-48 sm:w-72"
          aria-hidden="true"
          preserveAspectRatio="xMinYMid slice"
        >
          <defs>
            <pattern
              id="kontak-dots-left"
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
            <linearGradient id="kontak-fade-left" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="kontak-mask-left">
              <rect
                width="100%"
                height="100%"
                fill="url(#kontak-fade-left)"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#kontak-dots-left)"
            mask="url(#kontak-mask-left)"
          />
        </svg>

        {/* Dot grid - right */}
        <svg
          className="pointer-events-none absolute right-0 top-0 h-full w-48 sm:w-72"
          aria-hidden="true"
          preserveAspectRatio="xMaxYMid slice"
        >
          <defs>
            <pattern
              id="kontak-dots-right"
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
              id="kontak-fade-right"
              x1="1"
              y1="0"
              x2="0"
              y2="0"
            >
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="kontak-mask-right">
              <rect
                width="100%"
                height="100%"
                fill="url(#kontak-fade-right)"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#kontak-dots-right)"
            mask="url(#kontak-mask-right)"
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
            <span className="text-white/25 select-none">/</span>
            <span className="text-orange font-medium">Kontak</span>
          </nav>
          <h1 className="hero-anim-title text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Hubungi ATTA Cargo, Jasa Cargo Banjarmasin
          </h1>
          <p className="hero-anim-sub text-white text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Ada pertanyaan seputar jasa pengiriman barang Banjarmasin atau
            ekspedisi Kalimantan Selatan &amp; Tengah? Tim ATTA Cargo siap
            membantu Anda.
          </p>
        </div>
      </section>

      <Suspense fallback={<ContactSkeleton />}>
        <ContactSection />
      </Suspense>
    </>
  );
}

Kontak.layout = (page) => <AppLayout>{page}</AppLayout>;
