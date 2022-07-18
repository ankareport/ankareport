import { ReportItem as LayoutReportItem } from "../core/layout";
import Point from "../core/point";
import Size from "../core/size";

export default class ReportItem {
  public readonly element = document.createElement("div");

  public isSelected = false;
  public text = "Foo";
  public location = new Point(0, 0, () => this.refresh());
  public size = new Size(100, 20, () => this.refresh());

  constructor() {
    this.init();
  }

  init() {
    this.element.style.display = "inline-block";
    this.element.style.position = "absolute";
    this.element.style.cursor = "pointer";
    this.element.style.userSelect = "none";

    this.refresh();
  }

  refresh() {
    this.element.innerText = this.text;
    this.element.style.border = "1px solid #cccccc";
    this.element.style.left = `${this.location.x}px`;
    this.element.style.top = `${this.location.y}px`;
    this.element.style.width = `${this.size.width}px`;
    this.element.style.height = `${this.size.height}px`;
  }

  onClick(callback: () => void) {
    this.element.onclick = callback;
  }

  dispose() {
    this.element.remove();
  }

  loadJSON(data: LayoutReportItem) {
    this.text = data.text;
    this.location.x = data.x;
    this.location.y = data.y;
    this.size.width = data.width;
    this.size.height = data.height;

    this.refresh();
  }

  toJSON(): LayoutReportItem {
    return {
      text: "Foo",
      x: this.location.x,
      y: this.location.y,
      width: this.size.width,
      height: this.size.height,
    };
  }
}
