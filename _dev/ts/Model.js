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
import { EventDispatcher } from './events/EventDispatcher';
import { Vector } from './module/Vector';
var Model = (function (_super) {
    __extends(Model, _super);
    function Model() {
        var _this = _super.call(this) || this;
        _this._ratio = 1;
        _this._screen = { width: 0, height: 0 };
        _this._canvas = { width: 0, height: 0 };
        _this.setSize = function (_width, _height) {
            if (_width) {
                _this._screen.width = _width;
                _this._canvas.width = _width * _this._ratio;
            }
            if (_height) {
                _this._screen.height = _height;
                _this._canvas.height = _this._canvas.width * (_this.screen.height / _this.screen.width);
            }
            _this.dispatchEvent(Model.ON_RESIZE_EVENT);
        };
        _this._camPosition = new Vector(0.0, 0.0, 0.5);
        return _this;
    }
    Object.defineProperty(Model.prototype, "ratio", {
        get: function () {
            return this._ratio;
        },
        set: function (value) {
            this._ratio = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "screen", {
        get: function () {
            return this._screen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
            this.dispatchEvent(Model.ON_STATE_CHANGED);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            if (value) {
                this._id = value;
                this.state = Model.SCENE_SKETCH;
            }
            else {
                this.state = Model.SCENE_TOP;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "camPosition", {
        get: function () {
            return this._camPosition;
        },
        set: function (value) {
            this._camPosition = value;
            this.dispatchEvent(Model.ON_CAMERA_STATE_CHANGED);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "quote", {
        get: function () {
            return this._quote;
        },
        set: function (value) {
            this._quote = value;
            this.dispatchEvent(Model.ON_CHANGE_QUOTE_TEXT);
        },
        enumerable: true,
        configurable: true
    });
    Model.instance = function () {
        if (!Model._instance) {
            Model._instance = new Model();
        }
        return Model._instance;
    };
    Model.ON_RESIZE_EVENT = 'onResizeChanged';
    Model.ON_STATE_CHANGED = 'onStateChanged';
    Model.ON_CAMERA_STATE_CHANGED = 'onCameraStateChanged';
    Model.ON_CHANGE_QUOTE_TEXT = 'onChangeQuoteText';
    Model.SCENE_TOP = 'sceneTop';
    Model.SCENE_SKETCH = 'sceneSketch';
    return Model;
}(EventDispatcher));
export { Model };
//# sourceMappingURL=Model.js.map