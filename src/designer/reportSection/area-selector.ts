import EventEmitter, { EventCallback } from "../../core/eventEmitter";
import "./area-selector.css";

export interface SelectEventArgs {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AreaSelectorOptions {
  area: HTMLElement;
}

export default class AreaSelector {
  public readonly element = document.createElement("div");

  private readonly _selectEventEmitter = new EventEmitter<SelectEventArgs>();

  private _x = 0;
  private _y = 0;
  private _startX = 0;
  private _startY = 0;
  private _endX = 0;
  private _endY = 0;

  constructor(private readonly options: AreaSelectorOptions) {
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);

    this._init();
  }

  private _init() {
    this.element.classList.add("anka-area-selector");

    this.options.area.appendChild(this.element);

    this.element.style.display = "none";

    this.options.area.addEventListener("mousedown", this._onMouseDown);
  }

  private _getRect() {
    let x = this._x;
    let y = this._y;
    let width = this._endX - this._startX;
    let height = this._endY - this._startY;

    if (width < 0) {
      x += width;
      width = width * -1;
    }

    if (height < 0) {
      y += height;
      height = height * -1;
    }

    return { x, y, width, height };
  }

  addEventListener(event: "select", listener: EventCallback<SelectEventArgs>) {
    if (event === "select") {
      this._selectEventEmitter.add(listener);
    }
  }

  refresh() {
    const rect = this._getRect();

    this.element.style.left = rect.x + "px";
    this.element.style.top = rect.y + "px";
    this.element.style.width = rect.width + "px";
    this.element.style.height = rect.height + "px";
  }

  private _onMouseDown(e: MouseEvent) {
    if (e.target !== this.options.area) return;

    this._x = e.offsetX;
    this._y = e.offsetY;
    this._startX = e.x;
    this._startY = e.y;
    this._endX = e.x;
    this._endY = e.y;

    this.options.area.addEventListener("mousemove", this._onMouseMove);
    document.body.addEventListener("mouseup", this._onMouseUp);

    this.element.style.display = "";

    this.refresh();
  }

  private _onMouseMove(e: MouseEvent) {
    this._endX = e.x;
    this._endY = e.y;

    this.refresh();
  }

  private _onMouseUp() {
    this.options.area.removeEventListener("mousemove", this._onMouseMove);
    document.body.removeEventListener("mouseup", this._onMouseUp);

    this.element.style.display = "none";

    this._selectEventEmitter.emit(this._getRect());
  }
}
