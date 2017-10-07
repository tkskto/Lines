var Vector = (function () {
    function Vector(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        var _this = this;
        this.initialize = function () {
            _this._x = 0;
            _this._y = 0;
            _this._z = 0;
            return _this;
        };
        this.normalize = function () {
            var len = _this.length;
            if (!len) {
                _this._x = _this._y = _this._z = 0;
            }
            else {
                len = 1 / len;
                _this._x *= len;
                _this._y *= len;
                _this._z *= len;
            }
            return _this;
        };
        this.add = function (_vec) {
            var dist = new Vector();
            dist.x = _this._x + _vec.x;
            dist.y = _this._y + _vec.y;
            dist.z = _this._z + _vec.z;
            return dist;
        };
        this.subtract = function (_vec) {
            var dist = new Vector();
            dist.x = _this._x - _vec.x;
            dist.y = _this._y - _vec.y;
            dist.z = _this._z - _vec.z;
            return dist;
        };
        this.dot = function (_vec) {
            return _this._x * _vec.x + _this._y * _vec.y + _this._z * _vec.z;
        };
        this.cross = function (_vec) {
            var dist = new Vector();
            dist.x = _this._y * _vec.z - _this._z * _vec.y;
            dist.y = _this._z * _vec.x - _this._x * _vec.z;
            dist.z = _this._x * _vec.y - _this._y * _vec.x;
            return dist;
        };
        this.rot = function (_vec) {
            var dot = _this.dot(_vec);
            return Math.acos(dot) * 180 / Math.PI;
        };
        this._x = x;
        this._y = y;
        this._z = z;
    }
    Object.defineProperty(Vector.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (val) {
            this._x = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (val) {
            this._y = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (val) {
            this._z = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "pos", {
        get: function () {
            return [this._x, this._y, this._z];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "length", {
        get: function () {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
        },
        enumerable: true,
        configurable: true
    });
    return Vector;
}());
export { Vector };
//# sourceMappingURL=Vector.js.map