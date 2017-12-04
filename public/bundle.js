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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Methods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GLUtils; });
/* unused harmony export MatrixUtils */
/* unused harmony export VectorUtils */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Config__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_Vector__ = __webpack_require__(13);


var Methods = (function () {
    function Methods() {
    }
    Methods.showError = function (err) {
        if (err === void 0) { err = null; }
        console.log(err || 'error');
    };
    Methods.getRandomNumber = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    Methods.hsv2RGB = function (hue, saturation, value, alpha) {
        if (saturation > 100 || value > 100 || alpha > 100) {
            return;
        }
        var color = [];
        saturation = saturation / 100;
        value = value / 100;
        if (saturation === 0) {
            color.push(value, value, value, alpha);
        }
        else {
            var th = hue % 360;
            var i = Math.floor(th / 60);
            var f = th / 60 - i;
            var m = value * (1 - saturation);
            var n = value * (1 - saturation * f);
            var k = value * (1 - saturation * (1 - f));
            var r = [value, n, m, m, k, value];
            var g = [k, value, value, n, m, m];
            var b = [m, m, k, value, value, n];
            color.push(r[i], g[i], b[i], alpha);
        }
        return color;
    };
    return Methods;
}());

var GLUtils = (function () {
    function GLUtils() {
    }
    GLUtils.createVertexShader = function (script, gl) {
        var shader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(shader, script);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }
        else {
            Methods.showError(gl.getShaderInfoLog(shader));
        }
    };
    GLUtils.createFragmentShader = function (script, gl) {
        var shader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(shader, script);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }
        else {
            Methods.showError(gl.getShaderInfoLog(shader));
        }
    };
    GLUtils.createProgram = function (gl, vs, fs) {
        var program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.useProgram(program);
            return program;
        }
        else {
            Methods.showError(gl.getProgramInfoLog(program));
        }
    };
    GLUtils.createVBO = function (gl, data) {
        var vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return vbo;
    };
    GLUtils.createIBO = function (gl, data) {
        var ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        return ibo;
    };
    GLUtils.setAttr = function (gl, vbo, attl, atts) {
        for (var i = 0; i < vbo.length; i++) {
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
            gl.enableVertexAttribArray(attl[i]);
            gl.vertexAttribPointer(attl[i], atts[i], gl.FLOAT, false, 0, 0);
        }
    };
    GLUtils.createFrameBuffer = function (gl, _width, _height) {
        var frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        var depthRenderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRenderBuffer);
        var fTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, fTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fTexture, 0);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return { frameBuffer: frameBuffer, depthBuffer: depthRenderBuffer, texture: fTexture };
    };
    GLUtils.setUniform = function (gl, _uniTypes, _uniLocation, _values) {
        for (var i = 0; i < _uniTypes.length; i++) {
            switch (_uniTypes[i]) {
                case __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* GLConfig */].UNIFORM_TYPE_MATRIX4:
                    gl.uniformMatrix4fv(_uniLocation[i], false, _values[i]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* GLConfig */].UNIFORM_TYPE_VECTOR4:
                    gl.uniform4fv(_uniLocation[i], _values[i]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* GLConfig */].UNIFORM_TYPE_VECTOR3:
                    gl.uniform3fv(_uniLocation[i], _values[i]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* GLConfig */].UNIFORM_TYPE_VECTOR2:
                    gl.uniform2fv(_uniLocation[i], _values[i]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* GLConfig */].UNIFORM_TYPE_VECTOR1:
                    gl.uniform1fv(_uniLocation[i], _values[i]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* GLConfig */].UNIFORM_TYPE_FLOAT:
                    gl.uniform1f(_uniLocation[i], _values[i]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* GLConfig */].UNIFORM_TYPE_INT_VECTOR:
                    gl.uniform1iv(_uniLocation[i], _values[i]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* GLConfig */].UNIFORM_TYPE_INT:
                    gl.uniform1i(_uniLocation[i], _values[i]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* GLConfig */].UNIFORM_TYPE_MATRIX3:
                    gl.uniformMatrix3fv(_uniLocation[i], false, _values[i]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* GLConfig */].UNIFORM_TYPE_MATRIX2:
                    gl.uniformMatrix2fv(_uniLocation[i], false, _values[i]);
                    break;
                default:
                    Methods.showError("unknown uniform types");
                    break;
            }
        }
    };
    return GLUtils;
}());

