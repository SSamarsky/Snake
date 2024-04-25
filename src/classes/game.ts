import IGame from "../interfaces/game";
import Canvas from "./canvas";
import Field from "./field";
import Food from "./food";
import Snake from "./snake";

export default class Game implements IGame {
    isStart;
    isPlay;
    isPause;
    isFinish;

    constructor() {
        this.isStart = false;
        this.isPlay = false;
        this.isPause = false;
        this.isFinish = false;
    }

    start(snake: Snake, canvas: Canvas, field: Field, food: Food) {
        if (!this.isStart) {
            this.isStart = true;
            this.isPlay = true;
            this.isPause = false;
            this.isFinish = false;
    
            snake.moving = setInterval(() => snake.move(canvas, field, food), snake.delay);
            food.creating = setInterval(() => food.create(canvas, field, snake.coords), 1000);
        }

    }

    play(snake: Snake, canvas: Canvas, field: Field, food: Food) {
        if (this.isStart && this.isPause && !this.isPlay) {
            this.isPlay = true;
            this.isPause = false;

            snake.moving = setInterval(() => snake.move(canvas, field, food), snake.delay);
            food.creating = setInterval(() => food.create(canvas, field, snake.coords), 1000);
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

    finish() {

    }

    reset(snake: Snake, canvas: Canvas, field: Field, food: Food) {
        this.isStart = false;
        this.isPlay = false;
        this.isPause = false;
        this.isFinish = false;

        canvas.clear(field.width, field.height);

        clearInterval(snake.moving);
        clearInterval(food.creating);

        snake.clear(canvas, field);             // Рефакторить методы, т.к. нет необходимаости в них стирать холст, только данные!
        food.clear(canvas, field);

        snake.create(canvas, field)
    }
}