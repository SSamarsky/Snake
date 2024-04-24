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

  clear(canvas: Canvas, field: Field) {
    if (this.coord) {
        const arr = this.coord.split("-");
        const x = Number(arr[0]);
        const y = Number(arr[1]);
        canvas.context?.clearRect(x, y, field.sizeCell, field.sizeCell);
        this.coord = '';
        this.x = 0;
        this.y = 0;
        this.isFood = false;
      }
  }
}