var MatrixUtils = (function () {
    function MatrixUtils() {
    }
    MatrixUtils.create = function () {
        return new Float32Array(16);
    };
    MatrixUtils.initialize = function (_mat) {
        _mat[0] = 1;
        _mat[1] = 0;
        _mat[2] = 0;
        _mat[3] = 0;
        _mat[4] = 0;
        _mat[5] = 1;
        _mat[6] = 0;
        _mat[7] = 0;
        _mat[8] = 0;
        _mat[9] = 0;
        _mat[10] = 1;
        _mat[11] = 0;
        _mat[12] = 0;
        _mat[13] = 0;
        _mat[14] = 0;
        _mat[15] = 1;
        return _mat;
    };
    MatrixUtils.multiply = function (_mat1, _mat2, _dist) {
        if (_dist === void 0) { _dist = MatrixUtils.initialize(new Float32Array(16)); }
        var a = _mat1[0], b = _mat1[1], c = _mat1[2], d = _mat1[3], e = _mat1[4], f = _mat1[5], g = _mat1[6], h = _mat1[7], i = _mat1[8], j = _mat1[9], k = _mat1[10], l = _mat1[11], m = _mat1[12], n = _mat1[13], o = _mat1[14], p = _mat1[15], A = _mat2[0], B = _mat2[1], C = _mat2[2], D = _mat2[3], E = _mat2[4], F = _mat2[5], G = _mat2[6], H = _mat2[7], I = _mat2[8], J = _mat2[9], K = _mat2[10], L = _mat2[11], M = _mat2[12], N = _mat2[13], O = _mat2[14], P = _mat2[15];
        _dist[0] = A * a + B * e + C * i + D * m;
        _dist[1] = A * b + B * f + C * j + D * n;
        _dist[2] = A * c + B * g + C * k + D * o;
        _dist[3] = A * d + B * h + C * l + D * p;
        _dist[4] = E * a + F * e + G * i + H * m;
        _dist[5] = E * b + F * f + G * j + H * n;
        _dist[6] = E * c + F * g + G * k + H * o;
        _dist[7] = E * d + F * h + G * l + H * p;
        _dist[8] = I * a + J * e + K * i + L * m;
        _dist[9] = I * b + J * f + K * j + L * n;
        _dist[10] = I * c + J * g + K * k + L * o;
        _dist[11] = I * d + J * h + K * l + L * p;
        _dist[12] = M * a + N * e + O * i + P * m;
        _dist[13] = M * b + N * f + O * j + P * n;
        _dist[14] = M * c + N * g + O * k + P * o;
        _dist[15] = M * d + N * h + O * l + P * p;
        return _dist;
    };
    MatrixUtils.lookAt = function (_targetPos, _cameraPos, _cameraUp, _dist) {
        if (_targetPos.x === _cameraPos.x && _targetPos.y === _cameraPos.y && _targetPos.z === _cameraPos.z) {
            return MatrixUtils.initialize(_dist);
        }
        var vecZ = _targetPos.subtract(_cameraPos).normalize();
        var vecX = _cameraUp.cross(vecZ).normalize();
        var vecY = vecZ.cross(vecX).normalize();
        _dist[0] = vecX.x;
        _dist[1] = vecY.x;
        _dist[2] = vecZ.x;
        _dist[3] = 0;
        _dist[4] = vecX.y;
        _dist[5] = vecY.y;
        _dist[6] = vecZ.y;
        _dist[7] = 0;
        _dist[8] = vecX.z;
        _dist[9] = vecY.z;
        _dist[10] = vecZ.z;
        _dist[11] = 0;
        _dist[12] = -(vecX.x * _targetPos.x + vecX.y * _targetPos.y + vecX.z * _targetPos.z);
        _dist[13] = -(vecY.x * _targetPos.x + vecY.y * _targetPos.y + vecY.z * _targetPos.z);
        _dist[14] = -(vecZ.x * _targetPos.x + vecZ.y * _targetPos.y + vecZ.z * _targetPos.z);
        _dist[15] = 1;
        return _dist;
    };
    MatrixUtils.perspective = function (_fov, _aspect, _near, _far, _dist) {
        var t = _near * Math.tan(_fov * Math.PI / 360);
        var r = t * _aspect;
        var a = r * 2, b = t * 2, c = _far - _near;
        _dist[0] = _near * 2 / a;
        _dist[1] = 0;
        _dist[2] = 0;
        _dist[3] = 0;
        _dist[4] = 0;
        _dist[5] = _near * 2 / b;
        _dist[6] = 0;
        _dist[7] = 0;
        _dist[8] = 0;
        _dist[9] = 0;
        _dist[10] = -(_far + _near) / c;
        _dist[11] = -1;
        _dist[12] = 0;
        _dist[13] = 0;
        _dist[14] = -(_far * _near * 2) / c;
        _dist[15] = 0;
        return _dist;
    };
    return MatrixUtils;
}());

