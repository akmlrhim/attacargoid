import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import useScrollReveal from '../../hooks/useScrollReveal';
import WhatsAppButton from '../Shared/WhatsAppButton';
import DotField from '../ReactBits/DotField';

const contactInfo = [
    {
        label: 'WhatsApp / Telepon',
        value: '0811 510 808',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
    },
    {
        label: 'Email',
        value: 'cargo.atta@gmail.com',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        label: 'Website',
        value: 'attacargo.id',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
            </svg>
        ),
    },
    {
        label: 'Alamat Hub',
        value: 'Banjarmasin, Kalimantan Selatan',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
];

export default function ContactSection() {
    const ref = useScrollReveal();
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        company: '',
        needs: '',
        destination_city: '',
        phone: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/kontak', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSubmitted(true);
            },
        });
    };

    const inputClass =
        'w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all text-sm bg-white placeholder:text-gray-400';

    return (
        <section id="kontak" ref={ref} className="bg-gray-50 py-16 sm:py-24 relative overflow-hidden">
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
                    <div className="text-center mb-10 sm:mb-14">
                        <span className="inline-block text-orange font-semibold text-sm tracking-widest uppercase mb-3">Kontak</span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy leading-tight">
                            Konsultasikan Kebutuhan<br className="sm:hidden" /> Distribusi Anda
                        </h2>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
                            Tim kami siap membantu menemukan solusi distribusi terbaik untuk bisnis Anda di Kalimantan.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                    {/* Left: contact info */}
                    <div className="sr sr-left space-y-6 sm:space-y-8">
                        <WhatsAppButton label="Chat WhatsApp Langsung" size="lg" className="w-full justify-center" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                            {contactInfo.map((info) => (
                                <div key={info.label} className="flex items-center gap-3">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange shrink-0">
                                        {info.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400 font-medium">{info.label}</p>
                                        <p className="text-navy font-semibold text-xs sm:text-sm truncate">{info.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Trust note */}
                        <div className="p-4 bg-navy/5 rounded-2xl border border-navy/10">
                            <p className="text-navy/70 text-xs sm:text-sm leading-relaxed">
                                <span className="font-semibold text-navy">Respon cepat.</span> Tim kami aktif merespons
                                konsultasi dan pertanyaan pada jam operasional.
                            </p>
                        </div>
                    </div>

                    {/* Right: form */}
                    <div className="sr sr-right">
                        <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
                            {submitted ? (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-black text-navy mb-2">Pesan Terkirim!</h3>
                                    <p className="text-gray-500 text-sm mb-6">Tim kami akan segera menghubungi Anda.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-orange font-semibold text-sm hover:underline"
                                    >
                                        Kirim pesan lain
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                                    <h3 className="text-base sm:text-lg font-black text-navy mb-4 sm:mb-5">Kirim Pesan</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama <span className="text-red-400">*</span></label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Nama Anda"
                                                className={inputClass}
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Perusahaan</label>
                                            <input
                                                type="text"
                                                value={data.company}
                                                onChange={(e) => setData('company', e.target.value)}
                                                placeholder="Nama perusahaan"
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Kebutuhan <span className="text-red-400">*</span></label>
                                        <textarea
                                            value={data.needs}
                                            onChange={(e) => setData('needs', e.target.value)}
                                            placeholder="Ceritakan kebutuhan distribusi atau pengiriman Anda..."
                                            rows={3}
                                            className={`${inputClass} resize-none`}
                                        />
                                        {errors.needs && <p className="text-red-500 text-xs mt-1">{errors.needs}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Kota Tujuan</label>
                                            <input
                                                type="text"
                                                value={data.destination_city}
                                                onChange={(e) => setData('destination_city', e.target.value)}
                                                placeholder="Kota tujuan"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">No. WhatsApp <span className="text-red-400">*</span></label>
                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="08xxxxxxxxxx"
                                                className={inputClass}
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full mt-2 bg-navy hover:bg-navy-light disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Mengirim...
                                            </>
                                        ) : 'Kirim Pesan'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
