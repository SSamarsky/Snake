import IWalls from "../interfaces/walls";
import Canvas from "./canvas";
import Field from "./field";
import Lang from "./lang";

export default class Walls implements IWalls {
  type;
  value;
  text;
  textEl;
  checkboxEl;

  constructor(
    type: string,
    value: boolean,
    textEl: Element,
    checkboxEl: HTMLInputElement
  ) {
    this.type = type;
    this.value = value;
    this.text = "Yes";
    this.textEl = textEl;
    this.checkboxEl = checkboxEl;
  }

  setValue(field: Field, canvas: Canvas, lang: Lang) {
    field.isWalls = this.value;
    if (this.value) canvas.el.classList.add("walls");
    else canvas.el.classList.remove("walls");

    if (lang.isRu) this.text = this.value ? "Да" : "Нет";
    else this.text = this.value ? "Yes" : "No";
    
    this.textEl.textContent = this.text;
  }

  initial(field: Field, canvas: Canvas, lang: Lang) {
    const valueSave = localStorage.getItem(this.type);
    if (valueSave !== null) this.value = valueSave === "true" ? true : false;

    this.checkboxEl.checked = this.value;
    this.checkboxEl.addEventListener("click", () => this.change(field, canvas, lang));
    this.setValue(field, canvas, lang);
  }

  change(field: Field, canvas: Canvas, lang: Lang) {
    this.value = this.checkboxEl.checked;
    this.setValue(field, canvas, lang);
    localStorage.setItem(this.type, String(this.value));
  }

  switchLock() {
    this.checkboxEl.disabled = !this.checkboxEl.disabled;
  }
}
