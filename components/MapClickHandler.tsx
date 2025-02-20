import { useMapEvents } from "react-leaflet";

export interface LatLng {
  lat: number;
  lng: number;
}

export default function MapClickHandler({ setImpactLocation }:
  { setImpactLocation: (location: LatLng) => void }) {
  useMapEvents({
    click(e) {
      setImpactLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}
