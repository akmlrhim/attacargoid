import { Head } from "@inertiajs/react";

const APP_NAME = "ATTA Cargo";
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
 */
export default function PageHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_IMAGE,
}) {
  const fullTitle = title ? `${title} - ${APP_NAME}` : APP_NAME;
  const canonical = absoluteUrl(path);
  const absoluteImage = absoluteUrl(image);

  return (
    <Head title={fullTitle}>
      <meta head-key="description" name="description" content={description} />
      <link head-key="canonical" rel="canonical" href={canonical} />
      <meta head-key="og-title" property="og:title" content={fullTitle} />
      <meta
        head-key="og-description"
        property="og:description"
        content={description}
      />
      <meta head-key="og-url" property="og:url" content={canonical} />
      <meta head-key="og-image" property="og:image" content={absoluteImage} />
      <meta head-key="twitter-title" name="twitter:title" content={fullTitle} />
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
    </Head>
  );
}
