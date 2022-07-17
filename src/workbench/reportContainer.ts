import Report from "./report";
import "./reportContainer.css";

export default class ReportContainer {
  public readonly element = document.createElement("div");
  public readonly report = new Report();

  constructor() {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-report-container");

    this.element.appendChild(this.report.element);
  }
}
