import { useEffect } from "react";
import { Head } from "@inertiajs/react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";
import HeroSection from "../Components/Sections/HeroSection";
import AboutSection from "../Components/Sections/AboutSection";
import AdvantagesSection from "../Components/Sections/AdvantagesSection";
import TrustBadgeStrip from "../Components/Shared/TrustBadgeStrip";
import ServicesSection from "../Components/Sections/ServicesSection";
import ProcessTimeline from "../Components/Sections/ProcessTimeline";
import CoverageMap from "../Components/Sections/CoverageMap";
import ContactSection from "../Components/Sections/ContactSection";

export default function Home() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => 1 - Math.pow(1 - t, 4),
        });

        lenis.on("scroll", ScrollTrigger.update);

        const ticker = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(ticker);
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <Head title="Mitra Logistik Kalimantan" />
            <Navbar />
            <main>
                <HeroSection />
                <TrustBadgeStrip />
                <AboutSection />
                <AdvantagesSection />
                <ServicesSection />
                <ProcessTimeline />
                <CoverageMap />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
