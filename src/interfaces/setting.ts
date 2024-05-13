import Canvas from "../classes/canvas";
import Field from "../classes/field";
import Snake from "../classes/snake";

export default interface ISetting {
  type: string;
  value: string;
  valueText: string;
  valueTextEl: Element;
  valueRangeEl: HTMLInputElement;
  valueRadioEls: HTMLInputElement[];

  checkedRadio(): void;

  setValue(field: Field, canvas: Canvas, snake: Snake): void;

  initial(field: Field, canvas: Canvas, snake: Snake): void;

  change(field: Field, canvas: Canvas, snake: Snake): void;

  switchLock(): void;
}
