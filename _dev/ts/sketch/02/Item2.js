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
var Item1 = (function (_super) {
    __extends(Item1, _super);
    function Item1(_model, _canvas, _id, _type) {
        var _this = _super.call(this, _model, _id, _type) || this;
        _this._canvas = _canvas;
        _this.setup = function () {
            _this.play();
        };
        _this.dispose = function () {
        };
        _this.update = function () {
            _this.animate();
        };
        _this.animate = function () {
        };
        return _this;
    }
    return Item1;
}(Sketch));
export { Item1 };
//# sourceMappingURL=Item2.js.map