import {ISketch} from "./ISketch";
import {Model} from "../Model";

export class Sketch implements ISketch {

    _id: string;
    _type: string;
    _timer: number;

    constructor(public _model:Model, _id:string, _type:string) {
        _model.addEventListener(Model.ON_STATE_CHANGED, this.onStateChanged);
        this._id = _id;
        this._type = _type;
    }

    private onStateChanged = () => {
        if (this._model.id === this._id) {
            this.setup();
        } else {
            this.dispose();
        }
    };

    play(): void {
        if (this._type === 'canvas2D') {
            createjs.Ticker.addEventListener("tick", this.update);
        } else {
            this._timer = requestAnimationFrame(this.update);
        }
    }

    pause(): void {
        if (this._type === 'canvas2D') {
            createjs.Ticker.removeEventListener("tick", this.update);
        } else {
            if (this._timer) {
                cancelAnimationFrame(this._timer);
                this._timer = 0;
            }
        }
    }

    public setup = ():void => {};
    public dispose = ():void => {};
    public update = ():void => {};

    get type(): string {
        return this._type;
    }
}