import "./toolbarButton.css";

export interface ToolbarButtonOptions {
  icon?: string;
  text: string;
  title: string;
  draggable?: boolean;
}

export default class ToolbarButton {
  public readonly element = document.createElement("div");
  public readonly elementIcon = document.createElement("img");
  public readonly elementText = document.createElement("span");

  private _icon?: string;
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

  private _disabled = false;

  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    this.refresh();
  }

  constructor(options: ToolbarButtonOptions) {
    this.element.classList.add("anka-toolbar-button");

    this.element.appendChild(this.elementIcon);
    this.element.appendChild(this.elementText);

    this._icon = options.icon;
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
    this.element.title = this._title;
    this.element.draggable = this._draggable;
    this.elementIcon.src = this._icon || "";
    this.elementText.innerText = this._text;

    if (this._disabled) {
      this.element.style.backgroundColor = "transparent";
      this.element.style.cursor = "not-allowed";
    } else {
      this.element.style.backgroundColor = "";
      this.element.style.cursor = "";
    }

    this.elementIcon.style.display = this._icon ? "" : "none";
  }

  addEventListener(event: "click", callback: () => void) {
    switch (event) {
      case "click":
        this.element.addEventListener("click", callback);
        break;
    }
  }
}
