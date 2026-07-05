import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import SectionHeading from "../Shared/SectionHeading";

/**
 * Fallback distribution network, used only when no coverage data is passed in
 * from the backend (e.g. an empty database). Real coverage is managed via the
 * admin panel and delivered through the `regions` prop.
 */
const FALLBACK_REGIONS = [
  {
    name: "Kalimantan Selatan",
    shortName: "Kalsel",
    cities: [
      { name: "Banjarmasin", lat: -3.3194, lng: 114.5906, hub: true },
      { name: "Banjarbaru", lat: -3.4572, lng: 114.841 },
      { name: "Martapura", lat: -3.4109, lng: 114.8592 },
      { name: "Pelaihari", lat: -3.7969, lng: 114.7739 },
      { name: "Batulicin", lat: -3.44, lng: 115.975 },
      { name: "Kotabaru", lat: -3.2445, lng: 116.1631 },
      { name: "Kandangan", lat: -2.7889, lng: 115.2631 },
      { name: "Barabai", lat: -2.5896, lng: 115.3831 },
      { name: "Amuntai", lat: -2.4183, lng: 115.2494 },
      { name: "Tanjung", lat: -2.1861, lng: 115.3831 },
      { name: "Paringin", lat: -2.2497, lng: 115.1839 },
      { name: "Rantau", lat: -2.9247, lng: 115.1508 },
      { name: "Marabahan", lat: -3.0025, lng: 114.7592 },
    ],
  },
  {
    name: "Kalimantan Tengah",
    shortName: "Kalteng",
    cities: [
      { name: "Palangka Raya", lat: -2.2088, lng: 113.9213 },
      { name: "Sampit", lat: -2.5375, lng: 112.9508 },
      { name: "Pangkalan Bun", lat: -2.6833, lng: 111.6167 },
      { name: "Kuala Kapuas", lat: -3.0089, lng: 114.3878 },
      { name: "Pulang Pisau", lat: -2.7442, lng: 114.2769 },
      { name: "Kasongan", lat: -1.9917, lng: 113.3906 },
      { name: "Muara Teweh", lat: -0.9539, lng: 114.8925 },
      { name: "Buntok", lat: -1.7208, lng: 114.8397 },
      { name: "Puruk Cahu", lat: -0.585, lng: 114.585 },
    ],
  },
];

// Display aspect ratio for the map frame (width / height).
const ASPECT = 1.5;
const HUB_COLOR = "#f5a623";
const CITY_COLOR = "#0b1f4d";

/**
 * Build a Leaflet div-icon that reuses the site's teardrop pin (navy/orange,
 * larger + pinging for hubs/selection). Returning an HTML string lets us keep
 * the exact SVG marker instead of Leaflet's default image icon.
 */
function pinIcon({ hub, active }) {
  const size = hub ? 42 : active ? 36 : 32;
  const color = hub ? HUB_COLOR : CITY_COLOR;
  // Center the pulse on the pin head (SVG cx=12, cy=9 → 50%, 37.5%) using
  // negative margins instead of a translate: Tailwind's `animate-ping` sets
  // `transform: scale(2)`, which would override a centering translate and shove
  // the ring off toward a corner. Margins keep it centered as it scales.
  const ringSize = size * 0.9;
  const ping =
    hub || active
      ? `<span style="position:absolute;left:50%;top:37.5%;width:${ringSize}px;height:${ringSize}px;margin-left:${-ringSize / 2}px;margin-top:${-ringSize / 2}px;border-radius:9999px;background:${color};opacity:.4" class="animate-ping"></span>`
      : "";

  return L.divIcon({
    className: "cm-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    tooltipAnchor: [0, -size + 6],
    html: `
      <div style="position:relative;width:${size}px;height:${size}px">
        ${ping}
        <svg viewBox="0 0 24 24" width="${size}" height="${size}"
             style="position:relative;filter:drop-shadow(0 3px 5px rgba(11,31,77,.45))">
          <path fill="${color}" stroke="#ffffff" stroke-width="1.1"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.6" fill="#ffffff"/>
        </svg>
      </div>`,
  });
}

