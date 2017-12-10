import { GLUtils } from '../utils/Utils';
var Program = (function () {
    function Program(_gl, _shader, _attName, _atts, _uniName, _uniType) {
        var _this = this;
        this._gl = _gl;
        this._shader = _shader;
        this._attName = _attName;
        this._atts = _atts;
        this._uniName = _uniName;
        this._uniType = _uniType;
        this._attl = [];
        this._unil = [];
        this.init = function () {
            _this._program = GLUtils.createProgram(_this._gl, _this._shader.VS, _this._shader.FS);
            for (var i = 0; i < _this._attName.length; i++) {
                _this._attl[i] = _this._gl.getAttribLocation(_this._program, _this._attName[i]);
            }
            for (var i = 0; i < _this._uniName.length; i++) {
                _this._unil[i] = _this._gl.getUniformLocation(_this._program, _this._uniName[i]);
            }
        };
        this.init();
    }
    Object.defineProperty(Program.prototype, "program", {
        get: function () {
            return this._program;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Program.prototype, "attl", {
        get: function () {
            return this._attl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Program.prototype, "atts", {
        get: function () {
            return this._atts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Program.prototype, "unil", {
        get: function () {
            return this._unil;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Program.prototype, "uniType", {
        get: function () {
            return this._uniType;
        },
        enumerable: true,
        configurable: true
    });
    return Program;
}());
export { Program };
//# sourceMappingURL=Program.js.map