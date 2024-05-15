import Canvas from "./canvas";
import Field from "./field";
import Setting from "./setting";
import Snake from "./snake";

export default class Delay extends Setting {
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
    if (!field && !canvas) return;      // fix overload signature
    this.valueText = `${this.value}ms`;
    this.valueTextEl.textContent = this.valueText;
    this.valueRangeEl.value = this.value;
    snake.delay = Number(this.value);
  }
}
