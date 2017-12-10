import { Methods } from '../utils/Utils';
var WebGLContext = (function () {
    function WebGLContext(_model, _canvas) {
        var _this = this;
        this._model = _model;
        this.init = function () {
            _this._ctx = _this._canvas.getContext('webgl');
            if (!_this._ctx) {
                Methods.showError('Browser dose not support WebGL.');
            }
            _this._extVAO = _this._ctx.getExtension('OES_vertex_array_object');
            if (!_this._extVAO) {
                alert('vertex array object not supported');
                return;
            }
        };
        this._ratio = window.devicePixelRatio;
        this._canvas = _canvas;
        this.init();
    }
    Object.defineProperty(WebGLContext.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLContext.prototype, "ctx", {
        get: function () {
            return this._ctx;
        },
        enumerable: true,
        configurable: true
    });
    return WebGLContext;
}());
export { WebGLContext };
//# sourceMappingURL=Context.js.map