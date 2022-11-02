import ColorPicker from "../components/propertyGrid/editors/colorPicker";
import { createFontFamilyDropdownEditor } from "../components/propertyGrid/editors/dropdownList.fontFamily";
import { createFontSizeDropdownEditor } from "../components/propertyGrid/editors/dropdownList.fontSize";
import { createFontWeightDropdownEditor } from "../components/propertyGrid/editors/dropdownList.fontWeight";
import { createTextAlignDropdownEditor } from "../components/propertyGrid/editors/dropdownList.textAlign";
import { Property } from "../components/propertyGrid/property";
import { IStyle } from "./layout";
import Properties from "./properties";

export type TextAlign = "left" | "center" | "right";

export default class StyleProperties extends Properties {
  private _color?: string;
  private _backgroundColor?: string;
  private _padding?: string;
  private _textAlign?: TextAlign;
  private _border?: string;
  private _fontFamily?: string;
  private _fontSize?: string;
  private _fontWeight?: string;

  constructor(defaultValues?: IStyle) {
    super();

    if (!defaultValues) return;

    this._color = defaultValues.color;
    this._backgroundColor = defaultValues.backgroundColor;
    this._padding = defaultValues.padding;
    this._textAlign = defaultValues.textAlign;
    this._border = defaultValues.border;
    this._fontFamily = defaultValues.fontFamily;
    this._fontSize = defaultValues.fontSize;
    this._fontWeight = defaultValues.fontWeight;
  }

  get color() {
    return this._color;
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  get padding() {
    return this._padding;
  }
  get textAlign() {
    return this._textAlign;
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

  set color(value: string | undefined) {
    this._color = value;
    this.emitOnChange("color");
  }
  set backgroundColor(value: string | undefined) {
    this._backgroundColor = value;
    this.emitOnChange("backgroundColor");
  }
  set padding(value: string | undefined) {
    this._padding = value;
    this.emitOnChange("padding");
  }
  set textAlign(value: TextAlign | undefined) {
    this._textAlign = value;
    this.emitOnChange("textAlign");
  }
  set border(value: string | undefined) {
    this._border = value;
    this.emitOnChange("border");
  }
  set fontFamily(value: string | undefined) {
    this._fontFamily = value;
    this.emitOnChange("fontFamily");
  }
  set fontSize(value: string | undefined) {
    this._fontSize = value;
    this.emitOnChange("fontSize");
  }
  set fontWeight(value: string | undefined) {
    this._fontWeight = value;
    this.emitOnChange("fontWeight");
  }

  getPropertyDefinitions(): Property[] {
    return [
      {
        field: "color",
        label: "Color",
        type: "string",
        editor: new ColorPicker({ defaultValue: "#000000" }),
      },
      {
        field: "backgroundColor",
        label: "Background Color",
        type: "string",
        editor: new ColorPicker({ defaultValue: "#ffffff" }),
      },
      { field: "padding", label: "Padding", type: "string" },
      {
        field: "textAlign",
        label: "Text Align",
        type: "string",
        editor: createTextAlignDropdownEditor(),
      },
      { field: "border", label: "Border", type: "string" },
      {
        field: "fontFamily",
        label: "Font Family",
        type: "string",
        editor: createFontFamilyDropdownEditor(),
      },
      {
        field: "fontSize",
        label: "Font Size",
        type: "string",
        editor: createFontSizeDropdownEditor(),
      },
      {
        field: "fontWeight",
        label: "Font Weight",
        type: "string",
        editor: createFontWeightDropdownEditor(),
      },
    ];
  }
}
