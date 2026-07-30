import { useState } from "react";
import { Link } from "@inertiajs/react";

function ServiceCard({ service, index }) {
  const isEven = index % 2 === 0;
  const [isExpanded, setIsExpanded] = useState(false);
  const details = service.details || [];
  const detailsId = `service-details-${service.id}`;

  return (
    <article
      className={`flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ${isEven ? "" : "lg:flex-row-reverse"}`}
    >
      {/* Image */}
      <div className="lg:w-[45%] shrink-0 aspect-[4/3] lg:aspect-auto overflow-hidden bg-white">
        {service.image_url ? (
          <img
            src={service.image_url}
            alt={service.image_alt || service.title}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
              isEven
                ? "lg:[mask-image:linear-gradient(to_right,black_60%,transparent_100%)] lg:[-webkit-mask-image:linear-gradient(to_right,black_60%,transparent_100%)]"
                : "lg:[mask-image:linear-gradient(to_left,black_60%,transparent_100%)] lg:[-webkit-mask-image:linear-gradient(to_left,black_60%,transparent_100%)]"
            }`}
          />
        ) : (
          <div className="w-full h-full bg-navy/5 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-navy/20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

      {/* Content */}
      <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-navy mb-3 leading-tight">
          {service.title}
        </h2>

        {/*
          The last paragraph of the description is forced inline so the
          "Baca selengkapnya" toggle continues the sentence instead of
          sitting below it as a second button competing with the CTA.
        */}
        <div className="text-black text-sm sm:text-base leading-relaxed [&_p]:m-0 [&_p+p]:mt-3 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1 [&_p:last-of-type]:inline">
          <div
            className="contents"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />

          {details.length > 0 && (
            <>
              {" "}
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
                aria-controls={detailsId}
                className="inline-flex items-center gap-1 align-baseline font-semibold text-navy underline decoration-2 decoration-orange/50 underline-offset-4 hover:text-navy-light hover:decoration-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded-sm transition-colors duration-200"
              >
                {isExpanded ? "Tutup" : "Baca selengkapnya"}
                <svg
                  className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    isExpanded ? "-rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {details.length > 0 && (
          <div
            id={detailsId}
            inert={!isExpanded}
            className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
              isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-5">
                {details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <svg
                      className="w-4 h-4 text-orange shrink-0 mt-0.5"
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
                    <span className="text-sm text-black font-medium">
                      {d.item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/cek-ongkir"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-sm font-bold text-white hover:bg-navy transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Cek Ongkir
            <svg
              className="w-4 h-4"
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
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ServicesList({ services = [] }) {
  return (
    <section id="layanan-list" className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {services.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            Belum ada layanan tersedia.
          </p>
        ) : (
          <div className="space-y-8 sm:space-y-12">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
