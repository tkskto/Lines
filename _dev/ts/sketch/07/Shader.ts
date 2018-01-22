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

export class NormalMap extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl,
            `#version 300 es
             attribute vec3 position;
             attribute vec2 texCoord;
             uniform   mat4 mvpMatrix;
             varying   vec2 vTexCoord;
             void main(void){
                vTexCoord = texCoord;
                gl_Position  = mvpMatrix * vec4(position, 1.0);
             }`,
            `#version 300 es
            precision highp float;
            uniform sampler2D texture;
            uniform vec2      resolution;
            varying vec2      vTexCoord;
           
            const float RED   = 0.298912;
            const float GREEN = 0.586611;
            const float BLUE  = 0.114478;
            vec3  monochromeScale = vec3(RED, GREEN, BLUE);
           
            void main(void){
                float x = gl_FragCoord.x / resolution.x;
                float y = gl_FragCoord.y / resolution.y;
                float minW = 1.0 / resolution.x;
                float minH = 1.0 / resolution.y;
           
                vec2 left = vec2(x - minW < 0.0 ? 1.0 : x - minW , y);
                vec2 top = vec2(x, y + minH > 1.0 ? 0.0 : y + minH);
                vec2 right = vec2(x + minW > 1.0 ? 0.0 : x + minW, y);
                vec2 bottom = vec2(x, y - minH < 0.0 ? 1.0 : y - minH);
              
                vec4 leftColor = texture2D(texture, left);
                vec4 topColor = texture2D(texture, top);
                vec4 rightColor = texture2D(texture, right);
                vec4 bottomColor = texture2D(texture, bottom);
                
                float nLeft = dot(leftColor.rgb, monochromeScale);
                float nTop = dot(topColor.rgb, monochromeScale);
                float nRight = dot(rightColor.rgb, monochromeScale);
                float nBottom = dot(bottomColor.rgb, monochromeScale);
           
                float m = (nRight - nLeft) * 0.5;
                float o = (nBottom - nTop) * 0.5;
           
                vec3 dyx = vec3(0.0,  m,  0.1);
                vec3 dyz = vec3(0.1, -o,  0.0);
                vec3 dest = normalize(cross(dyx, dyz));
                vec4 smpColor = vec4((dest.z + 1.0) * 0.5, (dest.x + 1.0) * 0.5, (dest.y + 1.0) * 0.5, 1.0);
          
                gl_FragColor  = smpColor;
            }`
        );
    }
}
