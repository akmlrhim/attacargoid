import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

/**
 * Loading skeletons that mirror the shape of each lazy-loaded section so the
 * layout never jumps while its JS chunk is still downloading. Each skeleton
 * reuses the same wrapper spacing (padding, max-width, background) as the real
 * section it stands in for.
 */

/* Light theme for sections on white / light-gray backgrounds. */
function LightTheme({ children }) {
  return (
    <SkeletonTheme baseColor="#e7ebf1" highlightColor="#f4f7fa">
      {children}
    </SkeletonTheme>
  );
}

/* Dark theme for the navy full-bleed hero-style sections. */
function DarkTheme({ children }) {
  return (
    <SkeletonTheme
      baseColor="rgba(255,255,255,0.09)"
      highlightColor="rgba(255,255,255,0.18)"
    >
      {children}
    </SkeletonTheme>
  );
}

/* ── Intro text reveal (the paragraph under the hero) ─────────── */
export function TextRevealSkeleton() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <LightTheme>
          <Skeleton count={4} height={22} className="mb-3" />
          <Skeleton width="70%" height={22} />
        </LightTheme>
      </div>
    </section>
  );
}

/* ── About / Services (full-bleed navy sections with side text) ─ */
export function BannerSkeleton({ align = "left" }) {
  return (
    <section className="relative overflow-hidden min-h-[75vh] flex items-center bg-navy-dark">
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/70 to-navy-dark/40" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
        <div
          className={`max-w-lg ${align === "right" ? "ml-auto" : ""}`}
        >
          <DarkTheme>
            <Skeleton width="55%" height={46} className="mb-6" />
            <Skeleton count={3} height={16} className="mb-2" />
            <Skeleton width="80%" height={16} className="mb-10" />
            <Skeleton width={180} height={46} borderRadius={9999} />
          </DarkTheme>
        </div>
      </div>
    </section>
  );
}

/* ── Advantages grid ─────────────────────────────────────────── */
export function AdvantagesSkeleton() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20">
        <LightTheme>
          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <Skeleton width="70%" height={34} className="mx-auto mb-2" />
            <Skeleton width="45%" height={34} className="mx-auto" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-3xl min-h-80 bg-gray-50"
              >
                <div className="p-6 sm:p-7 pb-0">
                  <Skeleton width="80%" height={20} className="mb-4" />
                  <Skeleton count={3} height={11} className="mb-1.5" />
                </div>
                <div className="mt-auto">
                  <Skeleton height={176} borderRadius={0} />
                </div>
              </div>
            ))}
          </div>
        </LightTheme>
      </div>
    </section>
  );
}

/* ── Process timeline ────────────────────────────────────────── */
export function ProcessTimelineSkeleton() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <LightTheme>
          {/* Heading */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <Skeleton width="55%" height={30} className="mx-auto mb-3" />
            <Skeleton width="80%" height={14} className="mx-auto" />
          </div>

          {/* Vertical numbered steps */}
          <div className="space-y-14 sm:space-y-20 mt-6 sm:mt-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 items-center"
              >
                <div>
                  <div className="flex gap-3 sm:gap-4">
                    <Skeleton width={28} height={30} />
                    <div className="flex-1">
                      <Skeleton width="60%" height={22} className="mb-2" />
                      <Skeleton count={2} height={14} />
                    </div>
                  </div>
                </div>
                <div>
                  <Skeleton
                    className="block! max-w-xs"
                    height={210}
                    borderRadius={16}
                  />
                </div>
              </div>
            ))}
          </div>
        </LightTheme>
      </div>
    </section>
  );
}

/* ── Coverage map ────────────────────────────────────────────── */
export function CoverageMapSkeleton() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <LightTheme>
          {/* Heading */}
          <div className="max-w-2xl mx-auto text-center mb-8">
            <Skeleton width="60%" height={30} className="mx-auto mb-3" />
            <Skeleton width="85%" height={14} className="mx-auto" />
          </div>

          {/* Region tabs */}
          <div className="flex gap-2.5 justify-center mb-8">
            <Skeleton width={180} height={42} borderRadius={12} />
            <Skeleton width={180} height={42} borderRadius={12} />
          </div>

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
            {/* Map */}
            <div className="lg:col-span-3">
              <Skeleton
                style={{ aspectRatio: "1.5", display: "block" }}
                borderRadius={24}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="flex items-center gap-1.5 mb-2 px-1">
                <Skeleton width={14} height={14} circle />
                <Skeleton width="70%" height={11} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} height={42} borderRadius={12} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Skeleton width={260} height={14} />
          </div>
        </LightTheme>
      </div>
    </section>
  );
}

