import { Head, Link } from "@inertiajs/react";
import useCompany from "../hooks/useCompany";
import { buildWhatsAppUrl } from "../constants/company";

const STATUS_CONTENT = {
  403: {
    title: "Akses Ditolak",
    message: "Kamu tidak memiliki izin untuk mengakses halaman ini.",
  },
  404: {
    title: "Halaman Tidak Ditemukan",
    message:
      "Halaman yang kamu cari mungkin sudah dipindahkan atau tidak tersedia.",
  },
  419: {
    title: "Sesi Berakhir",
    message:
      "Sesi kamu telah berakhir. Silakan muat ulang halaman dan coba lagi.",
  },
  429: {
    title: "Terlalu Banyak Permintaan",
    message: "Kamu mengirim permintaan terlalu cepat. Coba lagi sebentar lagi.",
  },
  500: {
    title: "Terjadi Kesalahan",
    message:
      "Ada masalah di server kami. Tim kami sudah diberi tahu, silakan coba lagi beberapa saat lagi.",
  },
  503: {
    title: "Sedang Pemeliharaan",
    message:
      "Situs sedang dalam pemeliharaan singkat. Kami akan segera kembali.",
  },
};

export default function ErrorPage({ status }) {
  const company = useCompany();
  const { title, message } = STATUS_CONTENT[status] ?? {
    title: "Terjadi Kesalahan",
    message: "Terjadi kesalahan yang tidak terduga. Silakan coba lagi.",
  };

  return (
    <>
      <Head title={title} />

      <section className="relative min-h-screen flex flex-col items-center justify-center bg-navy-dark px-6 text-center">
        <img
          src="/logo.webp"
          alt="ATTA Cargo"
          className="h-10 w-auto brightness-0 invert mb-10"
        />

        <p className="font-black text-orange leading-none text-[clamp(3.5rem,12vw,7rem)]">
          {status}
        </p>

        <h1 className="mt-2 font-black text-white text-[clamp(1.5rem,3vw,2.25rem)] leading-tight">
          {title}
        </h1>

        <p className="mt-4 max-w-md text-white text-sm sm:text-base leading-relaxed">
          {message}
        </p>
      </section>
    </>
  );
}
