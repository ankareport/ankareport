import ReportSection from "./reportSection";
import "./report.css";
import Resizer, { ResizerOrientation } from "./resizer";

export default class Report {
  public readonly element = document.createElement("div");

  public readonly reportSectionHeader = new ReportSection("Header");
  public readonly reportSectionContent = new ReportSection("Content");
  public readonly reportSectionFooter = new ReportSection("Footer");
  public readonly resizer = new Resizer({
    parent: this.element,
    orientation: ResizerOrientation.Vertical,
    onResize: (e) => {
      this.x = this.x + e.offset.x;
    },
  });

  private _x: number = 400;

  get x() {
    return this._x;
  }

  set x(value: number) {
    this._x = Math.max(100, value);
    this.refresh();
  }

  constructor() {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-report");

    this.element.appendChild(this.reportSectionHeader.element);
    this.element.appendChild(this.reportSectionContent.element);
    this.element.appendChild(this.reportSectionFooter.element);
    this.element.appendChild(this.resizer.element);

    this.refresh();
  }

  refresh() {
    this.element.style.width = `${this.x}px`;
  }
}
