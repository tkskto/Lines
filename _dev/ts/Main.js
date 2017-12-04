import { Model } from './Model';
import { Item1 } from "./sketch/01/Item";
import { Item2 } from "./sketch/02/Item2";
(function (win, doc) {
    'use strict';
    var _model = Model.instance();
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
                    new Item1(_model, _canvas, id, type);
                    break;
                case '02':
                    new Item2(_model, _canvas, id, type);
                    break;
                case '03':
                    new Item1(_model, _canvas, id, type);
                    break;
                default:
                    throw new Error('please set id and data attribute "sketch-type"');
            }
        }
        window.addEventListener('hashchange', onHashChange);
        _model.addEventListener(Model.ON_RESIZE_EVENT, onResize);
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
//# sourceMappingURL=Main.js.map