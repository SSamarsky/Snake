import IField from "../interfaces/field";

export default class Field implements IField {
    countCellX;
    countCellY;
    sizeCell;
    width;
    height;
    isWalls;
    
    constructor(countCellX: number, countCellY: number, sizeCell: number, isWalls: boolean) {
        this.countCellX = countCellX;
        this.countCellY = countCellY;
        this.sizeCell = sizeCell;
        this.height = countCellY * sizeCell;
        this.width = countCellX * sizeCell;
        this.isWalls = isWalls;
    }
}