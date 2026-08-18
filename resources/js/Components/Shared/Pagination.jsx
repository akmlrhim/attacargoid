import { Link } from "@inertiajs/react";

const COMPACT_WINDOW = { boundary: 1, sibling: 0 };
const FULL_WINDOW = { boundary: 2, sibling: 1 };

function buildPageItems(current, last, { boundary, sibling }) {
  const pages = new Set();

  for (let page = 1; page <= Math.min(boundary, last); page++) {
    pages.add(page);
  }

  for (let page = Math.max(last - boundary + 1, 1); page <= last; page++) {
    pages.add(page);
  }

  for (
    let page = Math.max(current - sibling, 1);
    page <= Math.min(current + sibling, last);
    page++
  ) {
    pages.add(page);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const items = [];

  sorted.forEach((page, index) => {
    const previous = sorted[index - 1];

    if (index > 0 && page - previous > 1) {
      if (page - previous === 2) {
        items.push(previous + 1);
      } else {
        items.push("ellipsis");
      }
    }

    items.push(page);
  });

  return items;
}

function buildPageUrl(links, page) {
  const reference = links.find((link) => link.url);

  if (!reference) {
    return null;
  }

  const url = new URL(reference.url, "http://localhost");
  url.searchParams.set("page", String(page));

  return `${url.pathname}${url.search}`;
}

function PageRail({ paginator, links, current, items, compact, className }) {
  const itemBase = compact
    ? "flex h-9 min-w-9 items-center justify-center rounded-full px-1.5 text-xs font-semibold transition-colors"
    : "flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors";
  const linkClasses = `${itemBase} text-navy hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy`;
  const mutedClasses = `${itemBase} text-gray-300 select-none`;

  return (
    <ul
      className={`${className} flex-wrap items-center justify-center ${
        compact ? "gap-1" : "gap-1.5"
      }`}
    >
      <li>
        {paginator.prev_page_url ? (
          <Link
            href={paginator.prev_page_url}
            preserveScroll
            aria-label="Halaman sebelumnya"
            rel="prev"
            className={linkClasses}
          >
            ‹
          </Link>
        ) : (
          <span aria-hidden="true" className={mutedClasses}>
            ‹
          </span>
        )}
      </li>

      {items.map((item, index) => {
        if (item === "ellipsis") {
          return (
            <li key={`ellipsis-${index}`} aria-hidden="true">
              <span className={`${itemBase} text-gray-400 select-none`}>…</span>
            </li>
          );
        }

        if (item === current) {
          return (
            <li key={item}>
              <span aria-current="page" className={`${itemBase} bg-navy text-white`}>
                {item}
              </span>
            </li>
          );
        }

        return (
          <li key={item}>
            <Link
              href={buildPageUrl(links, item)}
              preserveScroll
              aria-label={`Halaman ${item}`}
              className={linkClasses}
            >
              {item}
            </Link>
          </li>
        );
      })}

      <li>
        {paginator.next_page_url ? (
          <Link
            href={paginator.next_page_url}
            preserveScroll
            aria-label="Halaman berikutnya"
            rel="next"
            className={linkClasses}
          >
            ›
          </Link>
        ) : (
          <span aria-hidden="true" className={mutedClasses}>
            ›
          </span>
        )}
      </li>
    </ul>
  );
}

export default function Pagination({ paginator, className = "mt-14" }) {
  const current = paginator?.current_page ?? 1;
  const last = paginator?.last_page ?? 1;
  const links = paginator?.links ?? [];

  if (last <= 1) {
    return null;
  }

  const shared = { paginator, links, current };

  return (
    <nav aria-label="Navigasi halaman" className={className}>
      <PageRail
        {...shared}
        items={buildPageItems(current, last, COMPACT_WINDOW)}
        compact
        className="flex sm:hidden"
      />
      <PageRail
        {...shared}
        items={buildPageItems(current, last, FULL_WINDOW)}
        className="hidden sm:flex"
      />

      <p role="status" aria-live="polite" className="sr-only">
        Halaman {current} dari {last}
      </p>
    </nav>
  );
}
