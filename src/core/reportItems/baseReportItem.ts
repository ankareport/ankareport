import IDisposable from "../disposable";
import EventEmitter, { EventCallback } from "../eventEmitter";
import { IBaseReportItem } from "../layout";
import { PropertyChangeEventArgs } from "../properties";
import StyleProperties, { TextAlign } from "../styleProperties";
import { MultipleStyles } from "../utils/style.utils";
import BaseReportItemProperties from "./baseReportItemProperties";

export interface ChangeEventArgs {
  changes: PropertyChangeEventArgs[];
}

export interface ReportItemEventMap {
  change: ChangeEventArgs;
  focus: unknown;
}

export interface ReportItemOptions {
  parentStyles: StyleProperties[];
  defaultProperties?: Partial<IBaseReportItem>;
  appendTo?: HTMLElement;
}

export default abstract class BaseReportItem implements IDisposable {
  public readonly element = document.createElement("div");

  public readonly properties!: BaseReportItemProperties;
  protected _styles!: MultipleStyles;

  private readonly _changeEventEmitter = new EventEmitter<ChangeEventArgs>();

  protected _init() {
    this.element.tabIndex = 0;
    this.element.classList.add("anka-report-item");

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

  protected refresh() {
    this.element.style.left = `${this.properties.x}px`;
    this.element.style.top = `${this.properties.y}px`;
    this.element.style.width = `${this.properties.width}px`;
    this.element.style.height = `${this.properties.height}px`;

    this.element.style.color = this._styles.getStyle("color", "")!;
    this.element.style.backgroundColor = this._styles.getStyle(
      "backgroundColor",
      "",
    )!;
    this.element.style.textAlign = this._styles.getStyle("textAlign", "")!;

    const borderWidth = this._styles.getStyle("borderWidth", 0);

    if (borderWidth) {
      this.element.style.borderWidth = borderWidth + "px";
      this.element.style.borderStyle = this._styles.getStyle(
        "borderStyle",
        "",
      )!;
      this.element.style.borderColor = this._styles.getStyle(
        "borderColor",
        "#000000",
      )!;
    } else {
      this.element.style.borderWidth = "";
      this.element.style.borderStyle = "";
      this.element.style.borderColor = "";
    }
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

  loadLayout(layout: Partial<IBaseReportItem>) {
    this.properties.beginUpdate();
    this.applyLayout(layout);
    this.properties.endUpdate();

    this.refresh();
  }

  applyLayout(layout: Partial<IBaseReportItem>) {
    this.properties.x = layout.x ?? 0;
    this.properties.y = layout.y ?? 0;
    this.properties.width = layout.width ?? 0;
    this.properties.height = layout.height ?? 0;
    this.properties.name = layout.name ?? "";
    this.properties.color = layout.color;
    this.properties.backgroundColor = layout.backgroundColor;
    this.properties.textAlign = layout.textAlign as TextAlign;
    this.properties.borderWidth = layout.borderWidth;
    this.properties.borderStyle = layout.borderStyle;
    this.properties.borderColor = layout.borderColor;
    this.properties.fontFamily = layout.fontFamily;
    this.properties.fontSize = layout.fontSize;
    this.properties.fontWeight = layout.fontWeight;
  }

  toJSON(): IBaseReportItem {
    return {
      x: this.properties.x,
      y: this.properties.y,
      width: this.properties.width,
      height: this.properties.height,
      name: this.properties.name,
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
