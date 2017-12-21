import { Shader } from '../../module/Shader';

export class Default extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl,
            `#version 300 es
            in vec3 position;
            in float vertId;
            uniform float time;
            uniform mat4 mvpMatrix;
            void main(void){
                vec3 pos = position;
                if(mod(vertId, 2.0) == 0.0){
                    pos.y += time;
                }
                gl_Position = mvpMatrix * vec4(pos, 1.0);
            }`,
            `#version 300 es
            precision highp float;
            out vec4 outColor;
            void main(void){
                outColor = vec4(vec3(1.0, 0.0, 0.0), 1.0);
            }`);

        this.compile();
    }
}