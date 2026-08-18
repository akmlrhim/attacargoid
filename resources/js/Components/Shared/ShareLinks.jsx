import { useEffect, useRef, useState } from "react";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedInLogo,
  WhatsAppLogo,
  XLogo,
} from "../../constants/brandLogos";

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

const BUTTON_BASE =
  "flex items-center justify-center w-9 h-9 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

const GHOST_BUTTON = `${BUTTON_BASE} text-black hover:text-navy hover:bg-navy/10`;

const BRAND_BUTTON = {
  whatsapp: `${BUTTON_BASE} hover:bg-[#25D366]/15`,
  instagram: `${BUTTON_BASE} hover:bg-[#E4405F]/15`,
  facebook: `${BUTTON_BASE} hover:bg-[#0866FF]/15`,
  x: `${BUTTON_BASE} hover:bg-black/10`,
  linkedin: `${BUTTON_BASE} hover:bg-[#0A66C2]/15`,
};

/**
 * Share rail, used by both the article and the service detail pages.
 *
 * `subject` only names the thing being shared inside the screen-reader labels
 * ("Bagikan artikel ini" / "Bagikan layanan ini"); everything else is identical
 * between the two.
 *
 * Instagram has no web share endpoint, so the only two honest paths are the
 * OS share sheet (`navigator.share`, which lists Instagram and WhatsApp on
 * mobile) and copying the link to paste into a story or bio. Both are offered
 * rather than pretending an `instagram.com/share?url=` intent exists.
 */
export default function ShareLinks({ title, path, subject = "halaman" }) {
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
      icon: <FacebookLogo />,
      className: BRAND_BUTTON.facebook,
    },
    {
      label: "Bagikan ke X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XLogo />,
      className: BRAND_BUTTON.x,
    },
    {
      label: "Bagikan ke LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInLogo />,
      className: BRAND_BUTTON.linkedin,
    },
    {
      label: "Bagikan lewat Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: <MailIcon />,
      className: GHOST_BUTTON,
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
          aria-label={`Bagikan ${subject} ini`}
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
        className={BRAND_BUTTON.whatsapp}
      >
        <WhatsAppLogo />
      </a>

      <button
        type="button"
        onClick={
          canNativeShare
            ? nativeShare
            : () => copyLink("Tautan disalin, tempel ke Instagram")
        }
        aria-label="Bagikan ke Instagram"
        className={BRAND_BUTTON.instagram}
      >
        <InstagramLogo />
      </button>

      {otherLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={link.className}
        >
          {link.icon}
        </a>
      ))}

      <button
        type="button"
        onClick={() => copyLink()}
        aria-label={`Salin tautan ${subject}`}
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
