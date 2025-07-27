import { ITextReportItem } from "../layout";
import { MultipleStyles } from "../utils/style.utils";
import BaseReportItem, { ReportItemOptions } from "./baseReportItem";
import TextReportItemProperties from "./textReportItemProperties";

export default class TextReportItem extends BaseReportItem {
  public readonly properties = new TextReportItemProperties();

  constructor(options: ReportItemOptions) {
    super();

    if (options.appendTo) {
      options.appendTo.appendChild(this.element);
    }

    this._styles = new MultipleStyles(...options.parentStyles, this.properties);

    if (options.defaultProperties) {
      super.loadLayout(options.defaultProperties);
    }

    super._init();
  }

  refresh() {
    super.refresh();

    const text = this.properties.text || (this.properties.binding ? `[${this.properties.binding}]` : "NULL");

    this.element.innerText = text;
  }

  applyLayout(layout: Partial<ITextReportItem>) {
    this.properties.text = layout.text ?? "";
    this.properties.binding = layout.binding || "";
    this.properties.format = layout.format || "";
    super.applyLayout(layout);
  }

  toJSON(): ITextReportItem {
    return {
      ...super.toJSON(),
      type: "text",
      text: this.properties.text,
      binding: this.properties.binding,
      format: this.properties.format,
    };
  }
}
