export class Plane {

    private _VERTEX: number[] = [];
    private _NORMAL: number[] = [];
    private _COLOR: number[] = [];
    private _UV: number[] = [];
    private _INDEX: number[] = [];

    constructor () {
        this._VERTEX = [
            -1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0
        ];

        this._COLOR = [
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0
        ];

        this._NORMAL = [
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0
        ];

        this._UV = [
            0.0, 1.0,
            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0
        ];

        this._INDEX = [
            0, 1, 2,
            3, 2, 1
        ];
    }

    get VERTEX(): number[] {
        return this._VERTEX;
    }
    get NORMAL(): number[] {
        return this._NORMAL;
    }
    get COLOR(): number[] {
        return this._COLOR;
    }
    get UV(): number[] {
        return this._UV;
    }
    get INDEX(): number[] {
        return this._INDEX;
    }
}