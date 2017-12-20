import {Sphere} from '../../utils/Sphere';

export class Data extends Sphere {
    constructor(_row: number, _col: number, _rad: number, _color: number[] = []) {
        super(_row, _col, _rad, _color);
    }
}
