import { useCallback, useEffect, useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const { url } = usePage();
  const isHome = url === "/" || url.startsWith("/?");
  const isAbout = url.startsWith("/tentang-kami");
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
    setMobileAboutOpen(false);
  }, [url]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogoClick = useCallback(() => {
    setMobileOpen(false);
    if (isHome) {
      window.__lenis?.scrollTo(0, { duration: 1.4 });
    } else {
      router.visit("/");
    }
  }, [isHome]);

  const scrollToAnchor = useCallback(
    (anchor) => {
      setMobileOpen(false);
      if (isHome) {
        window.__lenis?.scrollTo(`#${anchor}`, { duration: 1.4, offset: -96 });
      } else {
        window.__pendingScroll = anchor;
        router.visit("/");
      }
    },
    [isHome],
  );

  const scrollToAboutSection = useCallback(
    (anchor) => {
      setMobileOpen(false);
      setAboutOpen(false);
      if (isAbout) {
        window.__lenis?.scrollTo(`#${anchor}`, { duration: 1.4, offset: -96 });
      } else {
        router.visit("/tentang-kami");
      }
    },
    [isAbout],
  );

  const openAbout = () => {
    clearTimeout(closeTimerRef.current);
    setAboutOpen(true);
  };

  const closeAbout = () => {
    closeTimerRef.current = setTimeout(() => setAboutOpen(false), 120);
  };

  const isTransparent = !scrolled && !mobileOpen;

  const linkClass = isTransparent
    ? "text-white hover:text-white hover:bg-white/10"
    : "text-black hover:text-navy hover:bg-gray-50";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        mobileOpen
          ? "bg-white"
          : isTransparent
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex-shrink-0 focus:outline-none"
            aria-label="Kembali ke beranda"
          >
            <img src="/logo.webp" alt="ATTA Cargo" className="h-10 w-auto" />
          </button>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Navigasi utama"
          >
            {/* Beranda */}
            <button
              onClick={() =>
                isHome
                  ? window.__lenis?.scrollTo(0, { duration: 1.4 })
                  : router.visit("/")
              }
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}
            >
              Beranda
            </button>

            {/* Tentang Kami */}
            <div
              className="relative"
              onMouseEnter={openAbout}
              onMouseLeave={closeAbout}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}
              >
                Tentang Kami
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 transition-all duration-200 ${
                  aboutOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
                onMouseEnter={openAbout}
                onMouseLeave={closeAbout}
              >
                <button
                  onClick={() => scrollToAboutSection("profil")}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-navy hover:bg-gray-50 transition-colors"
                >
                  Profil Perusahaan
                </button>
                <button
                  onClick={() => scrollToAboutSection("visi-misi")}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-navy hover:bg-gray-50 transition-colors"
                >
                  Visi &amp; Misi
                </button>
              </div>
            </div>

            {/* Layanan */}
            <button
              onClick={() => scrollToAnchor("layanan")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass}`}
            >
              Layanan
            </button>

            {/* Kalkulator */}
            <button
              onClick={() => {
                setMobileOpen(false);
                router.visit("/kalkulator");
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass} ${isKalkulator ? (isTransparent ? "text-white font-semibold" : "text-navy font-semibold") : ""}`}
            >
              Kalkulator
            </button>

            {/* Kontak */}
            <button
              onClick={() => {
                setMobileOpen(false);
                router.visit("/kontak");
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linkClass} ${isKontak ? (isTransparent ? "text-white font-semibold" : "text-navy font-semibold") : ""}`}
            >
              Kontak
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href="/kontak"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
            >
              Konsultasi
              <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
                <path
                  d="M4 10h12M10 4l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors ${
              mobileOpen || !isTransparent
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-5 py-4 space-y-1">
          <button
            onClick={() => {
              setMobileOpen(false);
              isHome
                ? window.__lenis?.scrollTo(0, { duration: 1.4 })
                : router.visit("/");
            }}
            className="w-full text-left px-3 py-3 text-sm font-medium text-gray-700 hover:text-navy hover:bg-gray-50 rounded-xl transition-colors"
          >
            Beranda
          </button>

          {/* Tentang Kami accordion */}
          <div>
            <button
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 hover:text-navy hover:bg-gray-50 rounded-xl transition-colors"
            >
              Tentang Kami
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${mobileAboutOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {mobileAboutOpen && (
              <div className="ml-4 mt-1 mb-1 space-y-0.5 border-l-2 border-gray-100 pl-3">
                <button
                  onClick={() => scrollToAboutSection("profil")}
                  className="w-full text-left px-3 py-2.5 text-sm text-gray-600 hover:text-navy hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Profil Perusahaan
                </button>
                <button
                  onClick={() => scrollToAboutSection("visi-misi")}
                  className="w-full text-left px-3 py-2.5 text-sm text-gray-600 hover:text-navy hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Visi &amp; Misi
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => scrollToAnchor("layanan")}
            className="w-full text-left px-3 py-3 text-sm font-medium text-gray-700 hover:text-navy hover:bg-gray-50 rounded-xl transition-colors"
          >
            Layanan
          </button>

          <button
            onClick={() => {
              setMobileOpen(false);
              router.visit("/kalkulator");
            }}
            className="w-full text-left px-3 py-3 text-sm font-medium text-gray-700 hover:text-navy hover:bg-gray-50 rounded-xl transition-colors"
          >
            Kalkulator
          </button>

          <button
            onClick={() => {
              setMobileOpen(false);
              router.visit("/kontak");
            }}
            className="w-full text-left px-3 py-3 text-sm font-medium text-gray-700 hover:text-navy hover:bg-gray-50 rounded-xl transition-colors"
          >
            Kontak
          </button>

          <div className="pt-3 border-t border-gray-100">
            <button
              onClick={() => {
                setMobileOpen(false);
                router.visit("/kontak");
              }}
              className="w-full flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-semibold px-5 py-3 rounded-full text-sm transition-colors"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
