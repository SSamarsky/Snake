import Field from "../classes/field";
import { TCoord } from "../types/coord";

export default interface ICanvas {
  context: CanvasRenderingContext2D | null | undefined;
  el: HTMLCanvasElement;

  create(width: number, height: number, root: Element | null): void;

  clear(width: number, height: number): void;

  drawRectangle(color: string, x1: number, y1: number, x2: number, y2: number): void;

  drawFood(color: string, coord: TCoord, field: Field): void;

  drawEyes(color: string, coord: TCoord, field: Field): void;

  drawBody(color: string, coord: TCoord, field: Field): void;

  clearEyes(color: string, coord: TCoord, field: Field): void;

  drawEndGame(color: string, field: Field, isWin: boolean): void;

  drawWin(width: number, fontSize: number): void;

  drawGameOver(width: number, fontSize: number): void;
}
