// Central company info constants.

export const WHATSAPP_DEFAULT_MESSAGE =
  "Halo ATTA Cargo, saya ingin konsultasi mengenai kebutuhan distribusi barang saya.";

// Company profile PDF served from public/pdf/ (spaces URL-encoded).
export const CATALOG_PDF_URL = "/pdf/Company%20Profile%20ATTA%20Cargo.pdf";

/**
 * Build a wa.me link with a prefilled message.
 *
 * @param {string} whatsappNumber international format, no "+" or leading 0 (from useCompany())
 * @param {string} [message]
 * @returns {string}
 */
export function buildWhatsAppUrl(whatsappNumber, message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

