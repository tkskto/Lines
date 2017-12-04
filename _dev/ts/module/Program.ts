import {GLUtils} from "../utils/Utils";

export class Program {
    private _program:WebGLProgram;
    private _attl:number[] = [];
    private _unil:WebGLUniformLocation[] = [];

    /**
     * WebGLプログラムをつくる
     * @param {WebGLRenderingContext} _gl
     * @param {string} _vs 頂点シェーダのscript要素のID
     * @param {string} _fs フラグメントシェーダのscript要素のID
     * @param {string[]} _attName シェーダ内のattributeの名前
     * @param {number[]} _atts 各attributeの要素数
     * @param {string[]} _uniName シェーダ内のuniformの名前
     * @param {string[]} _uniType 各uniformのタイプ
     */
    constructor(private _gl:WebGLRenderingContext, private _vs:string, private _fs:string, private _attName:string[], private _atts:number[], private _uniName:string[], private _uniType:string[]) {
        this.init();
    }

    private init = () => {
        let vs:WebGLShader = GLUtils.createVertexShader(this._vs, this._gl);
        let fs:WebGLShader = GLUtils.createFragmentShader(this._fs, this._gl);

        this._program = GLUtils.createProgram(this._gl, vs, fs);

        for (let i = 0; i < this._attName.length; i++) {
            this._attl[i] = this._gl.getAttribLocation(this._program, this._attName[i]);
        }

        for (let i = 0; i < this._uniName.length; i++) {
            this._unil[i] = this._gl.getUniformLocation(this._program, this._uniName[i]);
        }
    };

    get program(): WebGLProgram {
        return this._program;
    }

    get attl(): number[] {
        return this._attl;
    }

    get atts(): number[] {
        return this._atts;
    }

    get unil(): WebGLUniformLocation[] {
        return this._unil;
    }

    get uniType(): string[] {
        return this._uniType;
    }
}