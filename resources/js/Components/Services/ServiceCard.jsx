import { Link } from "@inertiajs/react";

/**
 * Compact service card used by the "Layanan Lainnya" grid on a service page.
 * The list page uses its own wide, alternating card - this one is the
 * three-per-row companion to ArticleCard.
 */
export default function ServiceCard({ service }) {
  return (
    <Link href={`/layanan/${service.slug}`} className="group flex flex-col">
      <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-navy/5 mb-4">
        {service.image_url ? (
          <img
            src={service.image_url}
            alt={service.image_alt || service.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-navy/20"
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
        )}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-navy leading-snug line-clamp-2 mb-2 group-hover:text-orange transition-colors">
        {service.title}
      </h3>

      <p className="text-sm text-black leading-relaxed line-clamp-2">
        {service.description_excerpt}
      </p>
    </Link>
  );
}
