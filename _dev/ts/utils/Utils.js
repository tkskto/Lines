import { GLConfig } from "../Config";
import { Vector } from "../module/Vector";
var Methods = (function () {
    function Methods() {
    }
    Methods.showError = function (err) {
        if (err === void 0) { err = null; }
        console.log(err || 'error');
    };
    Methods.getRandomNumber = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    Methods.hsv2RGB = function (hue, saturation, value, alpha) {
        if (saturation > 100 || value > 100 || alpha > 100) {
            return;
        }
        var color = [];
        saturation = saturation / 100;
        value = value / 100;
        if (saturation === 0) {
            color.push(value, value, value, alpha);
        }
        else {
            var th = hue % 360;
            var i = Math.floor(th / 60);
            var f = th / 60 - i;
            var m = value * (1 - saturation);
            var n = value * (1 - saturation * f);
            var k = value * (1 - saturation * (1 - f));
            var r = [value, n, m, m, k, value];
            var g = [k, value, value, n, m, m];
            var b = [m, m, k, value, value, n];
            color.push(r[i], g[i], b[i], alpha);
        }
        return color;
    };
    return Methods;
}());
export { Methods };
var GLUtils = (function () {
    function GLUtils() {
    }
    GLUtils.createVertexShader = function (script, gl) {
        var shader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(shader, script);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }
        else {
            Methods.showError(gl.getShaderInfoLog(shader));
        }
    };
    GLUtils.createFragmentShader = function (script, gl) {
        var shader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(shader, script);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }
        else {
            Methods.showError(gl.getShaderInfoLog(shader));
        }
    };
    GLUtils.createProgram = function (gl, vs, fs) {
        var program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.useProgram(program);
            return program;
        }
        else {
            Methods.showError(gl.getProgramInfoLog(program));
        }
    };
    GLUtils.createVBO = function (gl, data) {
        var vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return vbo;
    };
    GLUtils.createIBO = function (gl, data) {
        var ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        return ibo;
    };
    GLUtils.setAttr = function (gl, vbo, attl, atts) {
        for (var i = 0; i < vbo.length; i++) {
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
            gl.enableVertexAttribArray(attl[i]);
            gl.vertexAttribPointer(attl[i], atts[i], gl.FLOAT, false, 0, 0);
        }
    };
    GLUtils.createFrameBuffer = function (gl, _width, _height) {
        var frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        var depthRenderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRenderBuffer);
        var fTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, fTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fTexture, 0);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return { frameBuffer: frameBuffer, depthBuffer: depthRenderBuffer, texture: fTexture };
    };
    GLUtils.setUniform = function (gl, _uniTypes, _uniLocation, _values) {
        for (var i = 0; i < _uniTypes.length; i++) {
            switch (_uniTypes[i]) {
                case GLConfig.UNIFORM_TYPE_MATRIX4:
                    gl.uniformMatrix4fv(_uniLocation[i], false, _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_VECTOR4:
                    gl.uniform4fv(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_VECTOR3:
                    gl.uniform3fv(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_VECTOR2:
                    gl.uniform2fv(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_VECTOR1:
                    gl.uniform1fv(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_FLOAT:
                    gl.uniform1f(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_INT_VECTOR:
                    gl.uniform1iv(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_INT:
                    gl.uniform1i(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_MATRIX3:
                    gl.uniformMatrix3fv(_uniLocation[i], false, _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_MATRIX2:
                    gl.uniformMatrix2fv(_uniLocation[i], false, _values[i]);
                    break;
                default:
                    Methods.showError("unknown uniform types");
                    break;
            }
        }
    };
    return GLUtils;
}());
export { GLUtils };
var MatrixUtils = (function () {
    function MatrixUtils() {
    }
    MatrixUtils.create = function () {
        return new Float32Array(16);
    };
    MatrixUtils.initialize = function (_mat) {
        _mat[0] = 1;
        _mat[1] = 0;
        _mat[2] = 0;
        _mat[3] = 0;
        _mat[4] = 0;
        _mat[5] = 1;
        _mat[6] = 0;
        _mat[7] = 0;
        _mat[8] = 0;
        _mat[9] = 0;
        _mat[10] = 1;
        _mat[11] = 0;
        _mat[12] = 0;
        _mat[13] = 0;
        _mat[14] = 0;
        _mat[15] = 1;
        return _mat;
    };
    MatrixUtils.multiply = function (_mat1, _mat2, _dist) {
        if (_dist === void 0) { _dist = MatrixUtils.initialize(new Float32Array(16)); }
        var a = _mat1[0], b = _mat1[1], c = _mat1[2], d = _mat1[3], e = _mat1[4], f = _mat1[5], g = _mat1[6], h = _mat1[7], i = _mat1[8], j = _mat1[9], k = _mat1[10], l = _mat1[11], m = _mat1[12], n = _mat1[13], o = _mat1[14], p = _mat1[15], A = _mat2[0], B = _mat2[1], C = _mat2[2], D = _mat2[3], E = _mat2[4], F = _mat2[5], G = _mat2[6], H = _mat2[7], I = _mat2[8], J = _mat2[9], K = _mat2[10], L = _mat2[11], M = _mat2[12], N = _mat2[13], O = _mat2[14], P = _mat2[15];
        _dist[0] = A * a + B * e + C * i + D * m;
        _dist[1] = A * b + B * f + C * j + D * n;
        _dist[2] = A * c + B * g + C * k + D * o;
        _dist[3] = A * d + B * h + C * l + D * p;
        _dist[4] = E * a + F * e + G * i + H * m;
        _dist[5] = E * b + F * f + G * j + H * n;
        _dist[6] = E * c + F * g + G * k + H * o;
        _dist[7] = E * d + F * h + G * l + H * p;
        _dist[8] = I * a + J * e + K * i + L * m;
        _dist[9] = I * b + J * f + K * j + L * n;
        _dist[10] = I * c + J * g + K * k + L * o;
        _dist[11] = I * d + J * h + K * l + L * p;
        _dist[12] = M * a + N * e + O * i + P * m;
        _dist[13] = M * b + N * f + O * j + P * n;
        _dist[14] = M * c + N * g + O * k + P * o;
        _dist[15] = M * d + N * h + O * l + P * p;
        return _dist;
    };
    MatrixUtils.lookAt = function (_targetPos, _cameraPos, _cameraUp, _dist) {
        if (_targetPos.x === _cameraPos.x && _targetPos.y === _cameraPos.y && _targetPos.z === _cameraPos.z) {
            return MatrixUtils.initialize(_dist);
        }
        var vecZ = _targetPos.subtract(_cameraPos).normalize();
        var vecX = _cameraUp.cross(vecZ).normalize();
        var vecY = vecZ.cross(vecX).normalize();
        _dist[0] = vecX.x;
        _dist[1] = vecY.x;
        _dist[2] = vecZ.x;
        _dist[3] = 0;
        _dist[4] = vecX.y;
        _dist[5] = vecY.y;
        _dist[6] = vecZ.y;
        _dist[7] = 0;
        _dist[8] = vecX.z;
        _dist[9] = vecY.z;
        _dist[10] = vecZ.z;
        _dist[11] = 0;
        _dist[12] = -(vecX.x * _targetPos.x + vecX.y * _targetPos.y + vecX.z * _targetPos.z);
        _dist[13] = -(vecY.x * _targetPos.x + vecY.y * _targetPos.y + vecY.z * _targetPos.z);
        _dist[14] = -(vecZ.x * _targetPos.x + vecZ.y * _targetPos.y + vecZ.z * _targetPos.z);
        _dist[15] = 1;
        return _dist;
    };
    MatrixUtils.perspective = function (_fov, _aspect, _near, _far, _dist) {
        var t = _near * Math.tan(_fov * Math.PI / 360);
        var r = t * _aspect;
        var a = r * 2, b = t * 2, c = _far - _near;
        _dist[0] = _near * 2 / a;
        _dist[1] = 0;
        _dist[2] = 0;
        _dist[3] = 0;
        _dist[4] = 0;
        _dist[5] = _near * 2 / b;
        _dist[6] = 0;
        _dist[7] = 0;
        _dist[8] = 0;
        _dist[9] = 0;
        _dist[10] = -(_far + _near) / c;
        _dist[11] = -1;
        _dist[12] = 0;
        _dist[13] = 0;
        _dist[14] = -(_far * _near * 2) / c;
        _dist[15] = 0;
        return _dist;
    };
    return MatrixUtils;
}());
export { MatrixUtils };
var VectorUtils = (function () {
    function VectorUtils() {
    }
    VectorUtils.getFaceNormalArr = function (_vertexArr, _indexArr) {
        var i, len = _vertexArr.length / 3;
        var distArr = [];
        for (i = 0; i < len; i++) {
            var _index1 = _indexArr[i] * 3;
            var _index2 = _indexArr[i] * 3;
            var _index3 = _indexArr[i] * 3;
            var _vec1 = new Vector(_vertexArr[_index1], _vertexArr[_index1 + 1], _vertexArr[_index1 + 2]);
            var _vec2 = new Vector(_vertexArr[_index2], _vertexArr[_index2 + 1], _vertexArr[_index2 + 2]);
            var _vec3 = new Vector(_vertexArr[_index3], _vertexArr[_index3 + 1], _vertexArr[_index3 + 2]);
            var v1 = _vec2.subtract(_vec1).normalize();
            var v2 = _vec3.subtract(_vec1).normalize();
            distArr[i * 3] = v1.y * v2.z - v1.z * v2.y;
            distArr[i * 3 + 1] = v1.z * v2.x - v1.x * v2.z;
            distArr[i * 3 + 2] = v1.x * v2.y - v1.y * v2.x;
        }
        return distArr;
    };
    VectorUtils.getFaceNormalVector = function (_vec1, _vec2, _vec3) {
        var dist = new Vector();
        var v1 = _vec2.subtract(_vec1).normalize();
        var v2 = _vec3.subtract(_vec1).normalize();
        dist.x = v1.y * v2.z - v1.z * v2.y;
        dist.y = v1.z * v2.x - v1.x * v2.z;
        dist.z = v1.x * v2.y - v1.y * v2.x;
        return dist;
    };
    return VectorUtils;
}());
export { VectorUtils };
//# sourceMappingURL=Utils.js.map