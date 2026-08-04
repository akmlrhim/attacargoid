import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@inertiajs/react";

/** Duration of the open/close transition, kept in sync with the CSS below. */
const TRANSITION_MS = 220;

/** Vertical drag distance (px) past which the mobile sheet dismisses itself. */
const DISMISS_THRESHOLD = 110;

function CheckIcon({ className }) {
  return (
    <svg
      className={className}
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
  );
}

function ArrowIcon({ className }) {
  return (
    <svg
      className={className}
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
  );
}

function ServicePlaceholder() {
  return (
    <div className="w-full h-full bg-navy/5 flex items-center justify-center">
      <svg
        className="w-16 h-16 text-navy/20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    </div>
  );
}

/**
 * Detail view for a single service: a centered modal from `sm` up, and a
 * drag-to-dismiss bottom sheet on phones. Rendered in a portal so the card's
 * `overflow-hidden` and stacking context can't clip it.
 */
function ServiceDetail({ service, onClose }) {
  const [isEntered, setIsEntered] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const panelRef = useRef(null);
  const dragStartY = useRef(null);
  const closeTimer = useRef(null);
  const details = service.details || [];

  const handleClose = useCallback(() => {
    setIsEntered(false);
    closeTimer.current = setTimeout(onClose, TRANSITION_MS);
  }, [onClose]);

  /**
   * Play the enter transition after mount. Two frames, not one: the first
   * guarantees the closed state has actually been painted, so the browser has a
   * start value to animate from instead of snapping straight to the end state.
   */
  useEffect(() => {
    let inner = null;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setIsEntered(true));
    });

    return () => {
      cancelAnimationFrame(outer);
      if (inner !== null) {
        cancelAnimationFrame(inner);
      }
      clearTimeout(closeTimer.current);
    };
  }, []);

  /**
   * Lock page scroll.
   *
   * AppLayout drives the page with Lenis, so stopping Lenis is what actually
   * holds the page still - its wheel/touch handler swallows the event once
   * stopped. That is deliberately preferred over `overflow: hidden` on the
   * root: hiding the scrollbar resizes the viewport and re-lays out the entire
   * page (hero, every card, the masked SVG grids) on the exact frame the panel
   * starts animating, which is what made opening and closing stutter.
   *
   * The overflow lock is kept only as the fallback for reduced-motion visitors,
   * where AppLayout never creates Lenis - there the transitions are disabled
   * anyway, so the relayout costs nothing visible.
   */
  useEffect(() => {
    const lenis = window.__lenis;

    if (lenis) {
      lenis.stop();

      return () => lenis.start();
    }

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, []);

  /**
   * Move focus into the panel, keep Tab inside it, and hand focus back to the
   * trigger on close. The panel itself is the initial target because the close
   * button is `sm:flex` only, so on phones there is nothing to focus yet.
   */
  useEffect(() => {
    const trigger = document.activeElement;
    panelRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();

        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const visible = Array.from(focusables).filter((el) => el.offsetParent !== null);
      if (visible.length === 0) {
        return;
      }

      const first = visible[0];
      const last = visible[visible.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus?.({ preventScroll: true });
    };
  }, [handleClose]);

  /**
   * Drag handlers live on the grab handle, which is `sm:hidden` — so they are
   * unreachable on desktop where the panel is a modal rather than a sheet.
   */
  const handleTouchStart = (event) => {
    dragStartY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    if (dragStartY.current === null) {
      return;
    }
    setDragOffset(Math.max(0, event.touches[0].clientY - dragStartY.current));
  };

  const handleTouchEnd = () => {
    if (dragOffset > DISMISS_THRESHOLD) {
      handleClose();
    }
    dragStartY.current = null;
    setDragOffset(0);
  };

  const isDragging = dragOffset > 0;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      {/*
        Backdrop. Deliberately no `backdrop-blur`: blurring a full-screen layer
        while its opacity animates forces the filter to re-run every frame,
        which is what made the open/close stutter.
      */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Tutup detail layanan"
        onClick={handleClose}
        className={`absolute inset-0 h-full w-full cursor-default bg-navy-dark/70 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
          isEntered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel: bottom sheet on phones, centered modal from `sm` up */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`service-detail-title-${service.id}`}
        tabIndex={-1}
        /*
          Tailwind v4 animates through the `translate` / `scale` properties, so
          the sheet drag overrides `translate` inline and zeroes the duration to
          follow the finger. Dropping the inline style on release lets the class
          value take over and animate the snap back.
        */
        style={
          isDragging
            ? { translate: `0 ${dragOffset}px`, transitionDuration: "0s" }
            : undefined
        }
        className={`relative flex max-h-[92dvh] min-h-[82dvh] w-full flex-col overflow-hidden rounded-md bg-white shadow-2xl transition-[translate,scale,opacity] duration-200 ease-out will-change-[translate,opacity] focus:outline-none motion-reduce:transition-none sm:max-h-[92vh] sm:min-h-[72vh] sm:max-w-2xl ${
          isEntered
            ? "translate-y-0 opacity-100 sm:scale-100"
            : "translate-y-full opacity-0 sm:translate-y-4 sm:scale-95"
        }`}
      >
        {/* Grab handle - mobile only */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex shrink-0 touch-none justify-center pb-1 pt-3 sm:hidden"
        >
          <span className="h-1.5 w-11 rounded-full bg-gray-300" aria-hidden="true" />
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 z-10 hidden h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy shadow-md backdrop-blur transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:flex"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/*
          `data-lenis-prevent` sits here and nowhere higher up: it makes Lenis
          ignore the gesture so this element scrolls natively. On the backdrop
          and the pinned footer we want the opposite - the event should reach
          stopped Lenis, which swallows it and keeps the page still.
        */}
        <div
          data-lenis-prevent
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          {/* Image */}
          <div className="aspect-[16/10] w-full shrink-0 overflow-hidden bg-navy/5 sm:aspect-[21/9]">
            {service.image_url ? (
              <img
                src={service.image_url}
                alt={service.image_alt || service.title}
                /*
                  Eager: the src is the one already fetched by the card behind
                  the panel, so it comes from cache. Leaving it lazy made the
                  loader kick in mid-transition and hitch the animation.
                */
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              <ServicePlaceholder />
            )}
          </div>

          <div className="p-6 sm:p-8">
            <h3
              id={`service-detail-title-${service.id}`}
              className="text-xl font-black leading-tight text-navy sm:text-2xl"
            >
              {service.title}
            </h3>

            <div
              className="mt-3 text-sm leading-relaxed text-black sm:text-base [&_p+p]:mt-3 [&_p]:m-0 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-4"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />

            {details.length > 0 && (
              <ul className="mt-6 grid grid-cols-1 gap-2.5 border-t border-gray-100 pt-6 sm:grid-cols-2">
                {details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                    <span className="text-sm font-medium text-black">{detail.item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer CTA - stays pinned while the body scrolls */}
        <div className="shrink-0 border-t border-gray-100 bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-8 sm:py-5 sm:pb-5">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="order-2 inline-flex items-center justify-center rounded-full border border-navy-dark/15 px-6 py-3 text-sm font-bold text-black-dark transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:order-1"
            >
              Tutup
            </button>
            <Link
              href="/cek-ongkir"
              className="order-1 inline-flex items-center justify-center gap-2 rounded-full bg-navy-dark px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:order-2"
            >
              Cek Ongkir
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ServiceCard({ service, index, onOpenDetail }) {
  const isEven = index % 2 === 0;
  const hasMore = Boolean(service.description_is_truncated) || (service.details || []).length > 0;

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md lg:flex-row ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-white sm:aspect-[21/9] lg:aspect-[4/3] lg:w-[45%]">
        {service.image_url ? (
          <>
            <img
              src={service.image_url}
              alt={service.image_alt || service.title}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {/*
              The edge fade is a white gradient painted over the image rather
              than a `mask-image` on the image itself. A mask on the element
              being scaled has to be recomputed every frame of the hover
              transition; a plain gradient layer over the card's white
              background looks identical and stays on the compositor.
            */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 hidden lg:block ${
                isEven
                  ? "[background-image:linear-gradient(to_right,transparent_60%,white_100%)]"
                  : "[background-image:linear-gradient(to_left,transparent_60%,white_100%)]"
              }`}
            />
          </>
        ) : (
          <ServicePlaceholder />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
        <h2 className="mb-3 text-xl font-black leading-tight text-navy sm:text-2xl lg:text-3xl">
          {service.title}
        </h2>

        {/*
          Only a trimmed excerpt lives on the card - the full description and
          the detail points are revealed together in the modal / bottom sheet.
        */}
        <p className="text-sm leading-relaxed text-black sm:text-base">
          {service.description_excerpt}
          {hasMore && (
            <>
              {" "}
              <button
                type="button"
                onClick={() => onOpenDetail(service)}
                className="rounded-sm align-baseline font-semibold text-navy underline decoration-orange/50 decoration-2 underline-offset-4 transition-colors duration-200 hover:text-navy-light hover:decoration-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                Baca selengkapnya
              </button>
            </>
          )}
        </p>

        <div className="mt-6">
          <Link
            href="/cek-ongkir"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:w-auto"
          >
            Cek Ongkir
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ServicesList({ services = [] }) {
  const [activeService, setActiveService] = useState(null);

  return (
    <section id="layanan-list" className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {services.length === 0 ? (
          <p className="py-20 text-center text-gray-500">Belum ada layanan tersedia.</p>
        ) : (
          <div className="space-y-8 sm:space-y-12">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                onOpenDetail={setActiveService}
              />
            ))}
          </div>
        )}
      </div>

      {activeService && (
        <ServiceDetail
          service={activeService}
          onClose={() => setActiveService(null)}
        />
      )}
    </section>
  );
}
