import { Property } from "../../components/propertyGrid/property";
import StyleProperties from "../../core/styleProperties";

const DEFAULT_REPORT_WIDTH = 400;
const MIN_REPORT_WIDTH = 100;

export default class ReportProperties extends StyleProperties {
  private _width = DEFAULT_REPORT_WIDTH;

  get width() {
    return this._width;
  }

  set width(value: number) {
    this._width = Math.max(value, MIN_REPORT_WIDTH);
    this.emitOnChange("width");
  }

  getPropertyDefinitions(): Property[] {
    return [
      { field: "width", label: "Width", type: "number" },
      ...super.getPropertyDefinitions(),
    ];
  }
}
