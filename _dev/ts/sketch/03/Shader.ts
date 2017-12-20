import { Shader } from '../../module/Shader';

export class Default extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl, [
            '#version 300 es\n',
            'in vec3 position;',
            'in vec4 color;',
            'in vec3 normal;',
            'uniform float time;',
            'uniform   mat4 mvpMatrix;',
            'out   vec4 vColor;',
            'out   vec3 vNormal;',
            'void main(void){',
                'vColor = color;',
                'vNormal = normal;',
                'gl_Position  = mvpMatrix * vec4(position * time, 1.0);',
            '}'
        ].join(''), [
            '#version 300 es\n',
            'precision mediump float;',
            'in vec4 vColor;',
            'out vec4 outColor;',
            'void main(void){',
                'outColor = vColor;',
            '}'
        ].join(''));

        this.compile();
    }
}