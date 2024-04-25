import Canvas from "../classes/canvas";
import Field from "../classes/field";
import Food from "../classes/food";
import Snake from "../classes/snake";

export default interface IGame {
    isStart: boolean;
    isPlay: boolean;
    isPause: boolean;

    start(snake: Snake, canvas: Canvas, field: Field, food: Food): void;

    play(snake: Snake, canvas: Canvas, field: Field, food: Food): void;

    pause(snake: Snake, food: Food): void;

    finish(snake: Snake, food: Food): void;

    reset(snake: Snake, canvas: Canvas, field: Field, food: Food): void;
}