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
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(_num, _allNum, _space, _height, _duration) {
        var _this = _super.call(this) || this;
        _this._num = _num;
        _this._allNum = _allNum;
        _this._space = _space;
        _this._height = _height;
        _this._duration = _duration;
        _this._endFlg = false;
        _this.init = function () {
            _this._startPoint = {
                x: _this._num * _this._space,
                y: _this._num * _this._space * -1
            };
            _this._currentPoint = {
                x: _this._startPoint.x,
                y: _this._startPoint.y
            };
            _this._endPoint = {
                x: _this._startPoint.x + Math.cos(225 * Math.PI / 180) * _this._height,
                y: _this._height + (_this._allNum - _this._num) * _this._space,
            };
            _this._plusX = (_this._endPoint.x - _this._startPoint.x) / _this._duration * 10;
            _this._plusY = (_this._endPoint.y - _this._startPoint.y) / _this._duration * 10;
            _this.graphics.clear();
        };
        _this.updatePos = function () {
            _this._currentPoint.x += _this._plusX;
            _this._currentPoint.y += _this._plusY;
            if (_this._currentPoint.y >= _this._endPoint.y) {
                _this._endFlg = true;
            }
            _this.render();
        };
        _this.render = function () {
            var g = _this.graphics;
            g.clear();
            g.setStrokeStyle(3, '10');
            g.beginStroke('#0f9d58');
            g.moveTo(_this._startPoint.x, _this._startPoint.y);
            g.lineTo(_this._currentPoint.x, _this._currentPoint.y);
            g.endStroke();
        };
        _this.init();
        return _this;
    }
    Object.defineProperty(Line.prototype, "endFlg", {
        get: function () {
            return this._endFlg;
        },
        enumerable: true,
        configurable: true
    });
    return Line;
}(createjs.Shape));
export { Line };
//# sourceMappingURL=Line.js.map