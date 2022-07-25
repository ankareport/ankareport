import { ReportItem as LayoutReportItem } from "../core/layout";
import ReportItemProperties from "./reportItemProperties";

export default class ReportItem {
  public readonly element = document.createElement("div");

  public isSelected = false;
  public readonly properties = new ReportItemProperties();

  constructor() {
    this.init();
  }

  init() {
    this.element.style.display = "inline-block";
    this.element.style.position = "absolute";
    this.element.style.cursor = "pointer";
    this.element.style.userSelect = "none";

    this.properties.addEventListener("change", () => {
      this.refresh();
    });

    this.refresh();
  }

  refresh() {
    this.element.style.width = `${this.properties.width}px`;
    this.element.style.height = `${this.properties.height}px`;
    this.element.style.left = `${this.properties.x}px`;
    this.element.style.top = `${this.properties.y}px`;
    this.element.innerText = this.properties.text;
    this.element.style.padding = this.properties.padding
      ? this.properties.padding + "px"
      : "";
    this.element.style.backgroundColor = this.properties.backgroundColor!;
    this.element.style.color = this.properties.color!;
    this.element.style.border = this.properties.border || "1px solid #cccccc";
    this.element.style.fontFamily = this.properties.fontFamily!;
    this.element.style.fontSize = this.properties.fontSize
      ? this.properties.fontSize + "px"
      : "";
    this.element.style.fontWeight = this.properties.fontWeight!;
    this.element.style.textAlign = this.properties.textAlign!;
  }

  onClick(callback: () => void) {
    this.element.onclick = callback;
  }

  dispose() {
    this.element.remove();
  }

  loadLayout(layout: LayoutReportItem) {
    this.properties.text = layout.text;
    this.properties.binding = layout.binding || "";
    this.properties.x = layout.x;
    this.properties.y = layout.y;
    this.properties.width = layout.width;
    this.properties.height = layout.height;

    this.refresh();
  }

  toJSON(): LayoutReportItem {
    return {
      text: this.properties.text,
      binding: this.properties.binding,
      x: this.properties.x,
      y: this.properties.y,
      width: this.properties.width,
      height: this.properties.height,
    };
  }
}
