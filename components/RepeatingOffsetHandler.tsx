import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function RepeatingOffsetHandler({ lng, setOffsets }:
  { lng: number; setOffsets: (offsets: number[]) => void }) {
  const map = useMap();

  useEffect(() => {
    const updateOffsets = () => {
      const bounds = map.getBounds();
      const minLng = bounds.getWest();
      const maxLng = bounds.getEast();

      const minOffset = Math.floor((minLng - lng) / 360);
      const maxOffset = Math.ceil((maxLng - lng) / 360);

      const newOffsets = [];
      for (let i = minOffset; i <= maxOffset; i++) {
        newOffsets.push(i * 360);
      }

      setOffsets(newOffsets);
    };

    map.on("move", updateOffsets);
    updateOffsets(); // Initial calculation

    return () => {
      map.off("move", updateOffsets);
    };
  }, [map, lng, setOffsets]);

  return null;
}
