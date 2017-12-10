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
import { Text } from '../../module/Text';
import { Lines } from './Lines';
var Item1 = (function (_super) {
    __extends(Item1, _super);
    function Item1(_model, _canvas, id, type) {
        var _this = _super.call(this, _model, id, type) || this;
        _this._model = _model;
        _this._canvas = _canvas;
        _this.setup = function () {
            _this._stage = new createjs.Stage(_this._canvas);
            _this._ctx = _this._canvas.getContext('2d');
            _this._lines = new Lines(_this._canvas.width, _this._canvas.height);
            _this._stage.addChild(_this._lines);
            var _text = new Text(_this._canvas.width, _this._canvas.height);
            _this._stage.addChild(_text);
            _this._stage.mouseEnabled = false;
            _this.play();
        };
        _this.dispose = function () {
            _this.pause();
            if (_this._lines) {
                _this._lines.reset();
            }
        };
        _this.update = function () {
            _this.animate();
        };
        _this.animate = function () {
            _this._lines.update();
            _this._stage.update();
            if (_this._lines.endFlg) {
                createjs.Ticker.removeEventListener('tick', _this.update);
            }
        };
        return _this;
    }
    return Item1;
}(Sketch));
export { Item1 };
//# sourceMappingURL=Item.js.map