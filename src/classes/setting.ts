import ISetting from "../interfaces/setting";
import Canvas from "./canvas";
import Field from "./field";
import Snake from "./snake";

export default class Setting implements ISetting {
  type;
  value;
  valueText;
  valueTextEl;
  valueRangeEl;
  valueRadioEls;

  constructor(
    type: string,
    value: string,
    valueTextEl: Element,
    valueRangeEl: HTMLInputElement,
    valueRadioEls: HTMLInputElement[]
  ) {
    this.type = type;
    this.value = value;
    this.valueText = "";
    this.valueTextEl = valueTextEl;
    this.valueRangeEl = valueRangeEl;
    this.valueRadioEls = valueRadioEls;
  }

  checkedRadio() {
    this.valueRadioEls.forEach((el) => {
      const nearEl = el.nextSibling as HTMLElement;
      if (this.valueRangeEl.value === el.value) {
        el.checked;
        nearEl.classList.add("checked");
      } else {
        nearEl.classList.remove("checked");
      }
    });
  }

  setValue(field: Field, canvas: Canvas, snake: Snake) {
    this.valueText = `${this.value}x${this.value}`;
    this.valueTextEl.textContent = this.valueText;
    this.valueRangeEl.value = this.value;

    field.countCellX = Number(this.value);
    field.countCellY = Number(this.value);
    field.height = field.countCellY * field.sizeCell;
    field.width = field.countCellX * field.sizeCell;

    canvas.el.width = field.width;
    canvas.el.height = field.height;

    snake.clear();
    snake.create(canvas, field);
  }

  initial(field: Field, canvas: Canvas, snake: Snake) {
    const valueSave = localStorage.getItem(this.type);
    this.value = valueSave !== null ? valueSave : this.value;

    this.setValue(field, canvas, snake);
    this.checkedRadio();
    this.change(field, canvas, snake);
  }

  change(field: Field, canvas: Canvas, snake: Snake) {
    this.valueRangeEl.addEventListener("change", () => {
      this.value = this.valueRangeEl.value;

      this.setValue(field, canvas, snake);
      this.checkedRadio();
      localStorage.setItem(this.type, this.value);
    });

    this.valueRadioEls.forEach((el) => {
      el.addEventListener("click", () => {
        this.value = el.value;

        this.setValue(field, canvas, snake);
        localStorage.setItem(this.type, this.value);
      });
    });
  }

  switchLock() {
    const elements = [this.valueRangeEl, ...this.valueRadioEls];
    elements.forEach((el) => {
      el.disabled = !el.disabled;
    });
  }
}
