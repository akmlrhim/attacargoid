import { useCallback, useEffect, useState } from "react";
import { StaggeredMenu } from "../ReactBits/StaggeredMenu";

const WA_URL = `https://wa.me/62811510808?text=${encodeURIComponent("Halo ATTA CARGO, saya ingin konsultasi mengenai kebutuhan distribusi barang saya.")}`;

const menuItems = [
  { label: "Beranda", ariaLabel: "Kembali ke beranda", link: "#" },
  { label: "Tentang", ariaLabel: "Tentang ATTA Cargo", link: "#tentang" },
  { label: "Layanan", ariaLabel: "Layanan kami", link: "#layanan" },
  { label: "Proses", ariaLabel: "Proses pengiriman", link: "#proses" },
  { label: "Jangkauan", ariaLabel: "Area jangkauan", link: "#jangkauan" },
  { label: "Kontak", ariaLabel: "Hubungi kami", link: "#kontak" },
];

const socialItems = [
  { label: "WhatsApp", link: WA_URL, external: true },
  { label: "0811-510-808", link: "tel:+62811510808", external: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleItemClick = useCallback(
    (href) => (e) => {
      e.preventDefault();
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      document
        .getElementById(href.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    },
    [],
  );

  const itemsWithHandlers = menuItems.map((item) => ({
    ...item,
    onClick: handleItemClick(item.link),
  }));

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 50, pointerEvents: "none" }}
    >
      <StaggeredMenu
        isFixed={false}
        position="right"
        logoUrl="/logo.webp"
        items={itemsWithHandlers}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={false}
        menuButtonColor={scrolled ? "#0a1628" : "#ffffff"}
        openMenuButtonColor="#0a1628"
        changeMenuColorOnOpen={true}
        colors={["#f5a623", "#0a1628"]}
        accentColor="#f5a623"
        closeOnClickAway={true}
        scrolled={scrolled}
      />
    </div>
  );
}
