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

  drawRectangle(color: string, x1: number, y1: number, x2: number, y2: number) {
    if (this.context) this.context.fillStyle = color;
    this.context?.fillRect(x1, y1, x2, y2);
  }

  drawFood(color: string, coord: TCoord, field: Field) {
    const [x, y] = Tool.getXY(coord);

    this.drawRectangle("#000", x, y, field.sizeCell, field.sizeCell);

    this.drawRectangle(
      color,
      x + field.borderCell,
      y + field.borderCell,
      field.sizeCell - field.borderCell * 2,
      field.sizeCell - field.borderCell * 2
    );
  }

  drawBody(color: string, coord: TCoord, field: Field) {
    const [x, y] = Tool.getXY(coord);

    this.drawRectangle("#000", x, y, field.sizeCell, field.sizeCell);

    switch (coord["dir"]) {
      case "y+":
        this.drawRectangle(
          color,
          x + field.borderCell,
          y - field.borderCell * 2,
          field.sizeCell - field.borderCell * 2,
          field.sizeCell + field.borderCell
        );
        break;
      case "y-":
        this.drawRectangle(
          color,
          x + field.borderCell,
          y + field.borderCell * 2,
          field.sizeCell - field.borderCell * 2,
          field.sizeCell + field.borderCell
        );
        break;
      case "x+":
        this.drawRectangle(
          color,
          x - field.borderCell * 2,
          y + field.borderCell,
          field.sizeCell + field.borderCell,
          field.sizeCell - field.borderCell * 2
        );
        break;
      case "x-":
        this.drawRectangle(
          color,
          x + field.borderCell * 2,
          y + field.borderCell,
          field.sizeCell + field.borderCell,
          field.sizeCell - field.borderCell * 2
        );
        break;
    }

    this.drawRectangle(
      color,
      x + field.borderCell - 0.1,
      y + field.borderCell - 0.1,
      field.sizeCell - field.borderCell * 2 + 0.1,
      field.sizeCell - field.borderCell * 2 + 0.1
    );
  }

  drawTail(color: string, coord: TCoord, field: Field) {
    const [x, y] = Tool.getXY(coord);

    this.drawRectangle("#000", x, y, field.sizeCell, field.sizeCell);

    switch (coord["dir"]) {
      case "y+":
        this.drawRectangle(
          color,
          x + field.borderCell,
          y + field.borderCell,
          field.sizeCell - field.borderCell * 2,
          field.sizeCell - field.borderCell
        );
        break;

      case "y-":
        this.drawRectangle(
          color,
          x + field.borderCell,
          y - field.borderCell * 2,
          field.sizeCell - field.borderCell * 2,
          field.sizeCell - field.borderCell
        );
        break;

      case "x+":
        this.drawRectangle(
          color,
          x + field.borderCell,
          y + field.borderCell,
          field.sizeCell + field.borderCell,
          field.sizeCell - field.borderCell * 2
        );
        break;

      case "x-":
        this.drawRectangle(
          color,
          x - field.borderCell * 2,
          y + field.borderCell,
          field.sizeCell - field.borderCell,
          field.sizeCell - field.borderCell * 2
        );
        break;
    }

    this.drawRectangle(
      color,
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

    switch (coord["dir"]) {
      case "y+":
        this.drawRectangle(
          color,
          x + field.sizeCell / 8,
          y + field.sizeCell / 2 - field.sizeCell / 10,
          field.sizeCell / 4,
          field.sizeCell / 4 + field.sizeCell / 10
        );
        this.drawRectangle(
          color,
          x + field.sizeCell - (3 * field.sizeCell) / 8,
          y + field.sizeCell / 2,
          field.sizeCell / 4,
          field.sizeCell / 4
        );
        break;

      case "y-":
        this.drawRectangle(
          color,
          x + field.sizeCell / 8,
          y + field.sizeCell / 2 - field.sizeCell / 4,
          field.sizeCell / 4,
          field.sizeCell / 4
        );
        this.drawRectangle(
          color,
          x + field.sizeCell - (3 * field.sizeCell) / 8,
          y + field.sizeCell / 2 - field.sizeCell / 4,
          field.sizeCell / 4,
          field.sizeCell / 4 + field.sizeCell / 10
        );
        break;

      case "x+":
        this.drawRectangle(
          color,
          x + field.sizeCell / 2,
          y + field.sizeCell / 8,
          field.sizeCell / 4,
          field.sizeCell / 4
        );
        this.drawRectangle(
          color,
          x + field.sizeCell / 2 - field.sizeCell / 8,
          y + field.sizeCell - (3 * field.sizeCell) / 8,
          field.sizeCell / 4 + field.sizeCell / 10,
          field.sizeCell / 4
        );
        break;

      case "x-":
        this.drawRectangle(
          color,
          x + field.sizeCell / 2 - field.sizeCell / 4,
          y + field.sizeCell / 8,
          field.sizeCell / 4 + field.sizeCell / 10,
          field.sizeCell / 4
        );
        this.drawRectangle(
          color,
          x + field.sizeCell / 2 - field.sizeCell / 8,
          y + field.sizeCell - (3 * field.sizeCell) / 8,
          field.sizeCell / 4,
          field.sizeCell / 4
        );
        break;
    }
  }

  clearEyes(color: string, coord: TCoord, field: Field) {
    const [x, y] = Tool.getXY(coord);

    this.drawRectangle(
      color,
      x + 0.75,
      y + 0.75,
      field.sizeCell - 1.5,
      field.sizeCell - 1.5
    );
  }

  drawEndGame(color: string, field: Field, isWin = false) {
    let fontSize;
    if (field.width >= 400) fontSize = 45;
    else if (field.width >= 300) fontSize = 35;
    else if (field.width >= 200) fontSize = 25;
    else fontSize = 20;

    if (this.context) {
      this.context.font = `${fontSize}px sans-serif`;
      this.context.fillStyle = color;
    }

    if (isWin) this.drawWin(field.width, fontSize);
    else this.drawGameOver(field.width, fontSize);
  }

  drawWin(width: number, fontSize: number) {
    const x = width / 2 - fontSize * 2;
    const y = width / 2 - fontSize;

    const text = "You won!";
    const emojis = ["🏆", "🥇", "🏅", "🎖", "🎗", "💎", "💰"];
    const ranNum = Math.floor(Math.random() * emojis.length);

    this.context?.fillText(
      emojis[ranNum],
      x + fontSize + fontSize / 2,
      y + fontSize + fontSize / 4
    );

    if (width >= 100) this.context?.fillText(text, x, y);
  }

  drawGameOver(width: number, fontSize: number) {
    const x = width / 2 - fontSize * 2 - fontSize / 2 - fontSize / 4;
    const y = width / 2 - fontSize;

    const text = "Game Over";
    const emojis = [
      "😔",
      "😟",
      "😕",
      "🙁",
      "☹️",
      "😣",
      "😖",
      "😫",
      "😩",
      "🥺",
      "😢",
      "😭",
      "😠",
      "😡",
      "🤬",
      "😥",
      "🤯",
    ];
    const ranNum = Math.floor(Math.random() * emojis.length);

    this.context?.fillText(
      emojis[ranNum],
      x + fontSize * 2 + fontSize / 5,
      y + fontSize + fontSize / 4
    );

    if (width > 120) this.context?.fillText(text, x, y);
  }
}
