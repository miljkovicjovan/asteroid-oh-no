import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import RepeatingOffsetHandler from "./RepeatingOffsetHandler";
import MapClickHandler from "./MapClickHandler";
import ImpactControls from "./ImpactControls";
import { calculateImpactRadius } from "@/utils/impactUtils";
import "@/utils/SmoothWheelZoom";
import UseSmoothWheelZoom from "@/hooks/UseSmoothWheelZoom";

export default function AsteroidImpactSimulator() {
  const [impactLocation, setImpactLocation] = useState({ lat: 51.505, lng: -0.09 });
  const [diameter, setDiameter] = useState(0.1);
  const [density, setDensity] = useState(3000);
  const [velocity, setVelocity] = useState(20);
  const [impactData, setImpactData] = useState(calculateImpactRadius(diameter, density, velocity));
  const [offsets, setOffsets] = useState<number[]>([0]);

  const handleRecalculate = () => {
    setImpactData(calculateImpactRadius(diameter, density, velocity));
  };

  const bounds: [[number, number], [number, number]] = [[-90, -180], [90, 180]];
  const minzoom = window.innerHeight > 960 ? 3 : 2

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-[#424242]">
      <MapContainer maxBounds={bounds} maxBoundsViscosity={1} minZoom={minzoom}
        center={[impactLocation.lat, impactLocation.lng]} zoom={5}
        className="h-full w-full md:w-10/12" attributionControl={false}
        scrollWheelZoom={false}>
        <UseSmoothWheelZoom />
        <RepeatingOffsetHandler lng={impactLocation.lng} setOffsets={setOffsets} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className="map-tiles" />
        <MapClickHandler setImpactLocation={setImpactLocation} />

        {offsets.map((offset, index) => (
          <Marker
            key={`marker-${index}`}
            position={[impactLocation.lat, impactLocation.lng + offset]}
            draggable={index === 0}
            eventHandlers={{
              dragend: (e) => {
                if (index === 0) {
                  const newLatLng = e.target.getLatLng();
                  setImpactLocation({ lat: newLatLng.lat, lng: newLatLng.lng });
                }
              },
            }}
          >
            <Popup>Impact Location</Popup>
          </Marker>
        ))}

        {offsets.map((offset, index) => (
          <Circle key={`crater-${index}`}
            center={[impactLocation.lat, impactLocation.lng + offset]}
            radius={impactData.craterDiameter * 1000} color="black" fillOpacity={0.5} />
        ))}

        {offsets.map((offset, index) => (
          <Circle key={`thermal-${index}`}
            center={[impactLocation.lat, impactLocation.lng + offset]}
            radius={impactData.thermalRadius * 1000} color="red" fillOpacity={0.2} />
        ))}

        {offsets.map((offset, index) => (
          <Circle key={`blast-${index}`}
            center={[impactLocation.lat, impactLocation.lng + offset]}
            radius={impactData.blastRadius * 1000} color="orange" fillOpacity={0.3} />
        ))}
      </MapContainer>

      <ImpactControls diameter={diameter} setDiameter={setDiameter} density={density}
        setDensity={setDensity} velocity={velocity} setVelocity={setVelocity}
        handleRecalculate={handleRecalculate} impactData={impactData} />
    </div>
  );
}
