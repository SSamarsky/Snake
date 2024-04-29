import { TCoord } from "../types/coord";

export default class Tool {
    static getXY(coord: TCoord) {
        const arr = coord['coord'].split('-');
        const x = Number(arr[0]);
        const y = Number(arr[1]);
        return [x, y];
    }

    static checkCoord(coord: TCoord, coords: TCoord[]) {
        for (const el of coords) {
            if (el['coord'] == coord['coord']) return true;
        }
        return false;
    }

    static checkCoordTail(coord: TCoord, coords: TCoord[]) {
        if (coord['coord'] === coords[0]['coord']) return true;
        return false;
    }
}