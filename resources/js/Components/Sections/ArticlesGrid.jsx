import { Link } from "@inertiajs/react";
import ArticleCard from "../Articles/ArticleCard";

function Pagination({ links = [] }) {
  if (links.length <= 3) {
    return null;
  }

  return (
    <nav
      aria-label="Navigasi halaman"
      className="flex flex-wrap items-center justify-center gap-1.5 mt-14"
    >
      {links.map((link, i) => {
        const label = link.label
          .replace("&laquo; Previous", "‹")
          .replace("Next &raquo;", "›");

        if (!link.url) {
          return (
            <span
              key={i}
              className="px-3.5 py-2 rounded-full text-sm font-semibold text-gray-300 select-none"
              dangerouslySetInnerHTML={{ __html: label }}
            />
          );
        }

        return (
          <Link
            key={i}
            href={link.url}
            preserveScroll
            className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
              link.active
                ? "bg-navy text-white"
                : "text-navy hover:bg-navy/5"
            }`}
            dangerouslySetInnerHTML={{ __html: label }}
          />
        );
      })}
    </nav>
  );
}

export default function ArticlesGrid({ articles }) {
  const items = articles?.data ?? [];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            Belum ada artikel tersedia.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {items.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <Pagination links={articles.links} />
          </>
        )}
      </div>
    </section>
  );
}
