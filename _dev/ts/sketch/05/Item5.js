var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Sketch } from '../common/Sketch';
import { Default } from './Shader';
import { WebGLContext } from '../../module/Context';
import { Data } from './Data';
import { Renderer } from '../../module/Renderer';
import { Geometry } from '../../module/Geometry';
import { Mesh } from '../../module/Mesh';
import { Program } from '../../module/Program';
import { GLConfig } from '../../Config';
var Item5 = (function (_super) {
    __extends(Item5, _super);
    function Item5(_model, _canvas, _id, _type) {
        var _this = _super.call(this, _model, _id, _type) || this;
        _this._canvas = _canvas;
        _this._count = 0;
        _this.setup = function () {
            _this._ctx = new WebGLContext(_this._model, _this._canvas);
            _this._gl = _this._ctx.ctx;
            _this._gl.lineWidth(5);
            _this.clear();
            _this._shader = new Default(_this._gl);
            _this._default = new Program(_this._gl, _this._shader, ['position', 'color', 'vertId'], [3, 4, 1], ['mvpMatrix', 'time'], [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_FLOAT]);
            _this._renderer = new Renderer(_this._ctx, _this._model);
            _this._data = new Data(_this._model.camPosition.z, _this._model.screen.height / _this._model.screen.width * _this._model.camPosition.z, 15);
            var line = new Geometry(_this._gl, _this._data).init(_this._data.vertID);
            _this._mesh = new Mesh(_this._gl, _this._default, line, GLConfig.DRAW_TYPE_TRIANGLE);
            _this._renderer.add(_this._mesh);
            _this.play();
        };
        _this.clear = function () {
            _this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
            _this._gl.clearDepth(1.0);
            _this._gl.clear(_this._gl.COLOR_BUFFER_BIT | _this._gl.DEPTH_BUFFER_BIT);
        };
        _this.dispose = function () {
            _this.pause();
            if (_this._renderer) {
                _this._renderer.dispose();
            }
        };
        _this.update = function () {
            _this.animate();
            _this._count += 0.1;
            _this._timer = requestAnimationFrame(_this.update);
        };
        _this.animate = function () {
            _this.clear();
            _this._renderer.update(_this._count);
        };
        return _this;
    }
    return Item5;
}(Sketch));
export { Item5 };
//# sourceMappingURL=Item5.js.map