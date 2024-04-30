import IGame from "../interfaces/game";
import Canvas from "./canvas";
import Field from "./field";
import Food from "./food";
import Score from "./score";
import Snake from "./snake";
import Time from "./time";

export default class Game implements IGame {
  isStart;
  isPlay;
  isPause;

  constructor() {
    this.isStart = false;
    this.isPlay = false;
    this.isPause = false;
  }

  start(
    snake: Snake,
    canvas: Canvas,
    field: Field,
    food: Food,
    time: Time,
    score: Score
  ) {
    if (!this.isStart) {
      this.isStart = true;
      this.isPlay = true;
      this.isPause = false;

      snake.clear();
      food.clear();
      canvas.clear(field.width, field.height);
      snake.create(canvas, field);

      snake.moving = setInterval(
        () => snake.move(canvas, field, food, this, time, score),
        snake.delay
      );
      food.creating = setInterval(
        () => food.create(canvas, field, snake.coords),
        snake.delay
      );
      time.clear();
      time.play();
    }
  }

  play(
    snake: Snake,
    canvas: Canvas,
    field: Field,
    food: Food,
    time: Time,
    score: Score
  ) {
    if (this.isStart && this.isPause && !this.isPlay) {
      this.isPlay = true;
      this.isPause = false;

      snake.moving = setInterval(
        () => snake.move(canvas, field, food, this, time, score),
        snake.delay
      );
      food.creating = setInterval(
        () => food.create(canvas, field, snake.coords),
        snake.delay
      );

      time.play();
    }
  }

  pause(snake: Snake, food: Food, time: Time) {
    if (this.isStart && this.isPlay) {
      this.isPause = true;
      this.isPlay = false;

      clearInterval(snake.moving);
      clearInterval(food.creating);

      time.pause();
    }
  }

  gameOver(snake: Snake, food: Food, canvas: Canvas, field: Field, time: Time) {
    this.isStart = false;
    this.isPlay = false;
    this.isPause = false;

    clearInterval(snake.moving);
    clearInterval(food.creating);
    canvas.drawGameOver("#da0000", field);

    time.pause();
  }

  win(snake: Snake, food: Food, canvas: Canvas, field: Field, time: Time) {
    this.isStart = false;
    this.isPlay = false;
    this.isPause = false;

    clearInterval(snake.moving);
    clearInterval(food.creating);
    canvas.drawWin("#fff", field);

    time.pause();
  }

  reset(
    snake: Snake,
    canvas: Canvas,
    field: Field,
    food: Food,
    time: Time,
    score: Score
  ) {
    this.isStart = false;
    this.isPlay = false;
    this.isPause = false;

    canvas.clear(field.width, field.height);

    clearInterval(snake.moving);
    clearInterval(food.creating);

    snake.clear();
    food.clear();

    snake.create(canvas, field);

    time.clear();
    score.clear();
  }
}
