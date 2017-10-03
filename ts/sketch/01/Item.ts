import {Sketch} from "../Sketch";

export class Item extends Sketch {

    private _stage:createjs.Stage;
    private _ctx:CanvasRenderingContext2D;
    // private _lines: createjs.Shape[] = [];

    constructor(public _model:model.Model, private _canvas:HTMLCanvasElement) {
        super(_model);

        this._id = '01';
        this._type = 'canvas2D';
    }

    public setup = ():void => {
        this._stage = new createjs.Stage(this._canvas);
        this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;

        this._ctx.clearRect(0, 0, 600, 360);

        let text:createjs.Text = new createjs.Text('works', 'Meiryo', 'ffffff');
        text.textAlign = 'center';
        text.textBaseline = 'middle';
        this._stage.addChild(text);
    };

    public update = ():void => {

    };

    public render = ():void => {

    }
}