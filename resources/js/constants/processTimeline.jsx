export const STEP_ICONS = [
  <svg key="0" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>,
  <svg key="1" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>,
  <svg key="2" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-3a1 1 0 00-.293-.707l-3-3A1 1 0 0016 6h-1V5a1 1 0 00-1-1H3z" />
  </svg>,
  <svg key="3" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
    <path fillRule="evenodd" d="M10 2a8 8 0 100 16A8 8 0 0010 2zm1 4a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>,
];

export const STEP_DETAILS = [
  [
    "Koordinasi langsung dengan ekspedisi pengirim",
    "Pengecekan dokumen dan manifest barang",
    "Penyesuaian instruksi operasional pelanggan",
  ],
  [
    "Grouping berdasarkan area tujuan pengiriman",
    "Pengecekan kondisi fisik dan kelengkapan barang",
    "Persiapan loading armada sesuai rute",
  ],
  [
    "Armada disesuaikan jenis dan volume muatan",
    "Rute optimal untuk setiap area tujuan",
    "Koordinasi dengan mitra distribusi lokal",
  ],
  [
    "Update status real-time ke pelanggan",
    "Notifikasi estimasi waktu tiba",
    "Konfirmasi penerimaan barang oleh tujuan",
  ],
];

export const STEP_GRADIENTS = [
  "linear-gradient(135deg, #dbeafe 0%, #eff6ff 50%, #f0f9ff 100%)",
  "linear-gradient(135deg, #ede9fe 0%, #f5f3ff 55%, #faf5ff 100%)",
  "linear-gradient(135deg, #fff7ed 0%, #fffbeb 55%, #fefce8 100%)",
  "linear-gradient(135deg, #dcfce7 0%, #f0fdf4 55%, #f7fee7 100%)",
];

