import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import SearchableSelect from "../Shared/SearchableSelect";

function ArrowIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}

function ServicePlaceholder() {
  return (
    <div className="w-full h-full bg-navy/5 flex items-center justify-center">
      <svg
        className="w-16 h-16 text-navy/20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    </div>
  );
}

function ServiceCard({ service, index }) {
  const isEven = index % 2 === 0;
  const href = `/layanan/${service.slug}`;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md lg:flex-row ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Image - 3:2 at every breakpoint, matching the source photos so
          `object-cover` has nothing to slice off. Hidden from the tab order and
          the accessibility tree: the heading below points at the same page, so
          a second stop here would only be a duplicate. */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-white lg:w-[45%]"
      >
        {service.image_url ? (
          <>
            <img
              src={service.image_url}
              alt={service.image_alt || service.title}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/*
              The edge fade is a white gradient painted over the image rather
              than a `mask-image` on the image itself. A mask on the element
              being scaled has to be recomputed every frame of the hover
              transition; a plain gradient layer over the card's white
              background looks identical and stays on the compositor.
            */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 hidden lg:block ${
                isEven
                  ? "[background-image:linear-gradient(to_right,transparent_60%,white_100%)]"
                  : "[background-image:linear-gradient(to_left,transparent_60%,white_100%)]"
              }`}
            />
          </>
        ) : (
          <ServicePlaceholder />
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
        <h2 className="mb-3 text-xl font-black leading-tight text-navy sm:text-2xl lg:text-3xl">
          <Link
            href={href}
            className="rounded-sm transition-colors duration-200 hover:text-navy-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
          >
            {service.title}
          </Link>
        </h2>

        {/*
          Only a trimmed excerpt lives on the card - the full description and
          the detail points belong to the service's own page.
        */}
        <p className="text-sm leading-relaxed text-black sm:text-base">
          {service.description_excerpt}
        </p>

        <div className="mt-6">
          <Link
            href={href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:w-auto"
          >
            Selengkapnya
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function SearchIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

/**
 * Search box plus a category dropdown, spanning the full content width.
 *
 * The category control is the shared `SearchableSelect` used by Cek Ongkir, so
 * both pages behave identically once the category list grows past a handful.
 */
function FilterBar({
  categories,
  activeSlug,
  query,
  onCategoryChange,
  onQueryChange,
  onReset,
  hasActiveFilter,
}) {
  /**
   * `null` is the "Semua Kategori" row. It is carried as an empty string
   * because `SearchableSelect` matches the current value against option
   * values, and it is mapped back to `null` on the way out.
   */
  const categoryOptions = [
    { value: "", label: "Semua Kategori" },
    ...categories.map((category) => ({
      value: category.slug,
      label: `${category.name} (${category.count})`,
    })),
  ];

  /*
    Both controls are sized by flex ratio rather than fixed widths, so the
    category stays the wider of the two at every viewport instead of only above
    the breakpoint where a fixed width would kick in. `min-w-0` lets them shrink
    past their intrinsic input width on narrow rows.
  */
  return (
    <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center">
      <div className="relative min-w-0 sm:flex-[2]">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Masukkan kata kunci.."
          aria-label="Cari layanan"
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-black outline-none transition-all placeholder:text-gray-500 focus:border-navy focus:ring-2 focus:ring-navy/10"
        />
      </div>

      <SearchableSelect
        id="layanan-kategori"
        className="min-w-0 sm:flex-[3]"
        options={categoryOptions}
        value={activeSlug ?? ""}
        onChange={(slug) => onCategoryChange(slug || null)}
        placeholder="Semua Kategori"
        searchPlaceholder="Cari kategori..."
        emptyMessage="Kategori tidak ditemukan"
        aria-label="Filter berdasarkan kategori"
      />

      {/* Reset only earns its place once something is actually filtered. */}
      {hasActiveFilter && (
        <button
          type="button"
          onClick={onReset}
          className="shrink-0 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-navy transition-colors hover:border-navy/30 hover:text-navy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default function ServicesList({
  services = [],
  categories = [],
  activeCategory = null,
  activeSearch = "",
}) {
  const [activeSlug, setActiveSlug] = useState(activeCategory);
  const [query, setQuery] = useState(activeSearch ?? "");

  /**
   * One searchable blob per service, built once. The stored `description` is
   * RichEditor HTML, so the tags are stripped here - otherwise typing "p" would
   * match every service through its `<p>` markup.
   */
  const searchIndex = useMemo(
    () =>
      new Map(
        services.map((service) => [
          service.id,
          [
            service.title,
            service.short_title,
            service.category?.name,
            String(service.description ?? "").replace(/<[^>]*>/g, " "),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase(),
        ]),
      ),
    [services],
  );

  const trimmedQuery = query.trim().toLowerCase();
  const hasActiveFilter = Boolean(activeSlug) || trimmedQuery !== "";

  const visibleServices = services.filter((service) => {
    if (activeSlug && service.category?.slug !== activeSlug) {
      return false;
    }

    return (
      trimmedQuery === "" || searchIndex.get(service.id)?.includes(trimmedQuery)
    );
  });

  /**
   * Every service is already on the page, so filtering happens in memory - a
   * round trip to the server would only re-send data the client is holding.
   * The URL is still kept in sync so a filtered view can be shared or reloaded;
   * `?kategori=` and `?q=` are what the server reads back on the next load.
   *
   * `replaceState` rather than `pushState`: adjusting a filter is not a
   * navigation, and Inertia's own state object is passed straight through so
   * its history handling keeps working. The write is debounced because typing
   * would otherwise call it on every keystroke, which Safari rate-limits.
   */
  const isFirstSync = useRef(true);

  useEffect(() => {
    if (isFirstSync.current) {
      isFirstSync.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const url = new URL(window.location.href);

      if (activeSlug) {
        url.searchParams.set("kategori", activeSlug);
      } else {
        url.searchParams.delete("kategori");
      }

      if (trimmedQuery) {
        url.searchParams.set("q", query.trim());
      } else {
        url.searchParams.delete("q");
      }

      window.history.replaceState(window.history.state, "", url);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeSlug, query, trimmedQuery]);

  const handleReset = () => {
    setActiveSlug(null);
    setQuery("");
  };

  /*
    The top padding is deliberately tighter than the section's own rhythm: the
    filter is the first thing a visitor reaches for after reading the hero, so
    it sits close to it rather than a full section gap away. The bottom keeps
    the original breathing room before the CTA.
  */
  return (
    <section
      id="layanan-list"
      className="bg-gray-50 pb-16 pt-8 sm:pb-24 sm:pt-10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {services.length > 0 && (
          <FilterBar
            categories={categories}
            activeSlug={activeSlug}
            query={query}
            onCategoryChange={setActiveSlug}
            onQueryChange={setQuery}
            onReset={handleReset}
            hasActiveFilter={hasActiveFilter}
          />
        )}

        {services.length === 0 ? (
          <p className="py-20 text-center text-gray-500">
            Belum ada layanan tersedia.
          </p>
        ) : visibleServices.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-base font-bold text-navy">
              Layanan tidak ditemukan
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Tidak ada layanan yang cocok dengan filter yang dipilih. Coba kata
              kunci lain atau tampilkan semua kategori.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-navy-dark px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              Tampilkan Semua Layanan
            </button>
          </div>
        ) : (
          <>
            {hasActiveFilter && (
              <p className="mb-6 text-sm text-gray-500" aria-live="polite">
                Menampilkan{" "}
                <span className="font-bold text-navy">
                  {visibleServices.length}
                </span>{" "}
                dari {services.length} layanan
              </p>
            )}

            <div className="space-y-8 sm:space-y-12">
              {visibleServices.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
