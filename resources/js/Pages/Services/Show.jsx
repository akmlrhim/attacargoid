import { Link } from "@inertiajs/react";
import AppLayout from "../../Components/Layout/AppLayout";
import PageHead from "../../Components/Shared/PageHead";
import ShareLinks from "../../Components/Shared/ShareLinks";
import ServiceCard from "../../Components/Services/ServiceCard";

function CheckIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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

export default function ServiceShow({
  service,
  relatedServices = [],
  metaDescription,
  shareImage,
}) {
  const path = `/layanan/${service.slug}`;
  const details = service.details || [];

  return (
    <>
      <PageHead
        title={service.title}
        description={metaDescription}
        path={path}
        image={service.image_url}
        shareImage={shareImage}
        imageAlt={service.image_alt || service.title}
      />

      <article className="bg-white pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm mb-6"
          >
            <Link
              href="/"
              className="text-gray-500 hover:text-navy transition-colors"
            >
              Beranda
            </Link>
            <span className="text-gray-300 select-none">/</span>
            <Link
              href="/layanan"
              className="text-gray-500 hover:text-navy transition-colors"
            >
              Layanan
            </Link>
            <span className="text-gray-300 select-none">/</span>
            <span className="text-orange font-medium truncate">
              {service.title}
            </span>
          </nav>

          <h1 className="text-2xl sm:text-4xl font-black text-navy leading-tight mb-4">
            {service.title}
          </h1>

          {/* The chip doubles as a way back into the list, pre-filtered. */}
          {service.category && (
            <Link
              href={`/layanan?kategori=${service.category.slug}`}
              className="inline-flex items-center rounded-full bg-navy/5 px-3.5 py-1.5 text-xs font-bold text-navy transition-colors hover:bg-navy/10 mb-8"
            >
              {service.category.name}
            </Link>
          )}

          {service.image_url && (
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-10">
              <img
                src={service.image_url}
                alt={service.image_alt || service.title}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[56px_1fr] gap-6 lg:gap-14">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <ShareLinks
                title={service.title}
                path={path}
                subject="layanan"
              />
            </div>

            <div>
              <div
                className="text-black text-base leading-relaxed
                  [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-black [&>h2]:text-navy [&>h2]:mt-8 [&>h2]:mb-4
                  [&>h3]:text-lg [&>h3]:sm:text-xl [&>h3]:font-bold [&>h3]:text-navy [&>h3]:mt-6 [&>h3]:mb-3
                  [&>p]:mb-5
                  [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul]:space-y-1
                  [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ol]:space-y-1
                  [&_a]:text-orange [&_a]:underline [&_a]:font-medium
                  [&_strong]:font-bold"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />

              {details.length > 0 && (
                <div className="mt-10 border-t border-gray-100 pt-8">
                  <h2 className="text-lg sm:text-xl font-black text-navy mb-5">
                    Yang Anda Dapatkan
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                        <span className="text-sm font-medium text-black">
                          {detail.item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/cek-ongkir"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  Cek Ongkir
                  <ArrowIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/kontak"
                  className="inline-flex items-center justify-center rounded-full border border-navy-dark/15 bg-white px-7 py-3.5 text-sm font-bold text-black-dark transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  Konsultasi Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {relatedServices.length > 0 && (
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-black text-navy mb-8">
              Layanan Lainnya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {relatedServices.map((related) => (
                <ServiceCard key={related.id} service={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

ServiceShow.layout = (page) => <AppLayout>{page}</AppLayout>;
