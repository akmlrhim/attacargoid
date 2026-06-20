import { Head } from "@inertiajs/react";
import AppLayout from "../Components/Layout/AppLayout";
import HeroSection from "../Components/Sections/HeroSection";
import AboutSection from "../Components/Sections/AboutSection";
import AdvantagesSection from "../Components/Sections/AdvantagesSection";
import ScrollReveal from "../Components/ReactBits/ScrollReveal";
import ServicesSection from "../Components/Sections/ServicesSection";
import ProcessTimeline from "../Components/Sections/ProcessTimeline";
import CoverageMap from "../Components/Sections/CoverageMap";
import ContactSection from "../Components/Sections/ContactSection";
import TestimonialsSection from "../Components/Sections/TestimonialsSection";

export default function Home({
  services = [],
  advantages = [],
  processSteps = [],
  reviews = [],
  googleRating = null,
}) {
  return (
    <>
      <Head title="Mitra Logistik Kalimantan" />
      <AppLayout>
        <HeroSection />
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <ScrollReveal
              baseOpacity={0}
              enableBlur
              baseRotation={4}
              blurStrength={10}
              textClassName="text-navy"
              wordAnimationEnd="bottom center"
            >
              Distribusi barang ke pelosok Kalimantan sering jadi mimpi
              buruk—telat, rusak, atau hilang kontak sama kurir. ATTA Cargo
              hadir sebagai mitra penerusan barang terpercaya dengan hub utama
              di Banjarmasin, menjangkau seluruh Kalimantan Selatan & Tengah.
              Saatnya bisnis Anda tumbuh kuat bersama distribusi yang cepat,
              aman, dan benar-benar bisa dipantau.
            </ScrollReveal>
          </div>
        </section>
        <AboutSection />
        <AdvantagesSection advantages={advantages} />
        <ServicesSection services={services} />
        <ProcessTimeline processSteps={processSteps} />
        <CoverageMap />
        <TestimonialsSection reviews={reviews} googleRating={googleRating} />
        <ContactSection />
      </AppLayout>
    </>
  );
}
