import { Shader } from '../../module/Shader';

export class Default extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl, [
            'attribute vec3  position;',
            'uniform   mat4  mvpMatrix;',
            'void main(void){',
                'gl_Position  = mvpMatrix * vec4(position, 1.0);',
            '}'
        ].join(''), [
            'precision mediump float;',
            'void main(void){',
                'gl_FragColor = vec4(vec3(1.0), 1.0);',
            '}'
        ].join(''));

        this.compile();
    }
}