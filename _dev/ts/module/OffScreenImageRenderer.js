import { GLUtils, MatrixUtils } from '../utils/Utils';
import { Vector } from './Vector';
import { Model } from '../Model';
var OffScreenImageRenderer = (function () {
    function OffScreenImageRenderer(_ctx, _src, _model) {
        var _this = this;
        this._ctx = _ctx;
        this._src = _src;
        this._model = _model;
        this._target = [];
        this.onCompleteLoadImage = function (e) {
            var gl = _this._gl;
            _this._image = e.target;
            _this._width = _this._image.width;
            _this._height = _this._image.height;
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, _this._texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _this._image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.bindTexture(gl.TEXTURE_2D, null);
            _this._fBuffer = GLUtils.createFrameBuffer(gl, _this._width, _this._height, null);
            _this._gl.enable(_this._gl.DEPTH_TEST);
            _this._gl.depthFunc(_this._gl.LEQUAL);
            _this._model.addEventListener(Model.ON_RESIZE_EVENT, _this.onResize);
            _this._model.addEventListener(Model.ON_CAMERA_STATE_CHANGED, _this.initializeMatrix);
            _this.initializeMatrix();
        };
        this.add = function (_model) {
            _this._target.push(_model);
        };
        this.remove = function (_mesh) {
            for (var i = 0; i < _this._target.length; i++) {
                if (_this._target[i].id === _mesh.id) {
                    _this._target.slice(i, 1);
                }
            }
        };
        this.dispose = function () {
            _this._target.length = 0;
            _this._image = null;
            _this._texture = null;
            _this._fBuffer = null;
            _this._model.removeEventListener(Model.ON_RESIZE_EVENT, _this.onResize);
            _this._model.removeEventListener(Model.ON_CAMERA_STATE_CHANGED, _this.initializeMatrix);
        };
        this.render = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            var gl = _this._gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, _this._fBuffer.frameBuffer);
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clearDepth(1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.bindTexture(gl.TEXTURE_2D, _this._texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _this._image);
            _this.mvpMatrix = MatrixUtils.initialize(MatrixUtils.create());
            for (var _a = 0, _b = _this._target; _a < _b.length; _a++) {
                var target = _b[_a];
                MatrixUtils.multiply(_this.vpMatrix, target.mMatrix, _this.mvpMatrix);
                target.ready((_c = [_this.mvpMatrix]).concat.apply(_c, values));
                target.draw();
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            var _c;
        };
        this.initializeMatrix = function () {
            _this.vMatrix = MatrixUtils.initialize(MatrixUtils.create());
            _this.pMatrix = MatrixUtils.initialize(MatrixUtils.create());
            _this.qMatrix = MatrixUtils.initialize(MatrixUtils.create());
            _this.vpMatrix = MatrixUtils.initialize(MatrixUtils.create());
            MatrixUtils.lookAt(_this._model.camPosition, new Vector(0.0, 0.0, 0.0), new Vector(0, 1, 0), _this.vMatrix);
            MatrixUtils.perspective(90, _this._model.canvas.width / _this._model.canvas.height, 0.1, 100, _this.pMatrix);
            MatrixUtils.multiply(_this.pMatrix, _this.vMatrix, _this.vpMatrix);
        };
        this.onResize = function () {
            _this.initializeMatrix();
            _this._cWidth = _this._ctx.canvas.clientWidth;
            _this._cHeight = _this._ctx.canvas.clientHeight;
            _this._gl.viewport(0, 0, _this._cWidth, _this._cHeight);
        };
        this._cWidth = _ctx.canvas.clientWidth;
        this._cHeight = _ctx.canvas.clientHeight;
        this._gl = _ctx.ctx;
        this._texture = this._gl.createTexture();
        var image = new Image();
        image.addEventListener('load', this.onCompleteLoadImage, {
            once: true
        });
        image.src = _src;
    }
    Object.defineProperty(OffScreenImageRenderer.prototype, "fBuffer", {
        get: function () {
            return this._fBuffer;
        },
        enumerable: true,
        configurable: true
    });
    return OffScreenImageRenderer;
}());
export { OffScreenImageRenderer };
//# sourceMappingURL=OffScreenImageRenderer.js.map