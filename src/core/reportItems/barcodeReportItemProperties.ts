import DropdownList from "../../components/propertyGrid/editors/dropdownList";
import { Property } from "../../components/propertyGrid/property";
import BaseReportItemProperties from "./baseReportItemProperties";

export default class ImageReportItemProperties extends BaseReportItemProperties {
  private _value = "";
  private _binding = "";
  private _format = "";
  private _barWidth: 1 | 2 | 3 | 4 = 1;

  get value() {
    return this._value;
  }
  get binding() {
    return this._binding;
  }
  get format() {
    return this._format;
  }
  get barWidth() {
    return this._barWidth;
  }

  set value(value: string) {
    const oldValue = this.value;
    this._value = value;
    this.emitOnChange("value", value, oldValue);
  }
  set binding(value: string) {
    const oldValue = this.binding;
    this._binding = value;
    this.emitOnChange("binding", value, oldValue);
  }
  set format(value: string) {
    const oldValue = this.format;
    this._format = value;
    this.emitOnChange("format", value, oldValue);
  }
  set barWidth(value: 1 | 2 | 3 | 4) {
    const oldValue = this.barWidth;
    this._barWidth = value;
    this.emitOnChange("barWidth", value, oldValue);
  }

  getPropertyDefinitions(): Property[] {
    return [
      { field: "value", label: "Value", type: "string" },
      { field: "binding", label: "Binding", type: "string" },
      { field: "format", label: "Format", type: "string", editor: createFormatEditor() },
      { field: "barWidth", label: "Bar Width", type: "number", editor: createBarWidthEditor() },
      ...super.getPropertyDefinitions(),
    ];
  }
}

function createFormatEditor() {
  return new DropdownList({
    defaultValue: "",
    items: [
      { value: "CODE128", label: "CODE128 auto" },
      { value: "CODE128A", label: "CODE128 A" },
      { value: "CODE128B", label: "CODE128 B" },
      { value: "CODE128C", label: "CODE128 C" },
      { value: "EAN13", label: "EAN13" },
      { value: "EAN8", label: "EAN8" },
      { value: "UPC", label: "UPC" },
      { value: "CODE39", label: "CODE39" },
      { value: "ITF14", label: "ITF14" },
      { value: "ITF", label: "ITF" },
      { value: "MSI", label: "MSI" },
      { value: "MSI10", label: "MSI10" },
      { value: "MSI11", label: "MSI11" },
      { value: "MSI1010", label: "MSI1010" },
      { value: "MSI1110", label: "MSI1110" },
      { value: "pharmacode", label: "Pharmacode" },
    ],
  });
}

function createBarWidthEditor() {
  return new DropdownList({
    defaultValue: "",
    items: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
    ],
  });
}
