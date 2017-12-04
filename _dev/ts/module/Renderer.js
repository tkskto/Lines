import { MatrixUtils } from "../utils/Utils";
import { Model } from "../Model";
import { Vector } from "./Vector";
var gl;
(function (gl) {
    var Renderer = (function () {
        function Renderer(_ctx, _model) {
            var _this = this;
            this._ctx = _ctx;
            this._model = _model;
            this.PI = Math.PI;
            this._ratio = window.devicePixelRatio;
            this._target = [];
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
            this._count = 0;
            this.update = function () {
                _this._timer = requestAnimationFrame(_this.update);
                _this.render();
            };
            this.render = function () {
                for (var i = 0; i < _this._target.length; i++) {
                    _this.mvpMatrix = MatrixUtils.multiply(_this.vpMatrix, _this._target[i].mMatrix);
                    _this._target[i].ready([_this.mvpMatrix, [1.0, 1.0, 1.0, 0.5]]);
                    _this._target[i].drawElements();
                }
                _this._gl.flush();
            };
            this.onResize = function () {
                _this._cWidth = Math.floor(_this._ctx.canvas.clientWidth * _this._ratio);
                _this._cHeight = Math.floor(_this._ctx.canvas.clientHeight * _this._ratio);
                _this._canvasPosX = _this._cWidth * 0.5;
                _this._canvasPosY = _this._cHeight * 0.5;
                _this._wh = 1 / Math.sqrt(_this._cWidth * _this._cWidth + _this._cHeight * _this._cHeight);
                MatrixUtils.lookAt(new Vector(0.0, 0.0, 1.0), new Vector(0, 0, 0), new Vector(0, 1, 0), _this.vMatrix);
                MatrixUtils.perspective(60, _this._cWidth / _this._cHeight, 0.1, 1000, _this.pMatrix);
                MatrixUtils.multiply(_this.pMatrix, _this.vMatrix, _this.vpMatrix);
                _this._gl.viewport(0, 0, _this._cWidth, _this._cHeight);
            };
            this._gl = _ctx.ctx;
            this._gl.enable(this._gl.DEPTH_TEST);
            this._gl.depthFunc(this._gl.LEQUAL);
            this._gl.enable(this._gl.BLEND);
            this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
            this.vMatrix = MatrixUtils.initialize(MatrixUtils.create());
            this.pMatrix = MatrixUtils.initialize(MatrixUtils.create());
            this.qMatrix = MatrixUtils.initialize(MatrixUtils.create());
            this.vpMatrix = MatrixUtils.initialize(MatrixUtils.create());
            this.onResize();
            this.mvpMatrix = MatrixUtils.initialize(new Float32Array(16));
            this._model.addEventListener(Model.ON_RESIZE_EVENT, this.onResize);
        }
        return Renderer;
    }());
    gl.Renderer = Renderer;
})(gl || (gl = {}));
//# sourceMappingURL=Renderer.js.map