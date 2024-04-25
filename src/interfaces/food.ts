import Canvas from "../classes/canvas";
import Field from "../classes/field";

export default interface IFood {
    color: string;
    x: number;
    y: number;
    coord: string;
    isFood: boolean;
    creating: number | undefined;
  
    create(canvas: Canvas, field: Field, snakeCoords: string[]): void;
  
    clear(): void;
}