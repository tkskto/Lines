import {IData} from '../common/IData';

export class Data implements IData {
    _vertex: number[] = [];
    _color: number[] = [];
    _index: number[] = [];
    _normal: number[] = [];
    _uv: number[] = [];

    constructor(_width: number, _height: number, _col: number) {
        // this._vertex.push(
        //     -_width, -_height, 0.0,
        //     -_width,  _height, 0.0,
        //     _width,   _height, 0.0,
        //     _width,  -_height, 0.0
        // );

        const PI = Math.PI;
        const plus = 360 / _col;
        let rad = 0;

        for (let i = 0; i < _col + 1; i++) {
            const radian = rad * PI / 180;
            this._vertex.push(Math.cos(radian) * _width, Math.sin(radian) * _height, 0.0);
            this._vertex.push(Math.cos(radian) * _width * .5, Math.sin(radian) * _height * .5, 0.0);
            rad += plus;
        }
    }

    get vertex(): number[] {
        return this._vertex;
    }

    get color(): number[] {
        return this._color;
    }

    get index(): number[] {
        return this._index;
    }

    get normal(): number[] {
        return this._normal;
    }

    get uv(): number[] {
        return this._uv;
    }
}
