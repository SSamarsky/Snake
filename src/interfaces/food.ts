import Canvas from "../classes/canvas";
import Field from "../classes/field";
import { TCoord } from "../types/coord";

export default interface IFood {
  color: string;
  x: number;
  y: number;
  coord: TCoord;
  isFood: boolean;
  creating: number | undefined;

  create(canvas: Canvas, field: Field, snakeCoords: string[]): void;

  playCreating(canvas: Canvas, field: Field, snakeCoords: TCoord[]): void;

  stopCreating(): void;

  clear(): void;
}
