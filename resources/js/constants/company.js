// Central company info & estimate tariffs.
// Adjust these values to match real business data.

export const WHATSAPP_NUMBER = "62811510808"; // international format, no "+" or leading 0
export const WHATSAPP_DEFAULT_MESSAGE =
  "Halo ATTA Cargo, saya ingin konsultasi mengenai kebutuhan distribusi barang saya.";

// Drop the real PDF here: public/company-profile.pdf
export const CATALOG_PDF_URL = "/company-profile.pdf";

/**
 * Build a wa.me link with a prefilled message.
 *
 * @param {string} [message]
 * @returns {string}
 */
export function buildWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Destination zones for the price/estimate calculator.
 * `ratePerKg` (IDR/kg), `minKg` minimum billable weight.
 * These are indicative estimates — confirm final pricing via WhatsApp.
 *
 * @type {{ id: string, label: string, ratePerKg: number, minKg: number }[]}
 */
export const TARIFF_ZONES = [
  { id: "bjm", label: "Banjarmasin & Sekitarnya", ratePerKg: 3000, minKg: 5 },
  { id: "kalsel", label: "Kalimantan Selatan (Luar Kota)", ratePerKg: 5000, minKg: 10 },
  { id: "kalteng", label: "Kalimantan Tengah", ratePerKg: 7000, minKg: 10 },
  { id: "kaltim", label: "Kalimantan Timur", ratePerKg: 9000, minKg: 10 },
  { id: "kalbar", label: "Kalimantan Barat", ratePerKg: 11000, minKg: 10 },
  { id: "kalut", label: "Kalimantan Utara", ratePerKg: 12000, minKg: 10 },
];

/**
 * Service tiers with a cost multiplier applied on top of the zone rate.
 *
 * @type {{ id: string, label: string, note: string, multiplier: number }[]}
 */
export const TARIFF_SERVICES = [
  { id: "reguler", label: "Reguler", note: "Estimasi 3–6 hari", multiplier: 1 },
  { id: "ekspres", label: "Ekspres", note: "Estimasi 1–3 hari", multiplier: 1.6 },
  { id: "kargo", label: "Kargo / Proyek", note: "Volume besar / khusus", multiplier: 0.85 },
];
