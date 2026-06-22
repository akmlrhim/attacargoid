import { useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import SectionHeading from "../Shared/SectionHeading";
import DotField from "../ReactBits/DotField";

const AUTOPLAY_MS = 4500;

export default function ServicesSection({ services = [] }) {
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const ref = useScrollReveal();

  const current = services[active];
  const advance = () => setActive((prev) => (prev + 1) % services.length);

  const handleTabClick = (i) => {
    setActive(i);
    setStopped(true);
  };

  if (!services.length) return null;

  return (
    <section
      id="layanan"
      ref={ref}
      className="bg-gray-50 py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Hidden timer — only active during autoplay; removed on manual click */}
      {!stopped && (
        <div
          key={active}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
            animation: `svcTick ${AUTOPLAY_MS}ms linear forwards`,
          }}
          onAnimationEnd={advance}
        />
      )}

      <div className="absolute inset-0 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={20}
          bulgeStrength={60}
          glowRadius={140}
          gradientFrom="rgba(11,31,77,0.16)"
          gradientTo="rgba(11,31,77,0.09)"
          glowColor="rgba(11,31,77,0.06)"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="sr">
          <SectionHeading
            title="Solusi Distribusi Lengkap"
            subtitle="Lima kategori layanan untuk memenuhi kebutuhan logistik bisnis Anda di Kalimantan."
          />
        </div>

        <div className="sr flex flex-col lg:flex-row gap-5 lg:gap-8">
          {/* Mobile: horizontal scroll tabs */}
          <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 -mx-5 sm:-mx-6 px-5 sm:px-6 scrollbar-none">
            {services.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleTabClick(i)}
                className={`shrink-0 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                  active === i
                    ? "bg-navy text-white"
                    : "bg-white text-navy/60 hover:text-navy border border-gray-200"
                }`}
              >
                {s.short_title}
              </button>
            ))}
          </div>

          {/* Desktop: vertical tab list */}
          <div className="hidden lg:flex lg:w-52 xl:w-60 shrink-0 flex-col gap-1.5">
            {services.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleTabClick(i)}
                className={`relative text-left px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 leading-snug overflow-hidden ${
                  active === i
                    ? "bg-navy text-white"
                    : "bg-white text-black hover:text-navy hover:bg-white/80 border border-gray-100"
                }`}
              >
                {active === i && !stopped && (
                  <span
                    className="absolute bottom-0 left-0 h-0.5 bg-white/40"
                    style={{
                      animation: `svcProgress ${AUTOPLAY_MS}ms linear forwards`,
                    }}
                  />
                )}
                {s.title}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="relative aspect-[16/9] sm:aspect-[16/7] overflow-hidden bg-gray-100">
              <img
                key={`img-${active}`}
                src={current.image_url}
                alt={current.image_alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ animation: "svcFadeIn 0.4s ease both" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
            </div>

            <div
              key={`content-${active}`}
              className="p-5 sm:p-6 lg:p-8"
              style={{ animation: "svcFadeUp 0.35s ease both" }}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black mb-2.5">
                {current.title}
              </h3>
              <div
                className="text-black leading-relaxed mb-5 text-sm sm:text-[0.95rem] [&>p]:m-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol]:space-y-1"
                dangerouslySetInnerHTML={{ __html: current.description }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(current.details || []).map((d, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl"
                  >
                    <svg
                      className="w-4 h-4 text-orange shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm text-black font-medium">
                      {d.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
                @keyframes svcTick    { to { opacity: 0; } }
                @keyframes svcProgress { from { width: 0%; } to { width: 100%; } }
                @keyframes svcFadeIn  { from { opacity: 0; } to { opacity: 1; } }
                @keyframes svcFadeUp  { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
    </section>
  );
}
