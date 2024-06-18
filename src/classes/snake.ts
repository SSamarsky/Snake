import ISnake from "../interfaces/snake";
import Canvas from "./canvas";
import Field from "./field";
import Food from "./food";
import Game from "./game";
import { TCoord } from "../types/coord";
import Tool from "./tool";
import Score from "./score";
import Time from "./time";
import Settings from "./settings";

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
    const c = Math.floor(field.countCellX / 2) * field.sizeCell;

    const tail = {
      dir: this.direction,
      coord: c + "-" + (c - field.sizeCell),
    };

    const head = {
      dir: this.direction,
      coord: c + "-" + c,
    };

    this.coords.push(tail, head);

    canvas.drawTail(this.color, tail, field);
    canvas.drawHead(this.color, "orange", head, field);
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

  toggleSpeed(
    n: number,
    canvas: Canvas,
    field: Field,
    food: Food,
    game: Game,
    time: Time,
    score: Score,
    settings: Settings
  ) {
    if (this.isDelayReducing) {
      this.isDelayReducing = false;
      clearInterval(this.moving);
      this.moving = setInterval(
        () => this.move(canvas, field, food, game, time, score, settings),
        this.delay
      );
    } else {
      this.isDelayReducing = true;
      this.delayReducing = this.delay / n;
      clearInterval(this.moving);
      this.moving = setInterval(
        () => this.move(canvas, field, food, game, time, score, settings),
        this.delayReducing
      );
    }
  }

  move(
    canvas: Canvas,
    field: Field,
    food: Food,
    game: Game,
    time: Time,
    score: Score,
    settings: Settings
  ) {
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
    const coordPrevHead = this.coords[this.coords.length - 2];
    const coordHead = this.coords[this.coords.length - 1];

    let isCoord = Tool.checkCoord(newHead, this.coords);

    if (isCoord || isWall) {
      if (newHead["coord"] === coordPrevHead["coord"]) {
        this.isBug = true;
        this.move(canvas, field, food, game, time, score, settings);
      } else {
        game.finish(this, food, canvas, field, time, false, settings);
      }
    } else {
      this.coords.push(newHead);
      canvas.drawHead(this.color, "orange", newHead, field);
      canvas.clearEyes(this.color, coordHead, field);

      if (newHead["coord"] === food.coord["coord"]) {
        food.isFood = false;
        this.size += 1;
        score.update(this.size);

        if (this.size === field.countCellX * field.countCellY) {
          game.finish(this, food, canvas, field, time, true, settings);
        }
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

  playMoving(
    canvas: Canvas,
    field: Field,
    food: Food,
    game: Game,
    time: Time,
    score: Score,
    settings: Settings
  ) {
    this.moving = setInterval(
      () => this.move(canvas, field, food, game, time, score, settings),
      this.delay
    );
  }

  stopMoving() {
    clearInterval(this.moving);
  }

  clear() {
    this.stopMoving();
    this.coords.length = 0;
    this.direction = "y+";
    this.size = 2;
    this.delayReducing = 0;
    this.isDelayReducing = false;
  }
}
