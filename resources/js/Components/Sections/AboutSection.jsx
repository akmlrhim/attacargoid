import useScrollReveal from "../../hooks/useScrollReveal";
import SectionHeading from "../Shared/SectionHeading";
import DotField from "../ReactBits/DotField";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80";

const stats = [
  { value: "22+", label: "Kota Terjangkau" },
  { value: "2", label: "Provinsi Kalimantan" },
  { value: "5+", label: "Kategori Layanan" },
];

export default function AboutSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="tentang"
      ref={ref}
      className="bg-gray-50 py-16 sm:py-24 relative overflow-hidden"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left: text + stats */}
          <div className="sr sr-left">
            <SectionHeading
              tag="Tentang Kami"
              title="Mitra Logistik Andal di Kalimantan"
              center={false}
            />

            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-[0.95rem]">
              <p>
                <span className="font-semibold text-navy">ATTA Cargo</span>{" "}
                merupakan perusahaan jasa logistik yang berfokus pada layanan{" "}
                <span className="text-orange font-semibold">
                  penerusan barang
                </span>{" "}
                (
                <span className="text-orange font-semibold">
                  last mile distribution
                </span>{" "}
                &amp;{" "}
                <span className="text-orange font-semibold">
                  regional forwarding
                </span>
                ) melalui{" "}
                <span className="text-orange font-semibold">
                  hub utama di Banjarmasin
                </span>
                .
              </p>
              <p>
                Kami menangani distribusi barang retail, FMCG, kebutuhan
                industri, material proyek, hingga pengiriman khusus sesuai
                kebutuhan operasional pelanggan di seluruh wilayah Kalimantan
                Selatan dan Kalimantan Tengah.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-7 border-t border-gray-200">
              {stats.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <p className="text-3xl sm:text-4xl font-black text-navy">
                    {s.value}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: real photo */}
          <div className="sr sr-right">
            <div className="relative">
              {/* Photo container */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-navy/20">
                <img
                  src={ABOUT_IMAGE}
                  alt="ATTA Cargo warehouse operations"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                {/* Bottom gradient for overlay cards */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
