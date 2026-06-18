import RotatingText from '../ReactBits/RotatingText';

const advantages = [
    {
        number: '01',
        title: 'Hub Strategis di Banjarmasin',
        desc: 'Posisi sentral di Kalimantan Selatan memudahkan distribusi ke seluruh penjuru Kalsel dan Kalteng.',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
        color: '#60A5FA',
    },
    {
        number: '02',
        title: 'Jangkauan Kalsel & Kalteng',
        desc: 'Lebih dari 22 kota terjangkau di dua provinsi Kalimantan dengan armada yang memadai.',
        image: 'https://images.unsplash.com/photo-1578575436955-ef29da568c6d?auto=format&fit=crop&w=900&q=80',
        color: '#FBBF24',
    },
    {
        number: '03',
        title: 'Tim Operasional Profesional',
        desc: 'SDM terlatih dan berpengalaman dalam pengelolaan logistik dan distribusi barang.',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80',
        color: '#34D399',
    },
    {
        number: '04',
        title: 'Armada Lengkap & Terawat',
        desc: 'Armada kendaraan terawat dan sesuai kapasitas muatan untuk berbagai jenis barang.',
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80',
        color: '#A78BFA',
    },
    {
        number: '05',
        title: 'Respon Cepat & Komunikasi Aktif',
        desc: 'Update status pengiriman aktif dan tim siap merespons setiap pertanyaan pelanggan.',
        image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
        color: '#22D3EE',
    },
    {
        number: '06',
        title: 'Siap Handling Retail & Bisnis',
        desc: 'Pengalaman distribusi ke DC Indomarco, Alfamart, Indogrosir, dan mitra retail modern.',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
        color: '#FB7185',
    },
];

const rotatingWords = ['Strategis', 'Profesional', 'Terpercaya', 'Kompeten', 'Terjangkau', 'Terdepan'];

export default function AdvantagesSection() {
    return (
        <section className="bg-white relative">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20">
                {/* ── Heading ── */}
                <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
                    <span className="inline-block text-orange font-semibold text-sm tracking-widest uppercase mb-3">
                        Keunggulan Kami
                    </span>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-navy">
                        Mengapa Memilih{' '}
                        <span className="text-orange">ATTA Cargo</span>
                        <br />
                        <span className="inline-flex justify-center items-baseline w-full gap-1.5 sm:gap-2 mt-1 flex-wrap">
                            <span>yang</span>
                            <RotatingText
                                texts={rotatingWords}
                                mainClassName="inline-flex items-center overflow-hidden"
                                style={{ color: '#f5a623' }}
                                splitBy="characters"
                                staggerFrom="first"
                                staggerDuration={0.03}
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '-120%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                                splitLevelClassName="overflow-hidden pb-0.5"
                                rotationInterval={2200}
                            />
                            <span>?</span>
                        </span>
                    </h2>

                    <p className="mt-4 text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto">
                        Komitmen kami adalah memberikan layanan logistik terbaik dengan standar operasional yang terukur.
                    </p>
                </div>

                {/* ── Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {advantages.map((item) => (
                        <div
                            key={item.title}
                            className="relative h-56 sm:h-72 rounded-2xl overflow-hidden group cursor-default"
                        >
                            {/* Photo */}
                            <img
                                src={item.image}
                                alt=""
                                aria-hidden="true"
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Overlays */}
                            <div className="absolute inset-0 bg-navy/55" />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/25 to-transparent" />

                            {/* Watermark number */}
                            <span
                                className="absolute top-0 right-3 font-black leading-none select-none pointer-events-none"
                                style={{ fontSize: '6rem', color: 'rgba(255,255,255,0.07)' }}
                            >
                                {item.number}
                            </span>

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                                <div
                                    className="w-7 h-0.5 mb-2.5 sm:mb-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <h3 className="font-bold text-white text-sm sm:text-base leading-snug mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.68)' }}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
