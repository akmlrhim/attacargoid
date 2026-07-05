import RotatingText from "../ReactBits/RotatingText";
import useScrollReveal from "../../hooks/useScrollReveal";

const rotatingWords = [
  "Strategis",
  "Profesional",
  "Terpercaya",
  "Kompeten",
  "Terjangkau",
  "Terdepan",
];

/* Soft pastel tints cycled across the cards (emerald, violet, sky, indigo) */
const cardTints = ["#ecfdf5", "#f5f3ff", "#eff6ff", "#eef2ff"];

/* ── Section ──────────────────────────────────────────────── */

export default function AdvantagesSection({ advantages = [] }) {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20">
        {/* ── Heading ── */}
        <div className="sr max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-navy">
            Mengapa Memilih <span className="text-orange">ATTA Cargo</span>
            <span className="inline-flex justify-center items-baseline w-full gap-1.5 sm:gap-2 mt-1 flex-wrap">
              <span>yang</span>
              <RotatingText
                texts={rotatingWords}
                mainClassName="inline-flex items-center overflow-hidden"
                style={{ color: "#f5a623" }}
                splitBy="characters"
                staggerFrom="first"
                staggerDuration={0.03}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                splitLevelClassName="overflow-hidden pb-0.5"
                rotationInterval={2200}
              />
              <span>?</span>
            </span>
          </h2>
        </div>

        {/* ── Grid (data from DB) ── */}
        <div className="sr grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {advantages.map((item, i) => {
            const tint = cardTints[i % cardTints.length];

            return (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl min-h-80 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-300/40"
                style={{
                  background: `linear-gradient(165deg, ${tint} 0%, #ffffff 55%)`,
                }}
              >
                {/* Title + description */}
                <div className="p-6 sm:p-7 pb-0">
                  <h3 className="text-xl sm:text-md font-extrabold tracking-tight leading-tight text-navy">
                    {item.title}
                  </h3>

                  <div
                    className="mt-4 text-sm leading-relaxed text-black [&_p]:m-0"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>

                {/* Illustration anchored to bottom, blended into the card */}
                <div className="relative mt-auto">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-44 object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,white_0%,rgba(255,255,255,0.92)_18%,rgba(255,255,255,0.7)_38%,rgba(255,255,255,0.4)_60%,rgba(255,255,255,0.15)_80%,transparent_100%)]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
