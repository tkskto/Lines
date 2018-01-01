import { MatrixUtils } from '../utils/Utils';
import { Model } from '../Model';
import { Vector } from './Vector';
var Renderer = (function () {
    function Renderer(_ctx, _model) {
        var _this = this;
        this._ctx = _ctx;
        this._model = _model;
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
            _this._target.length = 0;
        };
        this.update = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            _this.render(values);
        };
        this.render = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            _this.mvpMatrix = MatrixUtils.initialize(MatrixUtils.create());
            for (var _a = 0, _b = _this._target; _a < _b.length; _a++) {
                var target = _b[_a];
                MatrixUtils.multiply(_this.vpMatrix, target.mMatrix, _this.mvpMatrix);
                target.ready((_c = [_this.mvpMatrix]).concat.apply(_c, values));
                target.draw();
            }
            _this._gl.flush();
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
        this._gl.enable(this._gl.DEPTH_TEST);
        this._gl.depthFunc(this._gl.LEQUAL);
        this._model.addEventListener(Model.ON_RESIZE_EVENT, this.onResize);
        this._model.addEventListener(Model.ON_CAMERA_STATE_CHANGED, this.initializeMatrix);
        this.initializeMatrix();
    }
    return Renderer;
}());
export { Renderer };
//# sourceMappingURL=Renderer.js.map