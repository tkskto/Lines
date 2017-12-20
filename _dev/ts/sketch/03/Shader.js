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
        var _this = _super.call(this, _gl, [
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
        ].join('')) || this;
        _this.compile();
        return _this;
    }
    return Default;
}(Shader));
export { Default };
//# sourceMappingURL=Shader.js.map