import Canvas from "../classes/canvas";
import Field from "../classes/field";

export default interface IWalls {
  type: string;
  value: boolean;
  text: string;
  textEl: Element;
  checkboxEl: HTMLInputElement;

  setValue(field: Field, canvas: Canvas): void;

  initial(field: Field, canvas: Canvas): void;

  change(field: Field, canvas: Canvas): void;

  switchLock(): void;
}