/**
 * Drives the map view from React state: fits the whole region into view when
 * the province changes, and smoothly flies to a city when it's selected. This
 * is the "position can change" piece — everything is derived from props/state.
 */
function MapController({ cities, active }) {
  const map = useMap();

  // Fit the current province's cities into view (fires on region switch).
  useEffect(() => {
    const bounds = L.latLngBounds(cities.map((c) => [c.lat, c.lng]));
    map.invalidateSize();
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10, animate: false });
  }, [map, cities]);

  // Zoom in to the selected city — always jumps to a close-in zoom level so
  // pressing a city gives a clear, visible zoom-in reaction.
  useEffect(() => {
    if (!active) {
      return;
    }
    map.flyTo([active.lat, active.lng], Math.max(map.getZoom(), 13), {
      duration: 0.8,
    });
  }, [map, active]);

  return null;
}

export default function CoverageMap({ regions: regionsProp } = {}) {
  const regions =
    Array.isArray(regionsProp) && regionsProp.length
      ? regionsProp
      : FALLBACK_REGIONS;

  const [activeRegion, setActiveRegion] = useState(0);
  const [activeCity, setActiveCity] = useState(null);
  const [mounted, setMounted] = useState(false);
  const ref = useScrollReveal();
  const itemRefs = useRef({});

  const region = regions[activeRegion] ?? regions[0];
  const active = region.cities.find((c) => c.name === activeCity) ?? null;
  const totalCities = regions.reduce((n, r) => n + r.cities.length, 0);
  const regionHasHub = region.cities.some((c) => c.hub);

  // Initial center: the region's hub, else its first city.
  const initialCenter = useMemo(() => {
    const hub = region.cities.find((c) => c.hub) ?? region.cities[0];
    return [hub.lat, hub.lng];
  }, [region]);

  // Leaflet needs a mounted DOM node with real dimensions.
  useEffect(() => setMounted(true), []);

  // Clear selection when switching province.
  useEffect(() => {
    setActiveCity(null);
  }, [activeRegion]);

  // Keep the sidebar list scrolled to the selected city.
  useEffect(() => {
    if (!activeCity) {
      return;
    }
    const item = itemRefs.current[activeCity];
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeCity]);

  const selectCity = (name) =>
    setActiveCity((prev) => (prev === name ? null : name));

  return (
    <section
      id="jangkauan"
      ref={ref}
      className="bg-white py-16 sm:py-24 relative overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="sr">
          <SectionHeading
            title={`Distribusi ke ${totalCities}+ Kota di Kalimantan`}
            subtitle="Jaringan distribusi kami mencakup kota-kota utama di Kalimantan Selatan dan Kalimantan Tengah ditandai langsung pada peta satelit sesuai lokasi aslinya."
          />
        </div>
        {/* Region tabs */}
        <div className="sr flex gap-2.5 justify-center mb-6 sm:mb-8">
          {regions.map((r, key) => (
            <button
              key={r.name}
              onClick={() => setActiveRegion(key)}
              className={`flex-1 sm:flex-none px-5 sm:px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeRegion === key
                  ? "bg-navy text-white shadow-sm"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              {r.shortName}
              <span className="hidden sm:inline"> - {r.name}</span>
            </button>
          ))}
        </div>

        <div className="sr grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
          {/* Map */}
          <div
            className="lg:col-span-3 relative rounded-3xl border border-gray-200 shadow-sm overflow-hidden"
            style={{ aspectRatio: String(ASPECT) }}
          >
            {mounted ? (
              <MapContainer
                center={initialCenter}
                zoom={8}
                scrollWheelZoom={false}
                zoomControl={false}
                tapTolerance={25}
                className="absolute inset-0 z-0"
                style={{ height: "100%", width: "100%" }}
              >
                {/* Esri satellite imagery + place/boundary labels (no API key). */}
                <TileLayer
                  attribution="Tiles &copy; Esri"
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />
                <ZoomControl position="topright" />

                {region.cities.map((city) => (
                  <Marker
                    key={city.name}
                    position={[city.lat, city.lng]}
                    icon={pinIcon({
                      hub: city.hub,
                      active: activeCity === city.name,
                    })}
                    eventHandlers={{ click: () => selectCity(city.name) }}
                  >
                    <Tooltip
                      permanent={city.hub}
                      direction="top"
                      className="cm-tip"
                    >
                      {city.name}
                    </Tooltip>
                  </Marker>
                ))}

                <MapController cities={region.cities} active={active} />
              </MapContainer>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
                <span className="w-8 h-8 rounded-full border-2 border-white/25 border-t-white animate-spin" />
                <p className="text-sm text-white/70">Memuat peta…</p>
              </div>
            )}

            {/* Docked detail card for the selected city. */}
            {active && (
              <div className="absolute bottom-3 left-3 right-3 z-500 mx-auto max-w-xs rounded-2xl bg-white shadow-2xl border border-gray-100 p-4 text-left">
                <button
                  type="button"
                  onClick={() => setActiveCity(null)}
                  aria-label="Tutup"
                  className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-full text-black/40 hover:text-black hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="flex items-center gap-2 mb-1 pr-7">
                  <span className="text-base font-black text-navy leading-tight">
                    {active.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      active.hub
                        ? "text-orange-dark bg-orange/15"
                        : "text-navy bg-navy/8"
                    }`}
                  >
                    {active.hub ? "Hub Utama" : region.shortName}
                  </span>
                </div>
                <p className="text-xs text-black/50 mb-3">{region.name}</p>
                <a
                  href="/kontak"
                  className="flex items-center justify-center gap-1.5 w-full bg-orange hover:bg-orange-dark text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
                >
                  Kirim ke {active.name}
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Sidebar: region info + city list */}
          <div className="lg:col-span-2 flex flex-col">
            <p className="flex items-center gap-1.5 text-[11px] text-black/50 mb-2 px-1">
              <svg
                className="w-3.5 h-3.5 text-navy/50"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13.75 6.75a1.75 1.75 0 10-3.5 0v6.19l-1.2-1.2a1.75 1.75 0 10-2.47 2.47l3.5 3.5c.33.33.77.51 1.24.51h4.31a2.75 2.75 0 002.72-2.35l.53-3.7a2.25 2.25 0 00-2.23-2.57h-3.4V6.75z" />
              </svg>
              Klik kota untuk melihat lokasinya di peta
            </p>
            <div className="grid grid-cols-2 gap-2 lg:max-h-105 lg:overflow-y-auto lg:pr-1 cm-scroll">
              {region.cities.map((city) => {
                const isActive = activeCity === city.name;
                return (
                  <button
                    key={city.name}
                    ref={(el) => {
                      itemRefs.current[city.name] = el;
                    }}
                    onClick={() => selectCity(city.name)}
                    className={`flex items-center gap-2 w-full h-full px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl border text-left cursor-pointer transition-all duration-150 ${
                      city.hub
                        ? "bg-orange text-white border-orange"
                        : isActive
                          ? "bg-navy/5 border-navy/40 ring-1 ring-navy/20"
                          : "bg-white border-gray-100 hover:border-navy/20 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className={`w-3 h-3 shrink-0 ${city.hub ? "text-white" : "text-orange"}`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      className={`flex-1 min-w-0 text-xs sm:text-sm font-semibold truncate ${city.hub ? "text-white" : "text-black"}`}
                    >
                      {city.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-center text-black text-sm mt-8">
          Tidak menemukan kota Anda?{" "}
          <a
            href="/kontak"
            className="text-orange font-semibold hover:underline"
          >
            Hubungi kami
          </a>{" "}
          untuk informasi lebih lanjut.
        </p>
      </div>

      <style>{`
        .cm-scroll::-webkit-scrollbar { width: 6px; }
        .cm-scroll::-webkit-scrollbar-thumb { background: rgba(11,31,77,.15); border-radius: 9999px; }
        .cm-marker { background: transparent; border: 0; }
        .leaflet-tooltip.cm-tip {
          background: #0b1f4d; color: #fff; border: none;
          box-shadow: 0 2px 6px rgba(11,31,77,.35);
          font-family: var(--font-sans);
          font-weight: 600; font-size: 11px; padding: 2px 8px; border-radius: 6px;
        }
        .leaflet-tooltip.cm-tip::before { display: none; }
      `}</style>
    </section>
  );
}
