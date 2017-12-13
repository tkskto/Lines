import { Model } from '../../Model';
var Sketch = (function () {
    function Sketch(_model, _id, _type) {
        var _this = this;
        this._model = _model;
        this._isPlaying = false;
        this.onStateChanged = function () {
            if (_this._model.state === Model.SCENE_SKETCH) {
                if (_this._model.id === _this._id && !_this._isPlaying) {
                    _this.setup();
                }
                else if (_this._isPlaying) {
                    _this.dispose();
                }
            }
            else if (_this._model.state === Model.SCENE_TOP) {
                _this.dispose();
            }
        };
        this.setup = function () {
            throw new Error('please implement sub class');
        };
        this.dispose = function () {
            throw new Error('please implement sub class');
        };
        this.update = function () {
            throw new Error('please implement sub class');
        };
        _model.addEventListener(Model.ON_STATE_CHANGED, this.onStateChanged);
        this._id = _id;
        this._type = _type;
    }
    Sketch.prototype.replay = function () {
        this.dispose();
        this.play();
    };
    Sketch.prototype.play = function () {
        document.body.setAttribute('class', '');
        document.body.classList.add(this._type);
        if (this._type === 'canvas2D') {
            createjs.Ticker.addEventListener('tick', this.update);
        }
        else {
            this._timer = requestAnimationFrame(this.update);
        }
        this._isPlaying = true;
    };
    Sketch.prototype.pause = function () {
        if (this._type === 'canvas2D') {
            createjs.Ticker.removeEventListener('tick', this.update);
        }
        else {
            if (this._timer) {
                cancelAnimationFrame(this._timer);
                this._timer = 0;
            }
        }
        this._isPlaying = false;
    };
    Object.defineProperty(Sketch.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "timer", {
        get: function () {
            return this._timer;
        },
        enumerable: true,
        configurable: true
    });
    return Sketch;
}());
export { Sketch };
//# sourceMappingURL=Sketch.js.map