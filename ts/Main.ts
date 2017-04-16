///<reference path="typings/index.d.ts"/>
///<reference path="Model.ts"/>
///<reference path="canvas/Controller.ts"/>
///<reference path="WebGL/Controller.ts"/>

(function(win:Window, doc:HTMLDocument) {
    'use strict';
    
    let _model:model.Model = model.Model.instance();
    
    function init () {
        let _canvas:HTMLCanvasElement = doc.getElementById('myCanvas') as HTMLCanvasElement;
        _canvas.width = _model.screen.width * .8;
        _canvas.height = _canvas.width * (_model.screen.height / _model.screen.width);
        
        let hash:string = win.location.hash;
        let mode:string = 'canvas';
    
        if(hash && hash.length > 1) {
            mode = hash.replace('#', '');
        }
        
        let controller:common.IController;
    
        if(mode === 'canvas') {
            controller = new canvas.Controller(_canvas);
        } else if(mode === 'WebGL') {
            controller = new gl.Controller(_canvas);
        } else {
            throw new Error('please check if your hash matches "canvas" or "WebGL"');
        }
        
        controller.play();
    }
    
    win.onload = function() {
        _model.setSize(
            win.innerWidth,
            win.innerHeight
        );
        
        init();
    }
    
})(window, document);