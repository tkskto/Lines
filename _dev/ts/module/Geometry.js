import { GLUtils } from "../utils/Utils";
var data;
(function (data) {
    var Geometry = (function () {
        function Geometry(_gl) {
            var _this = this;
            this._gl = _gl;
            this._vbo = [];
            this._VERTEX = [];
            this._INDEX = [];
            this._COLOR = [];
            this._NORMAL = [];
            this.init = function () {
                if (_this._VERTEX.length > 0) {
                    _this._vbo[0] = GLUtils.createVBO(_this._gl, _this._VERTEX);
                }
                if (_this._NORMAL.length > 0) {
                    _this._vbo[1] = GLUtils.createVBO(_this._gl, _this._NORMAL);
                }
                if (_this._INDEX) {
                    _this._ibo = GLUtils.createIBO(_this._gl, _this._INDEX);
                }
            };
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
    data.Geometry = Geometry;
})(data || (data = {}));
//# sourceMappingURL=Geometry.js.map