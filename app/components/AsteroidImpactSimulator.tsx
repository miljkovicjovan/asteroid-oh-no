import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface LatLng {
    lat: number;
    lng: number;
}

function MapClickHandler({ setImpactLocation }: { setImpactLocation: (location: LatLng) => void }) {
    useMapEvents({
        click(e) {
            setImpactLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });
    return null;
}

export default function AsteroidImpactSimulator() {
    const [impactLocation, setImpactLocation] = useState<LatLng>({ lat: 51.505, lng: -0.09 }); // Default: London
    const [impactRadius, setImpactRadius] = useState<number>(50000); // Default 50km

    return (
        <div className="h-screen w-full">
            <h1 className="text-center text-2xl font-bold p-4">Asteroid Impact Simulator</h1>
            <MapContainer
                center={[impactLocation.lat, impactLocation.lng]}
                zoom={5}
                style={{ height: "80vh", width: "100%" }}
            >
                <MapClickHandler setImpactLocation={setImpactLocation} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[impactLocation.lat, impactLocation.lng]}>
                    <Popup>Impact Location</Popup>
                </Marker>
                <Circle center={[impactLocation.lat, impactLocation.lng]} radius={impactRadius} color="red" />
            </MapContainer>
            <div className="text-center mt-4">
                <label>Impact Radius (km): </label>
                <input
                    type="range"
                    min="1000" max="100000"
                    value={impactRadius}
                    onChange={(e) => setImpactRadius(Number(e.target.value))}
                />
                <span> {impactRadius / 1000} km</span>
            </div>
        </div>
    );
}