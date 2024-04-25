import ISnake from "../interfaces/snake";
import Canvas from "./canvas";
import Field from "./field";
import Food from "./food";

export default class Snake implements ISnake {
  color;
  delay;
  delayReducing;
  isDelayReducing;
  size;
  coords: string[];
  direction;
  directionPrev;
  directionNext;
  moving: number | undefined;
  isBug;
  isDebug;

  constructor(color: string, delay: number) {
    this.color = color;
    this.delay = delay;
    this.delayReducing = 0;
    this.isDelayReducing = false;
    this.size = 2;
    this.coords = [];
    this.direction = "y+";
    this.directionPrev = "y+";
    this.directionNext = "y+";
    this.moving;
    this.isBug = false;
    this.isDebug = false;
  }

  create(canvas: Canvas, field: Field) {
    const coord = Math.floor(field.width / 2) - field.sizeCell;
    canvas.drawRectangle(
      this.color,
      coord,
      coord,
      field.sizeCell,
      field.sizeCell
    );

    canvas.drawRectangle(
      this.color,
      coord,
      coord + field.sizeCell,
      field.sizeCell,
      field.sizeCell
    );

    const tail: string = coord + "-" + coord;
    const head: string = coord + "-" + (coord + field.sizeCell);
    this.coords.push(tail, head);
  }
  
  setDirection(e: KeyboardEvent) {
    const keyboardsKey = {
      left: ["ArrowLeft", "a", "A", "ф", "Ф"],
      right: ["ArrowRight", "d", "D", "в", "В"],
      up: ["ArrowUp", "w", "W", "ц", "Ц"],
      down: ["ArrowDown", "s", "S", "ы", "Ы"],
    };

    if (keyboardsKey.left.includes(e.key) && this.direction !== "x+") {
      this.directionPrev = this.direction;
      this.direction = "x-";
      this.directionNext = "x-";
    } else if (keyboardsKey.right.includes(e.key) && this.direction !== "x-") {
      this.directionPrev = this.direction;
      this.direction = "x+";
      this.directionNext = "x+";
    } else if (keyboardsKey.up.includes(e.key) && this.direction !== "y+") {
      this.directionPrev = this.direction;
      this.direction = "y-";
      this.directionNext = "y-";
    } else if (keyboardsKey.down.includes(e.key) && this.direction !== "y-") {
      this.directionPrev = this.direction;
      this.direction = "y+";
      this.directionNext = "y+";
    }
  }

  toggleSpeed(n: number, canvas: Canvas, field: Field, food: Food) {
    if (this.isDelayReducing) {
      this.isDelayReducing = false;
      clearInterval(this.moving);
      this.moving = setInterval(() => this.move(canvas, field, food), this.delay);
    } else {
      this.isDelayReducing = true;
      this.delayReducing = this.delay / n;
      clearInterval(this.moving);
      this.moving = setInterval(() => this.move(canvas, field, food), this.delayReducing);
    }

    
  }

  move(canvas: Canvas, field: Field, food: Food) {
    const head: string[] = this.coords[this.coords.length - 1].split("-");
    const tail: string[] = this.coords[0].split("-");

    let x = Number(head[0]);
    let y = Number(head[1]);

    const removeX = Number(tail[0]);
    const removeY = Number(tail[1]);

    let isWall = false;

    if (this.isBug) {
      this.direction = this.directionPrev;
      if (this.isDebug) {
        this.direction = this.directionNext;
        this.isBug = false;
        this.isDebug = false;
      } else this.isDebug = true;
    }

    switch (this.direction) {
      case "y-":
        y = y - field.sizeCell;
        if (field.isWalls) isWall = y < 0 ? true : false;
        else {
          if (y < 0) y = field.height - field.sizeCell;
        }
        break;
      case "y+":
        y = y + field.sizeCell;
        if (field.isWalls)
          isWall = y > field.height - field.sizeCell ? true : false;
        else {
          if (y === field.width) y = 0;
        }
        break;
      case "x+":
        x = x + field.sizeCell;
        if (field.isWalls)
          isWall = x > field.width - field.sizeCell ? true : false;
        else {
          if (x === field.width) x = 0;
        }
        break;
      case "x-":
        x = x - field.sizeCell;
        if (field.isWalls) isWall = x < 0 ? true : false;
        else {
          if (x < 0) x = field.width - field.sizeCell;
        }
        break;
    }

    const newHead: string = x + "-" + y;
    const coordBug: string = this.coords[this.coords.length - 2];

    if (this.coords.includes(newHead) || isWall) {
      if (newHead === coordBug) {
        this.isBug = true;
        this.move(canvas, field, food);
      } else {
        console.log("Game Over!");
      }
    } else {
      this.coords.push(newHead);
      canvas.drawRectangle(this.color, x, y, field.sizeCell, field.sizeCell);

      if (newHead === food.coord) {
        food.isFood = false;
        this.size += 1;
      } else {
        canvas.context?.clearRect(
          removeX,
          removeY,
          field.sizeCell,
          field.sizeCell
        );
        this.coords.shift();
      }
    }
  }

  clear(canvas: Canvas, field: Field) {
    if (this.coords.length !== 0) {
      this.coords.map((el) => {
        const arr = el.split("-");
        const x = Number(arr[0]);
        const y = Number(arr[1]);
        canvas.context?.clearRect(x, y, field.sizeCell, field.sizeCell);
      });
    }
    this.coords.length = 0;
    this.direction = "y+";
    this.size = 2;
  }
}