var VectorUtils = (function () {
    function VectorUtils() {
    }
    VectorUtils.getFaceNormalArr = function (_vertexArr, _indexArr) {
        var i, len = _vertexArr.length / 3;
        var distArr = [];
        for (i = 0; i < len; i++) {
            var _index1 = _indexArr[i] * 3;
            var _index2 = _indexArr[i] * 3;
            var _index3 = _indexArr[i] * 3;
            var _vec1 = new __WEBPACK_IMPORTED_MODULE_1__module_Vector__["a" /* Vector */](_vertexArr[_index1], _vertexArr[_index1 + 1], _vertexArr[_index1 + 2]);
            var _vec2 = new __WEBPACK_IMPORTED_MODULE_1__module_Vector__["a" /* Vector */](_vertexArr[_index2], _vertexArr[_index2 + 1], _vertexArr[_index2 + 2]);
            var _vec3 = new __WEBPACK_IMPORTED_MODULE_1__module_Vector__["a" /* Vector */](_vertexArr[_index3], _vertexArr[_index3 + 1], _vertexArr[_index3 + 2]);
            var v1 = _vec2.subtract(_vec1).normalize();
            var v2 = _vec3.subtract(_vec1).normalize();
            distArr[i * 3] = v1.y * v2.z - v1.z * v2.y;
            distArr[i * 3 + 1] = v1.z * v2.x - v1.x * v2.z;
            distArr[i * 3 + 2] = v1.x * v2.y - v1.y * v2.x;
        }
        return distArr;
    };
    VectorUtils.getFaceNormalVector = function (_vec1, _vec2, _vec3) {
        var dist = new __WEBPACK_IMPORTED_MODULE_1__module_Vector__["a" /* Vector */]();
        var v1 = _vec2.subtract(_vec1).normalize();
        var v2 = _vec3.subtract(_vec1).normalize();
        dist.x = v1.y * v2.z - v1.z * v2.y;
        dist.y = v1.z * v2.x - v1.x * v2.z;
        dist.z = v1.x * v2.y - v1.y * v2.x;
        return dist;
    };
    return VectorUtils;
}());



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Model; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events_EventDispatcher__ = __webpack_require__(4);
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sketch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Model__ = __webpack_require__(1);

