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
import { Event, EventDispatcher } from '../events/EventDispatcher';
var ImageLoader = (function (_super) {
    __extends(ImageLoader, _super);
    function ImageLoader(_src) {
        var _this = _super.call(this) || this;
        _this._loadedCount = 0;
        _this._src = [];
        _this._img = [];
        _this.onFileLoaded = function (e) {
            var event = new Event();
            event.type = ImageLoader.IMAGE_LOADED;
            event.currentTarget = _this;
            _this.dispatchEvent(event);
            _this._loadedCount++;
            _this._img.push(e.target);
            if (_this._count === _this._loadedCount) {
                _this.onLoadComplete();
            }
        };
        _this.onLoadComplete = function () {
            _this.dispatchEvent(ImageLoader.LOAD_COMPLETE);
        };
        _this._src = _src;
        _this._count = _src.length;
        return _this;
    }
    ImageLoader.prototype.load = function () {
        this._loadedCount = 0;
        for (var i = 0; i < this._count; i++) {
            var img = new Image();
            img.onload = this.onFileLoaded;
            img.src = this._src[i];
        }
    };
    Object.defineProperty(ImageLoader.prototype, "img", {
        get: function () {
            return this._img;
        },
        enumerable: true,
        configurable: true
    });
    ImageLoader.IMAGE_LOADED = 'imageLoaded';
    ImageLoader.LOAD_COMPLETE = 'loadComplete';
    return ImageLoader;
}(EventDispatcher));
export { ImageLoader };
//# sourceMappingURL=ImageLoader.js.map