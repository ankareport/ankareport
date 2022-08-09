import { EventCallback } from "../core/eventEmitter";
import { ILayout } from "../core/layout";
import Designer from "./designer";
import Report from "./report";
import { SelectEventArgs } from "./reportSection";
import "./reportContainer.css";

export interface ReportContainerEventMap {
  select: SelectEventArgs;
}

export interface ReportContainerOptions {
  designer: Designer;
}

export default class ReportContainer {
  public readonly element = document.createElement("div");
  public readonly report: Report;

  constructor(options: ReportContainerOptions) {
    this.report = new Report({
      designer: options.designer,
    });

    this.init();
  }

  private init() {
    this.element.classList.add("anka-report-container");

    this.element.appendChild(this.report.element);
  }

  addEventListener<K extends keyof ReportContainerEventMap>(
    event: K,
    listener: EventCallback<SelectEventArgs>,
  ) {
    switch (event) {
      case "select":
        this.report.addEventListener(event, listener);
        break;
    }
  }

  loadLayout(layout: ILayout) {
    return this.report.loadLayout(layout);
  }

  toJSON(): ILayout {
    return this.report.toJSON();
  }
}
