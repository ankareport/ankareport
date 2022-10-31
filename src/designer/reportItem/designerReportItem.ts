import ReportItem, { ReportItemOptions } from "../../core/reportItem";

export default class DesignerReportItem extends ReportItem {
  constructor(options: ReportItemOptions) {
    super(options);

    this.element.style.cursor = "pointer";
  }

  refresh() {
    super.refresh();

    if (this.properties.binding) {
      this.element.innerText = `[${this.properties.binding}]`;
    }

    this.element.style.border =
      this.element.style.border || "1px solid #cccccc";
  }
}
