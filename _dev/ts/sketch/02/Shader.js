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
import { Shader } from "../../module/Shader";
var NormalShader = (function (_super) {
    __extends(NormalShader, _super);
    function NormalShader(_gl) {
        var _this = _super.call(this, _gl, [
            'attribute vec3 position;',
            'attribute vec2 texCoord;',
            'uniform mat4 mvpMatrix;',
            'varying vec2 vTexCoord;',
            'void main(void){',
            'vTexCoord = texCoord;',
            'gl_Position  = mvpMatrix * vec4(position, 1.0);',
            '}'
        ].join(''), [
            'precision mediump float;',
            'uniform sampler2D texture;',
            'uniform vec2 resolution;',
            'varying vec2 vTexCoord;',
            'const float RED   = 0.298912;',
            'const float GREEN = 0.586611;',
            'const float BLUE  = 0.114478;',
            'vec3  monochromeScale = vec3(RED, GREEN, BLUE);',
            'void main(void){',
            'float x = gl_FragCoord.x / resolution.x;',
            'float y = gl_FragCoord.y / resolution.y;',
            'float minW = 1.0 / resolution.x;',
            'float minH = 1.0 / resolution.y;',
            'vec2 left = vec2(x - minW < 0.0 ? 1.0 : x - minW , y);',
            'vec2 top = vec2(x, y + minH > 1.0 ? 0.0 : y + minH);',
            'vec2 right = vec2(x + minW > 1.0 ? 0.0 : x + minW, y);',
            'vec2 bottom = vec2(x, y - minH < 0.0 ? 1.0 : y - minH);',
            'vec4 leftColor = texture2D(texture, left);',
            'vec4 topColor = texture2D(texture, top);',
            'vec4 rightColor = texture2D(texture, right);',
            'vec4 bottomColor = texture2D(texture, bottom);',
            'float nLeft = dot(leftColor.rgb, monochromeScale);',
            'float nTop = dot(topColor.rgb, monochromeScale);',
            'float nRight = dot(rightColor.rgb, monochromeScale);',
            'float nBottom = dot(bottomColor.rgb, monochromeScale);',
            'float m = (nRight - nLeft) * 0.5;',
            'float o = (nBottom - nTop) * 0.5;',
            'vec3 dyx = vec3(0.0,  m,  0.1);',
            'vec3 dyz = vec3(0.1, -o,  0.0);',
            'vec3 dest = normalize(cross(dyx, dyz));',
            'vec4 smpColor = vec4((dest.z + 1.0) * 0.5, (dest.x + 1.0) * 0.5, (dest.y + 1.0) * 0.5, 1.0);',
            'gl_FragColor  = smpColor;',
            '}'
        ].join('')) || this;
        _this.compile();
        return _this;
    }
    return NormalShader;
}(Shader));
export { NormalShader };
//# sourceMappingURL=Shader.js.map