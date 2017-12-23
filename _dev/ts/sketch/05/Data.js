import { Methods } from '../../utils/Utils';
var Data = (function () {
    function Data(_width, _height, _num) {
        this._vertex = [];
        this._color = [];
        this._vertID = [];
        this._index = [];
        this._normal = [];
        this._uv = [];
        var maxHeight = _height * 0.5;
        var offset = _width / _num;
        for (var i = 0; i < _num; i++) {
            var x = _width * -0.5 + (i * 1.4);
            var y = -maxHeight;
            var color = Methods.hsv2RGB(360 / _num * i, 100, 100, 100);
            this._color.push(color[0], color[1], color[2], color[3]);
            this._color.push(color[0], color[1], color[2], color[3]);
            this._color.push(color[0], color[1], color[2], color[3]);
            this._color.push(color[0], color[1], color[2], color[3]);
            this._vertex.push(x, y, 0.0, x, y, 0.0, x + 0.5, y, 0.0, x + 0.5, y, 0.0);
            this._vertID.push(1 + i * 4, 2 + i * 4, 3 + i * 4, 4 + i * 4);
            this._index.push(i * 4, 1 + i * 4, 2 + i * 4, i * 4, 2 + i * 4, 3 + i * 4);
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