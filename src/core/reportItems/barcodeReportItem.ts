import JsBarcode from "jsbarcode";
import { IBarcodeReportItem } from "../layout";
import { MultipleStyles } from "../utils/style.utils";
import BarcodeReportItemProperties from "./barcodeReportItemProperties";
import BaseReportItem, { ReportItemOptions } from "./baseReportItem";

export default class BarcodeReportItem extends BaseReportItem {
  public elementSvg: SVGElement = null!;

  public readonly properties = new BarcodeReportItemProperties();

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

    if (this.elementSvg) this.elementSvg.remove();

    this.elementSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    this.element.appendChild(this.elementSvg);

    const barcode = this.properties.value || (this.properties.binding ? `[${this.properties.binding}]` : "1234567890");

    JsBarcode(this.elementSvg, barcode, {
      width: this.properties.barWidth,
      height: this.properties.height - 42,
      format: this.properties.format,
    });
  }

  applyLayout(layout: Partial<IBarcodeReportItem>) {
    this.properties.value = layout.value || "";
    this.properties.binding = layout.binding || "";
    this.properties.format = layout.format || "";
    this.properties.barWidth = layout.barWidth || 1;
    super.applyLayout(layout);
  }

  toJSON(): IBarcodeReportItem {
    return {
      ...super.toJSON(),
      type: "barcode",
      value: this.properties.value,
      binding: this.properties.binding,
      format: this.properties.format,
      barWidth: this.properties.barWidth,
    };
  }
}
