import Field from "./classes/field";
import Canvas from "./classes/canvas";
import './style.scss';
import Snake from "./classes/snake";
import Food from "./classes/food";
import Game from "./classes/game";

const root = document.querySelector('#app');

const field = new Field(20, 20, 20, false);
const canvas = new Canvas();
canvas.create(field.width, field.height, root);

const snake = new Snake('green', 200);
snake.create(canvas, field);

const food = new Food('orange');

const game = new Game();

const btnStart = document.querySelector('#btn-start');
const btnReset = document.querySelector('#btn-reset');

document.addEventListener('keydown', (e) => {
    snake.setDirection(e);
    btnStart!.textContent = 'Pause';

    if (e.key === ' ' || e.key === 'Enter') {
        if (game.isPause) {
            game.play(snake, canvas, field, food);
            btnStart!.textContent = 'Pause';
        } else if (game.isPlay) {
            game.pause(snake, food);
            btnStart!.textContent = 'Play';
        }

        game.start(snake, canvas, field, food);
    }

    const keysReset = ['R', 'r', 'К', 'к'];
    if (keysReset.includes(e.key)) {
        game.reset(snake, canvas, field, food);
        btnStart!.textContent = 'Play';
    }
    
    const keysToggleSpeed = ['E', 'e', 'У', 'у'];
    if (keysToggleSpeed.includes(e.key) && game.isStart) {
        snake.toggleSpeed(2, canvas, field, food, game);
    }
});

btnStart?.addEventListener('click', () => {
    if (!game.isStart) {
        game.start(snake, canvas, field, food);
        btnStart.textContent = 'Pause';
    } else {
        if (game.isPause) {
            game.play(snake, canvas, field, food);
            btnStart.textContent = 'Pause';
        } else if (game.isPlay) {
            game.pause(snake, food);
            btnStart.textContent = 'Play';
        }
    }
});

btnReset?.addEventListener('click', () => {
    game.reset(snake, canvas, field, food);
    btnStart!.textContent = 'Play';
})