export default interface IScore {
  score: number;
  htmlScore: Element;

  update(snakeSize: number): void;

  clear(): void;
}
