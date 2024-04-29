import Field from "../classes/field";
import { TCoord } from "../types/coord";

export default interface ICanvas {
  context: CanvasRenderingContext2D | null | undefined;

  create(width: number, height: number, root: Element | null): void;

  clear(width: number, height: number): void;

  drawPoint(color: string, coord: TCoord, field: Field): void;

  drawEyes(color: string, coord: TCoord, field: Field): void;

  drawBody(color: string, coord: TCoord, field: Field): void;

  clearEyes(color: string, coord: TCoord, field: Field): void;
}
