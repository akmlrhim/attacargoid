import { useEffect, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

/** Shared geometry for the three dropdown glyphs, kept stroke-only to match the nav. */
function GlyphFrame({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function OfficeGlyph() {
  return (
    <GlyphFrame>
      <path d="M3 21h18M5 21V5.5A1.5 1.5 0 016.5 4h7A1.5 1.5 0 0115 5.5V21M15 10h3.5A1.5 1.5 0 0120 11.5V21M8.5 8h3M8.5 12h3M8.5 16h3" />
    </GlyphFrame>
  );
}

function JournalGlyph() {
  return (
    <GlyphFrame>
      <path d="M4.5 5.5A1.5 1.5 0 016 4h9a1.5 1.5 0 011.5 1.5V19a1 1 0 001 1H6.5a2 2 0 01-2-2V5.5zM16.5 8H19a1 1 0 011 1v9a2 2 0 01-2 2M8 8h5M8 11.5h5M8 15h3" />
    </GlyphFrame>
  );
}

function RouteGlyph() {
  return (
    <GlyphFrame>
      <path d="M12 21s6.5-6.06 6.5-10.5a6.5 6.5 0 10-13 0C5.5 14.94 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.25" />
    </GlyphFrame>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const moreCloseTimer = useRef(null);

  const openMore = () => {
    clearTimeout(moreCloseTimer.current);
    setMoreOpen(true);
  };

  const scheduleCloseMore = () => {
    clearTimeout(moreCloseTimer.current);
    moreCloseTimer.current = setTimeout(() => setMoreOpen(false), 200);
  };

  useEffect(() => () => clearTimeout(moreCloseTimer.current), []);
  const { url } = usePage();

  const isHome = url === "/" || url.startsWith("/?");
  const isAbout = url.startsWith("/tentang-kami");
  const isServices = url.startsWith("/layanan");
  const isCekOngkir = url.startsWith("/cek-ongkir");
  const isArtikel = url.startsWith("/artikel");
  const isArtikelDetail = url.startsWith("/artikel/");
  const isKontak = url.startsWith("/kontak");

  const isMoreActive = isAbout || isArtikel || isKontak;

  /**
   * Each entry carries a one-line description: the three destinations behind
   * "Perusahaan" are unrelated to each other, so a bare label list makes the
   * visitor guess. The copy stays specific to the hub (Banjarmasin, WITA)
   * rather than reading like a generic company menu.
   */
  const companyLinks = [
    {
      href: "/tentang-kami",
      label: "Tentang Kami",
      description: "Profil perusahaan, legalitas & hub Banjarmasin",
      isActive: isAbout,
      icon: <OfficeGlyph />,
    },
    {
      href: "/artikel",
      label: "Artikel",
      description: "Kabar pengiriman & tips logistik Kalimantan",
      isActive: isArtikel,
      icon: <JournalGlyph />,
    },
    {
      href: "/kontak",
      label: "Kontak",
      description: "Alamat kantor, jam operasional WITA & peta",
      isActive: isKontak,
      icon: <RouteGlyph />,
    },
  ];

  const activeKey = isHome
    ? "home"
    : isServices
      ? "services"
      : isCekOngkir
        ? "cekOngkir"
        : null;

  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [url]);

  useEffect(() => {
    if (!moreOpen) return;
    const onClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    /**
     * Escape hands focus back to the trigger, otherwise a keyboard visitor is
     * dropped at the top of the document and has to tab through the navbar
     * again to get back to where they were.
     */
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMoreOpen(false);
        linkRefs.current.more?.focus();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const updateUnderline = () => {
      const el = linkRefs.current[activeKey];
      if (el) {
        setUnderline({ left: el.offsetLeft, width: el.offsetWidth });
      } else {
        setUnderline((prev) => ({ ...prev, width: 0 }));
      }
    };
    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeKey]);

  const transparent = !scrolled && !mobileOpen && !isArtikelDetail;

  const linkCls = transparent
    ? "text-white hover:text-white hover:bg-white/10"
    : "text-black hover:text-navy hover:bg-gray-50";

  const activeCls = transparent ? "text-white" : "text-navy";

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
            <nav
              ref={navRef}
              className="hidden lg:flex items-center gap-0.5 relative"
              aria-label="Navigasi utama"
            >
              <Link
                ref={(el) => (linkRefs.current.home = el)}
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

              {/* "Perusahaan" dropdown */}
              <div
                ref={moreRef}
                className="relative"
                onMouseEnter={openMore}
                onMouseLeave={scheduleCloseMore}
              >
                <button
                  ref={(el) => (linkRefs.current.more = el)}
                  type="button"
                  onClick={() => setMoreOpen((open) => !open)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isMoreActive ? activeCls : linkCls}`}
                  aria-expanded={moreOpen}
                  aria-controls="navbar-perusahaan-menu"
                >
                  Perusahaan
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/*
                  The panel is navy-dark rather than white: navy is the brand's
                  authority surface (hero and footer are the page's two
                  bookends), so the menu reads as a piece of that world dropping
                  out of the navbar instead of a generic light card. It also
                  keeps its own contrast whether the navbar behind it is
                  transparent or scrolled-white.
                */}
                <div
                  id="navbar-perusahaan-menu"
                  className={`absolute left-0 top-full mt-3 w-[21.5rem] origin-top-left overflow-hidden rounded-2xl bg-navy-dark shadow-2xl shadow-navy-dark/40 ring-1 ring-white/12 transition-[opacity,translate,scale,visibility] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    moreOpen
                      ? "visible translate-y-0 scale-100 opacity-100"
                      : "invisible -translate-y-2 scale-[0.97] opacity-0"
                  }`}
                >
                  {/*
                    The dot grid is the site's existing signature (hero and the
                    section CTAs use the same pattern), reused here at a small
                    scale so the menu belongs to the same visual family.
                  */}
                  <svg
                    className="pointer-events-none absolute right-0 top-0 h-32 w-40"
                    aria-hidden="true"
                    preserveAspectRatio="xMaxYMin slice"
                  >
                    <defs>
                      <pattern
                        id="navbar-more-dots"
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
                          fillOpacity="0.09"
                        />
                      </pattern>
                      <linearGradient
                        id="navbar-more-fade"
                        x1="1"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="white" stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                      <mask id="navbar-more-mask">
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#navbar-more-fade)"
                        />
                      </mask>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#navbar-more-dots)"
                      mask="url(#navbar-more-mask)"
                    />
                  </svg>

                  <div className="relative p-2">
                    {companyLinks.map((item, i) => (
                      /*
                        The entrance sits on this wrapper, not on the link
                        itself: the stagger delay would otherwise also apply to
                        the link's hover colour and make the highlight lag the
                        cursor by up to 170ms. It runs on open and collapses to
                        zero on close so the panel doesn't unwind item by item.
                      */
                      <div
                        key={item.href}
                        style={{
                          transitionDelay: moreOpen
                            ? `${70 + i * 50}ms`
                            : "0ms",
                        }}
                        className={`transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none ${
                          moreOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-0"
                        }`}
                      >
                        <Link
                          href={item.href}
                          aria-current={item.isActive ? "page" : undefined}
                          className={`group flex items-start gap-3.5 rounded-xl px-3 py-3 transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange motion-reduce:transition-none ${
                            item.isActive ? "bg-white/8" : "hover:bg-white/6"
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                              item.isActive
                                ? "bg-orange/15 text-orange"
                                : "bg-white/8 text-white/70 group-hover:bg-white/12 group-hover:text-white"
                            }`}
                          >
                            {item.icon}
                          </span>

                          <span className="min-w-0">
                            <span
                              className={`block text-sm font-bold leading-tight transition-colors duration-200 ${
                                item.isActive ? "text-orange" : "text-white"
                              }`}
                            >
                              {item.label}
                            </span>
                            <span className="mt-0.5 block text-xs leading-snug text-white/60">
                              {item.description}
                            </span>
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                ref={(el) => (linkRefs.current.services = el)}
                href="/layanan"
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isServices ? activeCls : linkCls}`}
              >
                Layanan
              </Link>

              <Link
                ref={(el) => (linkRefs.current.cekOngkir = el)}
                href="/cek-ongkir"
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isCekOngkir ? activeCls : linkCls}`}
              >
                Cek Ongkir
              </Link>

              {/* Sliding active-page underline */}
              <span
                className={`pointer-events-none absolute bottom-0 h-0.5 rounded-full transition-all duration-300 ease-out ${
                  transparent ? "bg-white" : "bg-navy"
                }`}
                style={{
                  left: underline.left,
                  width: underline.width,
                  opacity: underline.width ? 1 : 0,
                }}
              />
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-navy-dark font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
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
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
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
          <nav
            className="px-5 pt-4 pb-4 space-y-1"
            aria-label="Navigasi mobile"
          >
            <Link
              href="/"
              className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                isHome
                  ? "bg-navy/5 text-navy font-bold"
                  : "text-black hover:text-navy hover:bg-gray-50"
              }`}
            >
              Beranda
            </Link>

            <Link
              href="/tentang-kami"
              className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                isAbout
                  ? "bg-navy/5 text-navy font-bold"
                  : "text-black hover:text-navy hover:bg-gray-50"
              }`}
            >
              Tentang Kami
            </Link>

            <Link
              href="/layanan"
              className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                isServices
                  ? "bg-navy/5 text-navy font-bold"
                  : "text-black hover:text-navy hover:bg-gray-50"
              }`}
            >
              Layanan
            </Link>

            <Link
              href="/cek-ongkir"
              className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                isCekOngkir
                  ? "bg-navy/5 text-navy font-bold"
                  : "text-black hover:text-navy hover:bg-gray-50"
              }`}
            >
              Cek Ongkir
            </Link>

            <Link
              href="/artikel"
              className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                isArtikel
                  ? "bg-navy/5 text-navy font-bold"
                  : "text-black hover:text-navy hover:bg-gray-50"
              }`}
            >
              Artikel
            </Link>

            <Link
              href="/kontak"
              className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                isKontak
                  ? "bg-navy/5 text-navy font-bold"
                  : "text-black hover:text-navy hover:bg-gray-50"
              }`}
            >
              Kontak
            </Link>
          </nav>

          <div className="px-5 pt-2 pb-8 border-t border-gray-100">
            <Link
              href="/kontak"
              className="w-full flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-navy-dark font-semibold px-5 py-4 rounded-2xl text-base transition-colors"
            >
              Hubungi Kami
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
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
        </div>
      </div>
    </>
  );
}