/* ── Testimonials ────────────────────────────────────────────── */
function ReviewCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Skeleton width={36} height={36} circle />
          <div>
            <Skeleton width={90} height={12} className="mb-1" />
            <Skeleton width={60} height={10} />
          </div>
        </div>
        <Skeleton width={16} height={16} circle />
      </div>
      <Skeleton width={80} height={12} />
      <Skeleton count={3} height={12} className="mb-1" />
    </div>
  );
}

export function TestimonialsSkeleton() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <LightTheme>
          <div className="flex flex-col items-center sm:flex-row sm:items-end sm:justify-between gap-5">
            <Skeleton width={220} height={34} />
            <Skeleton width={230} height={64} borderRadius={16} />
          </div>
        </LightTheme>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <LightTheme>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="break-inside-avoid mb-4 sm:mb-5">
                <ReviewCardSkeleton />
              </div>
            ))}
          </div>
        </LightTheme>
      </div>
    </section>
  );
}

/* ── FAQ accordion ───────────────────────────────────────────── */
export function FaqSkeleton() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <LightTheme>
          <div className="text-center mb-12">
            <Skeleton width="70%" height={30} className="mx-auto mb-3" />
            <Skeleton width="85%" height={14} className="mx-auto" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-b border-gray-200">
                <div className="flex items-center justify-between gap-2 py-1">
                  <Skeleton width={i === 0 ? "55%" : "70%"} height={16} />
                  <Skeleton width={28} height={28} circle />
                </div>
                {i === 0 && (
                  <div className="pb-5">
                    <Skeleton count={2} height={13} className="mb-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Skeleton width={200} height={14} />
          </div>
        </LightTheme>
      </div>
    </section>
  );
}

/* ── Price calculator ────────────────────────────────────────── */
export function PriceCalculatorSkeleton() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 grid grid-cols-1 lg:grid-cols-2">
          {/* Inputs */}
          <div className="p-7 sm:p-10 space-y-7">
            <LightTheme>
              <Skeleton width="45%" height={26} />
              <div className="space-y-5">
                <div>
                  <Skeleton width={140} height={12} className="mb-2" />
                  <Skeleton height={48} borderRadius={12} />
                </div>
                <div>
                  <Skeleton width={120} height={12} className="mb-2" />
                  <Skeleton height={48} borderRadius={12} />
                </div>
                <div>
                  <Skeleton width={100} height={12} className="mb-2.5" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} height={64} borderRadius={12} />
                    ))}
                  </div>
                </div>
              </div>
            </LightTheme>
          </div>

          {/* Result — default empty state (no estimate yet) */}
          <div className="bg-navy p-7 sm:p-10 flex flex-col">
            <DarkTheme>
              <Skeleton width="60%" height={14} />
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <Skeleton circle width={48} height={48} className="mb-4" />
                <Skeleton width={180} height={14} />
              </div>
            </DarkTheme>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ─────────────────────────────────────────────────── */
export function ContactSkeleton() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <LightTheme>
          <div className="max-w-2xl mx-auto text-center mb-10">
            <Skeleton width="70%" height={30} className="mx-auto mb-3" />
            <Skeleton width="85%" height={14} className="mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Info */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton width={36} height={36} borderRadius={12} />
                  <div className="flex-1">
                    <Skeleton width={90} height={11} className="mb-1.5" />
                    <Skeleton width="60%" height={14} />
                  </div>
                </div>
              ))}

              {/* Jam Operasional */}
              <div className="rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Skeleton width={16} height={16} circle />
                  <Skeleton width={110} height={14} />
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton width={80} height={12} />
                      <Skeleton width={110} height={12} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-100">
              <Skeleton width={120} height={18} className="mb-5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Skeleton height={44} borderRadius={12} />
                <Skeleton height={44} borderRadius={12} />
              </div>
              <Skeleton height={110} borderRadius={12} className="mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Skeleton height={44} borderRadius={12} />
                <Skeleton height={44} borderRadius={12} />
              </div>
              <Skeleton height={48} borderRadius={12} />
            </div>
          </div>

          <Skeleton height={380} borderRadius={16} className="mt-12" />
        </LightTheme>
      </div>
    </section>
  );
}

