import { Model } from "../Model";
var Sketch = (function () {
    function Sketch(_model, _id, _type) {
        var _this = this;
        this._model = _model;
        this.onStateChanged = function () {
            if (_this._model.id === _this._id) {
                _this.setup();
            }
            else {
                _this.dispose();
            }
        };
        this.setup = function () { };
        this.dispose = function () { };
        this.update = function () { };
        _model.addEventListener(Model.ON_STATE_CHANGED, this.onStateChanged);
        this._id = _id;
        this._type = _type;
    }
    Sketch.prototype.play = function () {
        if (this._type === 'canvas2D') {
            createjs.Ticker.addEventListener("tick", this.update);
        }
        else {
            this._timer = requestAnimationFrame(this.update);
        }
    };
    Sketch.prototype.pause = function () {
        if (this._type === 'canvas2D') {
            createjs.Ticker.removeEventListener("tick", this.update);
        }
        else {
            if (this._timer) {
                cancelAnimationFrame(this._timer);
                this._timer = 0;
            }
        }
    };
    Object.defineProperty(Sketch.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return Sketch;
}());
export { Sketch };
//# sourceMappingURL=Sketch.js.map