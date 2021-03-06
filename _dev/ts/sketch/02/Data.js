var Data = (function () {
    function Data() {
        this._vertex = [
            -0.7, 0.15, 0.0,
            -0.7, -0.15, 0.0,
            -0.7, -0.15, 0.0,
            -0.5, -0.15, 0.0,
            -0.4, -0.15, 0.0,
            -0.4, 0.15, 0.0,
            -0.25, 0.15, 0.0,
            -0.25, -0.15, 0.0,
            -0.25, -0.15, 0.0,
            0.05, 0.15, 0.0,
            0.05, 0.15, 0.0,
            0.05, -0.15, 0.0,
            0.2, -0.15, 0.0,
            0.4, -0.15, 0.0,
            0.2, -0.15, 0.0,
            0.2, 0.15, 0.0,
            0.2, 0.15, 0.0,
            0.4, 0.15, 0.0,
            0.2, 0.0, 0.0,
            0.4, 0.0, 0.0,
            0.7, 0.15, 0.0,
            0.5, 0.15, 0.0,
            0.5, 0.15, 0.0,
            0.5, 0.0, 0.0,
            0.5, 0.0, 0.0,
            0.7, 0.0, 0.0,
            0.7, 0.0, 0.0,
            0.7, -0.15, 0.0,
            0.7, -0.15, 0.0,
            0.5, -0.15, 0.0
        ];
        this._color = [
            1.0, 1.0, 0.8, 1.0,
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.4, 0.4, 0.8, 1.0,
            1.0, 1.0, 0.8, 1.0,
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 0.8, 1.0,
            1.0, 1.0, 0.8, 1.0,
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 0.8, 1.0,
            1.0, 1.0, 0.8, 1.0,
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 0.8, 1.0,
            1.0, 1.0, 0.8, 1.0,
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 0.8, 1.0,
            1.0, 1.0, 0.8, 1.0,
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 0.8, 1.0,
            1.0, 1.0, 0.8, 1.0,
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 0.8, 1.0,
            0.7, 0.13, 0.8, 1.0,
            0.56, 0.4, 0.8, 1.0
        ];
        this._index = [];
        this._normal = [];
        this._uv = [];
    }
    Object.defineProperty(Data.prototype, "vertex", {
        get: function () {
            return this._vertex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data.prototype, "normal", {
        get: function () {
            return this._normal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data.prototype, "uv", {
        get: function () {
            return this._uv;
        },
        enumerable: true,
        configurable: true
    });
    return Data;
}());
export { Data };
//# sourceMappingURL=Data.js.map