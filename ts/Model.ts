///<reference path="events/EventDispatcher.ts"/>


module model {
    export class Model extends events.EventDispatcher {

        private static _instance:Model;
    
        private constructor() {
            super();
        }
        
        public static instance = ():Model => {
            if(!Model._instance) {
                Model._instance = new Model();
            }
            
            return Model._instance;
        };
        
        public static ON_RESIZE_EVENT:string = 'onResizeChanged';
        public static ON_STATE_CHANGED:string = 'onStateChanged';
        
        private _screen:{width:number,height:number} = {width:0,height:0};
        
        public setSize = (_width:number, _height:number) => {
            if(_width) {
                this._screen.width = _width;
            }
            
            if(_height) {
                this._screen.height = _height;
            }
            
            this.dispatchEvent(Model.ON_RESIZE_EVENT);
        };
        
        public get screen():{width:number, height:number} {
            return this._screen;
        }

        public static SCENE_TOP:string = 'sceneTop';
        public static SCENE_SKETCH:string = 'sceneSketch';

        private _state:string;
    
        get state(): string {
            return this._state;
        }
    
        set state(value: string) {
            this._state = value;
            this.dispatchEvent(Model.ON_STATE_CHANGED);
        }

        private _id:string;

        get id(): string {
            return this._id;
        }

        set id(value: string) {
            if (value) {
                this._id = value;
                this.state = Model.SCENE_SKETCH;
            } else {
                this.state = Model.SCENE_TOP;
            }
        }
    }
}