import Canvas from "../classes/canvas";
import Field from "../classes/field";
import Food from "../classes/food";

export default interface ISnake {
    color: string;
    delay: number;
    delayReducing: number;
    isDelayReducing: boolean;
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

    toggleSpeed(n: number, canvas: Canvas, field: Field, food: Food): void;
  
    move(canvas: Canvas, field: Field, food: Food): void;
  
    clear(canvas: Canvas, field: Field): void;
  }