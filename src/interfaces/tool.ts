import { TCoord } from "../types/coord";

export default interface ITool {
    getXY(coord: TCoord): number[];

    checkCoord(coord: TCoord, coords: TCoord[]): boolean;

    checkCoordTail(coord: TCoord, coords: TCoord[]): boolean;
}