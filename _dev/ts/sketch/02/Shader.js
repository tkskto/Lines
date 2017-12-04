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
var CanvasShader = (function (_super) {
    __extends(CanvasShader, _super);
    function CanvasShader(_gl) {
        var _this = _super.call(this, _gl, [
            'attribute vec3 position;',
            'attribute vec3 normal;',
            'attribute vec4 color;',
            'attribute vec2 texCoord;',
            'uniform   mat4 mMatrix;',
            'uniform   mat4 mvpMatrix;',
            'uniform   mat4 invMatrix;',
            'uniform   vec3 lightPosition;',
            'uniform   vec3 eyePosition;',
            'varying   vec4 vColor;',
            'varying   vec3 vEyeDirection;',
            'varying   vec3 vLightDirection;',
            'varying   vec2 vTexCoord;',
            'void main(void){',
            'vec3 pos      = (mMatrix * vec4(position, 0.0)).xyz;',
            'vec3 invEye   = (invMatrix * vec4(eyePosition, 0.0)).xyz;',
            'vec3 invLight = (invMatrix * vec4(lightPosition, 0.0)).xyz;',
            'vec3 eye      = invEye - pos;',
            'vec3 light    = invLight - pos;',
            'vec3 n = normalize(normal);',
            'vec3 t = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));',
            'vec3 b = cross(n, t);',
            'vEyeDirection.x   = dot(t, eye);',
            'vEyeDirection.y   = dot(b, eye);',
            'vEyeDirection.z   = dot(n, eye);',
            'normalize(vEyeDirection);',
            'vLightDirection.x = dot(t, light);',
            'vLightDirection.y = dot(b, light);',
            'vLightDirection.z = dot(n, light);',
            'normalize(vLightDirection);',
            'vColor         = color;',
            'vTexCoord  = texCoord;',
            'gl_Position    = mvpMatrix * vec4(position, 1.0);',
            '}'
        ].join(''), [
            'precision mediump float;',
            'uniform sampler2D texture;',
            'uniform int bumpFlg;',
            'varying vec4 vColor;',
            'varying vec2 vTexCoord;',
            'varying vec3 vEyeDirection;',
            'varying vec3 vLightDirection;',
            'void main(void){',
            'vec4  destColor = vec4(0.0);',
            'if(bool(bumpFlg)) {',
            'vec3 mNormal    = (texture2D(texture, vTexCoord) * 2.0 - 1.0).rgb;',
            'vec3 light      = normalize(vLightDirection);',
            'vec3 eye        = normalize(vEyeDirection);',
            'vec3 halfLE     = normalize(light + eye);',
            'float diffuse   = clamp(dot(mNormal, light), 0.1, 1.0);',
            'float specular  = pow(clamp(dot(mNormal, halfLE), 0.0, 1.0), 100.0);',
            'destColor = vColor * vec4(vec3(diffuse), 1.0) + vec4(vec3(specular), 1.0);',
            '} else {',
            'destColor = texture2D(texture, vTexCoord);',
            '}',
            'gl_FragColor = destColor;',
            '}'
        ].join('')) || this;
        _this.compile();
        return _this;
    }
    return CanvasShader;
}(Shader));
export { CanvasShader };
//# sourceMappingURL=Shader.js.map