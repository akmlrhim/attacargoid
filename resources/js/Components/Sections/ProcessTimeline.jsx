import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollReveal from "../../hooks/useScrollReveal";
import SectionHeading from "../Shared/SectionHeading";
import DotField from "../ReactBits/DotField";

const stepIcons = [
  <svg
    key={0}
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>,
  <svg
    key={1}
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
    />
  </svg>,
  <svg
    key={2}
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7h.01M4 10h16M3 10l2-5h14l2 5M3 10v9a2 2 0 002 2h14a2 2 0 002-2v-9"
    />
  </svg>,
  <svg
    key={3}
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>,
];

export default function ProcessTimeline({ processSteps = [] }) {
  const sectionRef = useScrollReveal();
  const lineRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current || !stepsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 1.2,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  if (!processSteps.length) return null;

  return (
    <section
      id="proses"
      ref={sectionRef}
      className="bg-navy py-16 sm:py-24 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={20}
          bulgeStrength={60}
          glowRadius={140}
          gradientFrom="rgba(255,255,255,0.20)"
          gradientTo="rgba(245,166,35,0.15)"
          glowColor="rgba(245,166,35,0.18)"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="sr">
          <SectionHeading
            tag="Proses Layanan"
            title="Bagaimana Kami Bekerja"
            subtitle={`${processSteps.length} tahap operasional terstruktur untuk memastikan setiap kiriman ditangani dengan baik.`}
            light
          />
        </div>

        <div ref={stepsRef} className="max-w-2xl mx-auto relative">
          <div className="absolute left-8 top-8 bottom-8 w-px bg-white/10 hidden md:block">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-orange origin-top"
            />
          </div>

          <div className="space-y-2">
            {processSteps.map((step, i) => (
              <div
                key={step.id}
                className="sr flex gap-4 sm:gap-8 py-3.5 sm:py-4"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Icon column */}
                <div className="flex flex-col items-center shrink-0 w-11 sm:w-16">
                  <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-orange flex items-center justify-center text-white relative z-10">
                    <span className="[&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                      {stepIcons[i % stepIcons.length]}
                    </span>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-px flex-1 bg-white/10 mt-2 md:hidden min-h-[1.5rem]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-1 pt-1">
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-orange/50 font-black text-[10px] sm:text-xs tracking-widest">
                      {step.step_number}
                    </span>
                    <h3 className="text-white font-black text-base sm:text-lg leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-white/55 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
