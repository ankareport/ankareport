import { Property } from "../../components/propertyGrid/property";
import StyleProperties from "../../core/styleProperties";

const DEFAULT_SECTION_HEIGHT = 100;
const MIN_SECTION_HEIGHT = 10;

export default class ReportSectionProperties extends StyleProperties {
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
    const oldValue = this.height;
    this._height = Math.max(MIN_SECTION_HEIGHT, value);
    this.emitOnChange("height", value, oldValue);
  }
  set binding(value: string) {
    const oldValue = this.binding;
    this._binding = value;
    this.emitOnChange("binding", value, oldValue);
  }
  set title(value: string) {
    const oldValue = this.title;
    this._title = value;
    this.emitOnChange("title", value, oldValue);
  }

  getPropertyDefinitions(): Property[] {
    return [
      { field: "height", label: "Height", type: "number" },
      ...super.getPropertyDefinitions(),
    ];
  }
}
