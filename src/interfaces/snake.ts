import Canvas from "../classes/canvas";
import Field from "../classes/field";
import Food from "../classes/food";

export default interface ISnake {
    color: string;
    speed: number;
    size: number;
    coords: string[];
    direction: string;
    directionPrev: string;
    directionNext: string;
    moving: number | undefined;
    isBug: boolean;
    isDebug: boolean;
  
    create(canvas: Canvas, field: Field): void;
  
    setDirection(e: Event): void;
  
    move(canvas: Canvas, field: Field, food: Food): void;
  
    clear(canvas: Canvas, field: Field): void;
  }