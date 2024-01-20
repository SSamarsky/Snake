class Game {
  constructor(size, cellSize, speed, isWalls) {
    this.size = size;
    this.cellSize = cellSize;
    this.speed = speed;
    this.isWalls = isWalls;
    this.isStart = false;
    this.isPause = false;
    this.isFinish = false;
    this.count = 0;
  }

  start(canvas, snake, food) {
    if (!this.isStart) {
      snake.create(canvas.context, this);
      snake.moving = setInterval(
        () => snake.move(canvas.context, this, food),
        this.speed
      );
      food.creating = setInterval(
        () => food.create(canvas.context, this, snake.coords),
        1000
      );
      this.isStart = true;
      this.isPause = false;
      this.isFinish = false;
    }
  }

  restart(canvas, snake, food) {
    this.finish(snake, food);
    this.start(canvas, snake, food);
  }

  finish(snake, food) {
    this.isStart = false;
    this.isPause = false;
    this.isFinish = true;
    this.count = 0;
    clearInterval(snake.moving);
    clearInterval(food.creating);
    snake.clear(canvas.context, this);
    food.clear(canvas.context, this);
  }

  pause(snake) {
    if (this.isStart) {
      this.isPause = true;
      clearInterval(snake.moving);
    }
  }

  play(snake) {
    if (this.isStart && this.isPause) {
      this.isPause = false;
      snake.moving = setInterval(
        () => snake.move(canvas.context, this, food),
        this.speed
      );
    }
  }
}

class Canvas {
  constructor(root) {
    this.root = root;
    this.context;
    this.size;
    this.cellSize;
  }

  create(game) {
    const canvas = document.createElement("canvas");
    this.context = canvas.getContext("2d");
    this.cellSize = game.cellSize;
    this.size = game.size * game.cellSize;
    canvas.width = this.size;
    canvas.height = this.size;
    this.root.appendChild(canvas);
  }
}

class Snake {
  constructor(color) {
    this.color = color;
    this.coords = [];
    this.direction = "y+";
    this.directionPrev = "y+";
    this.directionNext = "y+";
    this.isBug = false;
    this.isDeBug = false;
    this.moving;
  }

  create(context, game) {
    context.fillStyle = this.color;
    const coord = Math.floor(game.size / 2) * game.cellSize - game.cellSize;
    context.fillRect(coord, coord, game.cellSize, game.cellSize);
    context.fillRect(
      coord,
      coord + game.cellSize,
      game.cellSize,
      game.cellSize
    );

    const tail = coord + "-" + coord;
    const head = coord + "-" + (coord + game.cellSize);
    this.coords.push(tail, head);
  }

  setDirection(e) {
    const keyboardsKey = {
      left: ["ArrowLeft", "a", "A", "ф", "Ф"],
      right: ["ArrowRight", "d", "D", "в", "В"],
      up: ["ArrowUp", "w", "W", "ц", "Ц"],
      down: ["ArrowDown", "s", "S", "ы", "Ы"],
    };

    if (keyboardsKey.left.includes(e.key) && this.direction !== "x+") {
      this.directionPrev = this.direction;
      this.direction = "x-";
      this.directionNext = "x-";
    } else if (keyboardsKey.right.includes(e.key) && this.direction !== "x-") {
      this.directionPrev = this.direction;
      this.direction = "x+";
      this.directionNext = "x+";
    } else if (keyboardsKey.up.includes(e.key) && this.direction !== "y+") {
      this.directionPrev = this.direction;
      this.direction = "y-";
      this.directionNext = "y-";
    } else if (keyboardsKey.down.includes(e.key) && this.direction !== "y-") {
      this.directionPrev = this.direction;
      this.direction = "y+";
      this.directionNext = "y+";
    }
  }

