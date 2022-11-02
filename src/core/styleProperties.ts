import ColorPicker from "../components/propertyGrid/editors/colorPicker";
import { createBorderStyleDropdownEditor } from "../components/propertyGrid/editors/dropdownList.borderStyle";
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
  private _textAlign?: TextAlign;
  private _borderWidth?: number;
  private _borderStyle?: string;
  private _borderColor?: string;
  private _fontFamily?: string;
  private _fontSize?: string;
  private _fontWeight?: string;

  constructor(defaultValues?: IStyle) {
    super();

    if (!defaultValues) return;

    this._color = defaultValues.color;
    this._backgroundColor = defaultValues.backgroundColor;
    this._textAlign = defaultValues.textAlign;
    this._borderWidth = defaultValues.borderWidth;
    this._borderStyle = defaultValues.borderStyle;
    this._borderColor = defaultValues.borderColor;
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
  get textAlign() {
    return this._textAlign;
  }
  get borderWidth() {
    return this._borderWidth;
  }
  get borderStyle() {
    return this._borderStyle;
  }
  get borderColor() {
    return this._borderColor;
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
  set textAlign(value: TextAlign | undefined) {
    this._textAlign = value;
    this.emitOnChange("textAlign");
  }
  set borderWidth(value: number | undefined) {
    this._borderWidth = value;
    this.emitOnChange("borderWidth");
  }
  set borderStyle(value: string | undefined) {
    this._borderStyle = value;
    this.emitOnChange("borderStyle");
  }
  set borderColor(value: string | undefined) {
    this._borderColor = value;
    this.emitOnChange("borderColor");
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
      {
        field: "textAlign",
        label: "Text Align",
        type: "string",
        editor: createTextAlignDropdownEditor(),
      },
      { field: "borderWidth", label: "Border Width", type: "number" },
      {
        field: "borderStyle",
        label: "Border Style",
        type: "string",
        editor: createBorderStyleDropdownEditor(),
      },
      {
        field: "borderColor",
        label: "Border Color",
        type: "string",
        editor: new ColorPicker({ defaultValue: "#000000" }),
      },
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
