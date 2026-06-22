import { CATALOG_PDF_URL } from "../../constants/company";

const DownloadIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
    />
  </svg>
);

/**
 * Download button / CTA for the company profile (PDF).
 *
 * @param {{ variant?: "button" | "card", label?: string, className?: string }} props
 */
export default function CatalogDownload({
  variant = "button",
  label = "Download Company Profile",
  className = "",
}) {
  if (variant === "card") {
    return (
      <div
        className={`flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-gray-100 bg-white p-5 sm:p-7 ${className}`}
      >
        <div className="w-14 h-14 rounded-2xl bg-orange/10 flex items-center justify-center text-orange shrink-0">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-black text-navy">
            Company Profile ATTA Cargo
          </h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Pelajari layanan, jangkauan, dan keunggulan kami secara lengkap dalam
            format PDF.
          </p>
        </div>
        <a
          href={CATALOG_PDF_URL}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors shrink-0"
        >
          <DownloadIcon className="w-4 h-4 shrink-0" />
          {label}
        </a>
      </div>
    );
  }

  return (
    <a
      href={CATALOG_PDF_URL}
      download
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors ${className}`}
    >
      <DownloadIcon className="w-4 h-4 shrink-0" />
      {label}
    </a>
  );
}
