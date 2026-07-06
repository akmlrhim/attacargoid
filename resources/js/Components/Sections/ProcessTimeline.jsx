import useScrollReveal from "../../hooks/useScrollReveal";
import SectionHeading from "../Shared/SectionHeading";
import {
  PROCESS_STEPS,
  STEP_ILLUSTRATIONS,
} from "../../constants/processTimeline";

export default function ProcessTimeline() {
  const processSteps = PROCESS_STEPS;
  const ref = useScrollReveal();

  if (!processSteps.length) return null;

  return (
    <section id="proses" ref={ref} className="bg-white py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="sr">
          <SectionHeading
            title="Bagaimana Kami Bekerja"
            subtitle={`${processSteps.length} tahap operasional terstruktur untuk memastikan setiap kiriman ditangani dengan standar terbaik.`}
          />
        </div>

        <div className="mt-6 sm:mt-10 space-y-14 sm:space-y-20">
          {processSteps.map((step, i) => (
            <div
              key={step.id}
              className="sr grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 items-center"
            >
              {/* Left: number + title + description */}
              <div>
                <div className="flex gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl font-black text-navy shrink-0 tabular-nums">
                    {step.step_number}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-navy mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-black leading-relaxed max-w-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: illustration */}
              <div>
                <div className="rounded-2xl overflow-hidden shadow-lg shadow-black/5 aspect-4/3 max-w-xs mx-auto sm:mx-0">
                  {STEP_ILLUSTRATIONS[i]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
