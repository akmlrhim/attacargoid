export const misiItems = [
  "Menyediakan layanan distribusi yang tepat waktu dan aman di seluruh wilayah Kalimantan",
  "Membangun jaringan mitra logistik yang luas untuk menjangkau lebih banyak daerah",
  "Memanfaatkan teknologi untuk efisiensi dan transparansi di setiap proses operasional",
  "Memberikan pelayanan yang responsif dan profesional kepada setiap mitra bisnis",
  "Berkontribusi aktif pada pertumbuhan ekonomi regional Kalimantan",
];

export const nilaiItems = [
  {
    title: "Amanah",
    desc: "Setiap paket diperlakukan dengan tanggung jawab penuh dan kejujuran.",
    bg: "#eef4ff",
    titleColor: "#0b1f4d",
    illustration: (
      <div className="mt-4 space-y-2">
        {["Paket Terjamin", "Tanggung Jawab Penuh", "Asuransi Tersedia"].map((label) => (
          <div key={label} className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2 shadow-sm">
            <span className="w-4 h-4 rounded-full bg-navy flex items-center justify-center shrink-0">
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
    bg: "#eef4ff",
    titleColor: "#0b1f4d",
    illustration: (
      <div className="mt-4">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-[9px] font-bold text-navy uppercase tracking-wide mb-3">Jadwal Hari Ini</p>
          <div className="flex items-center gap-1 mb-3">
            {["Pickup", "Sortir", "Transit", "Tiba"].map((step, i) => (
              <div key={step} className="flex items-center gap-1 flex-1">
                <div className="flex flex-col items-center gap-0.5 flex-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${i < 3 ? "bg-navy" : "bg-navy/20"}`} />
                  <span className="text-[8px] text-gray-400 text-center leading-tight">{step}</span>
                </div>
                {i < 3 && <div className={`h-0.5 flex-1 mb-3 ${i < 2 ? "bg-navy-light" : "bg-navy/20"}`} />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 bg-navy/5 rounded-lg px-2 py-1.5">
            <span className="w-3 h-3 rounded-full bg-navy flex items-center justify-center shrink-0">
              <svg viewBox="0 0 8 8" fill="none" className="w-2 h-2">
                <path d="M1.5 4l1.5 1.5L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[10px] font-semibold text-navy">Estimasi On Time</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Profesional",
    desc: "Standar pelayanan tinggi di setiap titik distribusi dan operasional.",
    bg: "#eef4ff",
    titleColor: "#0b1f4d",
    illustration: (
      <div className="mt-4 space-y-2">
        {["Tim Operasional Profesional", "Armada Lengkap & Terawat", "Respon Cepat & Komunikasi Aktif"].map((label) => (
          <div key={label} className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2 shadow-sm">
            <span className="w-4 h-4 rounded-full bg-navy flex items-center justify-center shrink-0">
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
    title: "Inovatif",
    desc: "Terus berkembang dengan solusi logistik yang modern dan efisien.",
    bg: "#eef4ff",
    titleColor: "#0b1f4d",
    illustration: (
      <div className="mt-4 space-y-2">
        {["Penyesuaian Rute Distribusi", "Skema Pengiriman Fleksibel", "Efisiensi Proses Operasional"].map((label) => (
          <div key={label} className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2 shadow-sm">
            <span className="w-4 h-4 rounded-full bg-navy flex items-center justify-center shrink-0">
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
    title: "Kolaboratif",
    desc: "Tumbuh bersama mitra, pelanggan, dan komunitas lokal Kalimantan.",
    bg: "#eef4ff",
    titleColor: "#0b1f4d",
    illustration: (
      <div className="mt-4">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-[9px] font-bold text-navy uppercase tracking-wide mb-2.5">Jaringan Mitra</p>
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {["TK", "AG", "JN", "SK", "BI", "MT", "KR", "+99"].map((code) => (
              <div
                key={code}
                className={`h-7 rounded-lg flex items-center justify-center text-[9px] font-bold ${code === "+99" ? "bg-navy text-white" : "bg-navy/5 text-navy"}`}
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
    bg: "#eef4ff",
    titleColor: "#0b1f4d",
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
                  <svg viewBox="0 0 16 16" fill="none" className={`w-3.5 h-3.5 ${done ? "text-navy" : "text-gray-300"}`}>
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
