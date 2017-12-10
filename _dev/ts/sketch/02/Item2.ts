import { Sketch } from '../common/Sketch';
import { Model } from '../../Model';
import { Default } from './Shader';
import { GLUtils } from '../../utils/Utils';
import { WebGLContext } from '../../module/Context';
import { Data } from './Data';
import { Renderer } from '../../module/Renderer';
import { Geometry } from '../../module/Geometry';
import { Mesh } from '../../module/Mesh';
import { Program } from '../../module/Program';
import { GLConfig } from '../../Config';
import {Vector} from "../../module/Vector";

export class Item2 extends Sketch {

    private _data: Data = new Data();
    private _ctx: WebGLContext;
    private _gl: WebGLRenderingContext;
    private _shader: Default;
    private _default: Program;
    private _renderer: Renderer;

    constructor(_model: Model, private _canvas: HTMLCanvasElement, _id: string, _type: string) {
        super(_model, _id, _type);
    }

    public setup = (): void => {
        this._ctx = new WebGLContext(this._model, this._canvas);
        this._gl = this._ctx.ctx;
        this._shader = new Default(this._gl);
        this._default = new Program(this._ctx.ctx, this._shader, ['position'], [3], ['mvpMatrix'], [GLConfig.UNIFORM_TYPE_MATRIX4]);
        this._renderer = new Renderer(this._ctx, this._model);

        const line: Geometry = new Geometry(this._ctx.ctx, this._data).init();
        const mesh: Mesh = new Mesh(this._ctx.ctx, this._default, line, GLConfig.DRAW_TYPE_LINE);
        // mesh.scale(new Vector(3.0, 3.0, 3.0));
        this._renderer.add(mesh);

        this.play();
    };

    private clear = () => {
        this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this._gl.clearDepth(1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    };

    public dispose = (): void => {
        this.pause();

        if (this._renderer) {
            this._renderer.dispose();
        }
    };

    public update = () => {
        this.animate();
        this._timer = requestAnimationFrame(this.update);
    };

    public animate = () => {
        this.clear();
        this._renderer.update();
    };
}
