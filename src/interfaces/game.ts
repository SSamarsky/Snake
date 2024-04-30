import Canvas from "../classes/canvas";
import Field from "../classes/field";
import Food from "../classes/food";
import Score from "../classes/score";
import Snake from "../classes/snake";
import Time from "../classes/time";

export default interface IGame {
  isStart: boolean;
  isPlay: boolean;
  isPause: boolean;

  start(
    snake: Snake,
    canvas: Canvas,
    field: Field,
    food: Food,
    time: Time,
    score: Score
  ): void;

  play(
    snake: Snake,
    canvas: Canvas,
    field: Field,
    food: Food,
    time: Time,
    score: Score
  ): void;

  pause(snake: Snake, food: Food, time: Time): void;

  gameOver(
    snake: Snake,
    food: Food,
    canvas: Canvas,
    field: Field,
    time: Time
  ): void;

  win(snake: Snake, food: Food, canvas: Canvas, field: Field, time: Time): void;

  reset(
    snake: Snake,
    canvas: Canvas,
    field: Field,
    food: Food,
    time: Time,
    score: Score
  ): void;
}
