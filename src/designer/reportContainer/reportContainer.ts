import EventEmitter, { EventCallback } from "../../core/eventEmitter";
import { ILayout } from "../../core/layout";
import Designer from "../designer";
import Report from "../report/report";
import { ChangeEventArgs as ReportChangeEventArgs } from "../report/report.events";
import { ReportContainerEventMap } from "./report-container.events";

import "./reportContainer.css";

export interface ReportContainerOptions {
  designer: Designer;
}

export default class ReportContainer {
  public readonly element = document.createElement("div");

  public readonly report: Report;

  private readonly _changeEventEmitter =
    new EventEmitter<ReportChangeEventArgs>();

  constructor(options: ReportContainerOptions) {
    this.report = new Report({ designer: options.designer });

    this._init();
  }

  private _init() {
    this.element.classList.add("anka-report-container");

    this.element.appendChild(this.report.element);

    this.report.addEventListener("change", (e) => this._onChange(e));
  }

  addEventListener<K extends keyof ReportContainerEventMap>(
    event: K,
    listener: EventCallback<ReportContainerEventMap[K]>,
  ) {
    switch (event) {
      case "change":
        const callbackOnChange = listener as EventCallback<
          ReportContainerEventMap["change"]
        >;
        this._changeEventEmitter.add(callbackOnChange);
        break;
      case "select":
        const callbackOnSelect = listener as EventCallback<
          ReportContainerEventMap["select"]
        >;

        this.report.addEventListener("select", callbackOnSelect);

        this.element.addEventListener("click", (e) => {
          if (e.target === this.element) {
            e.preventDefault();

            callbackOnSelect({ type: "Report", element: this.report });
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

  private _onChange(args: ReportChangeEventArgs) {
    this._changeEventEmitter.emit(args);
  }
}
