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
        ].join('')) || this;
        _this.compile();
        return _this;
    }
    return Default;
}(Shader));
export { Default };
//# sourceMappingURL=Shader.js.map