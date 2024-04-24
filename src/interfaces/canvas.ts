export default interface ICanvas {
    context: CanvasRenderingContext2D | null | undefined;

    create(width: number, height: number, root: Element | null ): void;

    clear(width: number, height: number): void;

    drawRectangle(
        color: string,
        x1: number,
        y1: number,
        x2: number,
        y2: number
      ): void;
}