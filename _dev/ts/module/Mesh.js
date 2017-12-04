import { GLUtils, MatrixUtils, Methods } from "../utils/Utils";
import { Vector } from "./Vector";
var Mesh = (function () {
    function Mesh(_gl, _prg, _geometry) {
        var _this = this;
        this._gl = _gl;
        this._prg = _prg;
        this._geometry = _geometry;
        this._position = { x: 0, y: 0, z: 0 };
        this.reset = function () {
            MatrixUtils.initialize(_this._mMatrix);
            _this._position = { x: 0, y: 0, z: 0 };
        };
        this.ready = function (_values) {
            if (_values === void 0) { _values = null; }
            GLUtils.setAttr(_this._gl, _this._geometry.vbo, _this._prg.attl, _this._prg.atts);
            if (_this._geometry.ibo) {
                _this._gl.bindBuffer(_this._gl.ELEMENT_ARRAY_BUFFER, _this._geometry.ibo);
            }
            if (_this._prg.uniType.length > 0) {
                GLUtils.setUniform(_this._gl, _this._prg.uniType, _this._prg.unil, _values);
            }
        };
        this.drawPoints = function () {
            _this._gl.drawArrays(_this._gl.POINTS, 0, _this._geometry.VERTEX.length);
        };
        this.drawElements = function () {
            _this._gl.drawElements(_this._gl.TRIANGLES, _this._geometry.INDEX.length, _this._gl.UNSIGNED_SHORT, 0);
        };
        this.drawStrip = function () {
            _this._gl.drawArrays(_this._gl.TRIANGLE_STRIP, 0, _this._geometry.VERTEX.length / 3);
        };
        this.translate = function (_vec) {
            var mat = _this._mMatrix.copyWithin(0, 0);
            _this._mMatrix[0] = mat[0];
            _this._mMatrix[1] = mat[1];
            _this._mMatrix[2] = mat[2];
            _this._mMatrix[3] = mat[3];
            _this._mMatrix[4] = mat[4];
            _this._mMatrix[5] = mat[5];
            _this._mMatrix[6] = mat[6];
            _this._mMatrix[7] = mat[7];
            _this._mMatrix[8] = mat[8];
            _this._mMatrix[9] = mat[9];
            _this._mMatrix[10] = mat[10];
            _this._mMatrix[11] = mat[11];
            if (_vec instanceof Vector) {
                _this._position.x += _vec.x;
                _this._position.y += _vec.y;
                _this._position.z += _vec.z;
                _this._mMatrix[12] = mat[0] * _vec.x + mat[4] * _vec.y + mat[8] * _vec.z + mat[12];
                _this._mMatrix[13] = mat[1] * _vec.x + mat[5] * _vec.y + mat[9] * _vec.z + mat[13];
                _this._mMatrix[14] = mat[2] * _vec.x + mat[6] * _vec.y + mat[10] * _vec.z + mat[14];
                _this._mMatrix[15] = mat[3] * _vec.x + mat[7] * _vec.y + mat[11] * _vec.z + mat[15];
            }
            else {
                _this._position.x += _vec[0];
                _this._position.y += _vec[1];
                _this._position.z += _vec[2];
                _this._mMatrix[12] = mat[0] * _vec[0] + mat[4] * _vec[1] + mat[8] * _vec[2] + mat[12];
                _this._mMatrix[13] = mat[1] * _vec[0] + mat[5] * _vec[1] + mat[9] * _vec[2] + mat[13];
                _this._mMatrix[14] = mat[2] * _vec[0] + mat[6] * _vec[1] + mat[10] * _vec[2] + mat[14];
                _this._mMatrix[15] = mat[3] * _vec[0] + mat[7] * _vec[1] + mat[11] * _vec[2] + mat[15];
            }
        };
        this.scale = function (_vec) {
            var mat = _this._mMatrix.copyWithin(0, 0);
            if (_vec instanceof Vector) {
                _this._mMatrix[0] = mat[0] * _vec.x;
                _this._mMatrix[1] = mat[1] * _vec.x;
                _this._mMatrix[2] = mat[2] * _vec.x;
                _this._mMatrix[3] = mat[3] * _vec.x;
                _this._mMatrix[4] = mat[4] * _vec.y;
                _this._mMatrix[5] = mat[5] * _vec.y;
                _this._mMatrix[6] = mat[6] * _vec.y;
                _this._mMatrix[7] = mat[7] * _vec.y;
                _this._mMatrix[8] = mat[8] * _vec.z;
                _this._mMatrix[9] = mat[9] * _vec.z;
                _this._mMatrix[10] = mat[10] * _vec.z;
                _this._mMatrix[11] = mat[11] * _vec.z;
            }
            else if (_vec instanceof Array) {
                _this._mMatrix[0] = mat[0] * _vec[0];
                _this._mMatrix[1] = mat[1] * _vec[0];
                _this._mMatrix[2] = mat[2] * _vec[0];
                _this._mMatrix[3] = mat[3] * _vec[0];
                _this._mMatrix[4] = mat[4] * _vec[1];
                _this._mMatrix[5] = mat[5] * _vec[1];
                _this._mMatrix[6] = mat[6] * _vec[1];
                _this._mMatrix[7] = mat[7] * _vec[1];
                _this._mMatrix[8] = mat[8] * _vec[2];
                _this._mMatrix[9] = mat[9] * _vec[2];
                _this._mMatrix[10] = mat[10] * _vec[2];
                _this._mMatrix[11] = mat[11] * _vec[2];
            }
            else {
                Methods.showError('_vec is unknown types');
            }
            _this._mMatrix[12] = mat[12];
            _this._mMatrix[13] = mat[13];
            _this._mMatrix[14] = mat[14];
            _this._mMatrix[15] = mat[15];
        };
        this.extrude = function (_depth) {
        };
        this.rotate = function (_angle, _axis) {
            var mat = _this._mMatrix.copyWithin(0, 0);
            var sq;
            var a, b, c;
            if (_axis instanceof Vector) {
                sq = _axis.length;
                a = _axis.x;
                b = _axis.y;
                c = _axis.z;
            }
            else {
                sq = Math.sqrt(_axis[0] * _axis[0] + _axis[1] * _axis[1] + _axis[2] * _axis[2]);
                a = _axis[0];
                b = _axis[1];
                c = _axis[2];
            }
            if (!sq) {
                return null;
            }
            if (sq != 1) {
                sq = 1 / sq;
                a *= sq;
                b *= sq;
                c *= sq;
            }
            var d = Math.sin(_angle), e = Math.cos(_angle), f = 1 - e, g = mat[0], h = mat[1], i = mat[2], j = mat[3], k = mat[4], l = mat[5], m = mat[6], n = mat[7], o = mat[8], p = mat[9], q = mat[10], r = mat[11], s = a * a * f + e, t = b * a * f + c * d, u = c * a * f - b * d, v = a * b * f - c * d, w = b * b * f + e, x = c * b * f + a * d, y = a * c * f + b * d, z = b * c * f - a * d, A = c * c * f + e;
            if (_angle) {
                if (mat != _this._mMatrix) {
                    _this._mMatrix[12] = mat[12];
                    _this._mMatrix[13] = mat[13];
                    _this._mMatrix[14] = mat[14];
                    _this._mMatrix[15] = mat[15];
                }
            }
            else {
                _this._mMatrix = mat;
            }
            _this._mMatrix[0] = g * s + k * t + o * u;
            _this._mMatrix[1] = h * s + l * t + p * u;
            _this._mMatrix[2] = i * s + m * t + q * u;
            _this._mMatrix[3] = j * s + n * t + r * u;
            _this._mMatrix[4] = g * v + k * w + o * x;
            _this._mMatrix[5] = h * v + l * w + p * x;
            _this._mMatrix[6] = i * v + m * w + q * x;
            _this._mMatrix[7] = j * v + n * w + r * x;
            _this._mMatrix[8] = g * y + k * z + o * A;
            _this._mMatrix[9] = h * y + l * z + p * A;
            _this._mMatrix[10] = i * y + m * z + q * A;
            _this._mMatrix[11] = j * y + n * z + r * A;
        };
        this.setMatrix = function (_vpMatrix) {
            return MatrixUtils.multiply(_this._mMatrix, _vpMatrix);
        };
        this.setQuaternion = function (_qMatrix) {
            _this._mMatrix = MatrixUtils.multiply(_this._mMatrix, _qMatrix, _this._mMatrix);
        };
        this._mMatrix = MatrixUtils.initialize(MatrixUtils.create());
    }
    Object.defineProperty(Mesh.prototype, "mMatrix", {
        get: function () {
            return this._mMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    return Mesh;
}());
export { Mesh };
//# sourceMappingURL=Mesh.js.map