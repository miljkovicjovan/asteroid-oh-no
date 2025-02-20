import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function UseSmoothWheelZoom() {
    const map = useMap(); // ✅ Get the map instance correctly

    useEffect(() => {
        if (!map) return;

        // Enable SmoothWheelZoom on the map
        L.Map.mergeOptions({
            smoothWheelZoom: true,
            smoothSensitivity: 1.5,
        });

        // Add the smoothWheelZoom handler to the map
        map.addHandler("smoothWheelZoom", (L as any).Map.SmoothWheelZoom);

        // Enable the handler
        map.smoothWheelZoom.enable();

        return () => {
            map.smoothWheelZoom.disable();
        };
    }, [map]);

    return null; // ✅ No JSX needed, it's just an effect
}
