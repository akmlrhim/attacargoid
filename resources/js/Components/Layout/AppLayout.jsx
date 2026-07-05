import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePage } from "@inertiajs/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "../Shared/WhatsAppFloat";

gsap.registerPlugin(ScrollTrigger);

export default function AppLayout({ children }) {
  const { url } = usePage();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Respect reduced-motion: skip Lenis entirely and use native scroll so the
    // page never feels heavy/janky for users who opt out of motion.
    if (prefersReducedMotion) {
      if (window.__pendingScroll) {
        const target = window.__pendingScroll;
        delete window.__pendingScroll;
        requestAnimationFrame(() => {
          document
            .getElementById(target)
            ?.scrollIntoView({ behavior: "auto" });
        });
      }
      return;
    }

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    lenis.on("scroll", ScrollTrigger.update);
    window.__lenis = lenis;

    const ticker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Lazy sections mount after this effect runs; recompute trigger positions
    // once they're in the DOM so scrub/reveal animations fire at the right spot
    // instead of lagging behind the scroll.
    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 300);

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
      clearTimeout(refreshId);
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
