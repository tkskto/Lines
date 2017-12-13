import { IData } from '../common/IData';

export class Data implements IData {
    _vertex: number[] = [
        -7.0,  1.5, 0.0,
        -7.0, -1.5, 0.0,
        -7.0, -1.5, 0.0,
        -5.0, -1.5, 0.0,

        -4.0, -1.5, 0.0,
        -4.0,  1.5, 0.0,

        -2.5,  1.5, 0.0,
        -2.5, -1.5, 0.0,
        -2.5, -1.5, 0.0,
         0.5,  1.5, 0.0,
         0.5,  1.5, 0.0,
         0.5, -1.5, 0.0,

         2.0, -1.5, 0.0,
         4.0, -1.5, 0.0,
         2.0, -1.5, 0.0,
         2.0,  1.5, 0.0,
         2.0,  1.5, 0.0,
         4.0,  1.5, 0.0,
         2.0,  0.0, 0.0,
         4.0,  0.0, 0.0,

         7.0,  1.5, 0.0,
         5.0,  1.5, 0.0,
         5.0,  1.5, 0.0,
         5.0,  0.0, 0.0,
         5.0,  0.0, 0.0,
         7.0,  0.0, 0.0,
         7.0,  0.0, 0.0,
         7.0, -1.5, 0.0,
         7.0, -1.5, 0.0,
         5.0, -1.5, 0.0
    ];
    _color: number[] = [
        1.0, 1.0, 0.8, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.4, 0.4, 0.8, 1.0,
        1.0, 1.0, 0.8, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 0.8, 1.0,
        1.0, 1.0, 0.8, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 0.8, 1.0,
        1.0, 1.0, 0.8, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 0.8, 1.0,
        1.0, 1.0, 0.8, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 0.8, 1.0,
        1.0, 1.0, 0.8, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 0.8, 1.0,
        1.0, 1.0, 0.8, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 0.8, 1.0,
        0.7, 0.13, 0.8, 1.0,
        0.56, 0.4, 0.8, 1.0
    ];
    _index: number[] = [];
    _normal: number[] = [];
    _uv: number[] = [];

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
