export default class Size {
  private _width = 0;
  private _height = 0;

  constructor(
    width?: number,
    height?: number,
    private readonly onchange?: Function,
  ) {
    if (width) this._width = width;
    if (height) this._height = height;
  }

  get width() {
    return this._width;
  }

  set width(value: number) {
    this._width = value;

    if (this.onchange) this.onchange();
  }

  get height() {
    return this._height;
  }

  set height(value: number) {
    this._height = value;

    if (this.onchange) this.onchange();
  }
}
