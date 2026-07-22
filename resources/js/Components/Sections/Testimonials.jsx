import { useState } from "react";

const AVATAR_COLORS = [
  "#4285f4",
  "#ea4335",
  "#34a853",
  "#fbbc04",
  "#a142f4",
  "#24c1e0",
];

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
      role="img"
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
      className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3"
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
            <p className="text-[11px] text-gray-500 mt-0.5">{r.date}</p>
          </div>
        </div>
        <GoogleLogo size={4} />
      </div>
      <Stars rating={r.rating} />
      <p className="text-sm text-black leading-relaxed">{r.text}</p>
    </div>
  );
}

function AvatarStack({ reviews }) {
  return (
    <div className="flex -space-x-2">
      {reviews.map((r, i) =>
        r.avatar ? (
          <img
            key={i}
            src={r.avatar}
            alt={r.name}
            className="w-7 h-7 rounded-full border-2 border-white object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div
            key={i}
            className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-black"
            style={{ backgroundColor: avatarColor(r.name) }}
          >
            {initials(r.name)}
          </div>
        ),
      )}
    </div>
  );
}

export default function TestimonialsSection({
  reviews = [],
  googleRating = null,
}) {
  const displayReviews = reviews.filter((r) => r.rating === 5);

  const rating = googleRating?.rating ?? 5.0;
  const total = googleRating?.total ?? null;

  const [expanded, setExpanded] = useState(false);
  // Only collapse when there's more than the 6 shown by default.
  const collapsible = displayReviews.length > 6;
  const isCollapsed = collapsible && !expanded;
  const visibleReviews = isCollapsed ? displayReviews.slice(0, 6) : displayReviews;
  const stackReviews = displayReviews.filter((r) => r.avatar).slice(0, 4);

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <div className="flex flex-col items-center sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy leading-tight">
              Apa Kata Mereka
            </h2>
          </div>

          <a
            href="https://www.google.com/search?q=atta+cargo#lrd=0x2de423f11a3ef387:0x46a58758dffcbd56,1,,,,"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3.5 hover:border-gray-300 transition-colors shrink-0"
          >
            <GoogleLogo size={5} />
            <div>
              <div className="flex items-center gap-1">
                <Stars rating={Math.round(rating)} />
                <span className="text-sm font-black text-gray-800 ml-1">
                  {Number(rating).toFixed(1)}
                </span>
              </div>
              <p className="text-[11px] text-black mt-0.5">
                {total ? `${total} ulasan di Google` : "Lihat di Google Maps"}
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Masonry via CSS columns so each card keeps its natural height. */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
            {visibleReviews.map((r, idx) => (
              <div key={idx} className="break-inside-avoid mb-4 sm:mb-5">
                <ReviewCard r={r} />
              </div>
            ))}
          </div>

          {isCollapsed && (
            <>
              {/* Gradient fade at the bottom edge of the 6 cards. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-gray-50 via-gray-50/85 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex justify-center pb-2">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="inline-flex items-center gap-3 bg-white border border-gray-200 shadow-sm rounded-full pl-3 pr-2 py-2 hover:border-gray-300 transition-colors"
                >
                  <AvatarStack reviews={stackReviews} />
                  <span className="text-sm font-bold text-gray-800">
                    {total ? `${total}+` : `${displayReviews.length}+`} ulasan
                  </span>
                  <span className="h-4 w-px bg-gray-200" />
                  <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    Lihat semua
                    <span className="inline-flex shrink-0 items-center justify-center w-6 h-6 rounded-full bg-navy text-white">
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="block w-3.5 h-3.5"
                      >
                        <path d="M10 4v12M4 10h12" />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </>
          )}
        </div>

        {collapsible && expanded && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:underline"
            >
              Tampilkan lebih sedikit
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
