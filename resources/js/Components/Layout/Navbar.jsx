import { useCallback, useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { StaggeredMenu } from "../ReactBits/StaggeredMenu";

const WA_URL = `https://wa.me/62811510808?text=${encodeURIComponent("Halo ATTA CARGO, saya ingin konsultasi mengenai kebutuhan distribusi barang saya.")}`;

const NAV_ITEMS = [
    { label: "Beranda",      ariaLabel: "Kembali ke beranda",    page: "/",             anchor: null },
    { label: "Tentang Kami", ariaLabel: "Tentang ATTA Cargo",    page: "/tentang-kami", anchor: null },
    { label: "Layanan",      ariaLabel: "Layanan kami",          page: null,            anchor: "layanan" },
    { label: "Proses",       ariaLabel: "Proses pengiriman",     page: null,            anchor: "proses" },
    { label: "Jangkauan",    ariaLabel: "Area jangkauan",        page: null,            anchor: "jangkauan" },
    { label: "Kontak",       ariaLabel: "Hubungi kami",          page: null,            anchor: "kontak" },
];

const socialItems = [
    { label: "WhatsApp",    link: WA_URL,                external: true },
    { label: "0811-510-808", link: "tel:+62811510808",   external: false },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { url } = usePage();
    const isHome = url === "/" || url.startsWith("/?");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleItemClick = useCallback(
        (item) => (e) => {
            e.preventDefault();
            if (item.anchor) {
                if (isHome) {
                    document
                        .getElementById(item.anchor)
                        ?.scrollIntoView({ behavior: "smooth" });
                } else {
                    window.location.href = `/#${item.anchor}`;
                }
            } else if (item.page === "/" && isHome) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                router.visit(item.page);
            }
        },
        [isHome],
    );

    const menuItems = NAV_ITEMS.map((item) => ({
        label: item.label,
        ariaLabel: item.ariaLabel,
        link: item.anchor
            ? isHome
                ? `#${item.anchor}`
                : `/#${item.anchor}`
            : item.page,
        onClick: handleItemClick(item),
    }));

    return (
        <div
            style={{ position: "fixed", inset: 0, zIndex: 50, pointerEvents: "none" }}
        >
            <StaggeredMenu
                isFixed={false}
                position="right"
                logoUrl="/logo.webp"
                items={menuItems}
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
