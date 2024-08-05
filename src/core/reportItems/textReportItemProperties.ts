import { Property } from "../../components/propertyGrid/property";
import BaseReportItemProperties from "./baseReportItemProperties";

export default class TextReportItemProperties extends BaseReportItemProperties {
  private _text = "";
  private _binding = "";

  get text() {
    return this._text;
  }
  get binding() {
    return this._binding;
  }

  set text(value: string) {
    const oldValue = this.text;
    this._text = value;
    this.emitOnChange("text", value, oldValue);
  }
  set binding(value: string) {
    const oldValue = this.binding;
    this._binding = value;
    this.emitOnChange("binding", value, oldValue);
  }

  getPropertyDefinitions(): Property[] {
    return [
      { field: "text", label: "Text", type: "string" },
      { field: "binding", label: "Binding", type: "string" },
      ...super.getPropertyDefinitions(),
    ];
  }
}
