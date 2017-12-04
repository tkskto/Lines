import { GLUtils } from "../utils/Utils";
var Shader = (function () {
    function Shader(_gl, _vs, _fs) {
        var _this = this;
        this._gl = _gl;
        this.compile = function () {
            _this._VS = GLUtils.createVertexShader(_this._vertexString, _this._gl);
            _this._FS = GLUtils.createFragmentShader(_this._fragmentString, _this._gl);
        };
        this._vertexString = _vs;
        this._fragmentString = _fs;
    }
    Object.defineProperty(Shader.prototype, "VS", {
        get: function () {
            return this._VS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "FS", {
        get: function () {
            return this._FS;
        },
        enumerable: true,
        configurable: true
    });
    return Shader;
}());
export { Shader };
//# sourceMappingURL=Shader.js.map