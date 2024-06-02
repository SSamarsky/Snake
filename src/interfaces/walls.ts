import Canvas from "../classes/canvas";
import Field from "../classes/field";
import Lang from "../classes/lang";

export default interface IWalls {
  type: string;
  value: boolean;
  text: string;
  textEl: Element;
  checkboxEl: HTMLInputElement;

  setValue(field: Field, canvas: Canvas, lang: Lang): void;

  initial(field: Field, canvas: Canvas, lang: Lang): void;

  change(field: Field, canvas: Canvas, lang: Lang): void;

  switchLock(): void;
}
