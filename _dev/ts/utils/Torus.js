import { Methods } from './Utils';
var Torus = (function () {
    function Torus(_row, _col, _iRad, _oRad, _color) {
        if (_color === void 0) { _color = []; }
        this._vertex = [];
        this._normal = [];
        this._color = [];
        this._uv = [];
        this._index = [];
        for (var i = 0; i <= _row; i++) {
            var r = Math.PI * 2 / _row * i;
            var rr = Math.cos(r);
            var ry = Math.sin(r);
            for (var j = 0; j <= _col; j++) {
                var tr = Math.PI * 2 / _col * j;
                var tx = (rr * _iRad + _oRad) * Math.cos(tr);
                var ty = ry * _iRad;
                var tz = (rr * _iRad + _oRad) * Math.sin(tr);
                this._vertex.push(tx, ty, tz);
                if (_color.length === 0) {
                    _color = Methods.hsv2RGB(360 / _col * j, 1, 1, 1);
                }
                this._color.push(_color[0], _color[1], _color[2], _color[3]);
            }
        }
        for (var i = 0; i < _row; i++) {
            for (var j = 0; j < _col; j++) {
                var r = (_col + 1) * i + j;
                this._index.push(r, r + _col + 1, r + 1);
                this._index.push(r + _col + 1, r + _col + 2, r + 1);
            }
        }
    }
    Object.defineProperty(Torus.prototype, "vertex", {
        get: function () {
            return this._vertex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Torus.prototype, "normal", {
        get: function () {
            return this._normal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Torus.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Torus.prototype, "uv", {
        get: function () {
            return this._uv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Torus.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    return Torus;
}());
export { Torus };
//# sourceMappingURL=Torus.js.map