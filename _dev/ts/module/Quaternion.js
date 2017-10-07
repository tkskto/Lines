import { MatrixUtils, Methods } from '../utils/Utils';
import { Vector } from "./Vector";
var Quaternion = (function () {
    function Quaternion(_vec, _rad) {
        if (_vec === void 0) { _vec = new Vector(); }
        if (_rad === void 0) { _rad = 0; }
        var _this = this;
        this.initialize = function (_q) {
            _this._vector.initialize();
            _this._radian = 1;
            return _this;
        };
        this.clone = function () {
            return new Quaternion(_this._vector, _this.radian);
        };
        this.normalize = function () {
            var len = _this.length;
            if (!len) {
                _this._vector.initialize();
                _this._radian = 0;
            }
            else {
                len = 1 / len;
                _this._vector.x *= len;
                _this._vector.y *= len;
                _this._vector.z *= len;
            }
            return _this;
        };
        this.inverse = function () {
            _this._vector.x *= -1;
            _this._vector.y *= -1;
            _this._vector.z *= -1;
            return _this;
        };
        this.multiply = function (_q) {
            var dest = new Quaternion();
            var x1 = _this._vector.x, y1 = _this._vector.y, z1 = _this._vector.z, r1 = _this._radian;
            var x2 = _q._vector.x, y2 = _q._vector.y, z2 = _q._vector.z, r2 = _q._radian;
            dest._vector.x = x1 * r2 + r1 * x2 + y1 * z2 - z1 * y2;
            dest._vector.y = y1 * r2 + r1 * y2 + z1 * x2 - x1 * z2;
            dest._vector.z = z1 * r2 + r1 * z2 + x1 * y2 - y1 * x2;
            dest._radian = r1 * r2 - x1 * x2 - y1 * y2 - z1 * z2;
            return dest;
        };
        this.rotate = function (angle, axis) {
            var sq = axis.length;
            if (!sq) {
                Methods.showError('回転軸がおかしいです。');
                return null;
            }
            var x, y, z;
            if (axis instanceof Vector) {
                axis.normalize();
                x = axis.x;
                y = axis.y;
                z = axis.z;
            }
            else if (axis instanceof Array) {
                var len = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
                if (!len) {
                    return null;
                }
                x = axis[0];
                y = axis[1];
                z = axis[2];
                if (sq != 1) {
                    sq = 1 / sq;
                    x *= sq;
                    y *= sq;
                    z *= sq;
                }
            }
            else {
                Methods.showError('axis is unknown types.');
            }
            var s = Math.sin(angle * 0.5);
            _this._vector.x = x * s;
            _this._vector.y = y * s;
            _this._vector.z = z * s;
            _this._radian = Math.cos(angle * 0.5);
            return _this;
        };
        this.toVector = function (_axis, _qt, _dest) {
            if (_dest === void 0) { _dest = new Vector(); }
            var qp = new Quaternion();
            var qr = new Quaternion();
            qr = _qt.clone().inverse();
            qp.vector.x = _axis.x;
            qp.vector.y = _axis.y;
            qp.vector.z = _axis.z;
            var qq = qr.multiply(qp);
            qr = qq.multiply(_qt);
            _dest = qr.vector;
            return _dest;
        };
        this.toMatrix = function (_dest) {
            if (_dest === void 0) { _dest = MatrixUtils.create(); }
            var x = _this.vector.x;
            var y = _this.vector.y;
            var z = _this.vector.z;
            var w = _this.radian;
            var x2 = x + x, y2 = y + y, z2 = z + z;
            var xx = x * x2, xy = x * y2, xz = x * z2;
            var yy = y * y2, yz = y * z2, zz = z * z2;
            var wx = w * x2, wy = w * y2, wz = w * z2;
            _dest[0] = 1 - (yy + zz);
            _dest[1] = xy - wz;
            _dest[2] = xz + wy;
            _dest[3] = 0;
            _dest[4] = xy + wz;
            _dest[5] = 1 - (xx + zz);
            _dest[6] = yz - wx;
            _dest[7] = 0;
            _dest[8] = xz - wy;
            _dest[9] = yz + wx;
            _dest[10] = 1 - (xx + yy);
            _dest[11] = 0;
            _dest[12] = 0;
            _dest[13] = 0;
            _dest[14] = 0;
            _dest[15] = 1;
            return _dest;
        };
        this._vector = _vec;
        this._radian = _rad;
    }
    Object.defineProperty(Quaternion.prototype, "radian", {
        get: function () {
            return this._radian;
        },
        set: function (value) {
            this._radian = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "vector", {
        get: function () {
            return this._vector;
        },
        set: function (value) {
            this._vector = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "length", {
        get: function () {
            var x = this._vector.x;
            var y = this._vector.y;
            var z = this._vector.z;
            return Math.sqrt(x * x + y * y + z * z + this._radian * this._radian);
        },
        enumerable: true,
        configurable: true
    });
    return Quaternion;
}());
export { Quaternion };
//# sourceMappingURL=Quaternion.js.map