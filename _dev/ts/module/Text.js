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
var Text = (function (_super) {
    __extends(Text, _super);
    function Text(_width, _height) {
        var _this = _super.call(this) || this;
        _this._width = _width;
        _this._height = _height;
        _this.init = function () {
            var text = new createjs.Text('LINES', '240px "roboto"', '#ffffff');
            text.textAlign = 'center';
            text.textBaseline = 'middle';
            text.x = _this._width * .5;
            text.y = _this._height * .5;
            _this.addChild(text);
        };
        _this.init();
        return _this;
    }
    return Text;
}(createjs.Container));
export { Text };
//# sourceMappingURL=Text.js.map