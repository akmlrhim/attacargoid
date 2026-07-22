import { lazy, Suspense } from "react";
import AppLayout from "../Components/Layout/AppLayout";
import PageHead from "../Components/Shared/PageHead";
import HeroSection from "../Components/Sections/Hero";
import Skeleton from "react-loading-skeleton";
import {
  BannerSkeleton,
  AdvantagesSkeleton,
  ProcessTimelineSkeleton,
  CoverageMapSkeleton,
  TestimonialsSkeleton,
  FaqSkeleton,
} from "../Components/Skeletons/SectionSkeletons";

// Below-fold sections are lazy-loaded so they don't block initial render.
// motion (RotatingText) and Three.js are excluded from the
// critical bundle this way — only downloaded after the hero is painted.
const ScrollReveal = lazy(() => import("../Components/ReactBits/ScrollReveal"));
const AboutSection = lazy(() => import("../Components/Sections/About"));
const AdvantagesSection = lazy(
  () => import("../Components/Sections/Advantages"),
);
const ServicesSection = lazy(() => import("../Components/Sections/Services"));
const ProcessTimeline = lazy(
  () => import("../Components/Sections/ProcessTimeline"),
);
const CoverageMap = lazy(() => import("../Components/Sections/CoverageMap"));
const TestimonialsSection = lazy(
  () => import("../Components/Sections/Testimonials"),
);
const FaqSection = lazy(() => import("../Components/Sections/FAQ"));

export default function Home({
  services = [],
  advantages = [],
  coverageRegions = [],
  reviews = [],
  googleRating = null,
}) {
  return (
    <>
      <PageHead
        title="Jasa Ekspedisi & Cargo Kalimantan Terpercaya"
        description="ATTA Cargo - jasa ekspedisi & cargo terpercaya, hub di Banjarmasin. Melayani pengiriman barang, distribusi & logistik ke seluruh Kalimantan Selatan & Tengah."
        path="/"
      />

      <HeroSection />

      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Suspense fallback={<Skeleton count={4} height={22} />}>
            <ScrollReveal
              baseOpacity={0}
              enableBlur
              baseRotation={4}
              blurStrength={10}
              textClassName="text-navy"
              wordAnimationEnd="bottom center"
            >
              ATTA Cargo hadir sebagai mitra penerusan barang dan last mile
              distribution terpercaya, dengan hub utama di Banjarmasin
              menjangkau seluruh Kalimantan Selatan & Tengah. Kami berkomitmen
              menghadirkan distribusi yang cepat, aman, dan terpantau — solusi
              logistik terpercaya agar bisnis Anda tumbuh kuat bersama.
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<BannerSkeleton align="left" />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<AdvantagesSkeleton />}>
        <AdvantagesSection advantages={advantages} />
      </Suspense>

      <Suspense fallback={<BannerSkeleton align="right" />}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={<ProcessTimelineSkeleton />}>
        <ProcessTimeline />
      </Suspense>

      <Suspense fallback={<CoverageMapSkeleton />}>
        <CoverageMap regions={coverageRegions} />
      </Suspense>

      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSection reviews={reviews} googleRating={googleRating} />
      </Suspense>

      <Suspense fallback={<FaqSkeleton />}>
        <FaqSection />
      </Suspense>
    </>
  );
}

Home.layout = (page) => <AppLayout>{page}</AppLayout>;
