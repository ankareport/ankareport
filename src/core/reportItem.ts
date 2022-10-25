import IDisposable from "./disposable";
import { EventCallback } from "./eventEmitter";
import { IReportItem as LayoutReportItem } from "./layout";
import ReportItemProperties from "./reportItemProperties";
import StyleProperties, { TextAlign } from "./styleProperties";
import { isValidStyle } from "./utils/style.utils";

export interface ReportItemEventMap {
  select: unknown;
}

export interface ReportItemOptions {
  defaultStyles: StyleProperties;
}

export default class ReportItem implements IDisposable {
  public readonly element = document.createElement("div");

  public readonly properties = new ReportItemProperties();

  constructor(private readonly options: ReportItemOptions) {
    this.init();
  }

  private init() {
    this.element.tabIndex = 0;
    this.element.style.display = "inline-block";
    this.element.style.position = "absolute";
    this.element.style.userSelect = "none";
    this.element.style.outline = "none";
    this.element.style.whiteSpace = "nowrap";
    this.element.style.overflow = "hidden";
    this.element.style.textOverflow = "ellipsis";

    this.options.defaultStyles.addEventListener("change", () => {
      this.refresh();
    });

    this.properties.addEventListener("change", () => {
      this.refresh();
    });

    this.refresh();
  }

  refresh() {
    this.element.style.left = `${this.properties.x}px`;
    this.element.style.top = `${this.properties.y}px`;
    this.element.style.width = `${this.properties.width}px`;
    this.element.style.height = `${this.properties.height}px`;
    this.element.innerText = this.properties.text;

    this.element.style.color = this.getStyle("color", "")!;
    this.element.style.backgroundColor = this.getStyle("backgroundColor", "")!;
    this.element.style.padding = this.getStyle("padding", "")!;
    this.element.style.textAlign = this.getStyle("textAlign", "")!;
    this.element.style.border = this.getStyle("border", "")!;
    this.element.style.fontFamily = this.getStyle("fontFamily", "Tahoma")!;
    this.element.style.fontSize = this.getStyle("fontSize", "12px")!;
    this.element.style.fontWeight = this.getStyle("fontWeight", "")!;
  }

  getStyle<T extends keyof StyleProperties, TDefault>(
    property: T,
    defaultValue: TDefault,
  ) {
    if (isValidStyle(this.properties[property])) {
      return this.properties[property];
    } else if (isValidStyle(this.options.defaultStyles[property])) {
      return this.options.defaultStyles[property];
    }

    return defaultValue;
  }

  addEventListener<K extends keyof ReportItemEventMap>(
    event: K,
    listener: EventCallback<ReportItemEventMap[K]>,
  ) {
    switch (event) {
      case "select":
        this.element.addEventListener("focus", () => listener(undefined));
        break;
    }
  }

  dispose() {
    this.element.remove();
  }

  loadLayout(layout: LayoutReportItem) {
    this.properties.x = layout.x;
    this.properties.y = layout.y;
    this.properties.width = layout.width;
    this.properties.height = layout.height;
    this.properties.name = layout.name;
    this.properties.text = layout.text;
    this.properties.binding = layout.binding || "";
    this.properties.color = layout.color;
    this.properties.backgroundColor = layout.backgroundColor;
    this.properties.padding = layout.padding;
    this.properties.textAlign = layout.textAlign as TextAlign;
    this.properties.border = layout.border;
    this.properties.fontFamily = layout.fontFamily;
    this.properties.fontSize = layout.fontSize;
    this.properties.fontWeight = layout.fontWeight;

    this.refresh();
  }

  toJSON(): LayoutReportItem {
    return {
      x: this.properties.x,
      y: this.properties.y,
      width: this.properties.width,
      height: this.properties.height,
      name: this.properties.name,
      text: this.properties.text,
      binding: this.properties.binding,
      color: this.properties.color,
      backgroundColor: this.properties.backgroundColor,
      padding: this.properties.padding,
      textAlign: this.properties.textAlign,
      border: this.properties.border,
      fontFamily: this.properties.fontFamily,
      fontSize: this.properties.fontSize,
      fontWeight: this.properties.fontWeight,
    };
  }
}
