const WA_URL = `https://wa.me/62811510808?text=${encodeURIComponent(
  "Halo ATTA CARGO, saya ingin berkonsultasi mengenai kebutuhan logistik saya."
)}`;

export default function AboutPage() {
  return (
    <div className="bg-stone-100 min-h-screen">
      <div className="max-w-xl mx-auto px-6 py-24">

        {/* ─────────────────────────────────────────
            SECTION 1 · HERO
        ───────────────────────────────────────── */}
        <p className="text-xs font-bold tracking-widest uppercase text-black">
          Profil Perusahaan
        </p>

        <hr className="border-t border-black my-3" />

        <h1 className="text-4xl font-black leading-tight text-black">
          Menghubungkan Kalimantan, Satu Kiriman dalam Satu Waktu
        </h1>

        <hr className="border-t border-black my-3" />

        <p className="text-base font-light italic leading-snug text-black">
          ATTA Cargo, di bawah PT. Tumbuh Kuat Sejahtera, hadir sebagai
          tulang punggung distribusi barang di Kalimantan — melayani
          penerusan barang dan last mile delivery dari hub utama di
          Banjarmasin ke lebih dari 22 kota di dua provinsi. Di sini,
          logistik bukan sekadar kiriman; ia adalah kepercayaan yang
          bergerak.
        </p>

        {/* ─────────────────────────────────────────
            SECTION 2 · PROFIL PERUSAHAAN
        ───────────────────────────────────────── */}
        <div className="mt-24">
          <p className="text-xs font-bold tracking-widest uppercase text-black mb-3">
            Tentang Kami
          </p>

          <p className="text-base font-normal leading-snug text-black">
            ATTA Cargo adalah perusahaan jasa logistik yang beroperasi di
            bawah naungan PT. Tumbuh Kuat Sejahtera. Berfokus pada layanan
            penerusan barang dan last mile distribution, perusahaan ini
            menjadikan Banjarmasin sebagai pusat distribusi utama yang
            menopang pergerakan barang ke seluruh pelosok Kalimantan Selatan
            dan Kalimantan Tengah. Kami melayani beragam kebutuhan —
            mulai dari barang retail, FMCG, material proyek, kebutuhan
            industri, hingga pengiriman khusus yang memerlukan penanganan
            ekstra.
          </p>

          <p className="text-base font-normal leading-snug text-black mt-4">
            Dengan lebih dari lima kategori layanan yang terus berkembang,
            ATTA Cargo membangun jaringan mitra secara organik di dua
            provinsi. Setiap rute baru adalah hasil kepercayaan yang
            dirawat — bukan sekadar perluasan peta, melainkan perluasan
            tanggung jawab. Perusahaan ini percaya bahwa distribusi yang
            baik bukan hanya soal kecepatan, tetapi soal keandalan yang
            dapat diukur dan dipertanggungjawabkan kepada setiap mitra
            bisnis.
          </p>

          {/* Pull-quote — bleed wider than column */}
          <blockquote className="-mx-8 md:-mx-12 pl-4 border-l-2 border-black my-6 italic font-bold text-base text-black leading-snug">
            "Dari Banjarmasin, kami menjangkau 22 kota lebih di dua
            provinsi Kalimantan — bukan karena infrastruktur yang
            sempurna, tetapi karena kepercayaan yang dibangun satu
            kiriman dalam satu waktu."
          </blockquote>
        </div>

        {/* ─────────────────────────────────────────
            SECTION 3 · VISI & MISI
        ───────────────────────────────────────── */}
        <div className="mt-24">
          <p className="text-xs font-bold tracking-widest uppercase text-black">
            Visi &amp; Misi
          </p>

          <hr className="border-t border-black my-3" />

          {/* Visi — bold thesis */}
          <p className="text-base font-bold leading-snug text-black mb-3">
            Menjadi perusahaan logistik pilihan utama di Kalimantan yang
            dikenal atas keandalan, ketepatan, dan kejujuran dalam setiap
            rantai distribusi yang kami layani.
          </p>

          <hr className="border-t border-black my-3" />

          {/* Misi — 5 numbered prose items, compressed */}
          <div className="text-base font-normal leading-tight text-black">
            <p>
              <span className="font-bold">1.</span>{" "}
              Menyediakan layanan distribusi barang yang tepat waktu dan
              aman ke seluruh wilayah Kalimantan, sehingga setiap mitra
              bisnis dapat mengandalkan kami sebagai perpanjangan operasional
              mereka sendiri.
            </p>
            <p>
              <span className="font-bold">2.</span>{" "}
              Membangun jaringan mitra logistik yang luas dan terstruktur
              di dua provinsi, membuka akses distribusi ke daerah-daerah
              yang selama ini sulit dijangkau oleh layanan konvensional.
            </p>
            <p>
              <span className="font-bold">3.</span>{" "}
              Memanfaatkan teknologi informasi secara berkelanjutan untuk
              meningkatkan efisiensi operasional dan memberikan transparansi
              penuh kepada pelanggan di setiap tahap proses pengiriman.
            </p>
            <p>
              <span className="font-bold">4.</span>{" "}
              Memberikan pelayanan yang responsif, komunikatif, dan
              profesional kepada setiap mitra bisnis — memastikan setiap
              pertanyaan dijawab dan setiap masalah diselesaikan sebelum
              menjadi hambatan operasional.
            </p>
            <p>
              <span className="font-bold">5.</span>{" "}
              Berkontribusi aktif pada pertumbuhan ekonomi regional
              Kalimantan dengan menjadi penghubung yang andal antara
              produsen, distributor, dan konsumen di seluruh pulau.
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────
            SECTION 4 · NILAI-NILAI
        ───────────────────────────────────────── */}
        <div className="mt-24">
          <p className="text-xs font-bold tracking-widest uppercase text-black">
            Nilai Perusahaan
          </p>

          <hr className="border-t border-black my-3" />

          {/* 6 values — compressed block, no extra spacing between lines */}
          <div className="text-base leading-snug text-black">
            <p>
              <span className="font-bold">1. </span>
              <span className="font-bold">Amanah</span>
              {" — "}
              <span className="font-normal">
                Setiap paket diperlakukan dengan tanggung jawab penuh
                dan kejujuran yang tidak pernah dikompromikan.
              </span>
            </p>
            <p>
              <span className="font-bold">2. </span>
              <span className="font-bold">Tepat Waktu</span>
              {" — "}
              <span className="font-normal">
                Ketepatan jadwal pengiriman adalah janji yang kami tunaikan
                kepada setiap mitra tanpa pengecualian.
              </span>
            </p>
            <p>
              <span className="font-bold">3. </span>
              <span className="font-bold">Profesional</span>
              {" — "}
              <span className="font-normal">
                Standar pelayanan tinggi diterapkan secara konsisten
                di setiap titik distribusi dan kontak pelanggan.
              </span>
            </p>
            <p>
              <span className="font-bold">4. </span>
              <span className="font-bold">Inovatif</span>
              {" — "}
              <span className="font-normal">
                Kami terus mencari cara yang lebih cerdas dan efisien
                untuk melayani, bukan hanya mengulang cara lama.
              </span>
            </p>
            <p>
              <span className="font-bold">5. </span>
              <span className="font-bold">Kolaboratif</span>
              {" — "}
              <span className="font-normal">
                Pertumbuhan terbaik lahir dari kemitraan yang saling
                menguatkan antara tim, mitra, dan komunitas lokal.
              </span>
            </p>
            <p>
              <span className="font-bold">6. </span>
              <span className="font-bold">Integritas</span>
              {" — "}
              <span className="font-normal">
                Transparansi dan kejujuran mendasari setiap transaksi,
                keputusan, dan relasi bisnis yang kami bangun.
              </span>
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────
            SECTION 5 · CTA
        ───────────────────────────────────────── */}
        <div className="mt-24">
          <hr className="border-t border-black my-3" />
          <p className="text-base italic text-right text-black">
            Siap mengirim bersama kami?{" "}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-normal not-italic"
            >
              Hubungi tim kami →
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
