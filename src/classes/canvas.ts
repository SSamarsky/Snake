import ICanvas from "../interfaces/canvas";
import { TCoord } from "../types/coord";
import Field from "./field";
import Tool from "./tool";

export default class Canvas implements ICanvas {
  context: CanvasRenderingContext2D | null | undefined;

  constructor() {
    this.context;
  }

  create(width: number, height: number, root: Element | null) {
    const canvas = document.createElement("canvas");
    this.context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    canvas.className = "canvas";
    root?.appendChild(canvas);
  }

  clear(width: number, height: number) {
    this.context?.clearRect(0, 0, width, height);
  }

  drawRectangle(color: string, coord: TCoord, field: Field) {
    if (this.context) this.context.fillStyle = "#000";

    const [x, y] = Tool.getXY(coord);

    this.context?.fillRect(x, y, field.sizeCell, field.sizeCell);
    if (this.context) this.context.fillStyle = color;

    if (!coord["dir"])
      this.context?.fillRect(
        x + field.borderCell,
        y + field.borderCell,
        field.sizeCell - field.borderCell * 2,
        field.sizeCell - field.borderCell * 2
      );
    else {
      switch (coord["dir"]) {
        case "y+":
          this.context?.fillRect(
            x + field.borderCell,
            y - field.borderCell * 2,
            field.sizeCell - field.borderCell * 2,
            field.sizeCell + field.borderCell
          );
          break;
        case "y-":
          this.context?.fillRect(
            x + field.borderCell,
            y + field.borderCell * 2,
            field.sizeCell - field.borderCell * 2,
            field.sizeCell + field.borderCell
          );
          break;
        case "x+":
          this.context?.fillRect(
            x - field.borderCell * 2,
            y + field.borderCell,
            field.sizeCell + field.borderCell,
            field.sizeCell - field.borderCell * 2
          );
          break;
        case "x-":
          this.context?.fillRect(
            x + field.borderCell * 2,
            y + field.borderCell,
            field.sizeCell + field.borderCell,
            field.sizeCell - field.borderCell * 2
          );
          break;
      }

      this.context?.fillRect(
        x + field.borderCell - 0.1,
        y + field.borderCell - 0.1,
        field.sizeCell - field.borderCell * 2 + 0.1,
        field.sizeCell - field.borderCell * 2 + 0.1
      );
    }
  }

  drawTail(color: string, coord: TCoord, field: Field) {
    if (this.context) this.context.fillStyle = "#000";

    const [x, y] = Tool.getXY(coord);

    this.context?.fillRect(x, y, field.sizeCell, field.sizeCell);
    if (this.context) this.context.fillStyle = color;
    
    switch (coord["dir"]) {
      case "y+":
        this.context?.fillRect(
          x + field.borderCell,
          y + field.borderCell,
          field.sizeCell - field.borderCell * 2,
          field.sizeCell - field.borderCell
        );
        break;
      case "y-":
        this.context?.fillRect(
          x + field.borderCell,
          y - field.borderCell * 2,
          field.sizeCell - field.borderCell * 2,
          field.sizeCell + field.borderCell
        );
        break;
      case "x+":
        this.context?.fillRect(
          x + field.borderCell,
          y + field.borderCell,
          field.sizeCell + field.borderCell,
          field.sizeCell - field.borderCell * 2
        );
        break;
      case "x-":
        this.context?.fillRect(
          x - field.borderCell * 2,
          y + field.borderCell,
          field.sizeCell - field.borderCell,
          field.sizeCell - field.borderCell * 2
        );
        break;
    }

    this.context?.fillRect(
      x + field.borderCell - 0.1,
      y + field.borderCell - 0.1,
      field.sizeCell - field.borderCell * 2 + 0.1,
      field.sizeCell - field.borderCell * 2 + 0.1
    );
  }
}
