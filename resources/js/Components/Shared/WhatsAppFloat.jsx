import { useState } from "react";
import { buildWhatsAppUrl } from "../../constants/company";
import useCompany from "../../hooks/useCompany";

const WaIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const quickMessages = [
  "Halo ATTA Cargo, saya ingin tanya estimasi biaya pengiriman.",
  "Halo ATTA Cargo, saya ingin jadwalkan penjemputan barang.",
  "Halo ATTA Cargo, saya ingin konsultasi kebutuhan distribusi rutin.",
];

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const { whatsapp_number } = useCompany();

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end gap-3">
      {/* Chat card */}
      <div
        className={`w-[min(20rem,calc(100vw-2.5rem))] origin-bottom-right rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-200 ${
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 rounded-t-2xl bg-navy px-4 py-3.5">
          <div className="relative w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
            <WaIcon className="w-5 h-5 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 ring-2 ring-navy" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">
              ATTA Cargo
            </p>
            <p className="text-white/60 text-xs">Biasanya membalas cepat</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Tutup chat"
            className="ml-auto text-white/60 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4">
          <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm text-gray-600">
            Halo! 👋 Ada yang bisa kami bantu? Pilih topik di bawah atau langsung
            chat kami.
          </div>

          <div className="mt-3 space-y-2">
            {quickMessages.map((msg) => (
              <a
                key={msg}
                href={buildWhatsAppUrl(whatsapp_number, msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-navy hover:border-orange hover:bg-orange/5 transition-colors"
              >
                {msg.replace("Halo ATTA Cargo, saya ingin ", "")}
              </a>
            ))}
          </div>

          <a
            href={buildWhatsAppUrl(whatsapp_number)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
          >
            <WaIcon className="w-4 h-4 shrink-0" />
            Mulai Chat
          </a>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup chat WhatsApp" : "Buka chat WhatsApp"}
        aria-expanded={open}
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
      >

        {open ? (
          <svg
            className="w-6 h-6 relative"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <WaIcon className="w-7 h-7 relative" />
        )}
      </button>
    </div>
  );
}
