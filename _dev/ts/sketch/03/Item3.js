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
var Item3 = (function (_super) {
    __extends(Item3, _super);
    function Item3(_model, _canvas, _id, _type) {
        var _this = _super.call(this, _model, _id, _type) || this;
        _this._canvas = _canvas;
        _this._data = new Data(32, 32, 5, [1, 0, 0, 1]);
        _this._count = 0;
        _this.setup = function () {
            _this._ctx = new WebGLContext(_this._model, _this._canvas);
            _this._gl = _this._ctx.ctx;
            _this.clear();
            _this._shader = new Default(_this._gl);
            _this._default = new Program(_this._gl, _this._shader, ['position', 'color', 'normal'], [3, 4, 3], ['mvpMatrix', 'time'], [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_FLOAT]);
            _this._renderer = new Renderer(_this._ctx, _this._model);
            var line = new Geometry(_this._gl, _this._data).init();
            _this._mesh = new Mesh(_this._gl, _this._default, line, GLConfig.DRAW_TYPE_LINE);
            _this._renderer.add(_this._mesh);
            _this.play();
        };
        _this.clear = function () {
            _this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
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
            _this._count += 0.0001;
            _this._timer = requestAnimationFrame(_this.update);
        };
        _this.animate = function () {
            _this.clear();
            _this._mesh.rotate(_this._count, [0, 1.0, 0]);
            _this._renderer.update(_this._count);
        };
        return _this;
    }
    return Item3;
}(Sketch));
export { Item3 };
//# sourceMappingURL=Item3.js.map