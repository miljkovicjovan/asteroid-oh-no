function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var L = _interopRequireWildcard(require("leaflet"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

L.Map.mergeOptions({
    // @section Mousewheel options
    // @option smoothWheelZoom: Boolean|String = true
    // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
    // it will zoom to the center of the view regardless of where the mouse was.
    smoothWheelZoom: true,

    // @option smoothWheelZoom: number = 1
    // setting zoom speed
    smoothSensitivity: 1

});

L.Map.SmoothWheelZoom = L.Handler.extend({


    addHooks: function () {
        L.DomEvent.on(this._map._container, 'wheel', this._onWheelScroll, this);
    },

    removeHooks: function () {
        L.DomEvent.off(this._map._container, 'wheel', this._onWheelScroll, this);
    },

    _onWheelScroll: function (e) {
        if (!this._isWheeling) {
            this._onWheelStart(e);
        }
        this._onWheeling(e);
    },

    _onWheelStart: function (e) {
        var map = this._map;
        this._isWheeling = true;
        this._wheelMousePosition = map.mouseEventToContainerPoint(e);
        this._centerPoint = map.getSize()._divideBy(2);
        this._startLatLng = map.containerPointToLatLng(this._centerPoint);
        this._wheelStartLatLng = map.containerPointToLatLng(this._wheelMousePosition);
        this._startZoom = map.getZoom();
        this._moved = false;
        this._zooming = true;

        map._stop();
        if (map._panAnim) map._panAnim.stop();

        this._goalZoom = map.getZoom();
        this._prevCenter = map.getCenter();
        this._prevZoom = map.getZoom();

        this._zoomAnimationId = requestAnimationFrame(this._updateWheelZoom.bind(this));
    },

    _onWheeling: function (e) {
        var map = this._map;

        this._goalZoom = this._goalZoom + L.DomEvent.getWheelDelta(e) * 0.003 * map.options.smoothSensitivity;
        if (this._goalZoom < map.getMinZoom() || this._goalZoom > map.getMaxZoom()) {
            this._goalZoom = map._limitZoom(this._goalZoom);
        }
        this._wheelMousePosition = this._map.mouseEventToContainerPoint(e);

        clearTimeout(this._timeoutId);
        this._timeoutId = setTimeout(this._onWheelEnd.bind(this), 200);

        L.DomEvent.preventDefault(e);
        L.DomEvent.stopPropagation(e);
    },

    _onWheelEnd: function (e) {
        this._isWheeling = false;
        cancelAnimationFrame(this._zoomAnimationId);
        this._map._moveEnd(true);
    },

    _updateWheelZoom: function () {
        var map = this._map;

        if ((!map.getCenter().equals(this._prevCenter)) || map.getZoom() != this._prevZoom)
            return;

        this._zoom = map.getZoom() + (this._goalZoom - map.getZoom()) * 0.3;
        this._zoom = Math.floor(this._zoom * 100) / 100;

        var delta = this._wheelMousePosition.subtract(this._centerPoint);
        if (delta.x === 0 && delta.y === 0)
            return;

        if (map.options.smoothWheelZoom === 'center') {
            this._center = this._startLatLng;
        } else {
            this._center = map.unproject(map.project(this._wheelStartLatLng, this._zoom).subtract(delta), this._zoom);
        }

        if (!this._moved) {
            map._moveStart(true, false);
            this._moved = true;
        }

        map._move(this._center, this._zoom);
        this._prevCenter = map.getCenter();
        this._prevZoom = map.getZoom();

        this._zoomAnimationId = requestAnimationFrame(this._updateWheelZoom.bind(this));
    }

});

L.Map.addInitHook('addHandler', 'smoothWheelZoom', L.Map.SmoothWheelZoom);