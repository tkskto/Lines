import {ISketch} from "./ISketch";
import {Model} from "../Model";

export class Sketch implements ISketch {

    private _isPlaying:boolean = false;
    public _timer: number;
    _id: string;
    _type: string;

    constructor(public _model:Model, _id:string, _type:string) {
        _model.addEventListener(Model.ON_STATE_CHANGED, this.onStateChanged);
        this._id = _id;
        this._type = _type;
    }

    private onStateChanged = () => {
        if (this._model.id === this._id && !this._isPlaying) {
            this.setup();
        } else if (this._isPlaying) {
            this.dispose();
        }
    };

    replay(): void {
        this.dispose();
        this.play();
    }

    play(): void {
        document.body.setAttribute('class', '');
        document.body.classList.add(this._type);
        if (this._type === 'canvas2D') {
            createjs.Ticker.addEventListener("tick", this.update);
        } else {
            this._timer = requestAnimationFrame(this.update);
        }
        this._isPlaying = true;
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
        this._isPlaying = false;
    }

    public setup = ():void => {};
    public dispose = ():void => {};
    public update = ():void => {};

    get type(): string {
        return this._type;
    }

    get timer(): number {
        return this._timer;
    }
}