import DragDrop, { MoveEventArgs } from "../core/dragDrop";
import Point from "../core/point";
import "./resizer.css";

export enum ResizerOrientation {
  Horizontal,
  Vertical,
}

export interface ResizerOptions {
  orientation: ResizerOrientation;
  onResize: (args: MoveEventArgs) => void;
}

export default class Resizer {
  public readonly element = document.createElement("div");

  public readonly offset = new Point();

  constructor(private readonly options: ResizerOptions) {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-resizer");

    switch (this.options.orientation) {
      case ResizerOrientation.Vertical:
        this.element.classList.add("vertical");
        break;
      case ResizerOrientation.Horizontal:
        this.element.classList.add("horizontal");
        break;
    }

    new DragDrop({
      element: this.element,
      container: document,
      onMouseMove: (e) => this.onMouseMove(e),
      onMouseUp: (e) => this.onMouseUp(e),
    });
  }

  refresh() {
    switch (this.options.orientation) {
      case ResizerOrientation.Vertical:
        this.element.style.right = -this.offset.x + "px";
        break;
      case ResizerOrientation.Horizontal:
        this.element.style.bottom = -this.offset.y + "px";
        break;
    }
  }

  clear() {
    switch (this.options.orientation) {
      case ResizerOrientation.Vertical:
        this.element.style.right = "";
        break;
      case ResizerOrientation.Horizontal:
        this.element.style.bottom = "";
        break;
    }
  }

  private onMouseMove(e: MoveEventArgs) {
    this.offset.x = e.offsetX;
    this.offset.y = e.offsetY;

    this.refresh();
  }

  private onMouseUp(e: MoveEventArgs) {
    this.clear();

    if (this.options.onResize) {
      this.options.onResize(e);
    }
  }
}
