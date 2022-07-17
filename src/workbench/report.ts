import ReportSection from "./reportSection";
import "./report.css";

export default class Report {
  public element = document.createElement("div");

  public readonly reportSectionHeader = new ReportSection("Header", 100);
  public readonly reportSectionContent = new ReportSection("Content", 300);
  public readonly reportSectionFooter = new ReportSection("Footer", 100);

  constructor() {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-report");

    this.element.appendChild(this.reportSectionHeader.element);
    this.element.appendChild(this.reportSectionContent.element);
    this.element.appendChild(this.reportSectionFooter.element);

    this.refresh();
  }

  refresh() {
    this.element.style.width = "400px";
  }
}
