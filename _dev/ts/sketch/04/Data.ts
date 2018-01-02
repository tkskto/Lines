import {IData} from '../common/IData';
import {GLUtils, Methods} from '../../utils/Utils';

export class Data implements IData {
    _vertex: number[] = [];
    _color: number[] = [];
    _vertID: number[] = [];
    _index: number[] = [];
    _normal: number[] = [];
    _uv: number[] = [];

    constructor(_width: number, _height: number, _row: number) {

        const maxHeight = _height * - 0.5;
        const perHeight = _height / _row;

        this._vertex.push(_width * -1, maxHeight, 0, _width * -1, maxHeight, 0);
        this._vertex.push(_width, maxHeight + perHeight, 0, _width, maxHeight + perHeight, 0);

        for (let i = 0; i < _row; i += 2) {
            this._vertex.push(_width * -1, maxHeight + perHeight * i, 0);
            this._vertex.push(_width * -0.9, maxHeight + perHeight * i, 0);
            this._vertex.push(_width, maxHeight + perHeight * (i + 1), 0);
            this._vertex.push(_width * 0.9, maxHeight + perHeight * (i + 1), 0);

            // const color: number[] = Methods.hsv2RGB(_row * i, 100, 100, 50);
            // this._color.push(color[0], color[1], color[2], color[3]);
        }

        console.log(this._vertex);

        for (let i = 1; i < this._vertex.length; i++) {
            this._vertID.push(i);
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
