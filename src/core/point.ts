export default class Point {
  private _x = 0;
  private _y = 0;

  constructor(x?: number, y?: number, private readonly onchange?: Function) {
    if (x) this._x = x;
    if (y) this._y = y;
  }

  get x() {
    return this._x;
  }

  set x(value: number) {
    this._x = value;

    if (this.onchange) this.onchange();
  }

  get y() {
    return this._y;
  }

  set y(value: number) {
    this._y = value;

    if (this.onchange) this.onchange();
  }
}
