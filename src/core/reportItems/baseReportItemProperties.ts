import { Property } from "../../components/propertyGrid/property";
import StyleProperties from "../styleProperties";

export default class BaseReportItemProperties extends StyleProperties {
  private _x = 0;
  private _y = 0;
  private _width = 0;
  private _height = 0;
  private _name = "";

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
  set x(value: number) {
    const oldValue = this.x;
    this._x = value;
    this.emitOnChange("x", value, oldValue);
  }
  set y(value: number) {
    const oldValue = this._y;
    this._y = value;
    this.emitOnChange("y", value, oldValue);
  }
  set width(value: number) {
    const oldValue = this.width;
    this._width = value;
    this.emitOnChange("width", value, oldValue);
  }
  set height(value: number) {
    const oldValue = this.height;
    this._height = value;
    this.emitOnChange("height", value, oldValue);
  }
  set name(value: string) {
    const oldValue = this.name;
    this._name = value;
    this.emitOnChange("name", value, oldValue);
  }

  getPropertyDefinitions(): Property[] {
    return [
      { field: "x", label: "X", type: "number" },
      { field: "y", label: "Y", type: "number" },
      { field: "width", label: "Width", type: "number" },
      { field: "height", label: "Height", type: "number" },
      { field: "name", label: "Name", type: "string" },
      { field: "text", label: "Text", type: "string" },
      ...super.getPropertyDefinitions(),
    ];
  }
}