var Sketch = (function () {
    function Sketch(_model, _id, _type) {
        var _this = this;
        this._model = _model;
        this._isPlaying = false;
        this.onStateChanged = function () {
            if (_this._model.id === _this._id && !_this._isPlaying) {
                _this.setup();
            }
            else if (_this._isPlaying) {
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
    Sketch.prototype.replay = function () {
        this.dispose();
        this.play();
    };
    Sketch.prototype.play = function () {
        document.body.classList.add(this._type);
        if (this._type === 'canvas2D') {
            createjs.Ticker.addEventListener("tick", this.update);
        }
        else {
            this._timer = requestAnimationFrame(this.update);
        }
        this._isPlaying = true;
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



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Model__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sketch_01_Item__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sketch_02_Item2__ = __webpack_require__(9);



(function (win, doc) {
    'use strict';
    var _model = __WEBPACK_IMPORTED_MODULE_0__Model__["a" /* Model */].instance();
    var _canvas2d;
    var _canvasGL;
    var _ratio = window.devicePixelRatio;
    function init() {
        _canvas2d = doc.getElementById('myCanvas2d');
        _canvasGL = doc.getElementById('myCanvasGL');
        onResize();
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        var sketch = doc.querySelectorAll('.sketch');
        for (var i = 0, len = sketch.length; i < len; i++) {
            var id = sketch[i].attributes['id'].value;
            var type = sketch[i].attributes['data-sketch-type'].value;
            var _canvas = type === 'canvas2D' ? _canvas2d : type === 'webGL' ? _canvasGL : null;
            switch (id) {
                case '01':
                    new __WEBPACK_IMPORTED_MODULE_1__sketch_01_Item__["a" /* Item1 */](_model, _canvas, id, type);
                    break;
                case '02':
                    new __WEBPACK_IMPORTED_MODULE_2__sketch_02_Item2__["a" /* Item2 */](_model, _canvas, id, type);
                    break;
                case '03':
                    new __WEBPACK_IMPORTED_MODULE_1__sketch_01_Item__["a" /* Item1 */](_model, _canvas, id, type);
                    break;
                default:
                    throw new Error('please set id and data attribute "sketch-type"');
            }
        }
        window.addEventListener('hashchange', onHashChange);
        _model.addEventListener(__WEBPACK_IMPORTED_MODULE_0__Model__["a" /* Model */].ON_RESIZE_EVENT, onResize);
        onHashChange();
    }
    function onResize() {
        _canvas2d.width = _model.screen.width * _ratio * .8;
        _canvas2d.height = _canvas2d.width * (_model.screen.height / _model.screen.width);
        _canvas2d.style.width = _canvas2d.width / _ratio + 'px';
        _canvas2d.style.height = _canvas2d.height / _ratio + 'px';
        _canvasGL.width = _model.screen.width * _ratio * 0.8;
        _canvasGL.height = _canvasGL.width * (_model.screen.height / _model.screen.width);
        _canvasGL.style.width = _canvasGL.width / _ratio + 'px';
        _canvasGL.style.height = _canvasGL.height / _ratio + 'px';
    }
    function onHashChange() {
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
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item1; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sketch__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_Text__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Lines__ = __webpack_require__(7);
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
            _this.pause();
            _this._lines.reset();
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
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Lines; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Line__ = __webpack_require__(8);
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



/***/ }),
/* 8 */
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



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item2; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sketch__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Shader__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__module_Context__ = __webpack_require__(14);
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




var Item2 = (function (_super) {
    __extends(Item2, _super);
    function Item2(_model, _canvas, _id, _type) {
        var _this = _super.call(this, _model, _id, _type) || this;
        _this._canvas = _canvas;
        _this.setup = function () {
            _this._ctx = new __WEBPACK_IMPORTED_MODULE_3__module_Context__["a" /* WebGLContext */](_this._model, _this._canvas);
            _this._gl = _this._ctx.ctx;
            _this._normalShader = new __WEBPACK_IMPORTED_MODULE_1__Shader__["b" /* NormalShader */](_this._gl);
            _this._canvasShader = new __WEBPACK_IMPORTED_MODULE_1__Shader__["a" /* CanvasShader */](_this._gl);
            _this._normal = __WEBPACK_IMPORTED_MODULE_2__utils_Utils__["a" /* GLUtils */].createProgram(_this._gl, _this._normalShader.VS, _this._normalShader.FS);
            _this.clear();
            _this._gl.viewport(0, 0, _this._canvas.width, _this._canvas.height);
            _this.play();
        };
        _this.clear = function () {
            _this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
            _this._gl.clearDepth(1.0);
            _this._gl.clear(_this._gl.COLOR_BUFFER_BIT | _this._gl.DEPTH_BUFFER_BIT);
        };
        _this.dispose = function () {
            _this.pause();
        };
        _this.update = function () {
            _this.animate();
            _this._timer = requestAnimationFrame(_this.update);
        };
        _this.animate = function () {
        };
        return _this;
    }
    return Item2;
}(__WEBPACK_IMPORTED_MODULE_0__Sketch__["a" /* Sketch */]));



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NormalShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanvasShader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_Shader__ = __webpack_require__(11);
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

var NormalShader = (function (_super) {
    __extends(NormalShader, _super);
    function NormalShader(_gl) {
        var _this = _super.call(this, _gl, [
            'attribute vec3 position;',
            'attribute vec2 texCoord;',
            'uniform mat4 mvpMatrix;',
            'varying vec2 vTexCoord;',
            'void main(void){',
            'vTexCoord = texCoord;',
            'gl_Position  = mvpMatrix * vec4(position, 1.0);',
            '}'
        ].join(''), [
            'precision mediump float;',
            'uniform sampler2D texture;',
            'uniform vec2 resolution;',
            'varying vec2 vTexCoord;',
            'const float RED   = 0.298912;',
            'const float GREEN = 0.586611;',
            'const float BLUE  = 0.114478;',
            'vec3  monochromeScale = vec3(RED, GREEN, BLUE);',
            'void main(void){',
            'float x = gl_FragCoord.x / resolution.x;',
            'float y = gl_FragCoord.y / resolution.y;',
            'float minW = 1.0 / resolution.x;',
            'float minH = 1.0 / resolution.y;',
            'vec2 left = vec2(x - minW < 0.0 ? 1.0 : x - minW , y);',
            'vec2 top = vec2(x, y + minH > 1.0 ? 0.0 : y + minH);',
            'vec2 right = vec2(x + minW > 1.0 ? 0.0 : x + minW, y);',
            'vec2 bottom = vec2(x, y - minH < 0.0 ? 1.0 : y - minH);',
            'vec4 leftColor = texture2D(texture, left);',
            'vec4 topColor = texture2D(texture, top);',
            'vec4 rightColor = texture2D(texture, right);',
            'vec4 bottomColor = texture2D(texture, bottom);',
            'float nLeft = dot(leftColor.rgb, monochromeScale);',
            'float nTop = dot(topColor.rgb, monochromeScale);',
            'float nRight = dot(rightColor.rgb, monochromeScale);',
            'float nBottom = dot(bottomColor.rgb, monochromeScale);',
            'float m = (nRight - nLeft) * 0.5;',
            'float o = (nBottom - nTop) * 0.5;',
            'vec3 dyx = vec3(0.0,  m,  0.1);',
            'vec3 dyz = vec3(0.1, -o,  0.0);',
            'vec3 dest = normalize(cross(dyx, dyz));',
            'vec4 smpColor = vec4((dest.z + 1.0) * 0.5, (dest.x + 1.0) * 0.5, (dest.y + 1.0) * 0.5, 1.0);',
            'gl_FragColor  = smpColor;',
            '}'
        ].join('')) || this;
        _this.compile();
        return _this;
    }
    return NormalShader;
}(__WEBPACK_IMPORTED_MODULE_0__module_Shader__["a" /* Shader */]));

var CanvasShader = (function (_super) {
    __extends(CanvasShader, _super);
    function CanvasShader(_gl) {
        var _this = _super.call(this, _gl, [
            'attribute vec3 position;',
            'attribute vec3 normal;',
            'attribute vec4 color;',
            'attribute vec2 texCoord;',
            'uniform   mat4 mMatrix;',
            'uniform   mat4 mvpMatrix;',
            'uniform   mat4 invMatrix;',
            'uniform   vec3 lightPosition;',
            'uniform   vec3 eyePosition;',
            'varying   vec4 vColor;',
            'varying   vec3 vEyeDirection;',
            'varying   vec3 vLightDirection;',
            'varying   vec2 vTexCoord;',
            'void main(void){',
            'vec3 pos      = (mMatrix * vec4(position, 0.0)).xyz;',
            'vec3 invEye   = (invMatrix * vec4(eyePosition, 0.0)).xyz;',
            'vec3 invLight = (invMatrix * vec4(lightPosition, 0.0)).xyz;',
            'vec3 eye      = invEye - pos;',
            'vec3 light    = invLight - pos;',
            'vec3 n = normalize(normal);',
            'vec3 t = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));',
            'vec3 b = cross(n, t);',
            'vEyeDirection.x   = dot(t, eye);',
            'vEyeDirection.y   = dot(b, eye);',
            'vEyeDirection.z   = dot(n, eye);',
            'normalize(vEyeDirection);',
            'vLightDirection.x = dot(t, light);',
            'vLightDirection.y = dot(b, light);',
            'vLightDirection.z = dot(n, light);',
            'normalize(vLightDirection);',
            'vColor         = color;',
            'vTexCoord  = texCoord;',
            'gl_Position    = mvpMatrix * vec4(position, 1.0);',
            '}'
        ].join(''), [
            'precision mediump float;',
            'uniform sampler2D texture;',
            'uniform int bumpFlg;',
            'varying vec4 vColor;',
            'varying vec2 vTexCoord;',
            'varying vec3 vEyeDirection;',
            'varying vec3 vLightDirection;',
            'void main(void){',
            'vec4  destColor = vec4(0.0);',
            'if(bool(bumpFlg)) {',
            'vec3 mNormal    = (texture2D(texture, vTexCoord) * 2.0 - 1.0).rgb;',
            'vec3 light      = normalize(vLightDirection);',
            'vec3 eye        = normalize(vEyeDirection);',
            'vec3 halfLE     = normalize(light + eye);',
            'float diffuse   = clamp(dot(mNormal, light), 0.1, 1.0);',
            'float specular  = pow(clamp(dot(mNormal, halfLE), 0.0, 1.0), 100.0);',
            'destColor = vColor * vec4(vec3(diffuse), 1.0) + vec4(vec3(specular), 1.0);',
            '} else {',
            'destColor = texture2D(texture, vTexCoord);',
            '}',
            'gl_FragColor = destColor;',
            '}'
        ].join('')) || this;
        _this.compile();
        return _this;
    }
    return CanvasShader;
}(__WEBPACK_IMPORTED_MODULE_0__module_Shader__["a" /* Shader */]));



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Shader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils__ = __webpack_require__(0);

var Shader = (function () {
    function Shader(_gl, _vs, _fs) {
        var _this = this;
        this._gl = _gl;
        this.compile = function () {
            _this._VS = __WEBPACK_IMPORTED_MODULE_0__utils_Utils__["a" /* GLUtils */].createVertexShader(_this._vertexString, _this._gl);
            _this._FS = __WEBPACK_IMPORTED_MODULE_0__utils_Utils__["a" /* GLUtils */].createFragmentShader(_this._fragmentString, _this._gl);
        };
        this._vertexString = _vs;
        this._fragmentString = _fs;
    }
    Object.defineProperty(Shader.prototype, "VS", {
        get: function () {
            return this._VS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "FS", {
        get: function () {
            return this._FS;
        },
        enumerable: true,
        configurable: true
    });
    return Shader;
}());



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AppConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GLConfig; });
var AppConfig = (function () {
    function AppConfig() {
    }
    return AppConfig;
}());

var GLConfig = (function () {
    function GLConfig() {
    }
    GLConfig.UNIFORM_TYPE_MATRIX4 = 'matrix4fv';
    GLConfig.UNIFORM_TYPE_MATRIX3 = 'matrix3fv';
    GLConfig.UNIFORM_TYPE_MATRIX2 = 'matrix2fv';
    GLConfig.UNIFORM_TYPE_VECTOR4 = '4fv';
    GLConfig.UNIFORM_TYPE_VECTOR3 = '3fv';
    GLConfig.UNIFORM_TYPE_VECTOR2 = '2fv';
    GLConfig.UNIFORM_TYPE_VECTOR1 = '1fv';
    GLConfig.UNIFORM_TYPE_FLOAT = '1f';
    GLConfig.UNIFORM_TYPE_INT_VECTOR = '1iv';
    GLConfig.UNIFORM_TYPE_INT = '1i';
    return GLConfig;
}());



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vector; });
var Vector = (function () {
    function Vector(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        var _this = this;
        this.initialize = function () {
            _this._x = 0;
            _this._y = 0;
            _this._z = 0;
            return _this;
        };
        this.normalize = function () {
            var len = _this.length;
            if (!len) {
                _this._x = _this._y = _this._z = 0;
            }
            else {
                len = 1 / len;
                _this._x *= len;
                _this._y *= len;
                _this._z *= len;
            }
            return _this;
        };
        this.add = function (_vec) {
            var dist = new Vector();
            dist.x = _this._x + _vec.x;
            dist.y = _this._y + _vec.y;
            dist.z = _this._z + _vec.z;
            return dist;
        };
        this.subtract = function (_vec) {
            var dist = new Vector();
            dist.x = _this._x - _vec.x;
            dist.y = _this._y - _vec.y;
            dist.z = _this._z - _vec.z;
            return dist;
        };
        this.dot = function (_vec) {
            return _this._x * _vec.x + _this._y * _vec.y + _this._z * _vec.z;
        };
        this.cross = function (_vec) {
            var dist = new Vector();
            dist.x = _this._y * _vec.z - _this._z * _vec.y;
            dist.y = _this._z * _vec.x - _this._x * _vec.z;
            dist.z = _this._x * _vec.y - _this._y * _vec.x;
            return dist;
        };
        this.rot = function (_vec) {
            var dot = _this.dot(_vec);
            return Math.acos(dot) * 180 / Math.PI;
        };
        this._x = x;
        this._y = y;
        this._z = z;
    }
    Object.defineProperty(Vector.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (val) {
            this._x = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (val) {
            this._y = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (val) {
            this._z = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "pos", {
        get: function () {
            return [this._x, this._y, this._z];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "length", {
        get: function () {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
        },
        enumerable: true,
        configurable: true
    });
    return Vector;
}());



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebGLContext; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils__ = __webpack_require__(0);

var WebGLContext = (function () {
    function WebGLContext(_model, _canvas) {
        var _this = this;
        this._model = _model;
        this.init = function () {
            _this._ctx = _this._canvas.getContext('webgl');
            if (!_this._ctx) {
                __WEBPACK_IMPORTED_MODULE_0__utils_Utils__["b" /* Methods */].showError('Browser dose not support WebGL.');
            }
            _this._extVAO = _this._ctx.getExtension('OES_vertex_array_object');
            if (!_this._extVAO) {
                alert('vertex array object not supported');
                return;
            }
        };
        this._ratio = window.devicePixelRatio;
        this._canvas = _canvas;
        this.init();
    }
    Object.defineProperty(WebGLContext.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLContext.prototype, "ctx", {
        get: function () {
            return this._ctx;
        },
        enumerable: true,
        configurable: true
    });
    return WebGLContext;
}());



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map