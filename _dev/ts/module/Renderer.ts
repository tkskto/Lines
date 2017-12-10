import { MatrixUtils } from '../utils/Utils';
import { Model } from '../Model';
import { WebGLContext } from './Context';
import { Vector } from './Vector';
import { Mesh } from './Mesh';

export class Renderer {

    private PI: number = Math.PI;
    private _ratio: number = window.devicePixelRatio;
    private _scene: string;

    private _gl: WebGLRenderingContext;
    private _timer: number;
    private _target: Mesh[] = [];

    private _wh: number;
    private _cWidth: number;
    private _cHeight: number;
    private _canvasPosX: number;
    private _canvasPosY: number;

    private vMatrix: Float32Array;
    private pMatrix: Float32Array;
    private qMatrix: Float32Array;
    private vpMatrix: Float32Array;
    private mvpMatrix: Float32Array;

    constructor(private _ctx: WebGLContext, private _model: Model) {
        this._gl = _ctx.ctx;

        this._gl.enable(this._gl.DEPTH_TEST);
        this._gl.depthFunc(this._gl.LEQUAL);

        this.vMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.pMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.qMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.vpMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.mvpMatrix = MatrixUtils.initialize(MatrixUtils.create());

        const camPosition = new Vector(0.0, 0.0, 10.0);
        MatrixUtils.lookAt(new Vector(0, 0, 0), camPosition, new Vector(0, 1, 0), this.vMatrix);
        MatrixUtils.perspective(60, this._model.canvas.width / this._model.canvas.height, 0.1, 100, this.pMatrix);
        MatrixUtils.multiply(this.pMatrix, this.vMatrix, this.vpMatrix);

        this.onResize();

        this._model.addEventListener(Model.ON_RESIZE_EVENT, this.onResize);
    }

    /**
     * 描画対象を追加する
     * @param {Mesh} _model
     */
    public add = (_model: Mesh) => {
        this._target.push(_model);
    };

    /**
     * 描画対象を削除する
     * @param {Mesh} _mesh 削除したいメッシュ
     */
    public remove = (_mesh: Mesh) => {
        for (let i = 0; i < this._target.length; i++) {
            if (this._target[i].id === _mesh.id) {
                this._target.slice(i, 1);
            }
        }
    };

    /**
     * すべてのリソースを削除する
     */
    public dispose = () => {
        // TODO: https://github.com/mrdoob/three.js/blob/dev/src/renderers/WebGLRenderer.js#L507
    };

    private _count = 0;

    public update = () => {
        this.render();
    };

    private render = () => {
        for (const target of this._target) {
            // this._target[i].setQuaternion(this.qMatrix);
            MatrixUtils.multiply(this.vpMatrix, target.mMatrix, this.mvpMatrix);
            target.ready([this.mvpMatrix]);
            target.drawArrays();
        }

        this._gl.flush();
    };

    private onResize = () => {
        // ビュー座標変換行列
        MatrixUtils.lookAt(new Vector(0.0, 0.0, 1.0), new Vector(0, 0, 0), new Vector(0, 1, 0), this.vMatrix);
        MatrixUtils.perspective(60, this._cWidth / this._cHeight, 0.1, 1000, this.pMatrix);
        MatrixUtils.multiply(this.pMatrix, this.vMatrix, this.vpMatrix);

        this._gl.viewport(0, 0, this._cWidth, this._cHeight);
    }
}