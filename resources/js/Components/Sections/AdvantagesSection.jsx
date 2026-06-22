import RotatingText from "../ReactBits/RotatingText";

const rotatingWords = [
  "Strategis",
  "Profesional",
  "Terpercaya",
  "Kompeten",
  "Terjangkau",
  "Terdepan",
];

export default function AdvantagesSection({ advantages = [] }) {
  return (
    <section className="bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20">
        {/* ── Heading ── */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
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

          <p className="mt-4 text-base sm:text-md text-black max-w-2xl mx-auto">
            Komitmen kami adalah memberikan layanan logistik terbaik dengan
            standar operasional yang terukur.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {advantages.map((item) => (
            <div
              key={item.id}
              className="relative h-56 sm:h-72 rounded-2xl overflow-hidden group cursor-default"
            >
              {/* Photo */}
              <img
                src={item.image_url}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-navy/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/25 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <h3 className="font-bold text-white text-sm sm:text-base leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs leading-relaxed text-white">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
