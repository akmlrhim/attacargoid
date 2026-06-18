import DotField from '../ReactBits/DotField';

const pillars = [
    {
        label: 'Cepat',
        desc: 'Respon & pengiriman tepat waktu',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        label: 'Aman',
        desc: 'Barang terjaga kondisi & keamanannya',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        label: 'Terpercaya',
        desc: 'Mitra logistik yang bisa diandalkan',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        label: 'Profesional',
        desc: 'Tim berpengalaman & terlatih',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

export default function TrustBadgeStrip() {
    return (
        <div className="bg-navy relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <DotField
                    dotRadius={1.5}
                    dotSpacing={20}
                    bulgeStrength={60}
                    glowRadius={140}
                    gradientFrom="rgba(255,255,255,0.20)"
                    gradientTo="rgba(245,166,35,0.15)"
                    glowColor="rgba(245,166,35,0.18)"
                />
            </div>
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-5 sm:gap-y-6">
                    {pillars.map((p) => (
                        <div key={p.label} className="flex items-center gap-3">
                            <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange">
                                <span className="[&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">{p.icon}</span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-white font-bold text-sm sm:text-base leading-tight">{p.label}</p>
                                <p className="text-white/40 text-[10px] sm:text-xs mt-0.5 leading-snug">{p.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Diagonal divider into light sections */}
            <div className="h-12 relative overflow-hidden">
                <svg viewBox="0 0 1440 48" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path d="M0,0 L1440,48 L0,48 Z" fill="#f9fafb" />
                </svg>
            </div>
        </div>
    );
}
