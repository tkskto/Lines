import { Sketch } from '../common/Sketch';
import { Model } from '../../Model';
import {Default, NormalMap} from './Shader';
import { WebGLContext } from '../../module/Context';
import { Data } from './Data';
import { Renderer } from '../../module/Renderer';
import { Geometry } from '../../module/Geometry';
import { Mesh } from '../../module/Mesh';
import { Program } from '../../module/Program';
import { GLConfig } from '../../Config';
import {OffScreenImageRenderer} from '../../module/OffScreenImageRenderer';
import {GLUtils} from '../../utils/Utils';
import {Plane} from '../../utils/Plane';

export class Item7 extends Sketch {

    private _data: Data;
    private _ctx: WebGLContext;
    private _gl: WebGLRenderingContext;
    private _shader: Default;
    private _normal: Default;
    private _default: Program;
    private _offScreen: Program;
    private _renderer: Renderer;
    private _offScreenRenderer: OffScreenImageRenderer;
    private _mesh: Mesh;
    private _plane: Mesh;
    private _count = 0;

    constructor(_model: Model, private _canvas: HTMLCanvasElement, _id: string, _type: string) {
        super(_model, _id, _type);
    }

    public setup = (): void => {
        this._ctx = new WebGLContext(this._model, this._canvas);
        this._gl = this._ctx.ctx;
        this.clear();

        this._shader = new Default(this._gl);
        this._normal = new NormalMap(this._gl);

        this._default = new Program(this._gl, this._shader,
            ['position'], [3],
            ['mvpMatrix', 'resolution', 'texture'],
            [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_VECTOR2, GLConfig.UNIFORM_TYPE_INT]
        );
        this._offScreen = new Program(this._gl, this._normal,
            ['position', 'texCoord'], [3, 2],
            ['mvpMatrix', 'resolution', 'texture'],
            [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_VECTOR2, GLConfig.UNIFORM_TYPE_INT]
        );

        this._renderer = new Renderer(this._ctx, this._model);
        this._offScreenRenderer = new OffScreenImageRenderer(this._ctx, './images/lena.jpg', this._model);

        const width = this._model.screen.width;
        const height = this._model.screen.height;

        this._data = new Data(1.0, height / width, 64);

        const line = new Geometry(this._gl, this._data).init();
        const plane = new Geometry(this._gl, new Plane()).init();
        this._mesh = new Mesh(this._gl, this._default, line, GLConfig.DRAW_TYPE_TRIANGLE_STRIP);
        this._plane = new Mesh(this._gl, this._offScreen, plane, GLConfig.DRAW_TYPE_TRIANGLE);

        this._renderer.add(this._mesh);
        this._offScreenRenderer.add(this._plane);

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

        if (this._offScreenRenderer) {
            this._offScreenRenderer.dispose();
        }
    };

    public update = () => {
        this.animate();
        this._count += 0.1;
        this._timer = requestAnimationFrame(this.update);
    };

    public animate = () => {
        this.clear();
        this._offScreenRenderer.render([this._model.canvas.width, this._model.canvas.height], 0);
        // フレームバッファをテクスチャとしてセット
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._offScreenRenderer.fBuffer.texture);
        this._renderer.update([this._model.canvas.width, this._model.canvas.height], 0);
    };
}
