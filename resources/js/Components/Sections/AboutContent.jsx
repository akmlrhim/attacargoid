import SectionHeading from "../Shared/SectionHeading";
import useScrollReveal from "../../hooks/useScrollReveal";
import { nilaiItems } from "../../constants/about";
import { CATALOG_PDF_URL } from "../../constants/company";

export default function AboutContent() {
  const ref1 = useScrollReveal();
  const ref3 = useScrollReveal();

  return (
    <>
      {/* ── Profil Perusahaan ── */}
      <section id="profil" className="bg-white py-20 sm:py-28" ref={ref1}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="sr sr-left">
              <SectionHeading title="Mengenal ATTA Cargo" center={false} />
              <div className="space-y-4 text-black leading-relaxed text-sm sm:text-base">
                <p>
                  <span className="font-semibold text-black">ATTA Cargo</span>{" "}
                  adalah perusahaan jasa logistik di bawah{" "}
                  <span className="font-semibold text-black">
                    PT. Tumbuh Kuat Sejahtera
                  </span>{" "}
                  yang berfokus pada layanan{" "}
                  <span className="text-orange font-semibold">
                    penerusan barang
                  </span>{" "}
                  dan{" "}
                  <span className="text-orange font-semibold">
                    last mile distribution
                  </span>{" "}
                  di wilayah Kalimantan.
                </p>
                <p>
                  Berbasis di{" "}
                  <span className="font-semibold">
                    Banjarmasin, Kalimantan Selatan
                  </span>
                  , kami melayani distribusi barang retail, FMCG, kebutuhan
                  industri, material proyek, hingga pengiriman khusus sesuai
                  kebutuhan operasional pelanggan.
                </p>
                <p>
                  Dengan jaringan yang terus berkembang di Kalimantan Selatan
                  dan Kalimantan Tengah, kami berkomitmen menjadi mitra logistik
                  pilihan yang mengedepankan kepercayaan, ketepatan, dan
                  profesionalisme.
                </p>
              </div>
            </div>

            <div className="sr sr-right">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/tentang-gudang-675.webp"
                  srcSet="/images/tentang-gudang-450.webp 450w, /images/tentang-gudang-675.webp 675w, /images/tentang-gudang-900.webp 900w"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt="ATTA Cargo warehouse operations"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-navy-dark/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-sm">
                    PT. Tumbuh Kuat Sejahtera
                  </p>
                  <p className="text-white text-xs mt-0.5">
                    Banjarmasin, Kalimantan Selatan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nilai-nilai Perusahaan ── */}
      <section className="bg-white py-20 sm:py-28" ref={ref3}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="sr">
            <SectionHeading
              title="Prinsip yang Kami Pegang"
              subtitle="Enam nilai inti yang menjadi landasan setiap langkah operasional ATTA Cargo."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-4">
            {nilaiItems.map((item, i) => (
              <div
                key={item.title}
                className="sr flex flex-col p-5 rounded-2xl relative overflow-hidden"
                style={{
                  backgroundColor: item.bg,
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <h3
                  className="text-xl font-black leading-tight mb-2"
                  style={{ color: item.titleColor }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-black leading-relaxed">
                  {item.desc}
                </p>

                {/* Illustration - bleeds to the bottom edge and fades into the
                    card background so its lower part is only partially visible. */}
                <div className="relative -mx-5 -mb-5 mt-auto px-5 max-h-40 overflow-hidden">
                  {item.illustration}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                    style={{
                      background: `linear-gradient(to top, ${item.bg} 12%, ${item.bg}00 100%)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl py-16 sm:py-24 px-6"
          style={{
            background:
              "linear-gradient(135deg, #dbeafe 0%, #eff6ff 35%, #f5f8ff 65%, #ffffff 100%)",
          }}
        >
          {/* Pixel grid - left */}
          <svg
            className="pointer-events-none absolute left-0 top-0 h-full w-52 sm:w-72"
            aria-hidden="true"
            preserveAspectRatio="xMinYMid slice"
          >
            <defs>
              <pattern
                id="dots-left"
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
              <linearGradient id="fade-left" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="mask-left">
                <rect width="100%" height="100%" fill="url(#fade-left)" />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#dots-left)"
              mask="url(#mask-left)"
            />
          </svg>

          {/* Pixel grid - right */}
          <svg
            className="pointer-events-none absolute right-0 top-0 h-full w-52 sm:w-72"
            aria-hidden="true"
            preserveAspectRatio="xMaxYMid slice"
          >
            <defs>
              <pattern
                id="dots-right"
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
              <linearGradient id="fade-right" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="mask-right">
                <rect width="100%" height="100%" fill="url(#fade-right)" />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#dots-right)"
              mask="url(#mask-right)"
            />
          </svg>

          {/* Content */}
          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black-dark leading-tight mb-5">
              Mulai Distribusi yang Andal
              <br />
              Bersama ATTA Cargo
            </h2>
            <p className="text-black text-base sm:text-lg max-w-lg mx-auto mb-10">
              Setiap paket terjamin, setiap pengiriman terpantau, dan setiap
              mitra mendapat pelayanan terbaik di seluruh Kalimantan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/kontak"
                className="inline-flex items-center justify-center gap-2 bg-navy-dark hover:bg-navy text-white font-bold px-7 py-3.5 rounded-full text-sm transition-colors"
              >
                Hubungi Kami
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href={CATALOG_PDF_URL}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-black-dark font-bold px-7 py-3.5 rounded-full text-sm transition-colors border border-navy-dark/15"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                  />
                </svg>
                Download Company Profile
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
