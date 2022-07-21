import EventEmitter, { EventCallback } from "../core/eventEmitter";
import { ReportSection as LayoutReportSection } from "../core/layout";
import ReportItem from "./reportItem";
import ReportItemSelector from "./reportItemSelector";
import Resizer, { ResizerOrientation } from "./resizer";
import "./reportSection.css";

const DEFAULT_SECTION_HEIGHT = 100;
const MIN_SECTION_HEIGHT = 10;

export interface SelectEventArgs {
  item: ReportItem;
}

export default class ReportSection {
  public readonly element = document.createElement("div");
  public readonly header = document.createElement("div");
  public readonly content = document.createElement("div");
  public readonly reportItemSelector = new ReportItemSelector(this);
  public readonly resizer = new Resizer({
    orientation: ResizerOrientation.Horizontal,
    onResize: (e) => {
      this.height = this.height + e.offsetY;
    },
  });
  public items: ReportItem[] = [];

  private readonly _onSelectEventEmitter = new EventEmitter<SelectEventArgs>();

  private _height: number = DEFAULT_SECTION_HEIGHT;

  get height() {
    return this._height;
  }

  set height(value: number) {
    this._height = Math.max(MIN_SECTION_HEIGHT, value);
    this.refresh();
  }

  public binding = "";

  constructor(private readonly text: string) {
    this.init();
  }

  init() {
    this.element.classList.add("anka-report-section");
    this.header.classList.add("anka-report-section__header");
    this.content.classList.add("anka-report-section__content");

    this.element.appendChild(this.header);
    this.element.appendChild(this.content);
    this.content.appendChild(this.reportItemSelector.element);
    this.content.appendChild(this.resizer.element);
    this.refresh();

    this.element.onclick = (e) => this.onContentClick(e);
    this.content.ondragover = (e) => e.preventDefault();
    this.content.ondrop = (e) => this.onContentDrop(e);
  }

  refresh() {
    this.header.innerText = this.text;
    this.content.style.height = `${this.height}px`;
  }

  onContentClick(e: MouseEvent) {
    if (e.target === this.content) {
      this.deselectAll();
    }
  }

  addEventListener(event: "select", callback: EventCallback<SelectEventArgs>) {
    switch (event) {
      case "select":
        this._onSelectEventEmitter.add(callback);
        break;
    }
  }

  onContentDrop(e: DragEvent) {
    e.preventDefault();

    const text = e.dataTransfer?.getData("text");

    const item = this.addItem();
    if (text) item.properties.text = text;
    item.properties.binding = e.dataTransfer?.getData("name") || "";
    item.properties.x = e.offsetX;
    item.properties.y = e.offsetY;

    this.selectItem(item);
  }

  addItem() {
    const item = new ReportItem();
    item.onClick(() => this.selectItem(item));
    this.items.push(item);

    this.content.insertBefore(item.element, this.reportItemSelector.element);

    return item;
  }

  selectItem(item: ReportItem) {
    this.deselectAll();

    item.isSelected = true;
    item.refresh();

    this.reportItemSelector.show(item);

    this._onSelectEventEmitter.emit({ item });
  }

  deselectAll() {
    this.items.forEach((x) => {
      x.isSelected = false;
      x.refresh();
    });

    this.reportItemSelector.hide();
  }

  loadJSON(data: LayoutReportSection) {
    this.height = data.height;
    this.binding = data.binding;

    data.items.forEach((data) => {
      const item = this.addItem();
      item.loadJSON(data);
    });

    this.refresh();
  }

  toJSON(): LayoutReportSection {
    return {
      height: this.height,
      binding: this.binding,
      items: this.items.map((x) => x.toJSON()),
    };
  }
}
