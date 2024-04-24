import ICanvas from "../interfaces/canvas";

export default class Canvas implements ICanvas {
    context: CanvasRenderingContext2D | null | undefined;

    constructor() {
      this.context;
    }
  
    create(width: number, height: number, root: Element | null) {
      const canvas = document.createElement("canvas");
      this.context = canvas.getContext("2d");
      canvas.width = width
      canvas.height = height;
      canvas.className = 'canvas';
      root.appendChild(canvas);
    }
  
    clear(width: number, height: number) {
      this.context?.clearRect(0, 0, width, height);
    }

    drawRectangle(color: string, x1: number, y1: number, x2: number, y2: number) {
      if (this.context) this.context.fillStyle = color;
      this.context?.fillRect(x1, y1, x2, y2);
    }
  }