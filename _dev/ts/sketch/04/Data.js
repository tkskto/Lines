var Data = (function () {
    function Data(_width, _height, _row) {
        this._vertex = [];
        this._color = [];
        this._vertID = [];
        this._index = [];
        this._normal = [];
        this._uv = [];
        var halfWidth = _width * 0.5;
        var maxHeight = _height * 0.5;
        var perHeight = _height / _row;
        this._vertex.push(halfWidth * -1, maxHeight, 1, halfWidth * -1, maxHeight, 1);
        this._vertex.push(halfWidth, maxHeight - perHeight, 1, halfWidth, maxHeight - perHeight, 1);
        for (var i = 0; i < _row; i += 2) {
            this._vertex.push(halfWidth * -1, maxHeight - perHeight * i, 1);
            this._vertex.push(halfWidth * -0.9, maxHeight - perHeight * i, 1);
            this._vertex.push(halfWidth, maxHeight - perHeight * (i + 1), 1);
            this._vertex.push(halfWidth * 0.9, maxHeight - perHeight * (i + 1), 1);
        }
        for (var i = 1; i < this._vertex.length; i++) {
            this._vertID.push(i);
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