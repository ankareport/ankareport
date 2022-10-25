import { Property } from "../components/propertyGrid/property";
import StyleProperties from "./styleProperties";

export default class ReportItemProperties extends StyleProperties {
  private _x = 0;
  private _y = 0;
  private _width = 0;
  private _height = 0;
  private _name = "";
  private _text = "";
  private _binding = "";

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get name() {
    return this._name;
  }
  get text() {
    return this._text;
  }
  get binding() {
    return this._binding;
  }

  set x(value: number) {
    this._x = value;
    this.emitOnChange("x");
  }
  set y(value: number) {
    this._y = value;
    this.emitOnChange("y");
  }
  set width(value: number) {
    this._width = value;
    this.emitOnChange("width");
  }
  set height(value: number) {
    this._height = value;
    this.emitOnChange("height");
  }
  set name(value: string) {
    this._name = value;
    this.emitOnChange("name");
  }
  set text(value: string) {
    this._text = value;
    this.emitOnChange("text");
  }
  set binding(value: string) {
    this._binding = value;
    this.emitOnChange("binding");
  }

  getPropertyDefinitions(): Property[] {
    return [
      { field: "x", label: "X", type: "number" },
      { field: "y", label: "Y", type: "number" },
      { field: "width", label: "Width", type: "number" },
      { field: "height", label: "Height", type: "number" },
      { field: "name", label: "Name", type: "string" },
      { field: "text", label: "Text", type: "string" },
      { field: "binding", label: "Binding", type: "string" },
      ...super.getPropertyDefinitions(),
    ];
  }
}
