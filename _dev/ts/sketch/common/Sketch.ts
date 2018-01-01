import { ISketch } from './ISketch';
import { Model } from '../../Model';
import {AppConfig} from '../../Config';


/**
 * 各スケッチが継承する基底クラス
 */
export class Sketch implements ISketch {

    private _isPlaying = false;
    private _quote: string;
    public _timer: number;
    public _id: string;
    public _type: string;

    constructor(public _model: Model, _id: string, _type: string, _quote: string = null) {
        _model.addEventListener(Model.ON_STATE_CHANGED, this.onStateChanged);
        this._id = _id;
        this._type = _type;
        this._quote = _quote;
    }

    private onStateChanged = () => {
        if (this._model.state === Model.SCENE_SKETCH) {
            if (this._model.id === this._id && !this._isPlaying) {
                this.setup();
                this._model.quote = this._quote;
            } else if (this._isPlaying) {
                this.dispose();
            }
        } else if (this._model.state === Model.SCENE_TOP) {
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

        if (this._type === AppConfig.NAME_TYPE_CANVAS2D) {
            createjs.Ticker.addEventListener('tick', this.update);
        } else if (this._type === AppConfig.NAME_TYPE_WEBGL) {
            this._timer = requestAnimationFrame(this.update);
        }
        this._isPlaying = true;
    }

    pause(): void {
        if (this._type === AppConfig.NAME_TYPE_CANVAS2D) {
            createjs.Ticker.removeEventListener('tick', this.update);
        } else if (this._type === AppConfig.NAME_TYPE_WEBGL) {
            if (this._timer) {
                cancelAnimationFrame(this._timer);
                this._timer = 0;
            }
        }
        this._isPlaying = false;
    }

    public setup = (): void => {
        throw new Error('please implement sub class');
    };

    public dispose = (): void => {
        throw new Error('please implement sub class');
    };

    public update = (): void => {
        throw new Error('please implement sub class');
    };

    get type(): string {
        return this._type;
    }

    get timer(): number {
        return this._timer;
    }

    get quote(): string {
        return this._quote;
    }
}
