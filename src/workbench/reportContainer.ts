import { EventCallback } from "../core/eventEmitter";
import { ReportLayout } from "../core/layout";
import Report from "./report";
import { SelectEventArgs } from "./reportSection";
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

  addEventListener(event: "select", callback: EventCallback<SelectEventArgs>) {
    switch (event) {
      case "select":
        this.report.addEventListener("select", callback);
        break;
    }
  }

  loadJSON(data: ReportLayout) {
    return this.report.loadJSON(data);
  }

  toJSON(): ReportLayout {
    return this.report.toJSON();
  }
}
