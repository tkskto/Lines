/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Model; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events_EventDispatcher__ = __webpack_require__(2);
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

var Model = (function (_super) {
    __extends(Model, _super);
    function Model() {
        var _this = _super.call(this) || this;
        _this._screen = { width: 0, height: 0 };
        _this.setSize = function (_width, _height) {
            if (_width) {
                _this._screen.width = _width;
            }
            if (_height) {
                _this._screen.height = _height;
            }
            _this.dispatchEvent(Model.ON_RESIZE_EVENT);
        };
        return _this;
    }
    Object.defineProperty(Model.prototype, "screen", {
        get: function () {
            return this._screen;
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
    Model.instance = function () {
        if (!Model._instance) {
            Model._instance = new Model();
        }
        return Model._instance;
    };
    Model.ON_RESIZE_EVENT = 'onResizeChanged';
    Model.ON_STATE_CHANGED = 'onStateChanged';
    Model.SCENE_TOP = 'sceneTop';
    Model.SCENE_SKETCH = 'sceneSketch';
    return Model;
}(__WEBPACK_IMPORTED_MODULE_0__events_EventDispatcher__["a" /* EventDispatcher */]));



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Model__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sketch_01_Item__ = __webpack_require__(3);


(function (win, doc) {
    'use strict';
    var _model = __WEBPACK_IMPORTED_MODULE_0__Model__["a" /* Model */].instance();
    var _canvas;
    function init() {
        _canvas = doc.getElementById('myCanvas');
        _canvas.width = _model.screen.width * .8;
        _canvas.height = _canvas.width * (_model.screen.height / _model.screen.width);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        var sketch = doc.querySelectorAll('.sketch');
        for (var i = 0, len = sketch.length; i < len; i++) {
            var id = sketch[i].attributes['id'].value;
            var type = sketch[i].attributes['data-sketch-type'].value;
            switch (id) {
                case '01':
                    var item = new __WEBPACK_IMPORTED_MODULE_1__sketch_01_Item__["a" /* Item1 */](_model, _canvas, id, type);
                    break;
                default:
                    throw new Error('please set id and data attribute "sketch-type"');
            }
        }
        window.addEventListener('hashchange', function () {
            var hash = location.hash;
            _model.id = hash.split('#')[1];
        });
        var hash = location.hash;
        if (hash) {
            _model.id = hash.split('#')[1];
        }
    }
    win.onload = function () {
        _model.setSize(win.innerWidth, win.innerHeight);
        init();
    };
})(window, document);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDispatcher; });
/* unused harmony export Event */
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.listeners = {};
    }
    EventDispatcher.prototype.dispatchEvent = function (event) {
        var e;
        var type;
        if (event instanceof Event) {
            type = event.type;
            e = event;
        }
        else {
            type = event;
            e = new Event(type);
        }
        if (this.listeners[type] != null) {
            e.currentTarget = this;
            for (var i = 0; i < this.listeners[type].length; i++) {
                var listener = this.listeners[type][i];
                try {
                    listener.handler(e);
                }
                catch (error) {
                    if (window.console) {
                        console.error(error.stack);
                    }
                }
            }
        }
    };
    EventDispatcher.prototype.addEventListener = function (type, callback, priority) {
        if (priority === void 0) { priority = 0; }
        if (this.listeners[type] == null) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(new EventListener(type, callback, priority));
        this.listeners[type].sort(function (listener1, listener2) {
            return listener2.priority - listener1.priority;
        });
    };
    EventDispatcher.prototype.removeEventListener = function (type, callback) {
        if (this.hasEventListener(type, callback)) {
            for (var i = 0; i < this.listeners[type].length; i++) {
                var listener = this.listeners[type][i];
                if (listener.equalCurrentListener(type, callback)) {
                    this.listeners[type].splice(i, 1);
                    return;
                }
            }
        }
    };
    EventDispatcher.prototype.clearEventListener = function () {
        this.listeners = {};
    };
    EventDispatcher.prototype.containEventListener = function (type) {
        if (this.listeners[type] == null)
            return false;
        return this.listeners[type].length > 0;
    };
    EventDispatcher.prototype.hasEventListener = function (type, callback) {
        if (this.listeners[type] == null)
            return false;
        for (var i = 0; i < this.listeners[type].length; i++) {
            var listener = this.listeners[type][i];
            if (listener.equalCurrentListener(type, callback)) {
                return true;
            }
        }
        return false;
    };
    return EventDispatcher;
}());

var EventListener = (function () {
    function EventListener(type, handler, priority) {
        if (type === void 0) { type = ''; }
        if (priority === void 0) { priority = 0; }
        this.type = type;
        this.handler = handler;
        this.priority = priority;
    }
    EventListener.prototype.equalCurrentListener = function (type, handler) {
        return this.type == type && this.handler == handler;
    };
    return EventListener;
}());
var Event = (function () {
    function Event(type, value) {
        if (type === void 0) { type = ''; }
        if (value === void 0) { value = null; }
        this.type = type;
        this.value = value;
    }
    return Event;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item1; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sketch__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_Text__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Lines__ = __webpack_require__(6);
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



var Item1 = (function (_super) {
    __extends(Item1, _super);
    function Item1(_model, _canvas, id, type) {
        var _this = _super.call(this, _model, id, type) || this;
        _this._model = _model;
        _this._canvas = _canvas;
        _this.setup = function () {
            _this._stage = new createjs.Stage(_this._canvas);
            _this._ctx = _this._canvas.getContext('2d');
            _this._lines = new __WEBPACK_IMPORTED_MODULE_2__Lines__["a" /* Lines */](_this._canvas.width, _this._canvas.height);
            _this._stage.addChild(_this._lines);
            var _text = new __WEBPACK_IMPORTED_MODULE_1__module_Text__["a" /* Text */](_this._canvas.width, _this._canvas.height);
            _this._stage.addChild(_text);
            _this._stage.mouseEnabled = false;
            _this.play();
        };
        _this.dispose = function () {
        };
        _this.update = function () {
            _this.animate();
        };
        _this.animate = function () {
            _this._lines.update();
            _this._stage.update();
            if (_this._lines.endFlg) {
                createjs.Ticker.removeEventListener("tick", _this.update);
            }
        };
        return _this;
    }
    return Item1;
}(__WEBPACK_IMPORTED_MODULE_0__Sketch__["a" /* Sketch */]));



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sketch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Model__ = __webpack_require__(0);

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
        _model.addEventListener(__WEBPACK_IMPORTED_MODULE_0__Model__["a" /* Model */].ON_STATE_CHANGED, this.onStateChanged);
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



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Text; });
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
            var text = new createjs.Text('WORKS', '240px "roboto"', '#ffffff');
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



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Lines; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Line__ = __webpack_require__(7);
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
                var _line = new __WEBPACK_IMPORTED_MODULE_0__Line__["a" /* Line */](i, _this._lineNum, _this.SPACE, _this._height, 3000);
                _this._arr.push(_line);
                _this.addChild(_line);
            }
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



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Line; });
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



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map