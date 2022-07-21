import "./toolbarButton.css";

export interface ToolbarButtonOptions {
  text: string;
  title: string;
  draggable?: boolean;
}

export default class ToolbarButton {
  public readonly element = document.createElement("div");

  private _text: string = "";

  get text() {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  private _title: string = "";

  get title() {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  private _draggable = false;

  get draggable() {
    return this._draggable;
  }

  set draggable(value: boolean) {
    this._draggable = value;
  }

  constructor(options: ToolbarButtonOptions) {
    this.element.classList.add("anka-toolbar-button");

    this._text = options.text;
    this._title = options.title;
    this.element.style.width = 25 + "px";
    this.element.style.height = 25 + "px";

    if (options.draggable) {
      this._draggable = options.draggable;
    }

    this.refresh();
  }

  refresh() {
    this.element.innerText = this._text;
    this.element.title = this._title
    this.element.draggable = this._draggable;
  }

  addEventListener(event: "click", callback: () => void) {
    switch (event) {
      case "click":
        this.element.addEventListener("click", callback);
        break;
    }
  }
}
