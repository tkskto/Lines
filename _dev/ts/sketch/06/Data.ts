import {IData} from '../common/IData';

export class Data implements IData {
    _vertex: number[] = [];
    _color: number[] = [];
    _index: number[] = [];
    _normal: number[] = [];
    _uv: number[] = [];

    constructor(_width: number, _height: number) {
        this._vertex.push(
            -_width, -_height, 0.0,
            -_width,  _height, 0.0,
            _width,   _height, 0.0,
            _width,  -_height, 0.0
        );

        this._index.push(
            0, 1, 2,
            0, 2, 3
        );
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
