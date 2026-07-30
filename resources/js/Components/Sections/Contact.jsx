import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import useScrollReveal from "../../hooks/useScrollReveal";
import DotField from "../ReactBits/DotField";
import SectionHeading from "../Shared/SectionHeading";
import LocationMap from "../Shared/LocationMap";
import { getContactInfo } from "../../constants/contact";
import useCompany from "../../hooks/useCompany";

export default function ContactSection() {
  const ref = useScrollReveal();
  const { location } = usePage().props;
  const company = useCompany();
  const contactInfo = getContactInfo(company);
  const [submitted, setSubmitted] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    company: "",
    needs: "",
    destination_city: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/kontak", {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setSubmitted(true);
      },
    });
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all text-sm bg-white placeholder:text-gray-400";

  return (
    <section
      id="kontak"
      ref={ref}
      className="bg-gray-50 py-16 sm:py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={20}
          bulgeStrength={60}
          glowRadius={140}
          gradientFrom="rgba(11,31,77,0.18)"
          gradientTo="rgba(245,166,35,0.10)"
          glowColor="rgba(11,31,77,0.06)"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="sr">
          <SectionHeading
            title="Konsultasikan Kebutuhan Distribusi Anda"
            subtitle="Tim kami siap membantu menemukan solusi distribusi terbaik untuk bisnis Anda di Kalimantan."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left - info kontak */}
          <div className="sr sr-left space-y-5">
            {/* Info list */}
            <div className="divide-y divide-gray-100">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange/10 flex items-center justify-center text-orange shrink-0 mt-0.5">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-black font-medium mb-0.5">
                      {info.label}
                    </p>
                    <p className="text-black font-semibold text-sm leading-snug">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Jam Operasional */}
            <div className="rounded-2xl bg-navy/[0.03] border border-navy/10 p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-4 h-4 text-orange shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm font-bold text-black">Jam Operasional</p>
              </div>
              <div className="space-y-1.5 text-sm mb-3">
                <div className="flex justify-between">
                  <span className="text-black">Senin - Jumat</span>
                  <span className="font-semibold text-black">
                    09.00 – 18.00 WITA
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Sabtu</span>
                  <span className="font-semibold text-black">
                    09.00 – 17.00 WITA
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Minggu</span>
                  <span className="font-semibold text-red-500">Tutup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - form */}
          <div className="sr sr-right">
            <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-100">
              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-black mb-2">
                    Pesan Terkirim!
                  </h3>
                  <p className="text-black text-sm mb-6">
                    Tim kami akan segera menghubungi Anda.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-orange font-semibold text-sm hover:underline cursor-pointer"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3.5 sm:space-y-4"
                >
                  <h3 className="text-base sm:text-lg font-black text-black mb-4 sm:mb-5">
                    Kirim Pesan
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-black mb-1.5"
                      >
                        Nama <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "contact-name-error" : undefined
                        }
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Nama Anda"
                        className={inputClass}
                      />
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-semibold text-black mb-1.5"
                      >
                        Perusahaan
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={data.company}
                        onChange={(e) => setData("company", e.target.value)}
                        placeholder="Nama perusahaan"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-needs"
                      className="block text-xs font-semibold text-black mb-1.5"
                    >
                      Kebutuhan <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-needs"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.needs}
                      aria-describedby={
                        errors.needs ? "contact-needs-error" : undefined
                      }
                      value={data.needs}
                      onChange={(e) => setData("needs", e.target.value)}
                      placeholder="Ceritakan kebutuhan distribusi atau pengiriman Anda..."
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                    {errors.needs && (
                      <p
                        id="contact-needs-error"
                        role="alert"
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.needs}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label
                        htmlFor="contact-destination"
                        className="block text-xs font-semibold text-black mb-1.5"
                      >
                        Kota Tujuan
                      </label>
                      <input
                        id="contact-destination"
                        type="text"
                        value={data.destination_city}
                        onChange={(e) =>
                          setData("destination_city", e.target.value)
                        }
                        placeholder="Kota tujuan"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold text-black mb-1.5"
                      >
                        No. WhatsApp <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "contact-phone-error" : undefined
                        }
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        className={inputClass}
                      />
                      {errors.phone && (
                        <p
                          id="contact-phone-error"
                          role="alert"
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-2 bg-navy hover:bg-navy-light disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    {processing ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      "Kirim Pesan"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map - full width, posisi di-drive dari data backend */}
        {location?.position && (
          <div className="sr mt-10 sm:mt-12 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <LocationMap
              position={location.position}
              zoom={location.zoom}
              label={location.label}
              address={location.address}
              height={380}
              className="z-0"
            />
          </div>
        )}
      </div>
    </section>
  );
}
