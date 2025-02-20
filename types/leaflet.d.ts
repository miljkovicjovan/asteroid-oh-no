import * as L from "leaflet";

declare module "leaflet" {
    interface Map {
        smoothWheelZoom?: any;
    }

    class SmoothWheelZoom extends L.Handler {
        enable(): void;
        disable(): void;
    }
}
