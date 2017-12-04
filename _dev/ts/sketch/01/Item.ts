import {Sketch} from "../Sketch";
import {Text} from '../../module/Text';
import {Lines} from "./Lines";
import {Model} from "../../Model";

export class Item1 extends Sketch {

    private _stage:createjs.Stage;
    private _ctx:CanvasRenderingContext2D;
    private _lines:Lines;

    constructor(public _model:Model, private _canvas:HTMLCanvasElement, id:string, type:string) {
        super(_model, id, type);
    }

    public setup = ():void => {
        this._stage = new createjs.Stage(this._canvas);
        this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;

        this._lines = new Lines(this._canvas.width, this._canvas.height);
        this._stage.addChild(this._lines);

        let _text: Text = new Text(this._canvas.width, this._canvas.height);
        this._stage.addChild(_text);
        this._stage.mouseEnabled = false;

        this.play();
    };

    public dispose = ():void => {
        this.pause();
        this._lines.reset();
    };

    public update = () => {
        this.animate();
    };

    public animate = () => {
        this._lines.update();

        this._stage.update();

        if(this._lines.endFlg) {
            createjs.Ticker.removeEventListener("tick", this.update);
        }
    };
}