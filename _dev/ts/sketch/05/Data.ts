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

        // 線太さ
        const lineWidth = 90;

        for (let i = 0; i < _num; i++) {
            const x = _width - 1 + i * 2.0;
            const y = maxHeight;

            this._index.push(i + 1, i + 2, i + 3, i + 1, i + 3, i + 4);
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
