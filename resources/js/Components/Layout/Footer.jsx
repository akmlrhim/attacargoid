import { Link, usePage } from "@inertiajs/react";
import { buildWhatsAppUrl, CATALOG_PDF_URL } from "../../constants/company";

const navLinks = [
  { href: "/tentang-kami", label: "Tentang Kami", type: "page" },
  { href: "#layanan", label: "Layanan", type: "anchor" },
  { href: "/kalkulator", label: "Kalkulator", type: "page" },
  { href: "#proses", label: "Proses", type: "anchor" },
  { href: "#jangkauan", label: "Jangkauan", type: "anchor" },
  { href: "/kontak", label: "Kontak", type: "page" },
];

const serviceLinks = [
  "Mitra Penerusan Barang",
  "Distribusi Retail & Modern Trade",
  "Pengiriman B2B",
  "Pengiriman Proyek & Industri",
  "Pengiriman Khusus",
];

const socialLinks = [
  {
    label: "WhatsApp",
    href: buildWhatsAppUrl(),
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { url } = usePage();
  const isHome = url === "/" || url.startsWith("/?");

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    if (isHome) {
      document
        .getElementById(href.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${href}`;
    }
  };

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

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* ── LEFT: Brand ── */}
          <div className="lg:w-72 shrink-0 space-y-6">
            {/* Logo */}
            <div>
              <img src="/logo.webp" alt="ATTA Cargo" className="h-10 w-auto" />
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-orange/25 flex items-center justify-center text-white/50 transition-colors cursor-pointer"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Company info */}
            <div className="space-y-1.5">
              <p className="text-white font-bold text-sm">
                PT. Tumbuh Kuat Sejahtera
              </p>
              <p className="text-white text-sm leading-relaxed">
                Jl. Raya Purna Sakti, Basirih, Kec. Banjarmasin Bar., Kota
                Banjarmasin, Kalimantan Selatan 70245
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <a
                href="tel:+62811510808"
                className="flex items-center gap-2 text-sm text-white transition-colors cursor-pointer"
              >
                <svg
                  className="w-3.5 h-3.5 text-orange shrink-0"
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
                0811 510 808
              </a>
              <a
                href="mailto:cargo.atta@gmail.com"
                className="flex items-center gap-2 text-sm text-white transition-colors cursor-pointer"
              >
                <svg
                  className="w-3.5 h-3.5 text-orange shrink-0"
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
                cargo.atta@gmail.com
              </a>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex-1 space-y-8">
            {/* Nav columns */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-8">
              {/* Navigasi */}
              <div>
                <h4 className="text-white text-md font-bold mb-4">Navigasi</h4>
                <ul className="space-y-0.5">
                  {navLinks.map((link) => (
                    <li key={link.href + link.label}>
                      {link.type === "page" ? (
                        <Link
                          href={link.href}
                          className="block py-1 text-sm text-white hover:text-orange transition-colors cursor-pointer"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={isHome ? link.href : `/${link.href}`}
                          onClick={(e) => handleAnchorClick(e, link.href)}
                          className="block py-1 text-sm text-white hover:text-orange transition-colors cursor-pointer"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Layanan */}
              <div>
                <h4 className="text-white text-md font-bold mb-4">Layanan</h4>
                <ul className="space-y-0.5">
                  {serviceLinks.map((label) => (
                    <li key={label}>
                      <a
                        href={isHome ? "#layanan" : "/#layanan"}
                        onClick={(e) => handleAnchorClick(e, "#layanan")}
                        className="block py-1 text-sm text-white hover:text-orange transition-colors cursor-pointer"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="relative border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 text-center">
          <p className="text-white text-xs">
            © {new Date().getFullYear()} PT. Tumbuh Kuat Sejahtera. Semua hak
            dilindungi.
          </p>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(80px, 11vw, 160px)" }}
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <span
            className="text-white font-black leading-none whitespace-nowrap select-none"
            style={{ fontSize: "clamp(72px, 11vw, 160px)", opacity: 0.06 }}
          >
            Atta Cargo
          </span>
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #060f26 15%, transparent 100%)",
          }}
        />
      </div>
    </footer>
  );
}
