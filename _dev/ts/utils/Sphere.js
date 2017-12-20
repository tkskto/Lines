import { Methods } from './Utils';
var Sphere = (function () {
    function Sphere(_row, _col, rad, _color) {
        if (_color === void 0) { _color = []; }
        this._vertex = [];
        this._normal = [];
        this._color = [];
        this._uv = [];
        this._index = [];
        for (var i = 0; i <= _row; i++) {
            var r = Math.PI / _row * i;
            var ry = Math.cos(r);
            var rr = Math.sin(r);
            for (var j = 0; j <= _col; j++) {
                var tr = Math.PI * 2 / _col * j;
                var tx = rr * rad * Math.cos(tr);
                var ty = ry * rad;
                var tz = rr * rad * Math.sin(tr);
                var rx = rr * Math.cos(tr);
                var rz = rr * Math.sin(tr);
                var color = _color.concat();
                if (color.length === 0) {
                    color = Methods.hsv2RGB(_row * i, 100, 100, 50);
                }
                this._vertex.push(tx, ty, tz);
                this._normal.push(rx, ry, rz);
                this._color.push(color[0], color[1], color[2], color[3]);
                this._uv.push(1 - 1 / _col * j, 1 / _row * i);
            }
        }
        for (var i = 0; i < _row; i++) {
            for (var j = 0; j < _col; j++) {
                var r = (_col + 1) * i + j;
                this._index.push(r, r + 1, r + _col + 2);
                this._index.push(r, r + _col + 2, r + _col + 1);
            }
        }
    }
    Object.defineProperty(Sphere.prototype, "vertex", {
        get: function () {
            return this._vertex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sphere.prototype, "normal", {
        get: function () {
            return this._normal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sphere.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sphere.prototype, "uv", {
        get: function () {
            return this._uv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sphere.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    return Sphere;
}());
export { Sphere };
//# sourceMappingURL=Sphere.js.map