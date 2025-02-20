// leaflet-smoothwheelzoom.d.ts
import { Map, Handler, MapOptions } from 'leaflet';

declare module 'leaflet' {
    interface MapOptions {
        smoothWheelZoom?: boolean;
        smoothSensitivity?: number;
    }

    interface Map {
        SmoothWheelZoom: typeof SmoothWheelZoom;
    }

    class SmoothWheelZoom extends Handler {
        constructor(map: Map);
        addHooks(): void;
        removeHooks(): void;
        _onWheelScroll(e: WheelEvent): void;
        _onWheelStart(e: WheelEvent): void;
        _onWheeling(e: WheelEvent): void;
        _onWheelEnd(e: WheelEvent): void;
        _updateWheelZoom(): void;
    }
}
