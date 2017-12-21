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
        var _this = _super.call(this, _gl, "#version 300 es\n            in vec3 position;\n            in float vertId;\n            uniform float time;\n            uniform mat4 mvpMatrix;\n            void main(void){\n                vec3 pos = position;\n                if(mod(vertId, 2.0) == 0.0){\n                    pos.y += time;\n                }\n                gl_Position = mvpMatrix * vec4(pos, 1.0);\n            }", "#version 300 es\n            precision highp float;\n            out vec4 outColor;\n            void main(void){\n                outColor = vec4(vec3(1.0, 0.0, 0.0), 1.0);\n            }") || this;
        _this.compile();
        return _this;
    }
    return Default;
}(Shader));
export { Default };
//# sourceMappingURL=Shader.js.map