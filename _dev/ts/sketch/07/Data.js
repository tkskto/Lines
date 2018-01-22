var Data = (function () {
    function Data(_width, _height, _col) {
        this._vertex = [];
        this._color = [];
        this._index = [];
        this._normal = [];
        this._uv = [];
        var PI = Math.PI;
        var plus = 360 / _col;
        var rad = 0;
        for (var i = 0; i < _col + 1; i++) {
            var radian = rad * PI / 180;
            this._vertex.push(Math.cos(radian) * _width, Math.sin(radian) * _height, 0.0);
            this._vertex.push(Math.cos(radian) * _width * .5, Math.sin(radian) * _height * .5, 0.0);
            rad += plus;
        }
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