export function IllustrationStep1() {
  const rows = [
    { label: "Pengirim", value: "PT. Sumber Makmur" },
    { label: "Tujuan", value: "Banjarmasin" },
    { label: "Berat Total", value: "250 kg / 15 koli" },
    { label: "Jenis Muatan", value: "FMCG / General Cargo" },
  ];
  return (
    <div className="p-6 sm:p-8">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-navy px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <rect x="2" y="1" width="12" height="14" rx="2" stroke="#f5a623" strokeWidth="1.4" />
              <path d="M5 5h6M5 8h6M5 11h4" stroke="#f5a623" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="text-white text-sm font-semibold">Manifest Pengiriman</span>
          </div>
          <span className="text-white/50 text-[11px] font-mono">ATT-2024-0853</span>
        </div>
        <div className="divide-y divide-gray-50">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">{row.label}</p>
                <p className="text-xs font-semibold text-gray-800">{row.value}</p>
              </div>
              <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                  <path d="M2.5 6l2.5 2.5L9.5 3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          ))}
        </div>
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-navy">Dokumen Diverifikasi: Siap Proses</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IllustrationStep2() {
  const areas = [
    { name: "Banjarmasin", count: 42, pct: 85, color: "#6366f1" },
    { name: "Banjarbaru", count: 28, pct: 56, color: "#8b5cf6" },
    { name: "Palangkaraya", count: 35, pct: 70, color: "#a78bfa" },
    { name: "Barito", count: 18, pct: 36, color: "#c4b5fd" },
  ];
  return (
    <div className="p-6 sm:p-8">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm font-black text-gray-800">Area Sortir</p>
          <span className="text-[11px] font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
            {areas.reduce((a, b) => a + b.count, 0)} paket
          </span>
        </div>
        <div className="p-5 space-y-3.5">
          {areas.map((a) => (
            <div key={a.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-gray-700">{a.name}</span>
                <span className="text-[11px] text-gray-400">{a.count} paket</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${a.pct}%`, backgroundColor: a.color }} />
              </div>
            </div>
          ))}
          <div className="pt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-[11px] text-gray-500">Sortir berjalan, estimasi selesai 45 mnt</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IllustrationStep3() {
  const stops = [
    { label: "Hub Banjarmasin", sub: "Titik keberangkatan", done: true, active: false },
    { label: "Banjarbaru", sub: "Transit 30 mnt", done: true, active: false },
    { label: "Palangkaraya", sub: "Dalam perjalanan", done: false, active: true },
    { label: "Tujuan Akhir", sub: "Estimasi 3 jam lagi", done: false, active: false },
  ];
  return (
    <div className="p-6 sm:p-8">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M2 6h9l2 3H2V6z" stroke="#f5a623" strokeWidth="1.3" strokeLinejoin="round" />
              <circle cx="4.5" cy="11.5" r="1.5" stroke="#f5a623" strokeWidth="1.3" />
              <circle cx="11.5" cy="11.5" r="1.5" stroke="#f5a623" strokeWidth="1.3" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-black text-gray-800">Armada B-7821-KH</p>
            <p className="text-[10px] text-gray-400">Live tracking aktif</p>
          </div>
          <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>
        <div className="p-5">
          <div className="relative pl-5">
            <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gray-100" />
            <div className="space-y-4">
              {stops.map((s, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div
                    className={["absolute w-3 h-3 rounded-full border-2 mt-0.5 z-10", s.done ? "bg-navy border-navy" : s.active ? "bg-orange border-orange animate-pulse" : "bg-white border-gray-200"].join(" ")}
                    style={{ left: 0 }}
                  />
                  <div className={s.active ? "opacity-100" : s.done ? "opacity-60" : "opacity-35"}>
                    <p className="text-xs font-semibold text-gray-800">{s.label}</p>
                    <p className="text-[10px] text-gray-400">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IllustrationStep4() {
  const updates = [
    {
      time: "14:23",
      msg: "Paket tiba di hub sortir",
      color: "text-blue-600 bg-blue-50",
      icon: (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-4 h-4">
          <path d="M8 1L14 4.5v7L8 15 2 11.5v-7L8 1z" strokeLinejoin="round" />
          <path d="M8 1v14M2 4.5l6 3.5 6-3.5" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      time: "15:41",
      msg: "Dimuat ke armada B-7821-KH",
      color: "text-orange bg-orange/10",
      icon: (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-4 h-4">
          <rect x="1" y="5" width="9" height="7" rx="1" strokeLinejoin="round" />
          <path d="M10 8h3l2 3v1h-5V8z" strokeLinejoin="round" />
          <circle cx="3.5" cy="13" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="11.5" cy="13" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      time: "16:20",
      msg: "Tiba di kota tujuan",
      color: "text-violet-600 bg-violet-50",
      icon: (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-4 h-4">
          <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.485-2.015-4.5-4.5-4.5z" />
          <circle cx="8" cy="6" r="1.5" />
        </svg>
      ),
    },
    {
      time: "16:45",
      msg: "Diterima oleh Bpk. Hendra",
      color: "text-emerald-600 bg-emerald-50",
      icon: (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-4 h-4">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M5 8l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];
  return (
    <div className="p-6 sm:p-8">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm font-black text-gray-800">Status Update</p>
          <span className="text-[10px] font-medium text-gray-400">ATT-2024-0853</span>
        </div>
        <div className="divide-y divide-gray-50">
          {updates.map((u, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3.5">
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${u.color}`}>
                {u.icon}
              </span>
              <p className="flex-1 text-xs font-semibold text-gray-800 leading-snug">{u.msg}</p>
              <span className="text-[10px] text-gray-400 shrink-0 font-mono">{u.time}</span>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 bg-emerald-50 flex items-center justify-center gap-1.5">
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 text-emerald-600">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" />
            <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-xs font-semibold text-emerald-700">Pengiriman Selesai. Tanda Terima Terkirim</p>
        </div>
      </div>
    </div>
  );
}

export const STEP_ILLUSTRATIONS = [
  <IllustrationStep1 key="1" />,
  <IllustrationStep2 key="2" />,
  <IllustrationStep3 key="3" />,
  <IllustrationStep4 key="4" />,
];
