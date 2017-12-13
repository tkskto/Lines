import { Shader } from '../../module/Shader';

export class Default extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl, [
            'attribute vec3 position;',
            'attribute vec4 color;',
            'uniform   mat4 mvpMatrix;',
            'varying   vec4 vColor;',
            'void main(void){',
                'vColor = color;',
                'gl_Position  = mvpMatrix * vec4(position, 1.0);',
            '}'
        ].join(''), [
            'precision mediump float;',
            'varying vec4 vColor;',
            'void main(void){',
                'gl_FragColor = vColor;',
            '}'
        ].join(''));

        this.compile();
    }
}