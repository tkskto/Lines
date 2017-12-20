import { Sketch } from '../common/Sketch';
import { Model } from '../../Model';
import { Default } from './Shader';
import { WebGLContext } from '../../module/Context';
import { Data } from './Data';
import { Renderer } from '../../module/Renderer';
import { Geometry } from '../../module/Geometry';
import { Mesh } from '../../module/Mesh';
import { Program } from '../../module/Program';
import { GLConfig } from '../../Config';

export class Item3 extends Sketch {

    private _data: Data = new Data(32, 32, 5, [1, 0, 0, 1]);
    private _ctx: WebGLContext;
    private _gl: WebGLRenderingContext;
    private _shader: Default;
    private _default: Program;
    private _renderer: Renderer;
    private _mesh: Mesh;
    private _count = 0;

    constructor(_model: Model, private _canvas: HTMLCanvasElement, _id: string, _type: string) {
        super(_model, _id, _type);
    }

    public setup = (): void => {
        this._ctx = new WebGLContext(this._model, this._canvas);
        this._gl = this._ctx.ctx;
        this.clear();
        this._shader = new Default(this._gl);
        this._default = new Program(this._gl, this._shader,
            ['position', 'color', 'normal'], [3, 4, 3],
            ['mvpMatrix', 'time'], [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_FLOAT]
        );
        this._renderer = new Renderer(this._ctx, this._model);

        const line = new Geometry(this._gl, this._data).init();
        this._mesh = new Mesh(this._gl, this._default, line, GLConfig.DRAW_TYPE_LINE);
        this._renderer.add(this._mesh);

        this.play();
    };

    private clear = () => {
        this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
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
        this._count += 0.0001;
        this._timer = requestAnimationFrame(this.update);
    };

    public animate = () => {
        this.clear();

        this._mesh.rotate(this._count, [0, 1.0, 0]);
        this._renderer.update(this._count);
    };
}
