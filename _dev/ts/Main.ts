import { Model } from './Model';
import { Item1 } from './sketch/01/Item';
import { Item2 } from './sketch/02/Item2';
import {Item3} from "./sketch/03/Item3";
import {Item4} from './sketch/04/Item4';
import {AppConfig} from './Config';

((win: Window, doc: HTMLDocument) => {
    'use strict';

    const _model: Model = Model.instance();
    let _canvas2d: HTMLCanvasElement;
    let _canvasGL: HTMLCanvasElement;
    _model.ratio = window.devicePixelRatio;

    function init () {
        _canvas2d = doc.getElementById('myCanvas2d') as HTMLCanvasElement;
        _canvasGL = doc.getElementById('myCanvasGL') as HTMLCanvasElement;
        onResize();

        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        const sketch: NodeList = doc.querySelectorAll('.sketch');

        for (let i = 0, len = sketch.length; i < len; i++) {
            const id = sketch[i].attributes.getNamedItem('id').value;
            const type = sketch[i].attributes['data-sketch-type'].value;
            const _canvas = type === AppConfig.NAME_TYPE_CANVAS2D ? _canvas2d : type === AppConfig.NAME_TYPE_WEBGL ? _canvasGL : undefined;

            if (!_canvas) {
                throw new Error('id: ' + id + 'のdata-sketch-typeが指定されていません。');
            }

            switch (id) {
                case '01':
                    new Item1(_model, _canvas, id, type);
                    break;
                case '02':
                    new Item2(_model, _canvas, id, type);
                    break;
                case '03':
                    new Item3(_model, _canvas, id, type);
                    break;
                case '04':
                    new Item4(_model, _canvas, id, type);
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
        _canvas2d.width = _model.canvas.width;
        _canvas2d.height = _model.canvas.height;
        _canvas2d.style.width = _model.canvas.width / _model.ratio + 'px';
        _canvas2d.style.height = _model.canvas.height / _model.ratio + 'px';

        _canvasGL.width = _model.canvas.width;
        _canvasGL.height = _model.canvas.height;
        _canvasGL.style.width = _model.canvas.width / _model.ratio + 'px';
        _canvasGL.style.height = _model.canvas.height / _model.ratio + 'px';
    }

    function onHashChange() {
        _model.id = location.hash.split('#')[1];
    }

    win.onload = () => {
        _model.setSize(
            win.innerWidth,
            win.innerHeight
        );

        init();
    };

    doc.addEventListener('keydown', (e) => {
        if (27 === e.keyCode) {
            location.hash = '';
        }
    });

})(window, document);