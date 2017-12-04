import {Sketch} from "../Sketch";
import {Model} from "../../Model";
import {CanvasShader, NormalShader} from "./Shader";
import {GLUtils} from "../../utils/Utils";
import {WebGLContext} from "../../module/Context";

export class Item2 extends Sketch {

    private _ctx: WebGLContext;
    private _gl:WebGLRenderingContext;
    private _normalShader:NormalShader;
    private _canvasShader: CanvasShader;
    private _normal:WebGLProgram;

    constructor(_model:Model, private _canvas:HTMLCanvasElement, _id:string, _type:string) {
        super(_model, _id, _type);
    }

    public setup = ():void => {
        this._ctx = new WebGLContext(this._model, this._canvas);
        this._gl = this._ctx.ctx;
        this._normalShader = new NormalShader(this._gl);
        this._canvasShader = new CanvasShader(this._gl);
        this._normal = GLUtils.createProgram(this._gl, this._normalShader.VS, this._normalShader.FS);

        this.clear();

        this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);

        this.play();
    };

    private clear = () => {
        this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this._gl.clearDepth(1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    }

    public dispose = ():void => {
        this.pause();
    };

    public update = () => {
        this.animate();
        this._timer = requestAnimationFrame(this.update);
    };

    public animate = () => {

    };
}
