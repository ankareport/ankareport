import IDisposable from "./disposable";
import EventEmitter, { EventCallback } from "./eventEmitter";
import { IReportItem as LayoutReportItem } from "./layout";
import { PropertyChangeEventArgs } from "./properties";
import ReportItemProperties from "./reportItemProperties";
import StyleProperties, { TextAlign } from "./styleProperties";
import { MultipleStyles } from "./utils/style.utils";

export interface ChangeEventArgs {
  changes: PropertyChangeEventArgs[];
}

export interface ReportItemEventMap {
  change: ChangeEventArgs;
  focus: unknown;
}

export interface ReportItemOptions {
  parentStyles: StyleProperties[];
}

export default class ReportItem implements IDisposable {
  public readonly element = document.createElement("div");

  public readonly properties = new ReportItemProperties();
  private readonly _styles: MultipleStyles;

  private readonly _changeEventEmitter = new EventEmitter<ChangeEventArgs>();

  constructor(options: ReportItemOptions) {
    this._styles = new MultipleStyles(...options.parentStyles, this.properties);

    this._init();
  }

  private _init() {
    this.element.tabIndex = 0;

    this.element.style.display = "inline-block";
    this.element.style.position = "absolute";
    this.element.style.userSelect = "none";
    this.element.style.outline = "none";
    this.element.style.whiteSpace = "nowrap";
    this.element.style.overflow = "hidden";
    this.element.style.textOverflow = "ellipsis";

    this._styles.getList().forEach((styles) => {
      styles.addEventListener("change", () => this.refresh());
    });
    this.properties.addEventListener("change", (e) => this._onChange(e));

    this.refresh();
  }

  refresh() {
    this.element.style.left = `${this.properties.x}px`;
    this.element.style.top = `${this.properties.y}px`;
    this.element.style.width = `${this.properties.width}px`;
    this.element.style.height = `${this.properties.height}px`;
    this.element.innerText = this.properties.text;

    this.element.style.color = this._styles.getStyle("color", "")!;
    this.element.style.backgroundColor = this._styles.getStyle(
      "backgroundColor",
      "",
    )!;
    this.element.style.textAlign = this._styles.getStyle("textAlign", "")!;
    this.element.style.borderWidth =
      this._styles.getStyle("borderWidth", "0")! + "px";
    this.element.style.borderStyle = this._styles.getStyle("borderStyle", "")!;
    this.element.style.borderColor = this._styles.getStyle(
      "borderColor",
      "#000000",
    )!;
    this.element.style.fontFamily = this._styles.getStyle(
      "fontFamily",
      "Tahoma",
    )!;
    this.element.style.fontSize = this._styles.getStyle("fontSize", "12px")!;
    this.element.style.fontWeight = this._styles.getStyle("fontWeight", "")!;
  }

  addEventListener<K extends keyof ReportItemEventMap>(
    event: K,
    listener: EventCallback<ReportItemEventMap[K]>,
  ) {
    switch (event) {
      case "change":
        const callbackOnChange = listener as EventCallback<
          ReportItemEventMap["change"]
        >;
        this._changeEventEmitter.add(callbackOnChange);
        break;
      case "focus":
        const callbackOnFocus = listener as EventCallback<
          ReportItemEventMap["focus"]
        >;
        this.element.addEventListener("focus", () =>
          callbackOnFocus(undefined),
        );
        break;
    }
  }

  dispose() {
    this.element.remove();
  }

  loadLayout(layout: LayoutReportItem) {
    this.properties.beginUpdate();
    this.properties.x = layout.x;
    this.properties.y = layout.y;
    this.properties.width = layout.width;
    this.properties.height = layout.height;
    this.properties.name = layout.name;
    this.properties.text = layout.text;
    this.properties.binding = layout.binding || "";
    this.properties.color = layout.color;
    this.properties.backgroundColor = layout.backgroundColor;
    this.properties.textAlign = layout.textAlign as TextAlign;
    this.properties.borderWidth = layout.borderWidth;
    this.properties.borderStyle = layout.borderStyle;
    this.properties.borderColor = layout.borderColor;
    this.properties.fontFamily = layout.fontFamily;
    this.properties.fontSize = layout.fontSize;
    this.properties.fontWeight = layout.fontWeight;
    this.properties.endUpdate();

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
      textAlign: this.properties.textAlign,
      borderWidth: this.properties.borderWidth,
      borderStyle: this.properties.borderStyle,
      borderColor: this.properties.borderColor,
      fontFamily: this.properties.fontFamily,
      fontSize: this.properties.fontSize,
      fontWeight: this.properties.fontWeight,
    };
  }

  private _onChange(args: ChangeEventArgs) {
    this._changeEventEmitter.emit(args);
  }
}
