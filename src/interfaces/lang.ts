export default interface ILang {
  textEl: Element | null;
  text: string;
  isRu: boolean;
  translateEls: NodeListOf<Element>;
  checkboxEl: Element | null;
  textsRu: object;
  textsEn: object;

  init(): void;
  switch(): void;
  setText(): void;
}
