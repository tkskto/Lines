import { Shader } from '../../module/Shader';

export class Default extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl,
            `#version 300 es
            layout (location = 0) in vec3 position;
            layout (location = 1) in vec4 color;
            layout (location = 2) in float vertId;
            uniform float time;
            uniform mat4 mvpMatrix;
            out vec4 vColor;
            void main(void){
                vec3 pos = position;
                vColor = color;
                if(mod(vertId, 2.0) == 0.0){
                    pos.y += time;
                }
                gl_Position = mvpMatrix * vec4(pos, 1.0);
            }`,
            `#version 300 es
            precision highp float;
            in vec4 vColor;
            out vec4 outColor;
            void main(void){
                outColor = vColor;
            }`);

        this.compile();
    }
}