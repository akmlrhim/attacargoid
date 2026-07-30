import { Head } from "@inertiajs/react";

const APP_NAME = (import.meta.env.VITE_APP_NAME || "Atta Cargo").trim();
const DEFAULT_DESCRIPTION =
  "ATTA Cargo - jasa ekspedisi & cargo terpercaya, hub di Banjarmasin. Melayani pengiriman barang, distribusi & logistik ke seluruh Kalimantan Selatan & Tengah.";
const DEFAULT_IMAGE = "/images/hero/hero-1200.webp";

function absoluteUrl(path) {
  if (typeof window === "undefined" || /^https?:\/\//.test(path)) {
    return path;
  }

  return `${window.location.origin}${path}`;
}

/**
 * Keeps title/description/canonical/OG tags in sync on client-side Inertia
 * navigations (the server-rendered defaults in app.blade.php only cover the
 * initial page load). head-key values must match the data-inertia
 * attributes on the equivalent tags in resources/views/app.blade.php.
 *
 * `title` stays long/keyword-rich - it drives the initial server-rendered
 * <title> (what Google indexes) and the OG/Twitter share previews.
 * `tabTitle` is a short label (e.g. "Tentang Kami") swapped in for the
 * browser tab once the SPA has mounted, since a full SEO title is overkill
 * once the page is already open. Defaults to `title` when omitted.
 *
 * The raw (unsuffixed) title is passed to `<Head>` - Inertia's global
 * title callback in app.jsx already appends " - {APP_NAME}" to every page,
 * so suffixing it here too would double it up in the browser tab.
 *
 * `shareImage` should be the server-generated 1200x630 JPEG (see
 * App\Services\SocialImage), not the page's own WebP asset: WhatsApp and
 * Instagram unfurl WebP unreliably. Share crawlers never execute JS, so they
 * always read the Blade-rendered tags; keeping these in sync only matters so a
 * client-side navigation doesn't leave a stale card behind for in-app sharing.
 */
export default function PageHead({
  title,
  tabTitle,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_IMAGE,
  shareImage,
  imageAlt,
  ogType = "website",
  publishedTime,
  modifiedTime,
}) {
  const canonical = absoluteUrl(path);
  const absoluteImage = absoluteUrl(shareImage || image);
  const shareTitle = title || APP_NAME;
  const shareImageAlt = imageAlt || shareTitle;
  const isArticle = ogType === "article";

  return (
    <Head title={tabTitle ?? title}>
      <meta head-key="description" name="description" content={description} />
      <link head-key="canonical" rel="canonical" href={canonical} />
      <meta head-key="og-type" property="og:type" content={ogType} />
      <meta head-key="og-title" property="og:title" content={shareTitle} />
      <meta
        head-key="og-description"
        property="og:description"
        content={description}
      />
      <meta head-key="og-url" property="og:url" content={canonical} />
      <meta head-key="og-image" property="og:image" content={absoluteImage} />
      <meta
        head-key="og-image-secure"
        property="og:image:secure_url"
        content={absoluteImage}
      />
      <meta head-key="og-image-type" property="og:image:type" content="image/jpeg" />
      <meta head-key="og-image-width" property="og:image:width" content="1200" />
      <meta head-key="og-image-height" property="og:image:height" content="630" />
      <meta
        head-key="og-image-alt"
        property="og:image:alt"
        content={shareImageAlt}
      />
      {isArticle && (
        <meta
          head-key="article-published"
          property="article:published_time"
          content={publishedTime ?? ""}
        />
      )}
      {isArticle && (
        <meta
          head-key="article-modified"
          property="article:modified_time"
          content={modifiedTime ?? ""}
        />
      )}
      <meta head-key="twitter-title" name="twitter:title" content={shareTitle} />
      <meta
        head-key="twitter-description"
        name="twitter:description"
        content={description}
      />
      <meta
        head-key="twitter-image"
        name="twitter:image"
        content={absoluteImage}
      />
      <meta
        head-key="twitter-image-alt"
        name="twitter:image:alt"
        content={shareImageAlt}
      />
    </Head>
  );
}
