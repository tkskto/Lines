var Plane = (function () {
    function Plane() {
        this._VERTEX = [];
        this._NORMAL = [];
        this._COLOR = [];
        this._UV = [];
        this._INDEX = [];
        this._VERTEX = [
            -1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0
        ];
        this._COLOR = [
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0
        ];
        this._NORMAL = [
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0
        ];
        this._UV = [
            0.0, 1.0,
            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0
        ];
        this._INDEX = [
            0, 1, 2,
            3, 2, 1
        ];
    }
    Object.defineProperty(Plane.prototype, "VERTEX", {
        get: function () {
            return this._VERTEX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Plane.prototype, "NORMAL", {
        get: function () {
            return this._NORMAL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Plane.prototype, "COLOR", {
        get: function () {
            return this._COLOR;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Plane.prototype, "UV", {
        get: function () {
            return this._UV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Plane.prototype, "INDEX", {
        get: function () {
            return this._INDEX;
        },
        enumerable: true,
        configurable: true
    });
    return Plane;
}());
export { Plane };
//# sourceMappingURL=Plane.js.map