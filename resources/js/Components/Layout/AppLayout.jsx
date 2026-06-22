import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePage } from "@inertiajs/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "../Shared/WhatsAppFloat";

export default function AppLayout({ children }) {
  const { url } = usePage();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    lenis.on("scroll", ScrollTrigger.update);
    window.__lenis = lenis;

    const ticker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Handle pending scroll target from cross-page navigation
    if (window.__pendingScroll) {
      const target = window.__pendingScroll;
      delete window.__pendingScroll;
      requestAnimationFrame(() => {
        setTimeout(() => {
          lenis.scrollTo(`#${target}`, { duration: 1.4, offset: -96 });
        }, 80);
      });
    }

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [url]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
