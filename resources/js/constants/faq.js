// FAQ content for the home page. Answers are grounded in the site's actual
// services, coverage, process, and contact details.

/**
 * @param {{ phone: string, email: string }} company
 */
export function getFaqItems({ phone, email }) {
  return [
  {
    question: "Apa itu ATTA Cargo dan layanan apa saja yang ditawarkan?",
    answer:
      "ATTA Cargo (PT. Tumbuh Kuat Sejahtera) adalah mitra penerusan barang & last mile distribution dengan hub utama di Banjarmasin. Kami melayani distribusi general cargo, FMCG, dan pengiriman antar kota untuk kebutuhan bisnis maupun perorangan ke seluruh Kalimantan Selatan & Tengah.",
  },
  {
    question: "Wilayah mana saja yang dijangkau ATTA Cargo?",
    answer:
      "Jaringan distribusi kami mencakup puluhan kota di Kalimantan Selatan (Banjarmasin sebagai hub, Banjarbaru, Martapura, Kotabaru, dan lainnya) serta Kalimantan Tengah (Palangka Raya, Sampit, Pangkalan Bun, dan lainnya). Anda bisa melihat peta jangkauan di halaman utama, jika kota Anda belum tercantum, silakan hubungi kami.",
  },
  {
    question: "Bagaimana cara menghitung estimasi biaya pengiriman?",
    answer:
      "Gunakan fitur Cek Ongkir di website: pilih zona tujuan dan jenis layanan, lalu masukkan berat barang. Estimasi dihitung dari tarif per kilogram zona dikalikan pengali layanan, dengan berat minimum tertentu (misalnya 5 kg). Angka yang muncul adalah estimasi; biaya final akan dikonfirmasi oleh tim kami.",
  },
  {
    question: "Berapa lama estimasi waktu pengiriman?",
    answer:
      "Waktu pengiriman bergantung pada zona tujuan dan jenis layanan yang dipilih (contoh: layanan Reguler estimasi 3–6 hari). Estimasi waktu setiap layanan tampil di fitur Cek Ongkir. Untuk tujuan pelosok, tim kami akan menginformasikan estimasi yang lebih detail.",
  },
  {
    question: "Bagaimana alur proses pengirimannya?",
    answer:
      "Proses distribusi barang berjalan melalui empat tahap utama yang saling terintegrasi. Tahap pertama dimulai dengan penerimaan dan koordinasi yang disertai dengan pengecekan dokumen serta manifest secara menyeluruh. Setelah itu, proses dilanjutkan ke tahap kedua, yaitu sortir dan preparasi barang yang disesuaikan berdasarkan rute dan area tujuan masing-masing. Memasuki tahap ketiga, barang siap didistribusikan menggunakan armada yang telah disesuaikan dengan jenis serta volume muatannya. Terakhir, seluruh rangkaian ini ditutup dengan tahap monitoring dan update status secara aktif untuk memastikan pelacakan yang akurat hingga barang tiba dengan aman di tangan penerima.",
  },
  {
    question: "Apakah saya bisa memantau status pengiriman?",
    answer:
      "Bisa. Tim operasional memberikan update status secara aktif, mulai dari barang tiba di hub, dimuat ke armada, hingga diterima dengan konfirmasi penerima. Anda cukup menghubungi tim kami untuk mendapatkan informasi terkini.",
  },
  {
    question: "Jenis barang apa saja yang bisa dikirim?",
    answer:
      "Kami menangani general cargo, FMCG, dan berbagai jenis muatan dengan armada yang disesuaikan volume serta area tujuan. Untuk barang khusus atau bervolume besar, sebaiknya konsultasikan terlebih dahulu agar kami dapat menyiapkan armada yang paling tepat.",
  },
  {
    question: "Apa perbedaan antar jenis layanan yang tersedia?",
    answer:
      "Setiap jenis layanan berbeda pada estimasi waktu dan tarif per kilogramnya. Layanan yang lebih cepat memiliki pengali tarif lebih tinggi, sedangkan layanan Reguler lebih ekonomis dengan estimasi waktu yang lebih panjang. Anda bisa membandingkan estimasi waktu dan biaya tiap layanan langsung di fitur Cek Ongkir pada website.",
  },
  {
    question: "Apakah ada berat minimum untuk setiap pengiriman?",
    answer:
      "Ya, setiap pengiriman memiliki berat minimum yang menjadi dasar perhitungan (misalnya 5 kg). Jika berat barang di bawah minimum tersebut, biaya tetap dihitung berdasarkan berat minimum. Detailnya bisa Anda lihat saat menghitung estimasi di fitur Cek Ongkir.",
  },
  {
    question: "Bagaimana ketentuan pengemasan barang sebelum dikirim?",
    answer:
      "Pastikan barang dikemas dengan aman dan sesuai jenisnya agar terlindungi selama perjalanan, terutama untuk tujuan pelosok. Untuk barang yang mudah pecah, bernilai tinggi, atau berukuran khusus, sebaiknya konsultasikan lebih dulu dengan tim kami agar kami dapat menyarankan pengemasan dan penanganan yang tepat.",
  },
  {
    question: "Bagaimana jika barang mengalami kerusakan atau kendala pengiriman?",
    answer:
      "Kami mengutamakan penanganan barang yang aman di setiap tahap distribusi. Apabila terjadi kendala pada pengiriman, segera hubungi tim kami dengan menyertakan detail pengiriman agar dapat kami tindak lanjuti dan carikan solusinya secepat mungkin.",
  },
  {
    question: "Apakah ATTA Cargo melayani pengiriman rutin untuk bisnis?",
    answer:
      "Tentu. Kami terbiasa menangani distribusi general cargo dan FMCG untuk kebutuhan bisnis, termasuk pengiriman rutin dengan volume tertentu. Silakan hubungi tim kami untuk mendiskusikan skema kerja sama dan penyediaan armada yang sesuai dengan kebutuhan distribusi Anda.",
  },
  {
    question: "Bagaimana cara memulai pengiriman atau berkonsultasi?",
    answer:
      `Kami siap membantu memenuhi segala kebutuhan logistik Anda. Silakan hubungi tim kami melalui layanan WhatsApp atau telepon di ${phone}, via email ke ${email}, atau dengan mengisi formulir pesan yang tersedia di halaman Kontak. Tim kami akan dengan senang hati melayani Anda pada jam operasional kerja, yaitu setiap Senin hingga Jumat pukul 09.00–18.00 WITA, serta hari Sabtu pukul 09.00–17.00 WITA (Minggu tutup).`,
  },
  ];
}
