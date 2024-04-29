import { TCoord } from "../types/coord";
import Canvas from "./canvas";
import Field from "./field";
import Tool from "./tool";

export default class Food {
  color;
  x;
  y;
  coord;
  isFood;
  creating: number | undefined;

  constructor(color: string) {
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.coord = { dir: "", coord: "" };
    this.isFood = false;
    this.creating;
  }

  create(canvas: Canvas, field: Field, snakeCoords: TCoord[]) {
    while (!this.isFood) {
      this.x = Math.floor(Math.random() * field.countCellX) * field.sizeCell;
      this.y = Math.floor(Math.random() * field.countCellY) * field.sizeCell;
      this.coord["coord"] = this.x + "-" + this.y;

      let isCoord = Tool.checkCoord(this.coord, snakeCoords);

      if (!isCoord) {
        canvas.drawRectangle(this.color, this.coord, field);
        this.isFood = true;
      }
    }
  }

  clear() {
    this.coord["coord"] = "";
    this.x = 0;
    this.y = 0;
    this.isFood = false;
  }
}
