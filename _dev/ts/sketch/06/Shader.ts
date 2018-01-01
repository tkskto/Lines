import { Shader } from '../../module/Shader';

export class Default extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl,
            `#version 300 es
            layout (location = 0) in vec3 position;
            uniform mat4 mvpMatrix;
            void main(void){
                gl_Position = mvpMatrix * vec4(position, 1.0);
            }`,
            `#version 300 es
            precision highp float;
            uniform vec2 resolution;
            uniform float time;
            out vec4 outColor;
            vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
            {
                return a + b*cos( 6.28318*(c*t+d) );
            }
            void main(void){
                vec2 p = gl_FragCoord.xy / resolution.xy;
    
                // animate
                p.x += 0.01 * time;
                
                // compute colors
                vec3 col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.67) );
                if( p.y > (6.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20) );
                else if( p.y > (5.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.3,0.20,0.20) );
                else if( p.y > (4.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,0.5),vec3(0.8,0.90,0.30) );
                else if( p.y > (3.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,0.7,0.4),vec3(0.0,0.15,0.20) );
                else if( p.y > (2.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(2.0,1.0,0.0),vec3(0.5,0.20,0.25) );
                else if( p.y > (1.0/7.0) ) col = pal( p.x, vec3(0.8,0.5,0.4),vec3(0.2,0.4,0.2),vec3(2.0,1.0,1.0),vec3(0.0,0.25,0.25) );
                
                // band
                float f = fract(p.y*7.0);
                // borders
                col *= smoothstep( 0.49, 0.47, abs(f-0.5) );
                // shadowing
                col *= 0.5 + 0.5*sqrt(4.0*f*(1.0-f));
            
                outColor = vec4( col, 1.0 );
            }`);
        this.compile();
    }
}
