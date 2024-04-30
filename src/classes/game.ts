import IGame from "../interfaces/game";
import Canvas from "./canvas";
import Field from "./field";
import Food from "./food";
import Snake from "./snake";

export default class Game implements IGame {
  isStart;
  isPlay;
  isPause;

  constructor() {
    this.isStart = false;
    this.isPlay = false;
    this.isPause = false;
  }

  start(snake: Snake, canvas: Canvas, field: Field, food: Food) {
    if (!this.isStart) {
      this.isStart = true;
      this.isPlay = true;
      this.isPause = false;

      snake.clear();
      food.clear();
      canvas.clear(field.width, field.height);
      snake.create(canvas, field);

      snake.moving = setInterval(
        () => snake.move(canvas, field, food, this),
        snake.delay
      );
      food.creating = setInterval(
        () => food.create(canvas, field, snake.coords),
        snake.delay
      );
    }
  }

  play(snake: Snake, canvas: Canvas, field: Field, food: Food) {
    if (this.isStart && this.isPause && !this.isPlay) {
      this.isPlay = true;
      this.isPause = false;

      snake.moving = setInterval(
        () => snake.move(canvas, field, food, this),
        snake.delay
      );
      food.creating = setInterval(
        () => food.create(canvas, field, snake.coords),
        snake.delay
      );
    }
  }

  pause(snake: Snake, food: Food) {
    if (this.isStart && this.isPlay) {
      this.isPause = true;
      this.isPlay = false;

      clearInterval(snake.moving);
      clearInterval(food.creating);
    }
  }

  gameOver(snake: Snake, food: Food, canvas: Canvas, field: Field) {
    this.isStart = false;
    this.isPlay = false;
    this.isPause = false;

    clearInterval(snake.moving);
    clearInterval(food.creating);
    canvas.drawGameOver("#da0000", field);
  }

  win(snake: Snake, food: Food, canvas: Canvas, field: Field) {
    this.isStart = false;
    this.isPlay = false;
    this.isPause = false;

    clearInterval(snake.moving);
    clearInterval(food.creating);
    canvas.drawWin("#fff", field);
  }

  reset(snake: Snake, canvas: Canvas, field: Field, food: Food) {
    this.isStart = false;
    this.isPlay = false;
    this.isPause = false;

    canvas.clear(field.width, field.height);

    clearInterval(snake.moving);
    clearInterval(food.creating);

    snake.clear();
    food.clear();

    snake.create(canvas, field);
  }
}
