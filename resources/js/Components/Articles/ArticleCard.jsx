import { Link } from "@inertiajs/react";
import formatDate from "../../utils/formatDate";

export default function ArticleCard({ article }) {
  return (
    <Link href={`/artikel/${article.slug}`} className="group flex flex-col">
      <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-navy/5 mb-4">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.image_alt || article.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-10 h-10 text-navy/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 6h16v12H4V6z"
              />
            </svg>
          </div>
        )}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-navy leading-snug line-clamp-2 mb-2 group-hover:text-orange transition-colors">
        {article.title}
      </h3>

      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5a1.25 1.25 0 00-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5a1.25 1.25 0 00-1.25-1.25H4.75z"
            clipRule="evenodd"
          />
        </svg>
        {formatDate(article.published_at)}
      </div>
    </Link>
  );
}
