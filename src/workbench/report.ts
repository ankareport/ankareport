import { ReportLayout } from "../core/layout";
import ReportSection from "./reportSection";
import Resizer, { ResizerOrientation } from "./resizer";
import "./report.css";

const DEFAULT_REPORT_WIDTH = 400;
const MIN_REPORT_WIDTH = 100;

export default class Report {
  public readonly element = document.createElement("div");

  public readonly reportSectionHeader = new ReportSection("Header");
  public readonly reportSectionContent = new ReportSection("Content");
  public readonly reportSectionFooter = new ReportSection("Footer");
  public readonly resizer = new Resizer({
    orientation: ResizerOrientation.Vertical,
    onResize: (e) => {
      this.width = this.width + e.offsetX;
    },
  });

  private _width: number = DEFAULT_REPORT_WIDTH;

  get width() {
    return this._width;
  }

  set width(value: number) {
    this._width = Math.max(MIN_REPORT_WIDTH, value);
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
    this.element.style.width = `${this.width}px`;
  }

  loadJSON(data: ReportLayout) {
    this._width = data.width;

    this.reportSectionHeader.loadJSON(data.headerSection);
    this.reportSectionContent.loadJSON(data.contentSection);
    this.reportSectionFooter.loadJSON(data.footerSection);

    this.refresh();
  }

  toJSON(): ReportLayout {
    return {
      width: this.width,
      headerSection: this.reportSectionHeader.toJSON(),
      contentSection: this.reportSectionContent.toJSON(),
      footerSection: this.reportSectionFooter.toJSON(),
    };
  }
}
