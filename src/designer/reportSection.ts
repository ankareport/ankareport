import EventEmitter, { EventCallback } from "../core/eventEmitter";
import { ReportSection as LayoutReportSection } from "../core/layout";
import ReportItem from "./reportItem";
import ReportItemSelector from "./reportItemSelector";
import ReportSectionProperties from "./reportSectionProperties";
import Resizer, { ResizerOrientation } from "./resizer";
import "./reportSection.css";

export type SelectEventArgs =
  | SelectReportSectionEventArgs
  | SelectReportItemEventArgs;

export interface SelectReportSectionEventArgs {
  type: "ReportSection";
  element: ReportSection;
}

export interface SelectReportItemEventArgs {
  type: "ReportItem";
  element: ReportItem;
}

export interface ReportSectionEventMap {
  select: SelectEventArgs;
}

export default class ReportSection {
  public readonly element = document.createElement("div");
  public readonly elementHeader = document.createElement("div");
  public readonly elementContent = document.createElement("div");
  public readonly reportItemSelector = new ReportItemSelector(this);
  public readonly resizer = new Resizer({
    orientation: ResizerOrientation.Horizontal,
    onResize: (e) => {
      this.properties.height = this.properties.height + e.offsetY;
    },
  });
  public items: ReportItem[] = [];

  public readonly properties = new ReportSectionProperties();

  private readonly _selectEventEmitter = new EventEmitter<SelectEventArgs>();

  constructor(private readonly text: string) {
    this.init();
  }

  init() {
    this.element.classList.add("anka-report-section");
    this.elementHeader.classList.add("anka-report-section__header");
    this.elementContent.classList.add("anka-report-section__content");

    this.element.tabIndex = 0;

    this.element.appendChild(this.elementHeader);
    this.element.appendChild(this.elementContent);
    this.elementContent.appendChild(this.reportItemSelector.element);
    this.elementContent.appendChild(this.resizer.element);
    this.refresh();

    this.element.addEventListener("focus", () => {
      this._selectEventEmitter.emit({
        type: "ReportSection",
        element: this,
      });
    });
    this.properties.addEventListener("change", () => {
      this.refresh();
    });
    this.elementContent.ondragover = (e) => e.preventDefault();
    this.elementContent.ondrop = (e) => this.onContentDrop(e);
  }

  refresh() {
    this.elementHeader.innerText = this.text;
    this.elementContent.style.height = `${this.properties.height}px`;
  }

  private onContentDrop(e: DragEvent) {
    e.preventDefault();

    const text = e.dataTransfer?.getData("label");

    const item = this.addItem();
    item.properties.text = text || "Label";
    item.properties.binding = e.dataTransfer?.getData("field") || "";
    item.properties.x = e.offsetX;
    item.properties.y = e.offsetY;
    item.properties.width = 100;
    item.properties.height = 20;

    this.selectItem(item);
  }

  addEventListener<K extends keyof ReportSectionEventMap>(
    event: K,
    listener: EventCallback<ReportSectionEventMap[K]>,
  ) {
    switch (event) {
      case "select":
        this._selectEventEmitter.add(listener);
        break;
    }
  }

  addItem() {
    const item = new ReportItem();
    item.addEventListener("select", () => this.selectItem(item));
    this.items.push(item);

    this.elementContent.insertBefore(
      item.element,
      this.reportItemSelector.element,
    );

    return item;
  }

  selectItem(item: ReportItem) {
    this.deselectAll();

    this.reportItemSelector.show(item);

    this._selectEventEmitter.emit({
      type: "ReportItem",
      element: item,
    });
  }

  removeItem(item: ReportItem) {
    const index = this.items.findIndex((x) => x === item);
    this.items.splice(index, 1);
    item.dispose();
  }

  removeSelectedItem() {
    const item = this.reportItemSelector.attachedTo;

    if (item) {
      this.reportItemSelector.hide();
      this.removeItem(item);
    }
  }

  deselectAll() {
    this.reportItemSelector.hide();
  }

  loadLayout(layout: LayoutReportSection) {
    this.properties.height = layout.height;
    this.properties.binding = layout.binding;

    layout.items.forEach((data) => {
      const item = this.addItem();
      item.loadLayout(data);
    });

    this.refresh();
  }

  toJSON(): LayoutReportSection {
    return {
      height: this.properties.height,
      binding: this.properties.binding,
      items: this.items.map((x) => x.toJSON()),
    };
  }
}
