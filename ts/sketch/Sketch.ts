import {ISketch} from "./ISketch";

export class Sketch implements ISketch {

    _id: string;
    _type: string;
    _timer: number;

    constructor(public _model:model.Model) {
        _model.addEventListener(model.Model.ON_STATE_CHANGED, this.onStateChanged);
    }

    private onStateChanged = () => {
        if (this._model.id === this._id) {
            this.setup();
        } else {
            this.dispose();
        }
    };

    play(): void {
        this._timer = requestAnimationFrame(this.update);
    }

    pause(): void {
        if (this._timer) {
            cancelAnimationFrame(this._timer);
            this._timer = 0;
        }
    }

    public setup = ():void => {};
    public dispose = ():void => {};
    public update = ():void => {};

    get type(): string {
        return this._type;
    }
}