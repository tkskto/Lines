import { GLUtils } from '../utils/Utils';
import { Data } from '../sketch/02/Data';
var Geometry = (function () {
    function Geometry(_gl, _data) {
        if (_data === void 0) { _data = new Data(); }
        var _this = this;
        this._gl = _gl;
        this._vbo = [];
        this.init = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            var index = 0;
            if (_this._VERTEX.length > 0) {
                _this._vbo[index] = GLUtils.createVBO(_this._gl, _this._VERTEX);
                index++;
            }
            if (_this._COLOR.length > 0) {
                _this._vbo[index] = GLUtils.createVBO(_this._gl, _this._COLOR);
                index++;
            }
            if (_this._NORMAL.length > 0) {
                _this._vbo[index] = GLUtils.createVBO(_this._gl, _this._NORMAL);
                index++;
            }
            for (var i = 0, len = data.length; i < len; i++) {
                _this._vbo[index] = GLUtils.createVBO(_this._gl, data[i]);
                index++;
            }
            if (_this._INDEX) {
                _this._ibo = GLUtils.createIBO(_this._gl, _this._INDEX);
            }
            return _this;
        };
        this._VERTEX = _data.vertex;
        this._INDEX = _data.index;
        this._COLOR = _data.color;
        this._NORMAL = _data.normal;
    }
    Object.defineProperty(Geometry.prototype, "ibo", {
        get: function () {
            return this._ibo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "vbo", {
        get: function () {
            return this._vbo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "NORMAL", {
        get: function () {
            return this._NORMAL;
        },
        set: function (value) {
            this._NORMAL = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "COLOR", {
        get: function () {
            return this._COLOR;
        },
        set: function (value) {
            this._COLOR = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "INDEX", {
        get: function () {
            return this._INDEX;
        },
        set: function (value) {
            this._INDEX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "VERTEX", {
        get: function () {
            return this._VERTEX;
        },
        set: function (value) {
            this._VERTEX = value;
        },
        enumerable: true,
        configurable: true
    });
    return Geometry;
}());
export { Geometry };
//# sourceMappingURL=Geometry.js.map