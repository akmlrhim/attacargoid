import { useRef, useEffect, useState } from "react";
import { AVATAR_COLORS, FALLBACK_REVIEWS } from "../../constants/testimonials";
import ScrollVelocity from "../ReactBits/ScrollVelocity";

function initials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
}

function avatarColor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i <= rating ? "#fbbc04" : "#e5e7eb"}
          className="w-3.5 h-3.5"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleLogo({ size = 5 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-${size} h-${size} shrink-0`}
      aria-label="Google"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function ReviewCard({ r }) {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-5 mx-2"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: "12px",
        width: "300px",
        whiteSpace: "normal",
        verticalAlign: "top",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {r.avatar ? (
            <img
              src={r.avatar}
              alt={r.name}
              className="w-9 h-9 rounded-full object-cover shrink-0"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
              style={{ backgroundColor: avatarColor(r.name) }}
            >
              {initials(r.name)}
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">
              {r.name}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">{r.date}</p>
          </div>
        </div>
        <GoogleLogo size={4} />
      </div>
      <Stars rating={r.rating} />
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
        {r.text}
      </p>
    </div>
  );
}

function CardRow({ reviews }) {
  return (
    <div style={{ display: "inline-flex" }}>
      {reviews.map((r, idx) => (
        <ReviewCard key={idx} r={r} />
      ))}
    </div>
  );
}

export default function TestimonialsSection({
  reviews = [],
  googleRating = null,
}) {
  const filtered = reviews.filter((r) => r.rating >= 4);
  const displayReviews = filtered.length > 0 ? filtered : FALLBACK_REVIEWS;

  const rating = googleRating?.rating ?? 5.0;
  const total = googleRating?.total ?? null;

  const evenReviews = displayReviews.filter((_, i) => i % 2 === 0);
  const oddReviews = displayReviews.filter((_, i) => i % 2 === 1);

  const row1 = <CardRow reviews={evenReviews} />;
  const row2 = (
    <CardRow reviews={oddReviews.length > 0 ? oddReviews : evenReviews} />
  );

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gray-50 py-16 sm:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange mb-3">
              Ulasan Pelanggan
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy leading-tight">
              Apa Kata Mitra Kami
            </h2>
          </div>

          <a
            href="https://www.google.com/search?q=atta+cargo#lrd=0x2de423f11a3ef387:0x46a58758dffcbd56,1,,,,"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3.5 hover:border-gray-300 transition-colors shrink-0 self-start sm:self-auto"
          >
            <GoogleLogo size={5} />
            <div>
              <div className="flex items-center gap-1">
                <Stars rating={Math.round(rating)} />
                <span className="text-sm font-black text-gray-800 ml-1">
                  {Number(rating).toFixed(1)}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {total ? `${total} ulasan di Google` : "Lihat di Google Maps"}
              </p>
            </div>
          </a>
        </div>
      </div>

      {visible && (
        <ScrollVelocity
          texts={[row1, row2]}
          velocity={50}
          numCopies={6}
          parallaxStyle={{ paddingBottom: "12px" }}
          scrollerStyle={{ alignItems: "flex-start" }}
        />
      )}
    </section>
  );
}
