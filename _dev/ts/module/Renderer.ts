import {MatrixUtils} from "../utils/Utils";
import {Model} from "../Model";
import {WebGLContext} from "./Context";
import {Vector} from "./Vector";
import {Mesh} from "./Mesh";

module gl {

    export class Renderer {

        private PI:number = Math.PI;
        private _ratio:number = window.devicePixelRatio;
        private _scene:string;

        private _gl:WebGLRenderingContext;
        private _timer:number;
        private _target: Mesh[] = [];

        private _wh:number;
        private _cWidth:number;
        private _cHeight:number;
        private _canvasPosX:number;
        private _canvasPosY:number;

        private vMatrix:Float32Array;
        private pMatrix:Float32Array;
        private qMatrix:Float32Array;
        private vpMatrix:Float32Array;
        private mvpMatrix:Float32Array;

        constructor(private _ctx:WebGLContext, private _model:Model) {
            this._gl = _ctx.ctx;

            this._gl.enable(this._gl.DEPTH_TEST);
            this._gl.depthFunc(this._gl.LEQUAL);
            this._gl.enable(this._gl.BLEND);
            this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);

            this.vMatrix = MatrixUtils.initialize(MatrixUtils.create());
            this.pMatrix = MatrixUtils.initialize(MatrixUtils.create());
            this.qMatrix = MatrixUtils.initialize(MatrixUtils.create());
            this.vpMatrix = MatrixUtils.initialize(MatrixUtils.create());

            this.onResize();

            // ビュー座標変換行列
            this.mvpMatrix = MatrixUtils.initialize(new Float32Array(16));

            this._model.addEventListener(Model.ON_RESIZE_EVENT, this.onResize);
        }

        public add = (_model:Mesh) => {
            this._target.push(_model);
        };

        public remove = (_mesh:Mesh) => {
            for (let i = 0; i < this._target.length; i++) {
                if (this._target[i].id === _mesh.id) {
                    this._target.slice(i, 1);
                }
            }
        };

        private _count:number = 0;

        public update = () => {
            this._timer = requestAnimationFrame(this.update);

            this.render();
        };

        private render = () => {
            // this._gl.clearColor(0, 0, 0, 1.0);
            // this._gl.clear(this._gl.COLOR_BUFFER_BIT);

            for (let i = 0; i < this._target.length; i++) {
                //this._target[i].setQuaternion(this.qMatrix);
                this.mvpMatrix = MatrixUtils.multiply(this.vpMatrix, this._target[i].mMatrix);
                this._target[i].ready([this.mvpMatrix, [1.0, 1.0, 1.0, 0.5]]);
                this._target[i].drawElements();
            }

            this._gl.flush();
        };

        private onResize = () => {
            this._cWidth = Math.floor(this._ctx.canvas.clientWidth * this._ratio);
            this._cHeight = Math.floor(this._ctx.canvas.clientHeight * this._ratio);

            this._canvasPosX = this._cWidth * 0.5;
            this._canvasPosY = this._cHeight * 0.5;
            this._wh = 1 / Math.sqrt(this._cWidth * this._cWidth + this._cHeight * this._cHeight);

            // ビュー座標変換行列
            MatrixUtils.lookAt(new Vector(0.0, 0.0, 1.0), new Vector(0, 0, 0), new Vector(0, 1, 0), this.vMatrix);
            MatrixUtils.perspective(60, this._cWidth / this._cHeight, 0.1, 1000, this.pMatrix);
            MatrixUtils.multiply(this.pMatrix, this.vMatrix, this.vpMatrix);

            this._gl.viewport(0, 0, this._cWidth, this._cHeight);
        }
    }
}