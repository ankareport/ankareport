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

    this.element.innerText = this.properties.text;
  }

  applyLayout(layout: Partial<ITextReportItem>) {
    this.properties.text = layout.text ?? "";
    this.properties.binding = layout.binding || "";
    super.applyLayout(layout);
  }

  toJSON(): ITextReportItem {
    return {
      ...super.toJSON(),
      type: "text",
      text: this.properties.text,
      binding: this.properties.binding,
    };
  }
}
