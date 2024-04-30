import IScore from "../interfaces/score";

export default class Score implements IScore {
  score;
  htmlScore;

  constructor(htmlScore: Element) {
    this.score = 0;
    this.htmlScore = htmlScore;
  }

  update(snakeSize: number) {
    this.score = snakeSize - 2;
    this.htmlScore.textContent = String(this.score);
  }

  clear(): void {
    this.score = 0;
    this.htmlScore.textContent = "0";
  }
}
