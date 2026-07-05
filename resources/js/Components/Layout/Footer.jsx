import { buildWhatsAppUrl } from "../../constants/company";
import useCompany from "../../hooks/useCompany";
import { resolveSocialLink } from "../../constants/socialIcons";
import WhatsAppButton from "../Shared/WhatsAppButton";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  const company = useCompany();

  const socialLinks = [
    {
      label: "WhatsApp",
      href: buildWhatsAppUrl(company.whatsapp_number),
      icon: <WhatsAppIcon />,
    },
    ...(company.social_links ?? []).map((link) => {
      const { label, Icon, href } = resolveSocialLink(link);
      return { label, href, icon: <Icon /> };
    }),
  ];

  return (
    <footer className="bg-navy-dark text-white relative overflow-hidden">
      {/* Dot grid — left */}
      <svg
        className="pointer-events-none absolute left-0 top-0 h-full w-64 sm:w-96"
        aria-hidden="true"
        preserveAspectRatio="xMinYMid slice"
      >
        <defs>
          <pattern
            id="footer-dots-left"
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
              fill="white"
              fillOpacity="0.05"
            />
          </pattern>
          <linearGradient id="footer-fade-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="footer-mask-left">
            <rect width="100%" height="100%" fill="url(#footer-fade-left)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#footer-dots-left)"
          mask="url(#footer-mask-left)"
        />
      </svg>

      {/* Dot grid — right */}
      <svg
        className="pointer-events-none absolute right-0 top-0 h-full w-64 sm:w-96"
        aria-hidden="true"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <pattern
            id="footer-dots-right"
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
              fill="white"
              fillOpacity="0.05"
            />
          </pattern>
          <linearGradient id="footer-fade-right" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="footer-mask-right">
            <rect width="100%" height="100%" fill="url(#footer-fade-right)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#footer-dots-right)"
          mask="url(#footer-mask-right)"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] gap-10 sm:gap-12 lg:gap-8">
          {/* ── Brand ── */}
          <div className="space-y-5">
            <img
              src="/logo.webp"
              alt="ATTA Cargo"
              className="h-10 w-auto brightness-0 invert"
            />

            <p className="text-white text-sm leading-relaxed max-w-sm">
              Mitra penerusan barang &amp; last mile distribution terpercaya,
              dengan hub di Banjarmasin menjangkau seluruh Kalimantan Selatan
              &amp; Tengah.
            </p>

            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((s, i) => (
                <a
                  key={`${s.label}-${i}`}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-orange/25 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Kontak ── */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wide">
              Kontak
            </h4>

            <div className="space-y-3">
              <a
                href={`tel:+${company.whatsapp_number}`}
                className="flex items-start gap-2.5 text-sm text-white hover:text-orange transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-orange shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-start gap-2.5 text-sm text-white hover:text-orange transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-orange shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {company.email}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white">
                <svg
                  className="w-4 h-4 text-orange shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="leading-relaxed">
                  Jl. Raya Purna Sakti, Basirih, Kec. Banjarmasin Barat, Kota
                  Banjarmasin, Kalimantan Selatan 70245
                </span>
              </div>
            </div>
          </div>

          {/* ── Jam Operasional + CTA ── */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wide">
              Jam Operasional
            </h4>

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-white/70">Senin – Jumat</span>
                <span className="text-white font-semibold">09.00–18.00</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/70">Sabtu</span>
                <span className="text-white font-semibold">09.00–17.00</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/70">Minggu</span>
                <span className="text-white font-semibold">Tutup</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="relative border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 text-center">
          <p className="text-white text-xs">
            © {new Date().getFullYear()} PT. Tumbuh Kuat Sejahtera
          </p>
        </div>
      </div>
    </footer>
  );
}
