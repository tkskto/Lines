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
import { Sphere } from '../../utils/Sphere';
var Data = (function (_super) {
    __extends(Data, _super);
    function Data(_row, _col, _rad, _color) {
        if (_color === void 0) { _color = []; }
        return _super.call(this, _row, _col, _rad, _color) || this;
    }
    return Data;
}(Sphere));
export { Data };
//# sourceMappingURL=Data.js.map