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
import { Line } from './Line';
var Lines = (function (_super) {
    __extends(Lines, _super);
    function Lines(_width, _height) {
        var _this = _super.call(this) || this;
        _this._width = _width;
        _this._height = _height;
        _this.SPACE = 20;
        _this._arr = [];
        _this._endFlg = false;
        _this._endCount = 0;
        _this.init = function () {
            _this._lineNum = Math.round((_this._width + _this._height) / _this.SPACE);
            for (var i = 0; i < _this._lineNum; i++) {
                var _line = new Line(i, _this._lineNum, _this.SPACE, _this._height, 3000);
                _this._arr.push(_line);
                _this.addChild(_line);
            }
        };
        _this.reset = function () {
            for (var i = 0; i < _this._lineNum; i++) {
                _this._arr[i].init();
            }
            _this._endCount = 0;
            _this._endFlg = false;
        };
        _this.update = function () {
            for (var i = 0; i < _this._lineNum; i++) {
                if (!_this._arr[i].endFlg) {
                    _this._arr[i].updatePos();
                }
                else {
                    _this._endCount++;
                }
            }
            if (_this._endCount === _this._lineNum) {
                _this._endFlg = true;
            }
        };
        _this.init();
        return _this;
    }
    Object.defineProperty(Lines.prototype, "endFlg", {
        get: function () {
            return this._endFlg;
        },
        enumerable: true,
        configurable: true
    });
    return Lines;
}(createjs.Container));
export { Lines };
//# sourceMappingURL=Lines.js.map