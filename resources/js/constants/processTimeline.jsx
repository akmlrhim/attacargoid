export const PROCESS_STEPS = [
  {
    id: 1,
    step_number: "1",
    title: "Penerimaan & Koordinasi",
    description:
      "Barang diterima melalui pelabuhan, gudang transit, atau titik distribusi sesuai instruksi pelanggan. Tim kami melakukan pengecekan dokumen, detail pengiriman, dan penyesuaian kebutuhan operasional.",
  },
  {
    id: 2,
    step_number: "2",
    title: "Sortir & Preparasi",
    description:
      "Barang diproses untuk penyesuaian rute distribusi, grouping area, pengecekan kondisi fisik, dan persiapan loading.",
  },
  {
    id: 3,
    step_number: "3",
    title: "Distribusi & Pengiriman",
    description:
      "Barang dikirim menggunakan armada yang sesuai dengan kebutuhan jenis muatan, volume, dan area tujuan.",
  },
  {
    id: 4,
    step_number: "4",
    title: "Monitoring & Update",
    description:
      "Tim operasional memberikan update status pengiriman secara aktif hingga barang diterima.",
  },
];

/* Flat, on-brand SVG illustrations - one per step, no external assets. */

export function Illustration1() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full">
      <defs>
        <linearGradient id="pt-grad-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef2ff" />
          <stop offset="100%" stopColor="#dbe4ff" />
        </linearGradient>
      </defs>
      <rect width="240" height="180" fill="url(#pt-grad-1)" />
      <rect
        x="80"
        y="40"
        width="80"
        height="100"
        rx="10"
        fill="#ffffff"
        stroke="#0b1f4d"
        strokeWidth="3"
      />
      <rect x="105" y="33" width="30" height="14" rx="4" fill="#0b1f4d" />
      <line
        x1="95"
        y1="70"
        x2="145"
        y2="70"
        stroke="#c7d2fe"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="95"
        y1="87"
        x2="145"
        y2="87"
        stroke="#c7d2fe"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="95"
        y1="104"
        x2="128"
        y2="104"
        stroke="#c7d2fe"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="152" cy="118" r="24" fill="#f5a623" />
      <path
        d="M141 118l7.5 7.5L163 110"
        stroke="#ffffff"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Illustration2() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full">
      <defs>
        <linearGradient id="pt-grad-2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5f3ff" />
          <stop offset="100%" stopColor="#ede9fe" />
        </linearGradient>
      </defs>
      <rect width="240" height="180" fill="url(#pt-grad-2)" />
      <rect
        x="40"
        y="28"
        width="160"
        height="124"
        rx="8"
        fill="none"
        stroke="#0b1f4d"
        strokeWidth="3"
      />
      <line x1="40" y1="70" x2="200" y2="70" stroke="#0b1f4d" strokeWidth="3" />
      <line
        x1="40"
        y1="112"
        x2="200"
        y2="112"
        stroke="#0b1f4d"
        strokeWidth="3"
      />
      <rect x="50" y="38" width="28" height="24" rx="3" fill="#f5a623" />
      <rect x="86" y="34" width="34" height="28" rx="3" fill="#6d3fae" />
      <rect
        x="130"
        y="40"
        width="26"
        height="22"
        rx="3"
        fill="#0b1f4d"
        opacity="0.7"
      />
      <rect
        x="55"
        y="80"
        width="30"
        height="24"
        rx="3"
        fill="#0b1f4d"
        opacity="0.7"
      />
      <rect x="95" y="78" width="24" height="26" rx="3" fill="#f5a623" />
      <rect x="128" y="82" width="34" height="22" rx="3" fill="#6d3fae" />
      <rect x="60" y="120" width="26" height="24" rx="3" fill="#6d3fae" />
      <rect
        x="94"
        y="122"
        width="30"
        height="22"
        rx="3"
        fill="#0b1f4d"
        opacity="0.7"
      />
      <rect x="132" y="120" width="24" height="24" rx="3" fill="#f5a623" />
    </svg>
  );
}

export function Illustration3() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full">
      <defs>
        <linearGradient id="pt-grad-3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="100%" stopColor="#ffedd5" />
        </linearGradient>
      </defs>
      <rect width="240" height="180" fill="url(#pt-grad-3)" />
      <line
        x1="20"
        y1="140"
        x2="220"
        y2="140"
        stroke="#0b1f4d"
        strokeOpacity="0.15"
        strokeWidth="3"
      />
      <line
        x1="14"
        y1="88"
        x2="34"
        y2="88"
        stroke="#6d3fae"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />
      <line
        x1="10"
        y1="103"
        x2="32"
        y2="103"
        stroke="#6d3fae"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.3"
      />
      <rect x="45" y="68" width="90" height="57" rx="6" fill="#0b1f4d" />
      <rect x="55" y="79" width="70" height="10" rx="3" fill="#f5a623" />
      <path d="M135 90h35a10 10 0 0110 10v25h-45z" fill="#f5a623" />
      <rect x="145" y="98" width="20" height="16" rx="2" fill="#eef2ff" />
      <circle cx="80" cy="130" r="14" fill="#0b1f4d" />
      <circle cx="80" cy="130" r="6" fill="#eef2ff" />
      <circle cx="160" cy="130" r="14" fill="#0b1f4d" />
      <circle cx="160" cy="130" r="6" fill="#eef2ff" />
    </svg>
  );
}

export function Illustration4() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full">
      <defs>
        <linearGradient id="pt-grad-4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>
      </defs>
      <rect width="240" height="180" fill="url(#pt-grad-4)" />
      <path
        d="M58 132C90 92 128 152 168 62"
        fill="none"
        stroke="#0b1f4d"
        strokeOpacity="0.3"
        strokeWidth="3"
        strokeDasharray="6 9"
        strokeLinecap="round"
      />
      <circle
        cx="58"
        cy="132"
        r="15"
        fill="none"
        stroke="#0b1f4d"
        strokeWidth="2"
        opacity="0.3"
      />
      <circle cx="58" cy="132" r="8" fill="#0b1f4d" />
      <path
        d="M168 38c-12 0-21 9.5-21 21 0 16 21 36 21 36s21-20 21-36c0-11.5-9-21-21-21z"
        fill="#f5a623"
      />
      <circle cx="168" cy="59" r="8" fill="#ffffff" />
    </svg>
  );
}

export const STEP_ILLUSTRATIONS = [
  <Illustration1 key="1" />,
  <Illustration2 key="2" />,
  <Illustration3 key="3" />,
  <Illustration4 key="4" />,
];
