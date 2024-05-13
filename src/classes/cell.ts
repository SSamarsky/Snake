import Canvas from "./canvas";
import Field from "./field";
import Setting from "./setting";
import Snake from "./snake";

export default class Cell extends Setting {
  constructor(
    type: string,
    value: string,
    valueTextEl: Element,
    valueRangeEl: HTMLInputElement,
    valueRadioEls: HTMLInputElement[]
  ) {
    super(type, value, valueTextEl, valueRangeEl, valueRadioEls);
  }

  setValue(field: Field, canvas: Canvas, snake: Snake) {
    this.valueText = `${this.value}px`;
    this.valueTextEl.textContent = this.valueText;
    this.valueRangeEl.value = this.value;

    field.sizeCell = Number(this.value);
    field.height = field.countCellY * field.sizeCell;
    field.width = field.countCellX * field.sizeCell;

    canvas.el.width = field.width;
    canvas.el.height = field.height;

    snake.clear();
    snake.create(canvas, field);
  }
}
