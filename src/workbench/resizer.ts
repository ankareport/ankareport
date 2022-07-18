import Point from "../core/point";
import "./resizer.css";

export enum ResizerOrientation {
  Horizontal,
  Vertical,
}

export interface ResizeEventArgs {
  originalLocation: Point;
  newLocation: Point;
  offset: Point;
}

export interface ResizerOptions {
  orientation: ResizerOrientation;
  onResize?: (args: ResizeEventArgs) => void;
}

export default class Resizer {
  public readonly element = document.createElement("div");

  public readonly originalLocation = new Point();
  public readonly newLocation = new Point();
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

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);

    this.element.onmousedown = this.onMouseDown;
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

  private onMouseDown(e: MouseEvent) {
    this.originalLocation.x = e.x;
    this.originalLocation.y = e.y;
    this.newLocation.x = e.x;
    this.newLocation.y = e.y;

    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp.bind(this), {
      once: true,
    });
  }

  private onMouseMove(e: MouseEvent) {
    this.newLocation.x = e.x;
    this.newLocation.y = e.y;
    this.offset.x = this.newLocation.x - this.originalLocation.x;
    this.offset.y = this.newLocation.y - this.originalLocation.y;

    this.refresh();
  }

  private onMouseUp() {
    this.clear();

    document.removeEventListener("mousemove", this.onMouseMove);

    if (this.options.onResize) {
      this.options.onResize({
        originalLocation: this.originalLocation,
        newLocation: this.newLocation,
        offset: this.offset,
      });
    }
  }
}
