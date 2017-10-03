///<reference path="Model.ts"/>

(function(win:Window, doc:HTMLDocument) {
    'use strict';
    
    let _model:model.Model = model.Model.instance();
    
    function init () {
        let _canvas:HTMLCanvasElement = doc.getElementById('myCanvas') as HTMLCanvasElement;
        _canvas.width = _model.screen.width * .8;
        _canvas.height = _canvas.width * (_model.screen.height / _model.screen.width);
    }
    
    win.onload = function() {
        _model.setSize(
            win.innerWidth,
            win.innerHeight
        );
        
        init();
    }
    
})(window, document);