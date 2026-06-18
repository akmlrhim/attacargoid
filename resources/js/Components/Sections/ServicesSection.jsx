import { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionHeading from '../Shared/SectionHeading';
import DotField from '../ReactBits/DotField';

const services = [
    {
        id: 'penerusan',
        title: 'Mitra Penerusan Barang',
        shortTitle: 'Penerusan',
        desc: 'Partner distribusi area Kalimantan untuk ekspedisi nasional dan regional. Kami menjadi jembatan antara ekspedisi besar dengan tujuan pengiriman di pelosok Kalimantan.',
        detail: ['Kerjasama dengan ekspedisi nasional', 'Distribusi ke seluruh Kalsel & Kalteng', 'Sistem tracking terintegrasi', 'Penanganan dokumen pengiriman'],
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Truk pengiriman di jalan tol',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h.01M4 10h16M3 10l2-5h14l2 5M3 10v9a2 2 0 002 2h14a2 2 0 002-2v-9" />
            </svg>
        ),
    },
    {
        id: 'retail',
        title: 'Distribusi Retail & Modern Trade',
        shortTitle: 'Retail & MT',
        desc: 'Pengiriman ke Distribution Center (DC) Indomarco, Alfamart, Indogrosir, dan jaringan retail modern lainnya di Kalimantan.',
        detail: ['DC Indomarco & Alfamart', 'Indogrosir & retail modern', 'Standar packing retail', 'Jadwal pengiriman rutin'],
        image: 'https://images.unsplash.com/photo-1578575436955-ef29da568c6d?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Distribusi retail dan modern trade',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        id: 'b2b',
        title: 'Pengiriman B2B',
        shortTitle: 'B2B',
        desc: 'Distribusi antar pelaku bisnis — dari supplier, distributor, pabrik, hingga toko besar dengan volume muatan besar dan konsisten.',
        detail: ['Supplier ke distributor', 'Pabrik ke toko besar', 'Volume muatan fleksibel', 'Kontrak pengiriman berkala'],
        image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Pengiriman B2B antar bisnis',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
    },
    {
        id: 'proyek',
        title: 'Pengiriman Proyek & Industri',
        shortTitle: 'Proyek',
        desc: 'Layanan khusus untuk material konstruksi, sparepart mesin, dan kebutuhan industri dengan penanganan ekstra hati-hati.',
        detail: ['Material konstruksi', 'Sparepart & mesin industri', 'Handling barang berat/besar', 'Koordinasi tim lapangan'],
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Material proyek dan industri',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        id: 'khusus',
        title: 'Pengiriman Khusus',
        shortTitle: 'Custom',
        desc: 'Solusi custom sesuai kebutuhan operasional pelanggan — kami siap merancang skema distribusi yang paling efisien untuk bisnis Anda.',
        detail: ['Konsultasi kebutuhan khusus', 'Skema distribusi custom', 'SLA pengiriman fleksibel', 'Dukungan tim dedicated'],
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Armada pengiriman khusus',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        ),
    },
];

export default function ServicesSection() {
    const [active, setActive] = useState(0);
    const ref = useScrollReveal();
    const current = services[active];

    return (
        <section id="layanan" ref={ref} className="bg-gray-50 py-16 sm:py-24 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <DotField
                    dotRadius={1.5}
                    dotSpacing={20}
                    bulgeStrength={60}
                    glowRadius={140}
                    gradientFrom="rgba(11,31,77,0.16)"
                    gradientTo="rgba(11,31,77,0.09)"
                    glowColor="rgba(11,31,77,0.06)"
                />
            </div>
            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <div className="sr">
                    <SectionHeading
                        tag="Layanan Kami"
                        title="Solusi Distribusi Lengkap"
                        subtitle="Lima kategori layanan untuk memenuhi kebutuhan logistik bisnis Anda di Kalimantan."
                    />
                </div>

                <div className="sr flex flex-col lg:flex-row gap-5 lg:gap-8">
                    {/* Mobile: horizontal scroll tabs */}
                    <div className="flex lg:hidden tabs-scroll overflow-x-auto gap-2 pb-2 -mx-5 sm:-mx-6 px-5 sm:px-6 scrollbar-none">
                        {services.map((s, i) => (
                            <button
                                key={s.id}
                                onClick={() => setActive(i)}
                                className={`shrink-0 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                                    active === i
                                        ? 'bg-navy text-white shadow-md'
                                        : 'bg-white text-navy/60 hover:text-navy border border-gray-200'
                                }`}
                            >
                                {s.shortTitle}
                            </button>
                        ))}
                    </div>

                    {/* Desktop: vertical tab list */}
                    <div className="hidden lg:flex lg:w-52 xl:w-60 shrink-0 flex-col gap-1.5">
                        {services.map((s, i) => (
                            <button
                                key={s.id}
                                onClick={() => setActive(i)}
                                className={`text-left px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 leading-snug ${
                                    active === i
                                        ? 'bg-navy text-white shadow-lg shadow-navy/20'
                                        : 'bg-white text-navy/55 hover:text-navy hover:bg-white/80 border border-gray-100'
                                }`}
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>

                    {/* Detail panel */}
                    <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        {/* Service image */}
                        <div className="relative aspect-[16/9] sm:aspect-[16/7] overflow-hidden bg-gray-100">
                            <img
                                key={current.id}
                                src={current.image}
                                alt={current.imageAlt}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-all duration-500"
                            />
                            {/* Gradient overlay bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-5 sm:p-6 lg:p-8">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-navy mb-2.5">{current.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-5 text-sm sm:text-[0.95rem]">{current.desc}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {current.detail.map((d) => (
                                    <div key={d} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                                        <svg className="w-4 h-4 text-orange shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-xs sm:text-sm text-gray-700 font-medium">{d}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
