import { Line } from './Line';

export class Lines extends createjs.Container {

    private SPACE = 20;
    private _lineNum: number;
    private _arr: Line[] = [];
    private _endFlg = false;
    private _endCount = 0;

    constructor(private _width: number, private _height: number) {
        super();

        this.init();
    }

    private init = () => {
        this._lineNum = Math.round((this._width + this._height) / this.SPACE);

        for (let i = 0; i < this._lineNum; i++) {
            const _line: Line = new Line(i, this._lineNum, this.SPACE, this._height, 3000);
            this._arr.push(_line);
            this.addChild(_line);
        }
    };

    public reset = () => {
        for (let i = 0; i < this._lineNum; i++) {
            this._arr[i].init();
        }
        this._endCount = 0;
        this._endFlg = false;
    };

    public update = () => {
        for (let i = 0; i < this._lineNum; i++) {
            if (!this._arr[i].endFlg) {
                this._arr[i].updatePos();
            } else {
                this._endCount++;
            }
        }

        if (this._endCount === this._lineNum) {
            this._endFlg = true;
        }
    };

    get endFlg(): boolean {
        return this._endFlg;
    }
}
