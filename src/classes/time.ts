export default class Time {
  time;
  htmlTime;
  timer;

  constructor(htmlTime: Element) {
    this.htmlTime = htmlTime;
    this.time = 0;
    this.timer = 0;
  }

  play() {
    this.timer = setInterval(() => {
      this.time += 1;
      this.htmlTime.textContent = this.convert(this.time);
    }, 1000);
  }

  pause() {
    clearInterval(this.timer);
  }

  clear() {
    this.pause();
    this.time = 0;
    this.htmlTime.textContent = this.convert(this.time);
  }

  convert(t: number) {
    const h = Math.floor(t / 3600);
    const m = Math.floor(t / 60) - h * 60;
    const s = t - h * 3600 - m * 60;

    let hours = "";
    let minutes = "";
    let seconds = "";

    if (h < 10) hours = "0" + h;
    else hours += h;
    if (m < 10) minutes = "0" + m;
    else minutes += m;
    if (s < 10) seconds = "0" + s;
    else seconds += s;

    return `${hours}:${minutes}:${seconds}`;
  }
}
