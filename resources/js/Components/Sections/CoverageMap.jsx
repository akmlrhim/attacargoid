import { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionHeading from '../Shared/SectionHeading';
import DotField from '../ReactBits/DotField';

const regions = {
    kalsel: {
        name: 'Kalimantan Selatan',
        shortName: 'Kalsel',
        cities: [
            'Banjarmasin', 'Banjarbaru', 'Martapura', 'Pelaihari',
            'Batulicin', 'Kotabaru', 'Kandangan', 'Barabai',
            'Amuntai', 'Tanjung', 'Paringin', 'Rantau', 'Marabahan',
        ],
    },
    kalteng: {
        name: 'Kalimantan Tengah',
        shortName: 'Kalteng',
        cities: [
            'Palangka Raya', 'Sampit', 'Pangkalan Bun', 'Kuala Kapuas',
            'Pulang Pisau', 'Kasongan', 'Muara Teweh', 'Buntok', 'Puruk Cahu',
        ],
    },
};

export default function CoverageMap() {
    const [activeRegion, setActiveRegion] = useState('kalsel');
    const ref = useScrollReveal();
    const region = regions[activeRegion];

    return (
        <section id="jangkauan" ref={ref} className="bg-white py-16 sm:py-24 relative overflow-hidden">
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
                        tag="Jangkauan Layanan"
                        title="Distribusi ke 22+ Kota di Kalimantan"
                        subtitle="Jaringan distribusi kami mencakup kota-kota utama di Kalimantan Selatan dan Kalimantan Tengah."
                    />
                </div>

                <div className="sr max-w-3xl mx-auto">
                    {/* Region tabs */}
                    <div className="flex gap-2.5 justify-center mb-6 sm:mb-8">
                        {Object.entries(regions).map(([key, r]) => (
                            <button
                                key={key}
                                onClick={() => setActiveRegion(key)}
                                className={`flex-1 sm:flex-none px-5 sm:px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                                    activeRegion === key
                                        ? 'bg-navy text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {r.shortName}
                                <span className="hidden sm:inline"> — {r.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Header card */}
                    <div className="flex items-center gap-3 mb-4 sm:mb-5 p-3.5 sm:p-4 bg-navy/5 rounded-2xl border border-navy/10">
                        <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center text-orange shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-black text-navy">{region.name}</h3>
                            <p className="text-gray-500 text-xs">{region.cities.length} kota terjangkau</p>
                        </div>
                        {activeRegion === 'kalsel' && (
                            <span className="shrink-0 bg-orange/10 text-orange text-xs font-bold px-2.5 py-1 rounded-full border border-orange/20">
                                Hub Utama
                            </span>
                        )}
                    </div>

                    {/* Cities grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {region.cities.map((city) => {
                            const isHub = city === 'Banjarmasin';
                            return (
                                <div
                                    key={city}
                                    className={`flex items-center gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl border transition-all duration-150 ${
                                        isHub
                                            ? 'bg-orange text-white border-orange shadow-md shadow-orange/20'
                                            : 'bg-white border-gray-100 hover:border-navy/20 hover:shadow-sm'
                                    }`}
                                >
                                    <svg
                                        className={`w-3 h-3 shrink-0 ${isHub ? 'text-white' : 'text-orange'}`}
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span className={`text-xs sm:text-sm font-semibold truncate ${isHub ? 'text-white' : 'text-navy'}`}>
                                        {city}
                                    </span>
                                    {isHub && (
                                        <span className="ml-auto shrink-0 text-[9px] sm:text-[10px] bg-white/25 text-white px-1 sm:px-1.5 py-0.5 rounded font-bold">HUB</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <p className="text-center text-gray-400 text-sm mt-8">
                        Tidak menemukan kota Anda?{' '}
                        <a
                            href={`https://wa.me/62811510808?text=${encodeURIComponent('Halo ATTA CARGO, saya ingin menanyakan layanan pengiriman ke kota saya.')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange font-semibold hover:underline"
                        >
                            Hubungi kami
                        </a>
                        {' '}untuk informasi lebih lanjut.
                    </p>
                </div>
            </div>
        </section>
    );
}
