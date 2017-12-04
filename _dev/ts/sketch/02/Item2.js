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
import { Sketch } from "../Sketch";
import { CanvasShader, NormalShader } from "./Shader";
import { GLUtils } from "../../utils/Utils";
import { WebGLContext } from "../../module/Context";
var Item2 = (function (_super) {
    __extends(Item2, _super);
    function Item2(_model, _canvas, _id, _type) {
        var _this = _super.call(this, _model, _id, _type) || this;
        _this._canvas = _canvas;
        _this.setup = function () {
            _this._ctx = new WebGLContext(_this._model, _this._canvas);
            _this._gl = _this._ctx.ctx;
            _this._normalShader = new NormalShader(_this._gl);
            _this._canvasShader = new CanvasShader(_this._gl);
            _this._normal = GLUtils.createProgram(_this._gl, _this._normalShader.VS, _this._normalShader.FS);
            _this.clear();
            _this._gl.viewport(0, 0, _this._canvas.width, _this._canvas.height);
            _this.play();
        };
        _this.clear = function () {
            _this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
            _this._gl.clearDepth(1.0);
            _this._gl.clear(_this._gl.COLOR_BUFFER_BIT | _this._gl.DEPTH_BUFFER_BIT);
        };
        _this.dispose = function () {
            _this.pause();
        };
        _this.update = function () {
            _this.animate();
            _this._timer = requestAnimationFrame(_this.update);
        };
        _this.animate = function () {
        };
        return _this;
    }
    return Item2;
}(Sketch));
export { Item2 };
//# sourceMappingURL=Item2.js.map