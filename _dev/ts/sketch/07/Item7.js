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
import { Default, NormalMap } from './Shader';
import { WebGLContext } from '../../module/Context';
import { Data } from './Data';
import { Renderer } from '../../module/Renderer';
import { Geometry } from '../../module/Geometry';
import { Mesh } from '../../module/Mesh';
import { Program } from '../../module/Program';
import { GLConfig } from '../../Config';
import { OffScreenImageRenderer } from '../../module/OffScreenImageRenderer';
import { Plane } from '../../utils/Plane';
var Item7 = (function (_super) {
    __extends(Item7, _super);
    function Item7(_model, _canvas, _id, _type) {
        var _this = _super.call(this, _model, _id, _type) || this;
        _this._canvas = _canvas;
        _this._count = 0;
        _this.setup = function () {
            _this._ctx = new WebGLContext(_this._model, _this._canvas);
            _this._gl = _this._ctx.ctx;
            _this.clear();
            _this._shader = new Default(_this._gl);
            _this._normal = new NormalMap(_this._gl);
            _this._default = new Program(_this._gl, _this._shader, ['position'], [3], ['mvpMatrix', 'resolution', 'texture'], [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_VECTOR2, GLConfig.UNIFORM_TYPE_INT]);
            _this._offScreen = new Program(_this._gl, _this._normal, ['position', 'texCoord'], [3, 2], ['mvpMatrix', 'resolution', 'texture'], [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_VECTOR2, GLConfig.UNIFORM_TYPE_INT]);
            _this._renderer = new Renderer(_this._ctx, _this._model);
            _this._offScreenRenderer = new OffScreenImageRenderer(_this._ctx, './images/lena.jpg', _this._model);
            var width = _this._model.screen.width;
            var height = _this._model.screen.height;
            _this._data = new Data(1.0, height / width, 64);
            var line = new Geometry(_this._gl, _this._data).init();
            var plane = new Geometry(_this._gl, new Plane()).init();
            _this._mesh = new Mesh(_this._gl, _this._default, line, GLConfig.DRAW_TYPE_TRIANGLE_STRIP);
            _this._plane = new Mesh(_this._gl, _this._offScreen, plane, GLConfig.DRAW_TYPE_TRIANGLE);
            _this._renderer.add(_this._mesh);
            _this._offScreenRenderer.add(_this._plane);
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
            if (_this._offScreenRenderer) {
                _this._offScreenRenderer.dispose();
            }
        };
        _this.update = function () {
            _this.animate();
            _this._count += 0.1;
            _this._timer = requestAnimationFrame(_this.update);
        };
        _this.animate = function () {
            _this.clear();
            _this._offScreenRenderer.render([_this._model.canvas.width, _this._model.canvas.height], 0);
            _this._gl.bindTexture(_this._gl.TEXTURE_2D, _this._offScreenRenderer.fBuffer.texture);
            _this._renderer.update([_this._model.canvas.width, _this._model.canvas.height], 0);
        };
        return _this;
    }
    return Item7;
}(Sketch));
export { Item7 };
//# sourceMappingURL=Item7.js.map