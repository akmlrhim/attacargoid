export const WA_URL = `https://wa.me/62811510808?text=${encodeURIComponent("Halo ATTA CARGO, saya ingin berkonsultasi mengenai kebutuhan logistik saya.")}`;

export const misiItems = [
  "Menyediakan layanan distribusi yang tepat waktu dan aman di seluruh wilayah Kalimantan",
  "Membangun jaringan mitra logistik yang luas untuk menjangkau lebih banyak daerah",
  "Memanfaatkan teknologi untuk efisiensi dan transparansi di setiap proses operasional",
  "Memberikan pelayanan yang responsif dan profesional kepada setiap mitra bisnis",
  "Berkontribusi aktif pada pertumbuhan ekonomi regional Kalimantan",
];

export const heroStats = [
  { value: "2019", label: "Tahun Berdiri" },
  { value: "99+", label: "Titik Distribusi" },
  { value: "2 Prov.", label: "Wilayah Aktif" },
  { value: "5★", label: "Kepuasan Mitra" },
];

export const heroBullets = [
  "Hub utama di Banjarmasin, Kalimantan Selatan",
  "Jangkauan distribusi ke Kalsel & Kalteng",
  "Layanan retail, B2B, proyek, dan pengiriman khusus",
];

export const nilaiItems = [
  {
    title: "Amanah",
    desc: "Setiap paket diperlakukan dengan tanggung jawab penuh dan kejujuran.",
    bg: "#e8f5f1",
    titleColor: "#0f6b4f",
    illustration: (
      <div className="mt-4 space-y-2">
        {["Paket Terjamin", "Tanggung Jawab Penuh", "Asuransi Tersedia"].map((label) => (
          <div key={label} className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2 shadow-sm">
            <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[11px] text-gray-600 font-medium">{label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Tepat Waktu",
    desc: "Ketepatan pengiriman adalah komitmen kami kepada setiap pelanggan.",
    bg: "#f0eeff",
    titleColor: "#5b21b6",
    illustration: (
      <div className="mt-4">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-[9px] font-bold text-violet-600 uppercase tracking-wide mb-3">Jadwal Hari Ini</p>
          <div className="flex items-center gap-1 mb-3">
            {["Pickup", "Sortir", "Transit", "Tiba"].map((step, i) => (
              <div key={step} className="flex items-center gap-1 flex-1">
                <div className="flex flex-col items-center gap-0.5 flex-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${i < 3 ? "bg-violet-500" : "bg-violet-200"}`} />
                  <span className="text-[8px] text-gray-400 text-center leading-tight">{step}</span>
                </div>
                {i < 3 && <div className={`h-0.5 flex-1 mb-3 ${i < 2 ? "bg-violet-400" : "bg-violet-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 bg-violet-50 rounded-lg px-2 py-1.5">
            <span className="w-3 h-3 rounded-full bg-violet-500 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 8 8" fill="none" className="w-2 h-2">
                <path d="M1.5 4l1.5 1.5L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[10px] font-semibold text-violet-700">Estimasi On Time</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Profesional",
    desc: "Standar pelayanan tinggi di setiap titik distribusi dan operasional.",
    bg: "#eef4ff",
    titleColor: "#1d4ed8",
    illustration: (
      <div className="mt-4">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} viewBox="0 0 16 16" fill="#f5a623" className="w-3.5 h-3.5">
                <path d="M8 1l1.796 3.64L14 5.27l-3 2.924.708 4.13L8 10.35l-3.708 1.974L5 8.194 2 5.27l4.204-.63L8 1z" />
              </svg>
            ))}
            <span className="text-[11px] font-bold text-navy ml-1">5.0</span>
          </div>
          <p className="text-[10px] text-gray-400 mb-3">dari 240+ ulasan pelanggan</p>
          <div className="space-y-1.5">
            {["Respon Cepat", "Penanganan Hati-hati", "Komunikasi Aktif"].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-blue-100 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: s === "Respon Cepat" ? "95%" : s === "Penanganan Hati-hati" ? "88%" : "92%" }}
                  />
                </div>
                <span className="text-[9px] text-gray-400 w-8 text-right">
                  {s === "Respon Cepat" ? "95%" : s === "Penanganan Hati-hati" ? "88%" : "92%"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Inovatif",
    desc: "Terus berkembang dengan solusi logistik yang modern dan efisien.",
    bg: "#fff8ee",
    titleColor: "#b45309",
    illustration: (
      <div className="mt-4 space-y-2">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-amber-700">Tracking #45623</span>
            <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">Live</span>
          </div>
          <div className="h-1.5 rounded-full bg-amber-100 overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: "78%" }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-gray-400">Banjarmasin</span>
            <span className="text-[9px] font-medium text-amber-600">78%</span>
            <span className="text-[9px] text-gray-400">Palangkaraya</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-[10px] font-semibold text-amber-700 mb-1.5">Notifikasi Otomatis</p>
          <div className="h-1.5 bg-amber-100 rounded-full w-3/4" />
        </div>
      </div>
    ),
  },
  {
    title: "Kolaboratif",
    desc: "Tumbuh bersama mitra, pelanggan, dan komunitas lokal Kalimantan.",
    bg: "#fff1f2",
    titleColor: "#be123c",
    illustration: (
      <div className="mt-4">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-[9px] font-bold text-rose-600 uppercase tracking-wide mb-2.5">Jaringan Mitra</p>
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {["TK", "AG", "JN", "SK", "BI", "MT", "KR", "+99"].map((code) => (
              <div
                key={code}
                className={`h-7 rounded-lg flex items-center justify-center text-[9px] font-bold ${code === "+99" ? "bg-rose-500 text-white" : "bg-rose-50 text-rose-700"}`}
              >
                {code}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 text-center">Mitra aktif di Kalimantan</p>
        </div>
      </div>
    ),
  },
  {
    title: "Integritas",
    desc: "Transparansi dan kejujuran dalam setiap transaksi dan relasi bisnis.",
    bg: "#f4f4f5",
    titleColor: "#374151",
    illustration: (
      <div className="mt-4">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Laporan Pengiriman</p>
          </div>
          <div className="divide-y divide-gray-50">
            {[["Faktur Digital", true], ["Bukti Penerimaan", true], ["Riwayat Status", true], ["Rekap Bulanan", false]].map(
              ([label, done]) => (
                <div key={label} className="flex items-center justify-between px-3 py-1.5">
                  <span className="text-[11px] text-gray-600">{label}</span>
                  <svg viewBox="0 0 16 16" fill="none" className={`w-3.5 h-3.5 ${done ? "text-emerald-500" : "text-gray-300"}`}>
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
  },
];
