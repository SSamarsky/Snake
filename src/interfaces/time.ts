export default interface ITime {
  time: number;
  htmlTime: Element;
  timer: number;

  play(): void;

  pause(): void;

  clear(): void;

  convert(t: number): string;
}
