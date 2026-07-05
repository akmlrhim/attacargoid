import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { url } = usePage();

  const isHome = url === "/" || url.startsWith("/?");
  const isAbout = url.startsWith("/tentang-kami");
  const isServices = url.startsWith("/layanan");
  const isKalkulator = url.startsWith("/kalkulator");
  const isKontak = url.startsWith("/kontak");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [url]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const transparent = !scrolled && !mobileOpen;

  const linkCls = transparent
    ? "text-white hover:text-white hover:bg-white/10"
    : "text-black hover:text-navy hover:bg-gray-50";

  const activeCls = transparent ? "text-white/90" : "text-navy font-bold";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          mobileOpen
            ? "bg-white"
            : transparent
              ? "bg-transparent"
              : "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo → home; scroll to top if already on home */}
            <Link
              href="/"
              onClick={(e) => {
                if (url === "/" || url.startsWith("/?")) {
                  e.preventDefault();
                  window.__lenis?.scrollTo(0, { duration: 1.4 });
                }
              }}
              className="flex-shrink-0 focus:outline-none"
              aria-label="Beranda"
            >
              <img
                src="/logo.webp"
                alt="ATTA Cargo"
                className={`h-10 w-auto transition-[filter] duration-300 ${transparent ? "brightness-0 invert" : ""}`}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navigasi utama">
              <Link
                href="/"
                onClick={(e) => {
                  if (url === "/" || url.startsWith("/?")) {
                    e.preventDefault();
                    window.__lenis?.scrollTo(0, { duration: 1.4 });
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isHome ? activeCls : linkCls}`}
              >
                Beranda
              </Link>

              <Link
                href="/tentang-kami"
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isAbout ? activeCls : linkCls}`}
              >
                Tentang Kami
              </Link>

              <Link
                href="/layanan"
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isServices ? activeCls : linkCls}`}
              >
                Layanan
              </Link>

              <Link
                href="/kalkulator"
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isKalkulator ? activeCls : linkCls}`}
              >
                Kalkulator
              </Link>

              <Link
                href="/kontak"
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isKontak ? activeCls : linkCls}`}
              >
                Kontak
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
              >
                Konsultasi
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                  <path
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                mobileOpen || !transparent
                  ? "text-black hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 lg:hidden bg-white transition-all duration-300 ease-in-out ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="h-full overflow-y-auto">
          <nav className="px-5 pt-4 pb-4 space-y-1" aria-label="Navigasi mobile">
            <Link
              href="/"
              className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                isHome ? "bg-navy/5 text-navy font-bold" : "text-black hover:text-navy hover:bg-gray-50"
              }`}
            >
              Beranda
            </Link>

            <Link
              href="/tentang-kami"
              className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                isAbout ? "bg-navy/5 text-navy font-bold" : "text-black hover:text-navy hover:bg-gray-50"
              }`}
            >
              Tentang Kami
            </Link>

            <Link
              href="/layanan"
              className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                isServices ? "bg-navy/5 text-navy font-bold" : "text-black hover:text-navy hover:bg-gray-50"
              }`}
            >
              Layanan
            </Link>

            <Link
              href="/kalkulator"
              className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                isKalkulator ? "bg-navy/5 text-navy font-bold" : "text-black hover:text-navy hover:bg-gray-50"
              }`}
            >
              Kalkulator
            </Link>

            <Link
              href="/kontak"
              className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                isKontak ? "bg-navy/5 text-navy font-bold" : "text-black hover:text-navy hover:bg-gray-50"
              }`}
            >
              Kontak
            </Link>
          </nav>

          <div className="px-5 pt-2 pb-8 border-t border-gray-100">
            <Link
              href="/kontak"
              className="w-full flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-semibold px-5 py-4 rounded-2xl text-base transition-colors"
            >
              Hubungi Kami
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
