import { EventDispatcher } from './events/EventDispatcher';
import {Vector} from './module/Vector';

export class Model extends EventDispatcher {

    private static _instance: Model;

    private constructor() {
        super();
    }

    public static instance = (): Model => {
        if (!Model._instance) {
            Model._instance = new Model();
        }

        return Model._instance;
    };

    public static ON_RESIZE_EVENT = 'onResizeChanged';
    public static ON_STATE_CHANGED = 'onStateChanged';
    public static ON_CAMERA_STATE_CHANGED = 'onCameraStateChanged';

    private _ratio = 1;

    get ratio(): number {
        return this._ratio;
    }

    set ratio(value: number) {
        this._ratio = value;
    }

    private _screen: { width: number, height: number } = {width: 0, height: 0};
    private _canvas: { width: number, height: number } = {width: 0, height: 0};

    public setSize = (_width: number, _height: number) => {
        if (_width) {
            this._screen.width = _width;
            this._canvas.width = _width * this._ratio * 0.8;
        }

        if (_height) {
            this._screen.height = _height;
            this._canvas.height = this._canvas.width * (this.screen.height / this.screen.width);
        }

        this.dispatchEvent(Model.ON_RESIZE_EVENT);
    };

    public get screen(): { width: number, height: number } {
        return this._screen;
    }

    public get canvas(): { width: number, height: number } {
        return this._screen;
    }

    public static SCENE_TOP = 'sceneTop';
    public static SCENE_SKETCH = 'sceneSketch';

    private _state: string;

    get state(): string {
        return this._state;
    }

    set state(value: string) {
        this._state = value;
        this.dispatchEvent(Model.ON_STATE_CHANGED);
    }

    private _id: string;

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

    private _camPosition: Vector = new Vector(0.0, 0.0, 10.0);

    get camPosition(): Vector {
        return this._camPosition;
    }

    set camPosition(value: Vector) {
        this._camPosition = value;
        this.dispatchEvent(Model.ON_CAMERA_STATE_CHANGED);
    }
}