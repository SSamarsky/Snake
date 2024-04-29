import IField from "../interfaces/field";

export default class Field implements IField {
    countCellX;
    countCellY;
    sizeCell;
    borderCell;
    width;
    height;
    isWalls;
    
    constructor(countCellX: number, countCellY: number, sizeCell: number, isWalls: boolean) {
        this.countCellX = countCellX;
        this.countCellY = countCellY;
        this.sizeCell = sizeCell;
        this.borderCell = 0.5;
        this.height = countCellY * sizeCell;
        this.width = countCellX * sizeCell;
        this.isWalls = isWalls;
    }
}