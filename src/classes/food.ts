import Canvas from "./canvas";
import Field from "./field";


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
    this.coord = "";
    this.isFood = false;
    this.creating;
  }

  create(canvas: Canvas, field: Field, snakeCoords: string[]) {
    while (!this.isFood) {
      this.x = Math.floor(Math.random() * field.countCellX) * field.sizeCell;
      this.y = Math.floor(Math.random() * field.countCellY) * field.sizeCell;
      this.coord = this.x + "-" + this.y;
      if (!snakeCoords.includes(this.coord)) {
        canvas.drawRectangle(
          this.color,
          this.x,
          this.y,
          field.sizeCell,
          field.sizeCell
        );
        this.isFood = true;
      }
    }
  }

  clear() {
        this.coord = '';
        this.x = 0;
        this.y = 0;
        this.isFood = false;
  }
}
