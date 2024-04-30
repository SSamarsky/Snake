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

  drawPoint(color: string, coord: TCoord, field: Field) {
    if (this.context) this.context.fillStyle = "#000";

    const [x, y] = Tool.getXY(coord);

    this.context?.fillRect(x, y, field.sizeCell, field.sizeCell);
    if (this.context) this.context.fillStyle = color;

    this.context?.fillRect(
      x + field.borderCell,
      y + field.borderCell,
      field.sizeCell - field.borderCell * 2,
      field.sizeCell - field.borderCell * 2
    );
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

  drawHead(colorBody: string, colorEyes: string, coord: TCoord, field: Field) {
    this.drawBody(colorBody, coord, field);
    this.drawEyes(colorEyes, coord, field);
  }

  drawEyes(color: string, coord: TCoord, field: Field) {
    const [x, y] = Tool.getXY(coord);

    if (this.context) this.context.fillStyle = color;

    switch (coord["dir"]) {
      case "y+":
        this.context?.fillRect(
          x + field.sizeCell / 8,
          y + field.sizeCell / 2 - field.sizeCell / 10,
          field.sizeCell / 4,
          field.sizeCell / 4 + field.sizeCell / 10
        );
        this.context?.fillRect(
          x + field.sizeCell - (3 * field.sizeCell) / 8,
          y + field.sizeCell / 2,
          field.sizeCell / 4,
          field.sizeCell / 4
        );
        break;
      case "y-":
        this.context?.fillRect(
          x + field.sizeCell / 8,
          y + field.sizeCell / 2 - field.sizeCell / 4,
          field.sizeCell / 4,
          field.sizeCell / 4
        );
        this.context?.fillRect(
          x + field.sizeCell - (3 * field.sizeCell) / 8,
          y + field.sizeCell / 2 - field.sizeCell / 4,
          field.sizeCell / 4,
          field.sizeCell / 4 + field.sizeCell / 10
        );
        break;
      case "x+":
        this.context?.fillRect(
          x + field.sizeCell / 2,
          y + field.sizeCell / 8,
          field.sizeCell / 4,
          field.sizeCell / 4
        );
        this.context?.fillRect(
          x + field.sizeCell / 2 - field.sizeCell / 8,
          y + field.sizeCell - (3 * field.sizeCell) / 8,
          field.sizeCell / 4 + field.sizeCell / 10,
          field.sizeCell / 4
        );
        break;
      case "x-":
        this.context?.fillRect(
          x + field.sizeCell / 2 - field.sizeCell / 4,
          y + field.sizeCell / 8,
          field.sizeCell / 4 + field.sizeCell / 10,
          field.sizeCell / 4
        );
        this.context?.fillRect(
          x + field.sizeCell / 2 - field.sizeCell / 4,
          y + field.sizeCell - (3 * field.sizeCell) / 8,
          field.sizeCell / 4,
          field.sizeCell / 4
        );
        break;
    }
  }

  drawBody(color: string, coord: TCoord, field: Field) {
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

  clearEyes(color: string, coord: TCoord, field: Field) {
    if (this.context) this.context.fillStyle = color;
    const [x, y] = Tool.getXY(coord);

    this.context?.fillRect(
      x + 0.75,
      y + 0.75,
      field.sizeCell - 1.5,
      field.sizeCell - 1.5
    );
  }

  drawGameOver(color: string, field: Field) {
    let fontSize = 40;
    if (field.width >= 400) fontSize = 45;
    else if (field.width >= 300) fontSize = 35;
    else if (field.width >= 200) fontSize = 25;
    else fontSize = 20;

    const x = field.width / 2 - fontSize * 2 - fontSize / 2 - fontSize / 4;
    const y = field.width / 2 - fontSize;

    if (this.context) {
      this.context.font = `${fontSize}px sans-serif`;
      this.context.fillStyle = color;
    }

    if (field.width >= 100) {
      this.context?.fillText('Game Over!', x, y);
    }

    const emoji = ['😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😠', '😡', '🤬', '😥', '🤯'];
    const ranNum = Math.floor(Math.random() * emoji.length);

    this.context?.fillText(emoji[ranNum], x + fontSize * 2 + fontSize / 5, y + fontSize + fontSize / 4);
  }
}
