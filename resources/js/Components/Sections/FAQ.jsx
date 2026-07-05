import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollReveal from "../../hooks/useScrollReveal";
import SectionHeading from "../Shared/SectionHeading";
import { getFaqItems } from "../../constants/faq";
import { buildWhatsAppUrl } from "../../constants/company";
import useCompany from "../../hooks/useCompany";

export default function FaqSection() {
  const ref = useScrollReveal();
  const company = useCompany();
  const { whatsapp_number } = company;
  const faqItems = getFaqItems(company);
  const [openIndex, setOpenIndex] = useState(0);

  // Toggling an accordion item changes the section height, which invalidates
  // the pixel positions ScrollTrigger caches for every section. Without a
  // recompute the reveal/scroll animations jump and sections appear to shift.
  // Refresh once the height transition (~300ms) has settled.
  useEffect(() => {
    const id = setTimeout(() => {
      window.__lenis?.resize();
      ScrollTrigger.refresh();
    }, 320);
    return () => clearTimeout(id);
  }, [openIndex]);

  return (
    <section id="faq" ref={ref} className="bg-white py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="sr">
          <SectionHeading
            title="Pertanyaan yang Sering Diajukan"
            subtitle="Beberapa hal yang paling sering ditanyakan seputar layanan distribusi ATTA Cargo."
          />
        </div>

        <div className="sr space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className={`border-b transition-colors duration-200 ${
                  isOpen ? "border-navy/20" : "border-gray-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-2 py-1 text-left"
                >
                  <span className="text-black text-sm sm:text-base leading-snug">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 grid place-items-center w-7 h-7 rounded-full transition-all duration-300 ${
                      isOpen
                        ? "bg-orange text-white rotate-180"
                        : "bg-transparent text-navy"
                    }`}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-relaxed text-black">
                      {" "}
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="sr mt-10 text-center">
          <p className="text-black text-sm mb-4">
            Masih ada pertanyaan lain?{" "}
            <a
              href={buildWhatsAppUrl(whatsapp_number)}
              className="font-bold text-navy hover:underline"
              target="_blank"
            >
              Hubungi kami
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