/* ── About content (Tentang Kami page, below the hero) ───────── */
export function AboutContentSkeleton() {
  return (
    <LightTheme>
      {/* Profil: text + image */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <Skeleton width="55%" height={30} className="mb-5" />
            <Skeleton count={3} height={15} className="mb-2" />
            <Skeleton count={3} height={15} className="mb-2" />
            <Skeleton width="70%" height={15} />
          </div>
          <Skeleton
            style={{ aspectRatio: "4 / 3", display: "block" }}
            borderRadius={24}
          />
        </div>
      </section>

      {/* Nilai-nilai: 6-card grid */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <Skeleton width="55%" height={30} className="mx-auto mb-3" />
            <Skeleton width="80%" height={14} className="mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-5 rounded-2xl bg-gray-50">
                <Skeleton width="60%" height={22} className="mb-2" />
                <Skeleton count={3} height={13} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl py-16 sm:py-24 px-6 bg-gray-50">
          <div className="max-w-2xl mx-auto text-center">
            <Skeleton width="75%" height={34} className="mx-auto mb-2" />
            <Skeleton width="55%" height={34} className="mx-auto mb-5" />
            <Skeleton width="80%" height={16} className="mx-auto mb-2" />
            <Skeleton width="55%" height={16} className="mx-auto mb-10" />
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Skeleton width={160} height={52} borderRadius={9999} />
              <Skeleton width={230} height={52} borderRadius={9999} />
            </div>
          </div>
        </div>
      </section>
    </LightTheme>
  );
}

/* ── Latest articles (Home page) ─────────────────────────────── */
export function ArticlesSkeleton() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <LightTheme>
          <div className="flex items-end justify-between gap-4 mb-10 sm:mb-14">
            <Skeleton width={260} height={34} />
            <Skeleton width={100} height={16} className="hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            <div>
              <Skeleton
                style={{ aspectRatio: "16 / 10", display: "block" }}
                borderRadius={16}
                className="mb-5"
              />
              <Skeleton width="85%" height={24} className="mb-2" />
              <Skeleton width="60%" height={24} className="mb-3" />
              <Skeleton width={120} height={14} />
            </div>

            <div className="flex flex-col divide-y divide-gray-100">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <Skeleton width={88} height={88} borderRadius={12} />
                  <div className="flex-1">
                    <Skeleton width="90%" height={16} className="mb-1.5" />
                    <Skeleton width="70%" height={16} className="mb-2" />
                    <Skeleton width={90} height={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LightTheme>
      </div>
    </section>
  );
}

/* ── Articles grid (Artikel index page) ──────────────────────── */
export function ArticlesGridSkeleton() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <LightTheme>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl overflow-hidden border border-gray-100 bg-white"
              >
                <Skeleton
                  style={{ aspectRatio: "16 / 10", display: "block" }}
                  borderRadius={0}
                />
                <div className="p-5">
                  <Skeleton width="90%" height={18} className="mb-1.5" />
                  <Skeleton width="60%" height={18} className="mb-3" />
                  <Skeleton count={2} height={12} className="mb-1" />
                  <Skeleton width={90} height={12} className="mt-3" />
                </div>
              </div>
            ))}
          </div>
        </LightTheme>
      </div>
    </section>
  );
}

/* ── Services list (Layanan page) ────────────────────────────── */
export function ServicesListSkeleton() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8 sm:space-y-12">
        <LightTheme>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-gray-100 bg-white ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:w-[45%] aspect-[4/3] lg:aspect-auto lg:min-h-[320px]">
                <Skeleton height="100%" borderRadius={0} style={{ display: "block", height: "100%" }} />
              </div>
              <div className="flex-1 p-6 sm:p-8 lg:p-10">
                <Skeleton width="65%" height={28} className="mb-3" />
                <Skeleton count={3} height={14} className="mb-2" />
                <Skeleton width="50%" height={14} className="mb-5" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-2.5">
                      <Skeleton width={16} height={16} circle />
                      <Skeleton width="70%" height={13} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </LightTheme>
      </div>
    </section>
  );
}
