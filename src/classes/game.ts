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
      this.reset(snake, canvas, field, food, time, score);

      this.isStart = true;
      this.isPlay = true;

      snake.playMoving(canvas, field, food, this, time, score);
      food.playCreating(canvas, field, snake.coords);
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

      snake.playMoving(canvas, field, food, this, time, score);
      food.playCreating(canvas, field, snake.coords);
      time.play();
    }
  }

  pause(snake: Snake, food: Food, time: Time) {
    if (this.isStart && this.isPlay) {
      this.isPause = true;
      this.isPlay = false;

      snake.stopMoving();
      food.stopCreating();
      time.pause();
    }
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
    snake.clear();
    food.clear();
    time.clear();
    score.clear();

    snake.create(canvas, field);
  }

  finish(
    snake: Snake,
    food: Food,
    canvas: Canvas,
    field: Field,
    time: Time,
    isWin: boolean = false
  ) {
    this.isStart = false;
    this.isPlay = false;
    this.isPause = false;

    snake.stopMoving();
    food.stopCreating();
    time.pause();

    if (isWin) canvas.drawEndGame("#fff", field, true);
    else canvas.drawEndGame("#da0000", field, false);
  }
}
