import DotField from "../ReactBits/DotField";

const navLinks = [
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#layanan", label: "Layanan" },
  { href: "#proses", label: "Proses" },
  { href: "#jangkauan", label: "Jangkauan" },
  { href: "#kontak", label: "Kontak" },
];

const serviceLinks = [
  { href: "#layanan", label: "Pengiriman Reguler" },
  { href: "#layanan", label: "Kargo Express" },
  { href: "#layanan", label: "Last Mile Delivery" },
  { href: "#layanan", label: "Penerusan Barang" },
];

const socialLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/620811510808",
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
  const handleClick = (e, href) => {
    e.preventDefault();
    document
      .getElementById(href.slice(1))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-dark text-white relative overflow-hidden">
      {/* DotField bg */}
      <div className="absolute inset-0 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={20}
          bulgeStrength={60}
          glowRadius={140}
          gradientFrom="rgba(255,255,255,0.20)"
          gradientTo="rgba(245,166,35,0.15)"
          glowColor="rgba(245,166,35,0.18)"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-12 sm:pt-14 pb-0">
        {/* ── Top row: Logo + social | CTA buttons ── */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 sm:gap-8 pb-10 sm:pb-12">
          {/* Left: logo + tagline + social */}
          <div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-1">
              <img
                src="/logo.webp"
                alt="ATTA Cargo"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-white/80 text-sm leading-relaxed max-w-xs mb-4 sm:mb-5">
              Solusi Logistik Terpercaya, Distribusi Andal.
              <br />
              Bisnis Tumbuh Bersama.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:bg-orange/30 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: contact CTA buttons */}
          <div className="flex flex-col gap-2.5 w-full sm:w-auto">
            <p className="text-white font-semibold text-sm mb-1">
              Hubungi Kami
            </p>
            <a
              href="https://wa.me/620811510808"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              0811 510 808
            </a>
            <a
              href="mailto:cargo.atta@gmail.com"
              className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              <svg
                className="w-4 h-4 shrink-0"
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
              <span className="truncate">cargo.atta@gmail.com</span>
            </a>
          </div>
        </div>

        {/* ── Main 3-col grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 py-10 sm:py-12">
          {/* Col 1: Kantor Pusat */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white text-sm font-semibold mb-3 sm:mb-4">
              Kantor Pusat
            </h4>
            <p className="text-white font-bold text-sm mb-1.5">
              PT. Tumbuh Kuat Sejahtera
            </p>
            <address className="text-white/70 text-xs sm:text-sm not-italic leading-relaxed">
              Banjarmasin,
              <br />
              Kalimantan Selatan
            </address>
            <div className="mt-4 space-y-1.5 text-sm text-white">
              <div className="flex items-center gap-2">
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
              </div>
              <div className="flex items-center gap-2">
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
              </div>
            </div>
          </div>

          {/* Col 2: Navigasi */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 sm:mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-white/70 hover:text-orange text-xs sm:text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Layanan */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 sm:mb-4">
              Layanan
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-white/70 hover:text-orange text-xs sm:text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Copyright bar (full-width, outside container) ── */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 text-center">
          <p className="text-white text-xs">
            © {new Date().getFullYear()} PT. Tumbuh Kuat Sejahtera. Semua hak
            dilindungi.
          </p>
        </div>
      </div>

      {/* ── Watermark section ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(100px, 13vw, 180px)" }}
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <span
            className="text-white font-black leading-none whitespace-nowrap select-none"
            style={{
              fontSize: "clamp(88px, 13vw, 180px)",
              opacity: 0.1,
            }}
          >
            Atta Cargo
          </span>
        </div>
        {/* Gradient fade bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #060f26 10%, transparent 100%)",
          }}
        />
      </div>
    </footer>
  );
}
