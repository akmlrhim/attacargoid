import SectionHeading from "../Shared/SectionHeading";

const values = [
  {
    id: 1,
    bg: "#e8f5f1",
    titleColor: "#0f6b4f",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Pengiriman Terjamin",
    description:
      "Setiap paket ditangani dengan standar keamanan tertinggi—dari proses pickup hingga tiba selamat di tujuan Anda.",
    illustration: <ChatIllustration />,
  },
  {
    id: 2,
    bg: "#f0eeff",
    titleColor: "#5b21b6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
      </svg>
    ),
    title: "Pantau Real-Time",
    description:
      "Lacak status pengiriman kapan saja dan di mana saja. Informasi selalu transparan, tanpa informasi yang membingungkan.",
    illustration: <TrackingIllustration />,
  },
  {
    id: 3,
    bg: "#f4f4f5",
    titleColor: "#374151",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    title: "Jangkauan Luas",
    description:
      "Menjangkau ratusan titik pengiriman di seluruh Kalimantan Selatan & Tengah tanpa perlu pengaturan khusus.",
    illustration: <CoverageIllustration />,
  },
  {
    id: 4,
    bg: "#eef4ff",
    titleColor: "#1d4ed8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Layanan Prima",
    description:
      "Tim kami siap membantu dari proses penjemputan, pengurusan dokumen, pengantaran, hingga konfirmasi penerimaan.",
    illustration: <ServiceIllustration />,
  },
];

function ChatIllustration() {
  return (
    <div className="mt-auto pt-6 space-y-2.5 px-1">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 12 12" fill="white" className="w-2.5 h-2.5">
            <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </span>
        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[85%]">
          <p className="text-[10px] font-semibold text-emerald-600 mb-0.5">Tepat Waktu</p>
          <p className="text-[11px] text-gray-600 leading-snug">Paket #45623 sudah diterima oleh Bpk. Ahmad di Palangkaraya.</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 w-5 h-5 rounded-full bg-orange flex items-center justify-center shrink-0">
          <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
            <circle cx="6" cy="6" r="4" stroke="white" strokeWidth="1.5" />
            <path d="M6 4v2l1 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[85%]">
          <p className="text-[10px] font-semibold text-orange mb-0.5">Estimasi Tiba</p>
          <p className="text-[11px] text-gray-600 leading-snug">Paket Anda estimasi tiba besok pukul 14.00 WITA.</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 w-5 h-5 rounded-full bg-navy flex items-center justify-center shrink-0">
          <svg viewBox="0 0 12 12" className="w-2.5 h-2.5">
            <path d="M2 6l2.5 2.5L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </span>
        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[85%]">
          <p className="text-[10px] font-semibold text-navy mb-0.5">Bahasa Natural</p>
          <p className="text-[11px] text-gray-600 leading-snug">Tentu! Kami akan siapkan pengiriman berikutnya secepatnya.</p>
        </div>
      </div>
    </div>
  );
}

function TrackingIllustration() {
  return (
    <div className="mt-auto pt-6 flex gap-3">
      {/* Left panel */}
      <div className="flex-1 bg-white/70 rounded-xl p-3 shadow-sm">
        <p className="text-[9px] font-bold text-violet-700 mb-2 uppercase tracking-wide">Status</p>
        <div className="space-y-1.5">
          {["Pickup", "Sortir Hub", "Dalam Perjalanan"].map((s) => (
            <div key={s} className="h-2 rounded-full bg-violet-100" style={{ width: s === "Pickup" ? "80%" : s === "Sortir Hub" ? "60%" : "90%" }} />
          ))}
        </div>
      </div>
      {/* Right panel */}
      <div className="flex-1 bg-white/70 rounded-xl p-3 shadow-sm">
        <p className="text-[9px] font-bold text-violet-700 mb-2 uppercase tracking-wide">Riwayat</p>
        <div className="space-y-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-2 rounded-full bg-violet-100" style={{ width: i === 1 ? "70%" : i === 2 ? "50%" : "85%" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CoverageIllustration() {
  return (
    <div className="mt-auto pt-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <circle cx="8" cy="8" r="6" stroke="#374151" strokeWidth="1.5" />
            <path d="M8 5v3l2 1" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 leading-none">#Titik</p>
          <p className="text-base font-black text-gray-800 leading-tight">
            99+ <span className="text-orange">•</span>
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {["Banjarmasin", "Banjarbaru", "Palangkaraya", "Barito"].map((city) => (
          <div key={city} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 shadow-sm">
            <span className="text-[11px] text-gray-600">{city}</span>
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-emerald-500">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceIllustration() {
  const actions = [
    { icon: "📦", label: "Penjemputan" },
    { icon: "📋", label: "Pengurusan Dokumen" },
    { icon: "🚚", label: "Pengantaran" },
    { icon: "✅", label: "Konfirmasi Terima" },
    { icon: "📊", label: "Laporan Pengiriman" },
  ];
  return (
    <div className="mt-auto pt-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-3 py-2 border-b border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Layanan</p>
        </div>
        <div className="divide-y divide-gray-50">
          {actions.map((a) => (
            <div key={a.label} className="flex items-center gap-2.5 px-3 py-2">
              <span className="text-sm">{a.icon}</span>
              <span className="text-[11px] text-gray-600 font-medium">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CompanyValuesSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Nilai Perusahaan"
          title="Dilengkapi dengan Komitmen Terbaik"
          subtitle="Empat pilar nilai yang menjadi fondasi setiap pengiriman ATTA Cargo di seluruh Kalimantan."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {values.map((v) => (
            <div
              key={v.id}
              className="rounded-2xl p-5 flex flex-col min-h-[420px]"
              style={{ backgroundColor: v.bg }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ color: v.titleColor, backgroundColor: "rgba(255,255,255,0.6)" }}
              >
                {v.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-black leading-tight mb-2"
                style={{ color: v.titleColor }}
              >
                {v.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>

              {/* Illustration */}
              {v.illustration}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
