import { useMemo, useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import { buildWhatsAppUrl } from "../../constants/company";
import useCompany from "../../hooks/useCompany";
import SearchableSelect from "../Shared/SearchableSelect";

const formatIDR = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(value / 1000) * 1000);

export default function PriceCalculator({ zones = [], services = [] }) {
  const ref = useScrollReveal();
  const { whatsapp_number } = useCompany();
  const [zoneId, setZoneId] = useState(() => zones[0]?.slug ?? "");
  const [serviceId, setServiceId] = useState(() => services[0]?.slug ?? "");
  const [weight, setWeight] = useState("");

  const estimate = useMemo(() => {
    const zone = zones.find((z) => z.slug === zoneId);
    const service = services.find((s) => s.slug === serviceId);
    const weightNum = parseFloat(weight);

    if (!zone || !service || !weightNum || weightNum <= 0) {
      return null;
    }

    const billableKg = Math.max(weightNum, zone.min_kg);
    const base = zone.rate_per_kg * billableKg * service.multiplier;

    return {
      zone,
      service,
      weightNum,
      billableKg,
      low: base,
      high: base * 1.15,
    };
  }, [zoneId, serviceId, weight, zones, services]);

  const waMessage = estimate
    ? `Halo ATTA Cargo, saya ingin minta penawaran pengiriman.\n` +
      `• Tujuan: ${estimate.zone.label}\n` +
      `• Layanan: ${estimate.service.label}\n` +
      `• Berat: ${estimate.weightNum} kg\n` +
      `• Estimasi: ${formatIDR(estimate.low)} – ${formatIDR(estimate.high)}`
    : undefined;

  const fieldClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all text-sm bg-white";

  return (
    <section ref={ref} className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="sr overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* ── Inputs ── */}
            <div className="p-7 sm:p-10 space-y-7">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-navy">
                  Hitung Estimasi
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    id="calc-zone-label"
                    className="block text-xs font-semibold text-black mb-2"
                  >
                    Kota / Wilayah Tujuan
                  </label>
                  <SearchableSelect
                    id="calc-zone"
                    aria-labelledby="calc-zone-label"
                    options={zones.map((zone) => ({
                      value: zone.slug,
                      label: zone.label,
                    }))}
                    value={zoneId}
                    onChange={setZoneId}
                    placeholder="Pilih kota / wilayah"
                    searchPlaceholder="Cari kota / wilayah..."
                    emptyMessage="Wilayah tidak ditemukan"
                  />
                </div>

                <div>
                  <label
                    htmlFor="calc-weight"
                    className="block text-xs font-semibold text-black mb-2"
                  >
                    Berat Barang (kg)
                  </label>
                  <input
                    id="calc-weight"
                    type="number"
                    min="1"
                    inputMode="numeric"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Contoh: 25"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label
                    id="calc-service-label"
                    className="block text-xs font-semibold text-black mb-2.5"
                  >
                    Jenis Layanan
                  </label>
                  <div
                    role="group"
                    aria-labelledby="calc-service-label"
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
                  >
                    {services.map((service) => {
                      const active = service.slug === serviceId;
                      return (
                        <button
                          key={service.slug}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setServiceId(service.slug)}
                          className={`text-left px-3.5 py-3 rounded-xl border transition-colors ${
                            active
                              ? "border-orange bg-orange/5 ring-1 ring-orange/30"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <span
                            className={`block text-sm font-semibold ${active ? "text-orange-dark" : "text-navy"}`}
                          >
                            {service.label}
                          </span>
                          <span className="block text-[11px] text-black mt-1 leading-snug">
                            {service.note}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Result ── */}
            <div
              aria-live="polite"
              className="bg-navy p-7 sm:p-10 flex flex-col text-white"
            >
              <p className="text-white text-sm font-medium">
                Perkiraan Biaya Pengiriman
              </p>

              {estimate ? (
                <>
                  <p className="mt-3 text-2xl sm:text-3xl font-black leading-tight">
                    {formatIDR(estimate.low)}
                    <span className="text-white/40 font-bold"> – </span>
                    {formatIDR(estimate.high)}
                  </p>

                  <dl className="mt-7 space-y-3 text-sm border-t border-white/10 pt-6">
                    <div className="flex justify-between gap-3">
                      <dt className="text-white">Tujuan</dt>
                      <dd className="font-medium text-right">
                        {estimate.zone.label}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-white">Layanan</dt>
                      <dd className="font-medium">{estimate.service.label}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-white">Berat dihitung</dt>
                      <dd className="font-medium text-right">
                        {estimate.billableKg} kg
                        {estimate.billableKg !== estimate.weightNum && (
                          <span className="text-white">
                            {" "}
                            (min. {estimate.zone.min_kg} kg)
                          </span>
                        )}
                      </dd>
                    </div>
                  </dl>

                  <a
                    href={buildWhatsAppUrl(whatsapp_number, waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex items-center justify-center gap-2.5 w-full rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] active:scale-95 transition-all px-5 py-3.5 text-navy-dark font-bold text-sm"
                  >
                    <svg
                      className="w-5 h-5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Tanya via WhatsApp
                  </a>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                  <svg
                    className="w-12 h-12 text-white/20 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 7h6m-6 4h6m-6 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                    />
                  </svg>
                  <p className="text-white text-sm max-w-[15rem] leading-relaxed">
                    Masukkan berat barang untuk melihat perkiraan biaya.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
