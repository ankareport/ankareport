import { EventCallback } from "../../core/eventEmitter";
import { ILayout } from "../../core/layout";
import Designer from "../designer";
import Report from "../report/report";
import DesignerReportItem from "../reportItem/designerReportItem";
import ReportSection from "../reportSection/reportSection";
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

        this.element.addEventListener("click", (e) => {
          if (e.target === this.element) {
            e.preventDefault();

            listener({
              type: "Report",
              element: this.report,
            });
          }
        });
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

export type SelectEventArgs =
  | SelectReportEventArgs
  | SelectReportSectionEventArgs
  | SelectReportItemEventArgs;

export interface SelectReportEventArgs {
  type: "Report";
  element: Report;
}

export interface SelectReportSectionEventArgs {
  type: "ReportSection";
  element: ReportSection;
}

export interface SelectReportItemEventArgs {
  type: "ReportItem";
  element: DesignerReportItem;
}