  move(context, game, food) {
    context.fillStyle = this.color;
    const head = this.coords.at(-1).split("-");
    const tail = this.coords[0].split("-");
    let [x, y] = head;
    let [removeX, removeY] = tail;

    let isWalls = false;

    if (this.isBug) {
      this.direction = this.directionPrev;
      if (this.isDeBug) {
        this.direction = this.directionNext;
        this.isBug = false;
        this.isDeBug = false;
      } else this.isDeBug = true;
    }

    switch (this.direction) {
      case "y-":
        y = +y - game.cellSize;
        if (game.isWalls) isWalls = y < 0 ? true : false;
        else {
          if (y < 0) y = game.size * game.cellSize - game.cellSize;
        }
        break;
      case "y+":
        y = +y + game.cellSize;
        if (game.isWalls)
          isWalls =
            y > game.size * game.cellSize - game.cellSize ? true : false;
        else {
          if (y === game.size * game.cellSize) y = 0;
        }
        break;
      case "x+":
        x = +x + game.cellSize;
        if (game.isWalls)
          isWalls =
            x > game.size * game.cellSize - game.cellSize ? true : false;
        else {
          if (x === game.size * game.cellSize) x = 0;
        }
        break;
      case "x-":
        x = +x - game.cellSize;
        if (game.isWalls) isWalls = x < 0 ? true : false;
        else {
          if (x < 0) x = game.size * game.cellSize - game.cellSize;
        }
        break;
    }

    let newHead = x + "-" + y;
    let coordBug = this.coords.at(-2);

    if (this.coords.includes(newHead) || isWalls) {
      if (newHead === coordBug) {
        this.isBug = true;
        this.move(context, game, food);
      } else {
        console.log("Game Over!");
        game.finish(this, food);
      }
    } else {
      this.coords.push(newHead);
      context.fillRect(x, y, game.cellSize, game.cellSize);
      if (newHead === food.coord) {
        food.isFood = false;
        game.count += 1;
        console.log("Count:", game.count);
      } else {
        context.clearRect(removeX, removeY, game.cellSize, game.cellSize);
        this.coords.shift();
      }
    }
  }

  clear(context, game) {
    if (this.coords.length !== 0) {
      this.coords.map((el) => {
        const arr = el.split("-");
        let [x, y] = arr;
        context.clearRect(x, y, game.cellSize, game.cellSize);
      });
    }
    this.coords.length = 0;
    this.direction = "y+";
  }
}

class Food {
  constructor(color) {
    this.color = color;
    this.x;
    this.y;
    this.coord;
    this.isFood = false;
    this.creating;
  }

  create(context, game, snakeCoords) {
    context.fillStyle = this.color;
    while (!this.isFood) {
      this.x = Math.floor(Math.random() * game.size) * game.cellSize;
      this.y = Math.floor(Math.random() * game.size) * game.cellSize;
      this.coord = this.x + "-" + this.y;
      if (!snakeCoords.includes(this.coord)) {
        context.fillRect(this.x, this.y, game.cellSize, game.cellSize);
        this.isFood = true;
      }
    }
  }

  clear(context, game) {
    if (this.coord) {
      const arr = this.coord.split("-");
      const [x, y] = arr;
      context.clearRect(x, y, game.cellSize, game.cellSize);
      this.coord = undefined;
      this.x = undefined;
      this.y = undefined;
      this.isFood = false;
    }
  }
}

const root = document.querySelector("#root");

const game = new Game(20, 20, 150, true);
const canvas = new Canvas(root);
const snake = new Snake("green");
const food = new Food("orange");
canvas.create(game);

document.addEventListener("keydown", (e) => {
  const restartKeys = ["R", "r", "к", "К"];

  if (e.key === "Enter" || e.key === " ") {
    if (!game.isStart) game.start(canvas, snake, food);

    if (game.isStart) {
      if (game.isPause) {
        game.play(snake);
      } else {
        game.pause(snake);
      }
    }
  }

  if (restartKeys.includes(e.key)) game.restart(canvas, snake, food);

  if (game.isStart && !game.isPause) snake.setDirection(e);
});

const btnStart = document.querySelector("#btn-start");
const btnPause = document.querySelector("#btn-pause");
const btnReset = document.querySelector("#btn-reset");

btnStart.addEventListener("click", () => game.start(canvas, snake, food));
btnPause.addEventListener("click", () => {
  if (game.isStart && !game.isPause) game.pause(snake);
  else if (game.isStart && game.isPause) game.play(snake);
});
btnReset.addEventListener("click", () => game.restart(canvas, snake, food));