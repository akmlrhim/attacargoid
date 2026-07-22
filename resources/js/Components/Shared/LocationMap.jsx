import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Vite fingerprints Leaflet's default marker assets, so point the icon paths at
// the bundled URLs (otherwise the marker renders as a broken image).
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/**
 * Keeps the map centered on the current position. Because it lives inside
 * <MapContainer> it can access the map instance and smoothly animate to a new
 * location whenever the `position`/`zoom` props change (dynamic data).
 */
function Recenter({ position, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (!position) {
      return;
    }
    map.flyTo(position, zoom ?? map.getZoom(), { duration: 0.8 });
  }, [map, position, zoom]);

  return null;
}

/**
 * Reusable OpenStreetMap-backed location map. The marker position is fully
 * data-driven, so it can be fed coordinates from the backend and repositioned
 * without touching this component.
 *
 * @param {{position: [number, number], zoom?: number, label?: string, address?: string, height?: number|string, className?: string}} props
 */
export default function LocationMap({
  position,
  zoom = 16,
  label,
  address,
  height = 380,
  className = "",
}) {
  // Leaflet needs a real DOM node with dimensions; wait for the client mount to
  // avoid hydration/measurement issues and to show a placeholder meanwhile.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!position) {
    return null;
  }

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ height }}
      >
        <span className="w-8 h-8 rounded-full border-2 border-navy/20 border-t-navy animate-spin" />
      </div>
    );
  }

  const [lat, lng] = position;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      aria-label={label ? `Peta lokasi ${label}` : "Peta lokasi"}
      className={className}
      style={{ height, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        {(label || address) && (
          <Popup>
            {label && <p className="font-bold text-navy mb-0.5">{label}</p>}
            {address && <p className="text-black/70">{address}</p>}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1.5 font-semibold text-orange hover:underline"
            >
              Petunjuk arah →
            </a>
          </Popup>
        )}
      </Marker>
      <Recenter position={position} zoom={zoom} />
    </MapContainer>
  );
}
