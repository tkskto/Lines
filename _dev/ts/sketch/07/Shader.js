var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Shader } from '../../module/Shader';
var Default = (function (_super) {
    __extends(Default, _super);
    function Default(_gl) {
        var _this = _super.call(this, _gl, "#version 300 es\n            layout (location = 0) in vec3 position;\n            uniform mat4 mvpMatrix;\n            void main(void){\n                gl_Position = mvpMatrix * vec4(position, 1.0);\n            }", "#version 300 es\n            precision highp float;\n            uniform vec2 resolution;\n            uniform float time;\n            out vec4 outColor;\n            vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )\n            {\n                return a + b*cos( 6.28318*(c*t+d) );\n            }\n            void main(void){\n                vec2 p = gl_FragCoord.xy / resolution.xy;\n    \n                // animate\n                p.x += 0.01 * time;\n                \n                // compute colors\n                vec3 col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.67) );\n                if( p.y > (6.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20) );\n                else if( p.y > (5.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.3,0.20,0.20) );\n                else if( p.y > (4.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,0.5),vec3(0.8,0.90,0.30) );\n                else if( p.y > (3.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,0.7,0.4),vec3(0.0,0.15,0.20) );\n                else if( p.y > (2.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(2.0,1.0,0.0),vec3(0.5,0.20,0.25) );\n                else if( p.y > (1.0/7.0) ) col = pal( p.x, vec3(0.8,0.5,0.4),vec3(0.2,0.4,0.2),vec3(2.0,1.0,1.0),vec3(0.0,0.25,0.25) );\n                \n                // band\n                float f = fract(p.y*7.0);\n                // borders\n                col *= smoothstep( 0.49, 0.47, abs(f-0.5) );\n                // shadowing\n                col *= 0.5 + 0.5*sqrt(4.0*f*(1.0-f));\n            \n                outColor = vec4( col, 1.0 );\n            }") || this;
        _this.compile();
        return _this;
    }
    return Default;
}(Shader));
export { Default };
var NormalMap = (function (_super) {
    __extends(NormalMap, _super);
    function NormalMap(_gl) {
        return _super.call(this, _gl, "#version 300 es\n             attribute vec3 position;\n             attribute vec2 texCoord;\n             uniform   mat4 mvpMatrix;\n             varying   vec2 vTexCoord;\n             void main(void){\n                vTexCoord = texCoord;\n                gl_Position  = mvpMatrix * vec4(position, 1.0);\n             }", "#version 300 es\n            precision highp float;\n            uniform sampler2D texture;\n            uniform vec2      resolution;\n            varying vec2      vTexCoord;\n           \n            const float RED   = 0.298912;\n            const float GREEN = 0.586611;\n            const float BLUE  = 0.114478;\n            vec3  monochromeScale = vec3(RED, GREEN, BLUE);\n           \n            void main(void){\n                float x = gl_FragCoord.x / resolution.x;\n                float y = gl_FragCoord.y / resolution.y;\n                float minW = 1.0 / resolution.x;\n                float minH = 1.0 / resolution.y;\n           \n                vec2 left = vec2(x - minW < 0.0 ? 1.0 : x - minW , y);\n                vec2 top = vec2(x, y + minH > 1.0 ? 0.0 : y + minH);\n                vec2 right = vec2(x + minW > 1.0 ? 0.0 : x + minW, y);\n                vec2 bottom = vec2(x, y - minH < 0.0 ? 1.0 : y - minH);\n              \n                vec4 leftColor = texture2D(texture, left);\n                vec4 topColor = texture2D(texture, top);\n                vec4 rightColor = texture2D(texture, right);\n                vec4 bottomColor = texture2D(texture, bottom);\n                \n                float nLeft = dot(leftColor.rgb, monochromeScale);\n                float nTop = dot(topColor.rgb, monochromeScale);\n                float nRight = dot(rightColor.rgb, monochromeScale);\n                float nBottom = dot(bottomColor.rgb, monochromeScale);\n           \n                float m = (nRight - nLeft) * 0.5;\n                float o = (nBottom - nTop) * 0.5;\n           \n                vec3 dyx = vec3(0.0,  m,  0.1);\n                vec3 dyz = vec3(0.1, -o,  0.0);\n                vec3 dest = normalize(cross(dyx, dyz));\n                vec4 smpColor = vec4((dest.z + 1.0) * 0.5, (dest.x + 1.0) * 0.5, (dest.y + 1.0) * 0.5, 1.0);\n          \n                gl_FragColor  = smpColor;\n            }") || this;
    }
    return NormalMap;
}(Shader));
export { NormalMap };
//# sourceMappingURL=Shader.js.map