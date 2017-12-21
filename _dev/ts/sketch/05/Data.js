var Data = (function () {
    function Data(_width, _height, _num) {
        this._vertex = [];
        this._color = [];
        this._vertID = [];
        this._index = [];
        this._normal = [];
        this._uv = [];
        var maxHeight = _height * 0.5;
        var lineWidth = 90;
        for (var i = 0; i < _num; i++) {
            var x = _width - 1 + i * 2.0;
            var y = maxHeight;
            this._index.push(i + 1, i + 2, i + 3, i + 1, i + 3, i + 4);
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
    Object.defineProperty(Data.prototype, "vertID", {
        get: function () {
            return this._vertID;
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