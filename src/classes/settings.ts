import Cell from "./cell";
import Delay from "./delay";
import Size from "./size";
import Walls from "./walls";

interface ISetting {
  size: Size;
  delay: Delay;
  cell: Cell;
  walls: Walls;

  disable(): void;

  enable(): void;
}

export default class Settings implements ISetting {
  size;
  delay;
  cell;
  walls;

  constructor(size: Size, delay: Delay, cell: Cell, walls: Walls) {
    this.size = size;
    this.delay = delay;
    this.cell = cell;
    this.walls = walls;
  }

  disable() {
    [this.size, this.delay, this.cell].forEach((el) => {
      el.valueRangeEl.disabled = true;
      el.valueRadioEls.forEach((elem) => (elem.disabled = true));
    });

    this.walls.checkboxEl.disabled = true;
  }

  enable() {
    [this.size, this.delay, this.cell].forEach((el) => {
      el.valueRangeEl.disabled = false;
      el.valueRadioEls.forEach((elem) => (elem.disabled = false));
    });

    this.walls.checkboxEl.disabled = false;
  }
}
