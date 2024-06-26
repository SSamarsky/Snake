import Field from "./classes/field";
import Canvas from "./classes/canvas";
import "./style.scss";
import Snake from "./classes/snake";
import Food from "./classes/food";
import Game from "./classes/game";
import Time from "./classes/time";
import Score from "./classes/score";
import Size from "./classes/size";
import Delay from "./classes/delay";
import Cell from "./classes/cell";
import Walls from "./classes/walls";
import Lang from "./classes/lang";
import Settings from "./classes/settings";

const root = document.querySelector("#app");

const htmlTime = document.querySelector("#time");
const htmlScore = document.querySelector("#score");
const time = new Time(htmlTime!);
const score = new Score(htmlScore!);

const field = new Field(20, 20, 20, true);
const canvas = new Canvas();
canvas.create(field.width, field.height, root);

const snake = new Snake("green", 200);
snake.create(canvas, field);

const food = new Food("orange");

const game = new Game();

const lang = new Lang();
lang.init();

const sizeText = document.querySelector("#size-text");
const sizeRange = document.querySelector("#size-range") as HTMLInputElement;
const sizeRadio = [
  ...document.querySelectorAll("input[name=size][type=radio]"),
] as HTMLInputElement[];
const size = new Size("size", "20", sizeText!, sizeRange!, sizeRadio);
size.initial(field, canvas, snake);

const delayText = document.querySelector("#delay-text");
const delayRange = document.querySelector("#delay-range") as HTMLInputElement;
const delayRadio = [
  ...document.querySelectorAll("input[name=delay][type=radio]"),
] as HTMLInputElement[];
const delay = new Delay("delay", "200", delayText!, delayRange, delayRadio);
delay.initial(field, canvas, snake);

const cellText = document.querySelector("#cell-text");
const cellRange = document.querySelector("#cell-range") as HTMLInputElement;
const cellRadio = [
  ...document.querySelectorAll("input[name=cell][type=radio]"),
] as HTMLInputElement[];
const cell = new Cell("cell", "20", cellText!, cellRange, cellRadio);
cell.initial(field, canvas, snake);

const wallsText = document.querySelector("#walls-text");
const wallsCheckbox = document.querySelector("#walls") as HTMLInputElement;
const walls = new Walls("walls", true, wallsText!, wallsCheckbox);
walls.initial(field, canvas, lang);

const settings = new Settings(size, delay, cell, walls);

const btnStart = document.querySelector("#btn-start") as HTMLElement;
const btnReset = document.querySelector("#btn-reset") as HTMLElement;

document.addEventListener("keydown", (e) => {
  snake.setDirection(e);
  btnStart!.textContent = lang.isRu ? "Пауза" : "Pause";

  if (e.key === " " || e.key === "Enter") {
    if (game.isPause) {
      game.play(snake, canvas, field, food, time, score);
      btnStart!.textContent = lang.isRu ? "Пауза" : "Pause";
    } else if (game.isPlay) {
      game.pause(snake, food, time);
      btnStart!.textContent = lang.isRu ? "Играть" : "Play";
    }

    game.start(snake, canvas, field, food, time, score, settings);
  }

  const keysReset = ["R", "r", "К", "к"];
  if (keysReset.includes(e.key)) {
    game.reset(snake, canvas, field, food, time, score, settings);
    btnStart!.textContent = lang.isRu ? "Играть" : "Play";
  }

  const keysToggleSpeed = ["E", "e", "У", "у"];
  if (keysToggleSpeed.includes(e.key) && game.isStart) {
    snake.toggleSpeed(2, canvas, field, food, game, time, score);
  }
});

btnStart?.addEventListener("click", () => {
  if (!game.isStart) {
    game.start(snake, canvas, field, food, time, score, settings);
    btnStart.textContent = lang.isRu ? "Пауза" : "Pause";
  } else {
    if (game.isPause) {
      game.play(snake, canvas, field, food, time, score);
      btnStart.textContent = lang.isRu ? "Пауза" : "Pause";
    } else if (game.isPlay) {
      game.pause(snake, food, time);
      btnStart.textContent = lang.isRu ? "Играть" : "Play";
    }
  }
  btnStart.blur();
});

btnReset?.addEventListener("click", () => {
  game.reset(snake, canvas, field, food, time, score, settings);
  btnStart!.textContent = lang.isRu ? "Играть" : "Play";

  btnReset.blur();
});
