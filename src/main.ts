import Field from "./classes/field";
import Canvas from "./classes/canvas";
import './style.css';
import Snake from "./classes/snake";
import Food from "./classes/food";

const root = document.querySelector('#app');
const field = new Field(20, 20, 20, false);
const canvas = new Canvas();
canvas.create(field.width, field.height, root);

const snake = new Snake('green', 200);
snake.create(canvas, field);

const food = new Food('orange');

setInterval(() => snake.move(canvas, field, food), snake.speed);
setInterval(() => food.create(canvas,field, snake.coords));

document.addEventListener('keydown', (e) => snake.setDirection(e));