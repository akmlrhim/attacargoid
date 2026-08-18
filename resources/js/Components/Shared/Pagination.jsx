import { Link } from "@inertiajs/react";

const BOUNDARY_COUNT = 2;
const SIBLING_COUNT = 1;

function buildPageItems(current, last) {
  const pages = new Set();

  for (let page = 1; page <= Math.min(BOUNDARY_COUNT, last); page++) {
    pages.add(page);
  }

  for (let page = Math.max(last - BOUNDARY_COUNT + 1, 1); page <= last; page++) {
    pages.add(page);
  }

  for (
    let page = Math.max(current - SIBLING_COUNT, 1);
    page <= Math.min(current + SIBLING_COUNT, last);
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

export default function Pagination({ paginator, className = "mt-14" }) {
  const current = paginator?.current_page ?? 1;
  const last = paginator?.last_page ?? 1;
  const links = paginator?.links ?? [];

  if (last <= 1) {
    return null;
  }

  const items = buildPageItems(current, last);
  const baseClasses =
    "block min-w-[2.75rem] px-3.5 py-2.5 rounded-full text-sm font-semibold text-center transition-colors";
  const linkClasses = `${baseClasses} text-navy hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy`;
  const mutedClasses = `${baseClasses} text-gray-300 select-none`;

  return (
    <nav aria-label="Navigasi halaman" className={className}>
      <ul className="flex flex-wrap items-center justify-center gap-1.5">
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
                <span className={`${baseClasses} text-gray-400 select-none`}>
                  …
                </span>
              </li>
            );
          }

          if (item === current) {
            return (
              <li key={item}>
                <span
                  aria-current="page"
                  className={`${baseClasses} bg-navy text-white`}
                >
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

      <p role="status" aria-live="polite" className="sr-only">
        Halaman {current} dari {last}
      </p>
    </nav>
  );
}
