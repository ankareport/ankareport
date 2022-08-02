import { EventCallback } from "../core/eventEmitter";
import { ReportLayout } from "../core/layout";
import ReportSection, { SelectEventArgs } from "./reportSection";
import Resizer, { ResizerOrientation } from "./resizer";
import "./report.css";

const DEFAULT_REPORT_WIDTH = 400;
const MIN_REPORT_WIDTH = 100;

export interface ReportEventMap {
  select: SelectEventArgs;
}

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

    this.element.tabIndex = 0;

    this.element.appendChild(this.reportSectionHeader.element);
    this.element.appendChild(this.reportSectionContent.element);
    this.element.appendChild(this.reportSectionFooter.element);
    this.element.appendChild(this.resizer.element);

    this.initSelectEvents();
    this.initKeyDownEvent();

    this.refresh();
  }

  private initSelectEvents() {
    this.reportSectionHeader.addEventListener("select", (e) => {
      this.deselectExcept(e, this.reportSectionHeader);
    });

    this.reportSectionContent.addEventListener("select", (e) => {
      this.deselectExcept(e, this.reportSectionContent);
    });

    this.reportSectionFooter.addEventListener("select", (e) => {
      this.deselectExcept(e, this.reportSectionFooter);
    });
  }

  private deselectExcept(
    e: SelectEventArgs,
    exceptReportSection: ReportSection,
  ) {
    if (
      e.type !== "ReportItem" ||
      exceptReportSection !== this.reportSectionHeader
    ) {
      this.reportSectionHeader.deselectAll();
    }

    if (
      e.type !== "ReportItem" ||
      exceptReportSection !== this.reportSectionContent
    ) {
      this.reportSectionContent.deselectAll();
    }

    if (
      e.type !== "ReportItem" ||
      exceptReportSection !== this.reportSectionFooter
    ) {
      this.reportSectionFooter.deselectAll();
    }
  }

  private initKeyDownEvent() {
    this.element.addEventListener("keydown", (e) => {
      if (e.key === "Delete") {
        this.reportSectionHeader.removeSelectedItem();
        this.reportSectionContent.removeSelectedItem();
        this.reportSectionFooter.removeSelectedItem();
      }
    });
  }

  refresh() {
    this.element.style.width = `${this.width}px`;
  }

  addEventListener<K extends keyof ReportEventMap>(
    event: K,
    listener: EventCallback<ReportEventMap[K]>,
  ) {
    switch (event) {
      case "select":
        this.reportSectionHeader.addEventListener(event, listener);
        this.reportSectionContent.addEventListener(event, listener);
        this.reportSectionFooter.addEventListener(event, listener);
        break;
    }
  }

  loadLayout(layout: ReportLayout) {
    this._width = layout.width;

    this.reportSectionHeader.loadLayout(layout.headerSection);
    this.reportSectionContent.loadLayout(layout.contentSection);
    this.reportSectionFooter.loadLayout(layout.footerSection);

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
