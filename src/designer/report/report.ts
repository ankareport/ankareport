import { EventCallback } from "../../core/eventEmitter";
import { ILayout } from "../../core/layout";
import Resizer, { ResizerOrientation } from "../components/resizer";
import Designer from "../designer";
import ReportSection, { SelectEventArgs } from "../reportSection/reportSection";
import "./report.css";
import ReportProperties from "./reportProperties";

export interface ReportEventMap {
  select: SelectEventArgs;
}

export interface ReportOptions {
  designer: Designer;
}

export default class Report {
  public readonly element = document.createElement("div");

  public readonly reportSectionHeader: ReportSection;
  public readonly reportSectionContent: ReportSection;
  public readonly reportSectionFooter: ReportSection;

  public readonly resizer = new Resizer({
    orientation: ResizerOrientation.Vertical,
    onResize: (e) => {
      this.properties.width = this.properties.width + e.offsetX;
    },
  });

  public readonly properties = new ReportProperties();

  constructor(options: ReportOptions) {
    this.reportSectionHeader = new ReportSection({
      title: "Header",
      designer: options.designer,
      defaultStylesList: [this.properties],
    });
    this.reportSectionContent = new ReportSection({
      title: "Content",
      designer: options.designer,
      defaultStylesList: [this.properties],
    });
    this.reportSectionFooter = new ReportSection({
      title: "Footer",
      designer: options.designer,
      defaultStylesList: [this.properties],
    });

    this.properties.addEventListener("change", () => this.refresh());

    this._init();
  }

  private _init() {
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
    this.element.style.width = `${this.properties.width}px`;
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

  loadLayout(layout: ILayout) {
    this.properties.width = layout.width;
    this.properties.color = layout.color;
    this.properties.backgroundColor = layout.backgroundColor;
    this.properties.textAlign = layout.textAlign;
    this.properties.borderWidth = layout.borderWidth;
    this.properties.borderStyle = layout.borderStyle;
    this.properties.borderColor = layout.borderColor;
    this.properties.fontFamily = layout.fontFamily;
    this.properties.fontSize = layout.fontSize;
    this.properties.fontWeight = layout.fontWeight;

    this.reportSectionHeader.loadLayout(layout.headerSection);
    this.reportSectionContent.loadLayout(layout.contentSection);
    this.reportSectionFooter.loadLayout(layout.footerSection);

    this.refresh();
  }

  toJSON(): ILayout {
    return {
      width: this.properties.width,
      color: this.properties.color,
      backgroundColor: this.properties.backgroundColor,
      textAlign: this.properties.textAlign,
      borderWidth: this.properties.borderWidth,
      borderStyle: this.properties.borderStyle,
      borderColor: this.properties.borderColor,
      fontFamily: this.properties.fontFamily,
      fontSize: this.properties.fontSize,
      fontWeight: this.properties.fontWeight,
      headerSection: this.reportSectionHeader.toJSON(),
      contentSection: this.reportSectionContent.toJSON(),
      footerSection: this.reportSectionFooter.toJSON(),
    };
  }
}
