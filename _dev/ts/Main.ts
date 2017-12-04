import {Model} from './Model';
import {Item1} from "./sketch/01/Item";
import {Item2} from "./sketch/02/Item2";

(function(win:Window, doc:HTMLDocument) {
    'use strict';
    
    let _model:Model = Model.instance();
    let _canvas2d:HTMLCanvasElement;
    let _canvasGL:HTMLCanvasElement;
    let _ratio: number = window.devicePixelRatio;
    
    function init () {
        _canvas2d = doc.getElementById('myCanvas2d') as HTMLCanvasElement;
        _canvasGL = doc.getElementById('myCanvasGL') as HTMLCanvasElement;
        onResize();

        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        let sketch:NodeList = doc.querySelectorAll('.sketch');

        for (let i = 0, len = sketch.length; i < len; i++) {
            let id = sketch[i].attributes['id'].value;
            let type = sketch[i].attributes['data-sketch-type'].value;
            let _canvas = type === 'canvas2D' ? _canvas2d : type === 'webGL' ? _canvasGL : null;

            switch(id) {
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
        let hash = location.hash;
        if (hash) {
            _model.id = hash.split('#')[1];
        }
    }
    
    win.onload = function() {
        _model.setSize(
            win.innerWidth,
            win.innerHeight
        );
        
        init();
    };
    
})(window, document);