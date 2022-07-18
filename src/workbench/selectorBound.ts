import "./selectorBound.css";

export enum SelectorBoundOrientation {
  TopLeft = "top-left",
  TopCenter = "top-center",
  TopRight = "top-right",
  MiddleLeft = "middle-left",
  MiddleRight = "middle-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
}

export default class SelectorBound {
  public readonly element = document.createElement("div");

  constructor(private readonly orientation: SelectorBoundOrientation) {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-selector-bound");
    this.element.classList.add(this.orientation);
  }
}
