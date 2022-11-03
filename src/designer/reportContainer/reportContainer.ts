import EventEmitter, { EventCallback } from "../../core/eventEmitter";
import { ILayout } from "../../core/layout";
import Designer from "../designer";
import Report, {
  ChangeEventArgs as ReportChangeEventArgs,
} from "../report/report";
import DesignerReportItem from "../reportItem/designerReportItem";
import ReportSection from "../reportSection/reportSection";
import "./reportContainer.css";

export interface ReportContainerEventMap {
  select: SelectEventArgs;
  change: ReportChangeEventArgs;
}

export interface ReportContainerOptions {
  designer: Designer;
}

export default class ReportContainer {
  public readonly element = document.createElement("div");
  public readonly report: Report;

  private readonly _changeEventEmitter =
    new EventEmitter<ReportChangeEventArgs>();

  constructor(options: ReportContainerOptions) {
    this.report = new Report({
      designer: options.designer,
    });

    this.report.addEventListener("change", (e) => this._onChange(e));

    this.init();
  }

  private init() {
    this.element.classList.add("anka-report-container");

    this.element.appendChild(this.report.element);
  }

  addEventListener<K extends keyof ReportContainerEventMap>(
    event: K,
    listener: EventCallback<ReportContainerEventMap[K]>,
  ) {
    switch (event) {
      case "select":
        const callbackOnSelect = listener as EventCallback<
          ReportContainerEventMap["select"]
        >;

        this.report.addEventListener("select", callbackOnSelect);

        this.element.addEventListener("click", (e) => {
          if (e.target === this.element) {
            e.preventDefault();

            callbackOnSelect({
              type: "Report",
              element: this.report,
            });
          }
        });
        break;
      case "change":
        const callbackOnChange = listener as EventCallback<
          ReportContainerEventMap["change"]
        >;
        this._changeEventEmitter.add(callbackOnChange);
        break;
    }
  }

  private _onChange(args: ReportChangeEventArgs) {
    this._changeEventEmitter.emit(args);
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
