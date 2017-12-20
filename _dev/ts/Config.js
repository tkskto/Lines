var AppConfig = (function () {
    function AppConfig() {
    }
    AppConfig.NAME_TYPE_CANVAS2D = 'canvas2D';
    AppConfig.NAME_TYPE_WEBGL = 'webGL';
    return AppConfig;
}());
export { AppConfig };
var GLConfig = (function () {
    function GLConfig() {
    }
    GLConfig.UNIFORM_TYPE_MATRIX4 = 'matrix4fv';
    GLConfig.UNIFORM_TYPE_MATRIX3 = 'matrix3fv';
    GLConfig.UNIFORM_TYPE_MATRIX2 = 'matrix2fv';
    GLConfig.UNIFORM_TYPE_VECTOR4 = '4fv';
    GLConfig.UNIFORM_TYPE_VECTOR3 = '3fv';
    GLConfig.UNIFORM_TYPE_VECTOR2 = '2fv';
    GLConfig.UNIFORM_TYPE_VECTOR1 = '1fv';
    GLConfig.UNIFORM_TYPE_FLOAT = '1f';
    GLConfig.UNIFORM_TYPE_INT_VECTOR = '1iv';
    GLConfig.UNIFORM_TYPE_INT = '1i';
    GLConfig.DRAW_TYPE_POINT = 'point';
    GLConfig.DRAW_TYPE_LINE = 'line';
    GLConfig.DRAW_TYPE_LINE_STRIP = 'line_strip';
    GLConfig.DRAW_TYPE_LINE_LOOP = 'line_loop';
    GLConfig.DRAW_TYPE_TRIANGLE = 'triangle';
    GLConfig.DRAW_TYPE_TRIANGLE_STRIP = 'triangle_strip';
    GLConfig.DRAW_TYPE_TRIANGLE_FAN = 'triangle_fan';
    return GLConfig;
}());
export { GLConfig };
//# sourceMappingURL=Config.js.map