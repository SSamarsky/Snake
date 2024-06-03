import ILang from "../interfaces/lang";
const ru = {
  title: "Змейка",
  settings: "Настройки",
  size: "Размер",
  delay: "Задержка",
  cell: "Ячейка",
  walls: "Стены",
  play: "Играть",
  reset: "Сброс",
  helpText1: "Ввод, пробел - играть/пауза",
  helpText2: "R - сброс",
  helpText3: "E - ускорение",
  helpText4: "Управление змейкой: ←↑→↓ или AWDS",
  score: "Очки",
  winsList: "Список побед",
  clear: "очистить",
  winsText: "Список пуст...",
  time: "Время",
  yesNo: "Да",
};

const en = {
  title: "Snake",
  settings: "Settings",
  size: "Size",
  delay: "Delay",
  cell: "Cell",
  walls: "Walls",
  play: "Play",
  reset: "Reset",
  helpText1: "Enter, space - play/pause",
  helpText2: "R - reset",
  helpText3: "E - hasten",
  helpText4: "Snake's control: ←↑→↓ or AWDS",
  score: "Score",
  winsList: "The wins' list",
  clear: "clear",
  winsText: "The wins are not yet...",
  time: "Time",
  yesNo: "Yes",
};

export default class Lang implements ILang {
  textsRu;
  textsEn;
  textEl;
  text;
  isRu;
  translateEls;
  checkboxEl;

  constructor() {
    this.textsRu = ru;
    this.textsEn = en;
    this.isRu = false;
    this.text = "En";
    this.translateEls = document.querySelectorAll("[data-i18n]");
    this.textEl = document.querySelector("#lang-text");
    this.checkboxEl = document.querySelector("#lang") as HTMLInputElement;
  }

  init() {
    this.textEl?.addEventListener("click", () => this.switch());
    this.text = localStorage.getItem("lang") || "En";
    this.isRu = this.text === "Ru" ? true : false;
    this.textEl!.textContent = this.text;
    this.checkboxEl!.checked = this.isRu;
    this.setText();

    const walls = document.querySelector("#walls-text");
    if (this.isRu)
      walls!.textContent =
        (localStorage.getItem("walls") || "true") === "true" ? "Да" : "Нет";
    else
      walls!.textContent =
        (localStorage.getItem("walls") || "true") === "true" ? "Yes" : "No";
  }

  switch() {
    this.isRu = !this.isRu;
    this.checkboxEl!.checked = this.isRu;

    this.textEl!.textContent = this.text;

    this.setText();
    localStorage.setItem("lang", this.text);
  }

  setText() {
    this.translateEls.forEach((el) => {
      const dataAttr = el.getAttribute(
        "data-i18n"
      ) as keyof typeof this.textsRu;
      if (this.isRu) el.textContent = this.textsRu[dataAttr];
      else el.textContent = this.textsEn[dataAttr];
    });

    const walls = document.querySelector("#walls-text");
    if (this.isRu) {
      this.text = "Ru";
      walls!.textContent =
        (localStorage.getItem("walls") || "true") === "true" ? "Да" : "Нет";
    } else {
      this.text = "En";
      walls!.textContent =
        (localStorage.getItem("walls") || "true") === "true" ? "Yes" : "No";
    }
  }
}
