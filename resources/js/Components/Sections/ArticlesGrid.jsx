import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import ArticleCard from "../Articles/ArticleCard";
import Pagination from "../Shared/Pagination";

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
 * `from` and `to` are independent - either can be left blank so the filter
 * works as a single cutoff date or a full range. Each input caps the other
 * (`max`/`min`) so the native date picker can't produce an inverted range.
 */
function DateRangeFilter({ from, to, onFromChange, onToChange }) {
  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor="artikel-date-from">
        Dari tanggal
      </label>
      <input
        id="artikel-date-from"
        type="date"
        value={from}
        max={to || undefined}
        onChange={(e) => onFromChange(e.target.value)}
        className="w-[9.5rem] rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-black outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10"
      />

      <span className="text-sm text-gray-500" aria-hidden="true">
        &ndash;
      </span>

      <label className="sr-only" htmlFor="artikel-date-to">
        Sampai tanggal
      </label>
      <input
        id="artikel-date-to"
        type="date"
        value={to}
        min={from || undefined}
        onChange={(e) => onToChange(e.target.value)}
        className="w-[9.5rem] rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-black outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10"
      />
    </div>
  );
}

function FilterBar({ query, onQueryChange, dateFrom, dateTo, onDateFromChange, onDateToChange, onReset, hasActiveFilter }) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:mb-10 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative min-w-0 lg:max-w-sm lg:flex-1">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Cari artikel..."
          aria-label="Cari artikel"
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-black outline-none transition-all placeholder:text-gray-500 focus:border-navy focus:ring-2 focus:ring-navy/10"
        />
      </div>

      <div className="flex items-center gap-3">
        <DateRangeFilter
          from={dateFrom}
          to={dateTo}
          onFromChange={onDateFromChange}
          onToChange={onDateToChange}
        />

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
    </div>
  );
}

export default function ArticlesGrid({
  articles,
  activeSearch = "",
  activeDateFrom = null,
  activeDateTo = null,
}) {
  const items = articles?.data ?? [];
  const [query, setQuery] = useState(activeSearch);
  const [dateFrom, setDateFrom] = useState(activeDateFrom ?? "");
  const [dateTo, setDateTo] = useState(activeDateTo ?? "");

  const hasActiveFilter = Boolean(query || dateFrom || dateTo);

  /**
   * All filters are server-driven (articles are paginated, not fully loaded),
   * so any change triggers a debounced partial reload instead of client-side
   * filtering. `preserveState` keeps the inputs focused; `replace` avoids
   * filling history with one entry per keystroke.
   */
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const params = {};
      if (query.trim()) params.q = query.trim();
      if (dateFrom) params.from = dateFrom;
      if (dateTo) params.to = dateTo;

      router.get("/artikel", params, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        only: ["articles", "activeSearch", "activeDateFrom", "activeDateTo"],
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [query, dateFrom, dateTo]);

  const handleReset = () => {
    setQuery("");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <FilterBar
          query={query}
          onQueryChange={setQuery}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onReset={handleReset}
          hasActiveFilter={hasActiveFilter}
        />

        {items.length === 0 ? (
          <div className="py-20 text-center">
            {hasActiveFilter ? (
              <>
                <p className="text-base font-bold text-navy">Artikel tidak ditemukan</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                  {activeSearch
                    ? `Tidak ada artikel yang cocok dengan kata kunci "${activeSearch}"`
                    : "Tidak ada artikel pada rentang tanggal yang dipilih"}
                  . Coba kata kunci atau tanggal lain.
                </p>
              </>
            ) : (
              <p className="text-gray-500">Belum ada artikel tersedia.</p>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {items.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <Pagination paginator={articles} />
          </>
        )}
      </div>
    </section>
  );
}
