export class Line extends createjs.Shape {

    private _startPoint: { x: number, y: number };
    private _currentPoint: { x: number, y: number };
    private _endPoint: { x: number, y: number };
    private _plusX: number;
    private _plusY: number;

    private _endFlg = false;

    constructor(private _num: number, private _allNum: number, private _space: number, private _height: number, private _duration: number) {
        super();
        this.init();
    }

    public init = () => {
        this._startPoint = {
            x: this._num * this._space,
            y: this._num * this._space * -1
        };

        this._currentPoint = {
            x: this._startPoint.x,
            y: this._startPoint.y
        };

        this._endPoint = {
            x: this._startPoint.x + Math.cos(225 * Math.PI / 180) * this._height,
            y: this._height + (this._allNum - this._num) * this._space,
        };

        this._plusX = (this._endPoint.x - this._startPoint.x) / this._duration * 10;
        this._plusY = (this._endPoint.y - this._startPoint.y) / this._duration * 10;

        this.graphics.clear();
    };

    public updatePos = () => {
        this._currentPoint.x += this._plusX;
        this._currentPoint.y += this._plusY;

        if (this._currentPoint.y >= this._endPoint.y) {
            this._endFlg = true;
        }

        this.render();
    };

    private render = () => {
        const g: createjs.Graphics = this.graphics;

        g.clear();
        g.setStrokeStyle(3, '10');
        g.beginStroke('#0f9d58');
        g.moveTo(this._startPoint.x, this._startPoint.y);
        g.lineTo(this._currentPoint.x, this._currentPoint.y);
        g.endStroke();
    };

    get endFlg(): boolean {
        return this._endFlg;
    }

}