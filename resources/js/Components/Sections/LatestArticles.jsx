import { Link } from "@inertiajs/react";
import useScrollReveal from "../../hooks/useScrollReveal";
import formatDate from "../../utils/formatDate";

function CalendarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5a1.25 1.25 0 00-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5a1.25 1.25 0 00-1.25-1.25H4.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArticleThumb({ article, className = "" }) {
  if (!article.image_url) {
    return (
      <div className={`bg-navy/5 flex items-center justify-center ${className}`}>
        <svg className="w-8 h-8 text-navy/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 6h16v12H4V6z"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={article.image_url}
      alt={article.image_alt || article.title}
      loading="lazy"
      decoding="async"
      className={`object-cover ${className}`}
    />
  );
}

export default function LatestArticles({ articles = [] }) {
  const ref = useScrollReveal();

  if (articles.length === 0) {
    return null;
  }

  const [featured, ...rest] = articles;

  return (
    <section ref={ref} className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="sr flex items-end justify-between gap-4 mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-navy">
            Artikel &amp; <span className="text-orange">Berita Terbaru</span>
          </h2>
          <Link
            href="/artikel"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-orange transition-colors shrink-0"
          >
            Lihat Semua
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

        <div className="sr grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Featured article */}
          <Link
            href={`/artikel/${featured.slug}`}
            className="group flex flex-col"
          >
            <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-5">
              <ArticleThumb
                article={featured}
                className="w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-navy leading-snug mb-3 group-hover:text-orange transition-colors">
              {featured.title}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4" />
              {formatDate(featured.published_at)}
            </div>
          </Link>

          {/* List of remaining articles */}
          <div className="flex flex-col divide-y divide-gray-100">
            {rest.map((article) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="group flex items-start gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0">
                  <ArticleThumb article={article} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm sm:text-base font-bold text-navy leading-snug line-clamp-2 mb-2 group-hover:text-orange transition-colors">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {formatDate(article.published_at)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="sr flex sm:hidden justify-center mt-10">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-orange transition-colors"
          >
            Lihat Semua Artikel
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
      </div>
    </section>
  );
}
