var Data = (function () {
    function Data(_width, _height) {
        this._vertex = [];
        this._color = [];
        this._index = [];
        this._normal = [];
        this._uv = [];
        this._vertex.push(-_width, -_height, 0.0, -_width, _height, 0.0, _width, _height, 0.0, _width, -_height, 0.0);
        this._index.push(0, 1, 2, 0, 2, 3);
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