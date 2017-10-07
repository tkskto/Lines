import { Model } from './Model';
import { Item1 } from "./sketch/01/Item";
(function (win, doc) {
    'use strict';
    var _model = Model.instance();
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
                    var item = new Item1(_model, _canvas, id, type);
                    break;
                default:
                    throw new Error('please set id and data attribute "sketch-type"');
            }
        }
        window.addEventListener('hashchange', onHashChange);
        onHashChange();
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