import ISnake from "../interfaces/snake";
import Canvas from "./canvas";
import Field from "./field";
import Food from "./food";
import Game from "./game";
import { TCoord } from "../types/coord";
import Tool from "./tool";

export default class Snake implements ISnake {
  color;
  delay;
  delayReducing;
  isDelayReducing;
  size;
  coords: TCoord[];
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
    const c = Math.floor(field.width / 2) - field.sizeCell;

    const tail = {
      dir: this.direction,
      coord: c + "-" + c,
    };

    const head = {
      dir: this.direction,
      coord: c + "-" + (c + field.sizeCell),
    };

    this.coords.push(tail, head);

    canvas.drawTail(this.color, tail, field);

    canvas.drawRectangle(this.color, head, field);
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

  toggleSpeed(n: number, canvas: Canvas, field: Field, food: Food, game: Game) {
    if (this.isDelayReducing) {
      this.isDelayReducing = false;
      clearInterval(this.moving);
      this.moving = setInterval(
        () => this.move(canvas, field, food, game),
        this.delay
      );
    } else {
      this.isDelayReducing = true;
      this.delayReducing = this.delay / n;
      clearInterval(this.moving);
      this.moving = setInterval(
        () => this.move(canvas, field, food, game),
        this.delayReducing
      );
    }
  }

  move(canvas: Canvas, field: Field, food: Food, game: Game) {
    let [x, y] = Tool.getXY(this.coords[this.coords.length - 1]);
    const [removeX, removeY] = Tool.getXY(this.coords[0]);

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

    const newHead = { dir: this.direction, coord: x + "-" + y };
    const coordBug: string = this.coords[this.coords.length - 2]["coord"];

    let isCoord = Tool.checkCoord(newHead, this.coords);

    if (isCoord || isWall) {
      if (newHead["coord"] === coordBug) {
        this.isBug = true;
        this.move(canvas, field, food, game);
      } else {
        game.finish(this, food);
      }
    } else {
      this.coords.push(newHead);
      canvas.drawRectangle(this.color, newHead, field);

      if (newHead["coord"] === food.coord["coord"]) {
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

    //canvas.drawTail(this.color, this.coords[0], field);
  }

  clear() {
    this.coords.length = 0;
    this.direction = "y+";
    this.size = 2;
    this.delayReducing = 0;
    this.isDelayReducing = false;
  }
}
