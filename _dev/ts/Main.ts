import {Model} from './Model';
import {Item1} from "./sketch/01/Item";

(function(win:Window, doc:HTMLDocument) {
    'use strict';
    
    let _model:Model = Model.instance();
    let _canvas:HTMLCanvasElement;
    
    function init () {
        _canvas = doc.getElementById('myCanvas') as HTMLCanvasElement;
        _canvas.width = _model.screen.width * .8;
        _canvas.height = _canvas.width * (_model.screen.height / _model.screen.width);

        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        let sketch:NodeList = doc.querySelectorAll('.sketch');

        for (let i = 0, len = sketch.length; i < len; i++) {
            let id = sketch[i].attributes['id'].value;
            let type = sketch[i].attributes['data-sketch-type'].value;

            switch(id) {
                case '01':
                    let item = new Item1(_model, _canvas, id, type);
                    break;
                default:
                    throw new Error('please set id and data attribute "sketch-type"');
            }
        }

        window.addEventListener('hashchange', function () {
            let hash = location.hash;
            _model.id = hash.split('#')[1];
        });

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