import { MatrixUtils } from '../utils/Utils';
import { Model } from '../Model';
import { Vector } from './Vector';
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
        this.dispose = function () {
        };
        this._count = 0;
        this.update = function () {
            _this.render();
        };
        this.render = function () {
            for (var _i = 0, _a = _this._target; _i < _a.length; _i++) {
                var target = _a[_i];
                MatrixUtils.multiply(_this.vpMatrix, target.mMatrix, _this.mvpMatrix);
                target.ready([_this.mvpMatrix]);
                target.drawArrays();
            }
            _this._gl.flush();
        };
        this.onResize = function () {
            MatrixUtils.lookAt(new Vector(0.0, 0.0, 1.0), new Vector(0, 0, 0), new Vector(0, 1, 0), _this.vMatrix);
            MatrixUtils.perspective(60, _this._cWidth / _this._cHeight, 0.1, 1000, _this.pMatrix);
            MatrixUtils.multiply(_this.pMatrix, _this.vMatrix, _this.vpMatrix);
            _this._gl.viewport(0, 0, _this._cWidth, _this._cHeight);
        };
        this._gl = _ctx.ctx;
        this._gl.enable(this._gl.DEPTH_TEST);
        this._gl.depthFunc(this._gl.LEQUAL);
        this.vMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.pMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.qMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.vpMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.mvpMatrix = MatrixUtils.initialize(MatrixUtils.create());
        var camPosition = new Vector(0.0, 0.0, 10.0);
        MatrixUtils.lookAt(new Vector(0, 0, 0), camPosition, new Vector(0, 1, 0), this.vMatrix);
        MatrixUtils.perspective(60, this._model.canvas.width / this._model.canvas.height, 0.1, 100, this.pMatrix);
        MatrixUtils.multiply(this.pMatrix, this.vMatrix, this.vpMatrix);
        this.onResize();
        this._model.addEventListener(Model.ON_RESIZE_EVENT, this.onResize);
    }
    return Renderer;
}());
export { Renderer };
//# sourceMappingURL=Renderer.js.map