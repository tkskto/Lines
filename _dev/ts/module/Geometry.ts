import { GLUtils } from '../utils/Utils';
import { Data } from '../sketch/02/Data';

export class Geometry {
    private _vbo: WebGLBuffer[] = [];
    private _ibo: WebGLBuffer;

    private _VERTEX: number[];
    private _INDEX: number[];
    private _COLOR: number[];
    private _NORMAL: number[];

    constructor(private _gl: WebGLRenderingContext, _data: Data = new Data()) {
        this._VERTEX = _data.vertex;
        this._INDEX = _data.index;
        this._COLOR = _data.color;
        this._NORMAL = _data.normal;
    }

    public init = (): Geometry => {
        if (this._VERTEX.length > 0) {
            this._vbo[0] = GLUtils.createVBO(this._gl, this._VERTEX);
        }

        if (this._NORMAL.length > 0) {
            this._vbo[1] = GLUtils.createVBO(this._gl, this._NORMAL);
        }

        if (this._INDEX) {
            this._ibo = GLUtils.createIBO(this._gl, this._INDEX);
        }

        return this;
    };

    get ibo(): WebGLBuffer {
        return this._ibo;
    }

    get vbo(): WebGLBuffer[] {
        return this._vbo;
    }

    get NORMAL(): number[] {
        return this._NORMAL;
    }

    set NORMAL(value: number[]) {
        this._NORMAL = value;
    }

    get COLOR(): number[] {
        return this._COLOR;
    }

    set COLOR(value: number[]) {
        this._COLOR = value;
    }

    get INDEX(): number[] {
        return this._INDEX;
    }

    set INDEX(value: number[]) {
        this._INDEX = value;
    }

    get VERTEX(): number[] {
        return this._VERTEX;
    }

    set VERTEX(value: number[]) {
        this._VERTEX = value;
    }
}