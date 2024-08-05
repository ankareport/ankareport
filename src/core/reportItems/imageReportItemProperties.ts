import { Property } from "../../components/propertyGrid/property";
import BaseReportItemProperties from "./baseReportItemProperties";

export default class ImageReportItemProperties extends BaseReportItemProperties {
  private _source = "";
  private _binding = "";

  get source() {
    return this._source;
  }
  get binding() {
    return this._binding;
  }

  set source(value: string) {
    const oldValue = this.source;
    this._source = value;
    this.emitOnChange("source", value, oldValue);
  }
  set binding(value: string) {
    const oldValue = this.binding;
    this._binding = value;
    this.emitOnChange("binding", value, oldValue);
  }

  getPropertyDefinitions(): Property[] {
    return [
      { field: "source", label: "Source", type: "string" }, // TODO: type: image
      { field: "binding", label: "Binding", type: "string" },
      ...super.getPropertyDefinitions(),
    ];
  }
}
