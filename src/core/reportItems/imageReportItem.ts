import { IImageReportItem } from "../layout";
import { MultipleStyles } from "../utils/style.utils";
import ImageReportItemProperties from "./imageReportItemProperties";
import BaseReportItem, { ReportItemOptions } from "./baseReportItem";

export default class ImageReportItem extends BaseReportItem {
  public readonly elementImg = document.createElement("img");

  public readonly properties = new ImageReportItemProperties();

  constructor(options: ReportItemOptions) {
    super();

    this.element.appendChild(this.elementImg);

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

    if (this.elementImg) {
      this.elementImg.style.width = `${this.properties.width}px`;
      this.elementImg.style.height = `${this.properties.height}px`;
      this.elementImg.src = this.properties.source || "";
    }
  }

  applyLayout(layout: Partial<IImageReportItem>) {
    this.properties.source = layout.source || "";
    this.properties.binding = layout.binding || "";
    super.applyLayout(layout);
  }

  toJSON(): IImageReportItem {
    return {
      ...super.toJSON(),
      type: "image",
      source: this.properties.source,
      binding: this.properties.binding,
    };
  }
}
