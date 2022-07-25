import { Property } from "../components/propertyGrid/property";
import EventEmitter, { EventCallback } from "../core/eventEmitter";

export interface ChangeEventArgs {
  property: string;
}

export type TextAlign = "left" | "center" | "right";

export default class ReportItemProperties {
  private readonly _onChangeEventEmitter = new EventEmitter<ChangeEventArgs>();
  private _updating = false;

  private _width = 0;
  private _height = 0;
  private _x = 0;
  private _y = 0;
  private _text = "";
  private _name = "";
  private _binding = "";
  private _padding?: number;
  private _backgroundColor?: string;
  private _color?: string;
  private _border?: string;
  private _fontFamily?: string;
  private _fontSize?: number;
  private _fontWeight?: string;
  private _textAlign?: TextAlign;

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get text() {
    return this._text;
  }
  get name() {
    return this._name;
  }
  get binding() {
    return this._binding;
  }
  get padding() {
    return this._padding;
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  get color() {
    return this._color;
  }
  get border() {
    return this._border;
  }
  get fontFamily() {
    return this._fontFamily;
  }
  get fontSize() {
    return this._fontSize;
  }
  get fontWeight() {
    return this._fontWeight;
  }
  get textAlign() {
    return this._textAlign;
  }

  set width(value: number) {
    this._width = value;
    this.emitOnChange("width");
  }
  set height(value: number) {
    this._height = value;
    this.emitOnChange("height");
  }
  set x(value: number) {
    this._x = value;
    this.emitOnChange("x");
  }
  set y(value: number) {
    this._y = value;
    this.emitOnChange("y");
  }
  set text(value: string) {
    this._text = value;
    this.emitOnChange("text");
  }
  set name(value: string) {
    this._name = value;
    this.emitOnChange("name");
  }
  set binding(value: string) {
    this._binding = value;
    this.emitOnChange("binding");
  }
  set padding(value: number | undefined) {
    this._padding = value;
    this.emitOnChange("padding");
  }
  set backgroundColor(value: string | undefined) {
    this._backgroundColor = value;
    this.emitOnChange("backgroundColor");
  }
  set color(value: string | undefined) {
    this._color = value;
    this.emitOnChange("color");
  }
  set border(value: string | undefined) {
    this._border = value;
    this.emitOnChange("border");
  }
  set fontFamily(value: string | undefined) {
    this._fontFamily = value;
    this.emitOnChange("fontFamily");
  }
  set fontSize(value: number | undefined) {
    this._fontSize = value;
    this.emitOnChange("fontSize");
  }
  set fontWeight(value: string | undefined) {
    this._fontWeight = value;
    this.emitOnChange("fontWeight");
  }
  set textAlign(value: TextAlign | undefined) {
    this._textAlign = value;
    this.emitOnChange("textAlign");
  }

  addEventListener(event: "change", callback: EventCallback<ChangeEventArgs>) {
    switch (event) {
      case "change":
        this._onChangeEventEmitter.add(callback);
        break;
    }
  }

  removeEventListener(
    event: "change",
    callback: EventCallback<ChangeEventArgs>,
  ) {
    switch (event) {
      case "change":
        this._onChangeEventEmitter.remove(callback);
        break;
    }
  }

  private emitOnChange(property: keyof ReportItemProperties) {
    if (this._updating) return;

    this._onChangeEventEmitter.emit({ property });
  }

  getPropertyDefinitions(): Property<ReportItemProperties>[] {
    return [
      { field: "width", label: "Width", type: "number" },
      { field: "height", label: "Height", type: "number" },
      { field: "x", label: "X", type: "number" },
      { field: "y", label: "Y", type: "number" },
      { field: "text", label: "Text", type: "string" },
      { field: "name", label: "Name", type: "string" },
      { field: "binding", label: "Binding", type: "string" },
      { field: "padding", label: "Padding", type: "number" },
      { field: "backgroundColor", label: "Background Color", type: "string" },
      { field: "color", label: "Color", type: "string" },
      { field: "border", label: "Border", type: "string" },
      { field: "fontFamily", label: "Font Family", type: "string" },
      { field: "fontSize", label: "Font Size", type: "number" },
      { field: "fontWeight", label: "Font Weight", type: "string" },
      { field: "textAlign", label: "Text Align", type: "string" },
    ];
  }

  beginUpdate() {
    this._updating = true;
  }

  endUpdate() {
    this._updating = false;

    this.emitOnChange("endUpdate");
  }
}
