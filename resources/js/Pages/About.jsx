import { Head } from "@inertiajs/react";
import AppLayout from "../Components/Layout/AppLayout";
import SectionHeading from "../Components/Shared/SectionHeading";
import useScrollReveal from "../hooks/useScrollReveal";
import DotField from "../Components/ReactBits/DotField";
import Aurora from "../Components/ReactBits/Aurora";

const WA_URL = `https://wa.me/62811510808?text=${encodeURIComponent("Halo ATTA CARGO, saya ingin berkonsultasi mengenai kebutuhan logistik saya.")}`;

const misiItems = [
  "Menyediakan layanan distribusi yang tepat waktu dan aman di seluruh wilayah Kalimantan",
  "Membangun jaringan mitra logistik yang luas untuk menjangkau lebih banyak daerah",
  "Memanfaatkan teknologi untuk efisiensi dan transparansi di setiap proses operasional",
  "Memberikan pelayanan yang responsif dan profesional kepada setiap mitra bisnis",
  "Berkontribusi aktif pada pertumbuhan ekonomi regional Kalimantan",
];

const nilaiItems = [
  {
    title: "Amanah",
    desc: "Setiap paket diperlakukan dengan tanggung jawab penuh dan kejujuran.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
  {
    title: "Tepat Waktu",
    desc: "Ketepatan pengiriman adalah komitmen kami kepada setiap pelanggan.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Profesional",
    desc: "Standar pelayanan tinggi di setiap titik distribusi dan operasional.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
      </svg>
    ),
  },
  {
    title: "Inovatif",
    desc: "Terus berkembang dengan solusi logistik yang modern dan efisien.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
  },
  {
    title: "Kolaboratif",
    desc: "Tumbuh bersama mitra, pelanggan, dan komunitas lokal Kalimantan.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Integritas",
    desc: "Transparansi dan kejujuran dalam setiap transaksi dan relasi bisnis.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
];

export default function About() {
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();

  return (
    <>
      <Head title="Tentang Kami — ATTA Cargo" />
      <AppLayout>
        <section className="bg-navy-dark relative overflow-hidden min-h-[70vh] flex items-end sm:items-center">
          <Aurora />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-16 sm:py-40 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight hero-anim-title">
                Tentang Kami
              </h1>
              <p className="text-white/60 text-base sm:text-lg mt-6 max-w-xl leading-relaxed hero-anim-sub">
                Menghubungkan bisnis Anda dengan solusi distribusi yang andal,
                efisien, dan terpercaya di seluruh wilayah Kalimantan.
              </p>
            </div>
          </div>
        </section>

        {/* ── Profil Perusahaan ── */}
        <section className="bg-white py-20 sm:py-28" ref={ref1}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              <div className="sr sr-left">
                <SectionHeading
                  tag="Profil Perusahaan"
                  title="Mengenal ATTA Cargo"
                  center={false}
                />
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                  <p>
                    <span className="font-semibold text-navy">ATTA Cargo</span>{" "}
                    adalah perusahaan jasa logistik di bawah{" "}
                    <span className="font-semibold text-navy">
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
                    dan Kalimantan Tengah, kami berkomitmen menjadi mitra
                    logistik pilihan yang mengedepankan kepercayaan, ketepatan,
                    dan profesionalisme.
                  </p>
                </div>
              </div>

              <div className="sr sr-right">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80"
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
                    <p className="text-white/60 text-xs mt-0.5">
                      Banjarmasin, Kalimantan Selatan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Visi & Misi ── */}
        <section
          className="bg-gray-50 py-20 sm:py-28 relative overflow-hidden"
          ref={ref2}
        >
          <div className="absolute inset-0 pointer-events-none">
            <DotField
              dotRadius={1.5}
              dotSpacing={20}
              bulgeStrength={60}
              glowRadius={140}
              gradientFrom="rgba(11,31,77,0.18)"
              gradientTo="rgba(245,166,35,0.10)"
              glowColor="rgba(11,31,77,0.06)"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="sr">
              <SectionHeading tag="Arah Kami" title="Visi &amp; Misi" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-4">
              {/* Visi */}
              <div className="sr sr-left bg-navy rounded-3xl p-8 sm:p-10 text-white">
                <div className="inline-flex items-center gap-2.5 mb-5">
                  <span className="text-orange font-bold text-sm uppercase tracking-widest">
                    Visi
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black leading-snug mb-4">
                  Menjadi perusahaan logistik pilihan utama di Kalimantan
                </h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  Menjadi mitra distribusi terdepan yang menghubungkan pelaku
                  bisnis di Kalimantan dengan solusi logistik yang andal,
                  efisien, dan terpercaya — mendukung setiap rantai pasok dari
                  hulu hingga hilir untuk pertumbuhan bisnis yang berkelanjutan.
                </p>
              </div>

              {/* Misi */}
              <div className="sr sr-right bg-white rounded-3xl p-8 sm:p-10 border border-gray-100">
                <div className="inline-flex items-center gap-2.5 mb-5">
                  <span className="text-orange font-bold text-sm uppercase tracking-widest">
                    Misi
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-navy leading-snug mb-6">
                  Langkah nyata menuju visi bersama
                </h3>
                <ul className="space-y-3">
                  {misiItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-orange"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-600 text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Nilai-nilai Perusahaan ── */}
        <section className="bg-white py-20 sm:py-28" ref={ref3}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="sr">
              <SectionHeading
                tag="Nilai Kami"
                title="Prinsip yang Kami Pegang"
                subtitle="Enam nilai inti yang menjadi landasan setiap langkah operasional ATTA Cargo."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
              {nilaiItems.map((item, i) => (
                <div
                  key={item.title}
                  className="sr group p-6 rounded-2xl border border-gray-100 hover:border-orange/30 transition-colors duration-300 bg-white"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-4 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-navy text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-navy-dark py-20 sm:py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <DotField
              dotRadius={1.5}
              dotSpacing={20}
              bulgeStrength={60}
              glowRadius={140}
              gradientFrom="rgba(255,255,255,0.15)"
              gradientTo="rgba(245,166,35,0.12)"
              glowColor="rgba(245,166,35,0.12)"
            />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Siap Bermitra
              <br />
              <span className="text-orange">Bersama Kami?</span>
            </h2>
            <p className="text-white/60 mt-4 text-base sm:text-lg max-w-lg mx-auto">
              Hubungi tim kami dan dapatkan solusi logistik terbaik untuk
              kebutuhan distribusi bisnis Anda di Kalimantan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 shrink-0"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Chat WhatsApp
              </a>
              <a
                href="/#kontak"
                className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-colors border border-white/20"
              >
                Kirim Pesan
              </a>
            </div>
          </div>
        </section>
      </AppLayout>
    </>
  );
}
