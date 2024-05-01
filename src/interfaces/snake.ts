import Canvas from "../classes/canvas";
import Field from "../classes/field";
import Food from "../classes/food";
import Game from "../classes/game";
import Score from "../classes/score";
import Time from "../classes/time";
import { TCoord } from "../types/coord";

export default interface ISnake {
  color: string;
  delay: number;
  delayReducing: number;
  isDelayReducing: boolean;
  size: number;
  coords: TCoord[];
  direction: string;
  directionPrev: string;
  directionNext: string;
  moving: number | undefined;
  isBug: boolean;
  isDebug: boolean;

  create(canvas: Canvas, field: Field): void;

  setDirection(e: Event): void;

  toggleSpeed(
    n: number,
    canvas: Canvas,
    field: Field,
    food: Food,
    game: Game,
    time: Time,
    score: Score
  ): void;

  move(
    canvas: Canvas,
    field: Field,
    food: Food,
    game: Game,
    time: Time,
    score: Score
  ): void;

  playMoving(
    canvas: Canvas,
    field: Field,
    food: Food,
    game: Game,
    time: Time,
    score: Score
  ): void;

  stopMoving(): void;

  clear(): void;
}
