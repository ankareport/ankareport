import { Property } from "../../components/propertyGrid/property";
import Properties from "../../core/properties";

const DEFAULT_SECTION_HEIGHT = 100;
const MIN_SECTION_HEIGHT = 10;

export default class ReportSectionProperties extends Properties {
  private _height: number = DEFAULT_SECTION_HEIGHT;
  private _binding = "";
  private _title = "Section";

  get height() {
    return this._height;
  }
  get binding() {
    return this._binding;
  }
  get title() {
    return this._title;
  }

  set height(value: number) {
    this._height = Math.max(MIN_SECTION_HEIGHT, value);
    this.emitOnChange("height");
  }
  set binding(value: string) {
    this._binding = value;
    this.emitOnChange("binding");
  }
  set title(value: string) {
    this._title = value;
    this.emitOnChange("title");
  }

  getPropertyDefinitions(): Property[] {
    return [{ field: "height", label: "Height", type: "number" }];
  }
}
