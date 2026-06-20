import { useState, useRef, useEffect, useCallback } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import SectionHeading from "../Shared/SectionHeading";
import { STEP_ICONS, STEP_DETAILS, STEP_GRADIENTS, STEP_ILLUSTRATIONS } from "../../constants/processTimeline";

const AUTOPLAY_MS = 4500;

export default function ProcessTimeline({ processSteps = [] }) {
  const [active, setActive] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const ref = useScrollReveal();
  const timerRef = useRef(null);
  const pausedRef = useRef(false);
  const current = processSteps[active] ?? {};
  const details = STEP_DETAILS[active] ?? [];

  const advance = useCallback(() => {
    if (!pausedRef.current) {
      setActive((prev) => (prev + 1) % processSteps.length);
      setProgressKey((k) => k + 1);
    }
  }, [processSteps.length]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, AUTOPLAY_MS);
    setProgressKey((k) => k + 1);
  }, [advance]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const handleTabClick = (i) => {
    setActive(i);
    resetTimer();
  };

  if (!processSteps.length) return null;

  return (
    <section
      id="proses"
      ref={ref}
      className="bg-white py-16 sm:py-24"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="sr">
          <SectionHeading
            tag="Proses Layanan"
            title="Bagaimana Kami Bekerja"
            subtitle={`${processSteps.length} tahap operasional terstruktur untuk memastikan setiap kiriman ditangani dengan standar terbaik.`}
          />
        </div>

        {/* Tab bar */}
        <div className="sr mb-8 sm:mb-10">
          {/* Mobile: scroll */}
          <div className="flex sm:hidden overflow-x-auto gap-2 pb-1 scrollbar-none">
            {processSteps.map((step, i) => (
              <button
                key={step.id}
                onClick={() => handleTabClick(i)}
                className={[
                  "shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border whitespace-nowrap",
                  active === i
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-navy/50 border-gray-200 hover:text-navy",
                ].join(" ")}
              >
                <span className={active === i ? "text-white/80" : "text-navy/30"}>
                  {STEP_ICONS[i]}
                </span>
                {step.title}
              </button>
            ))}
          </div>

          {/* Desktop: segmented control */}
          <div className="hidden sm:flex border border-gray-200 rounded-2xl overflow-hidden divide-x divide-gray-200 bg-white">
            {processSteps.map((step, i) => (
              <button
                key={step.id}
                onClick={() => handleTabClick(i)}
                className={[
                  "relative flex-1 flex flex-col sm:flex-row items-center gap-2 px-4 py-4 text-sm font-semibold transition-all duration-200 text-left overflow-hidden",
                  active === i
                    ? "bg-navy/5 text-navy"
                    : "bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50",
                ].join(" ")}
              >
                {active === i && (
                  <span
                    key={progressKey}
                    className="absolute bottom-0 left-0 h-0.5 bg-navy"
                    style={{ animation: `tabProgress ${AUTOPLAY_MS}ms linear forwards` }}
                  />
                )}
                <span
                  className={[
                    "p-2 rounded-lg transition-colors shrink-0",
                    active === i ? "bg-navy text-white" : "bg-gray-100 text-gray-400",
                  ].join(" ")}
                >
                  {STEP_ICONS[i]}
                </span>
                <span className="leading-snug text-center sm:text-left">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: text */}
          <div key={`text-${active}`} style={{ animation: "ptFadeUp .35s ease both" }}>
            <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-navy leading-tight mb-4">
              {current.title}
            </h3>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-7">
              {current.description}
            </p>
            <ul className="space-y-3">
              {details.map((d, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-navy/8 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path d="M2.5 6l2.5 2.5L9.5 3" stroke="#0b1f4d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-700 font-medium leading-snug">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: illustration */}
          <div
            key={`illus-${active}`}
            className="rounded-3xl overflow-hidden"
            style={{ background: STEP_GRADIENTS[active], animation: "ptFadeUp .45s ease both" }}
          >
            {STEP_ILLUSTRATIONS[active]}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ptFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tabProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
