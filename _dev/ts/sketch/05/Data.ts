import {IData} from '../common/IData';
import {GLUtils, Methods} from '../../utils/Utils';

export class Data implements IData {
    _vertex: number[] = [];
    _color: number[] = [];
    _vertID: number[] = [];
    _index: number[] = [];
    _normal: number[] = [];
    _uv: number[] = [];

    constructor(_width: number, _height: number, _num: number) {

        const maxHeight = _height * 0.5;
        const offset = _width / _num;

        for (let i = 0; i < _num; i++) {
            const x = _width * - 0.9 + (i * 0.12);
            const y = -maxHeight;
            const color = Methods.hsv2RGB(360 / _num * i, 100 , 100, 100);
            this._color.push(color[0], color[1], color[2], color[3]);
            this._color.push(color[0], color[1], color[2], color[3]);
            this._color.push(color[0], color[1], color[2], color[3]);
            this._color.push(color[0], color[1], color[2], color[3]);

            this._vertex.push(x, y, 0.0, x, y, 0.0, x + 0.05, y, 0.0, x + 0.05, y, 0.0);
            this._vertID.push(1 + i * 4, 2 +  i * 4, 3 +  i * 4, 4 +  i * 4);
            this._index.push(i * 4, 1 +  i * 4, 2 +  i * 4, i * 4, 2 +  i * 4, 3 + i * 4);
        }
    }

    get vertex(): number[] {
        return this._vertex;
    }

    get color(): number[] {
        return this._color;
    }

    get vertID(): number[] {
        return this._vertID;
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
