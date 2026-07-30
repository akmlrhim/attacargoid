import { useEffect, useRef, useState } from "react";

function ShareIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v12M12 3L8 7m4-4l4 4M5 13v5.5A1.5 1.5 0 006.5 20h11a1.5 1.5 0 001.5-1.5V13"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.96.24 2.4.4.61.24 1.05.52 1.5.98.46.45.74.89.98 1.5.17.44.35 1.23.4 2.4.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.96-.4 2.4a4.04 4.04 0 01-.98 1.5c-.45.46-.89.74-1.5.98-.44.17-1.23.35-2.4.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.96-.24-2.4-.4a4.04 4.04 0 01-1.5-.98 4.04 4.04 0 01-.98-1.5c-.17-.44-.35-1.23-.4-2.4-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.96.4-2.4.24-.61.52-1.05.98-1.5.45-.46.89-.74 1.5-.98.44-.17 1.23-.35 2.4-.4C8.42 2.17 8.8 2.16 12 2.16zm0 1.98c-3.15 0-3.5.01-4.73.07-.94.04-1.45.2-1.79.33-.45.17-.77.38-1.11.72-.34.34-.55.66-.72 1.11-.13.34-.29.85-.33 1.79-.06 1.23-.07 1.58-.07 4.73s.01 3.5.07 4.73c.04.94.2 1.45.33 1.79.17.45.38.77.72 1.11.34.34.66.55 1.11.72.34.13.85.29 1.79.33 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c.94-.04 1.45-.2 1.79-.33.45-.17.77-.38 1.11-.72.34-.34.55-.66.72-1.11.13-.34.29-.85.33-1.79.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.04-.94-.2-1.45-.33-1.79a2.98 2.98 0 00-.72-1.11 2.98 2.98 0 00-1.11-.72c-.34-.13-.85-.29-1.79-.33-1.23-.06-1.58-.07-4.73-.07zm0 3.37a5.49 5.49 0 110 10.98 5.49 5.49 0 010-10.98zm0 1.98a3.51 3.51 0 100 7.02 3.51 3.51 0 000-7.02zm6.99-2.2a1.28 1.28 0 11-2.57 0 1.28 1.28 0 012.57 0z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.58v1.87h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.83-5.97 6.83H1.66l7.73-8.84L1.25 2.25h6.83l4.72 6.24zm-1.16 17.52h1.83L7.02 4.13H5.06z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6.5l9 6 9-6M4.5 5h15A1.5 1.5 0 0121 6.5v11A1.5 1.5 0 0119.5 19h-15A1.5 1.5 0 013 17.5v-11A1.5 1.5 0 014.5 5z"
      />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 13.5a3.5 3.5 0 005 0l3-3a3.54 3.54 0 00-5-5l-1 1m-3 3a3.5 3.5 0 00-5 0l-3 3a3.54 3.54 0 005 5l1-1"
      />
    </svg>
  );
}

const GHOST_BUTTON =
  "flex items-center justify-center w-9 h-9 rounded-full text-black hover:text-navy hover:bg-navy/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

/**
 * Article share rail.
 *
 * Instagram has no web share endpoint, so the only two honest paths are the
 * OS share sheet (`navigator.share`, which lists Instagram and WhatsApp on
 * mobile) and copying the link to paste into a story or bio. Both are offered
 * rather than pretending an `instagram.com/share?url=` intent exists.
 */
export default function ShareLinks({ title, path }) {
  const [url, setUrl] = useState(path);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [feedback, setFeedback] = useState("");
  const feedbackTimer = useRef(null);

  // Resolved after mount: the origin isn't known during SSR, and reading
  // navigator.share during render would desync hydration.
  useEffect(() => {
    setUrl(`${window.location.origin}${path}`);
    setCanNativeShare(typeof navigator.share === "function");
  }, [path]);

  useEffect(
    () => () => {
      if (feedbackTimer.current) {
        clearTimeout(feedbackTimer.current);
      }
    },
    [],
  );

  const announce = (message) => {
    setFeedback(message);

    if (feedbackTimer.current) {
      clearTimeout(feedbackTimer.current);
    }

    feedbackTimer.current = setTimeout(() => setFeedback(""), 2600);
  };

  const copyLink = async (message = "Tautan disalin") => {
    try {
      await navigator.clipboard.writeText(url);
      announce(message);
    } catch {
      announce("Gagal menyalin, salin manual dari bilah alamat");
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // The user dismissed the sheet, or the target rejected the payload.
      // Neither is worth surfacing as an error.
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  // Title and URL on separate lines: WhatsApp builds its preview card from the
  // bare URL and drops the card when the text runs into it.
  const whatsAppHref = `https://wa.me/?text=${encodedTitle}%0A%0A${encodedUrl}`;

  const otherLinks = [
    {
      label: "Bagikan ke Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon />,
    },
    {
      label: "Bagikan ke X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XIcon />,
    },
    {
      label: "Bagikan ke LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon />,
    },
    {
      label: "Bagikan lewat Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: <MailIcon />,
    },
  ];

  return (
    <div className="relative flex lg:flex-col items-center gap-2.5 lg:gap-3">
      <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase lg:mb-1">
        Bagikan
      </span>

      {canNativeShare && (
        <button
          type="button"
          onClick={nativeShare}
          aria-label="Bagikan artikel ini"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-navy-dark text-white hover:bg-navy transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          <ShareIcon />
        </button>
      )}

      <a
        href={whatsAppHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke WhatsApp"
        className={GHOST_BUTTON}
      >
        <WhatsAppIcon />
      </a>

      <button
        type="button"
        onClick={
          canNativeShare
            ? nativeShare
            : () => copyLink("Tautan disalin, tempel ke Instagram")
        }
        aria-label="Bagikan ke Instagram"
        className={GHOST_BUTTON}
      >
        <InstagramIcon />
      </button>

      {otherLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={GHOST_BUTTON}
        >
          {link.icon}
        </a>
      ))}

      <button
        type="button"
        onClick={() => copyLink()}
        aria-label="Salin tautan artikel"
        className={GHOST_BUTTON}
      >
        <LinkIcon />
      </button>

      <p
        aria-live="polite"
        className={`pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-dark px-3 py-1.5 text-xs font-semibold text-white transition-opacity duration-200 motion-reduce:transition-none lg:left-full lg:top-1/2 lg:ml-3 lg:mt-0 lg:translate-x-0 lg:-translate-y-1/2 ${
          feedback ? "opacity-100" : "opacity-0"
        }`}
      >
        {feedback}
      </p>
    </div>
  );
}
