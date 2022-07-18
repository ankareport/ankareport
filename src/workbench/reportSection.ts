import ReportItem from "./reportItem";
import ReportItemSelector from "./reportItemSelector";
import Resizer, { ResizerOrientation } from "./resizer";
import "./reportSection.css";

export default class ReportSection {
  public readonly element = document.createElement("div");
  public readonly header = document.createElement("div");
  public readonly content = document.createElement("div");
  public readonly reportItemSelector = new ReportItemSelector(this);
  public readonly resizer = new Resizer({
    parent: this.element,
    orientation: ResizerOrientation.Horizontal,
    onResize: (e) => {
      this.height = this.height + e.offset.y;
    },
  });
  public children: ReportItem[] = [];

  private _height: number = 100;

  get height() {
    return this._height;
  }

  set height(value: number) {
    this._height = Math.max(10, value);
    this.refresh();
  }

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

  onContentDrop(e: DragEvent) {
    e.preventDefault();

    const item = new ReportItem();
    item.location.x = e.offsetX;
    item.location.y = e.offsetY;
    item.onClick(() => this.selectItem(item));
    this.children.push(item);

    this.content.insertBefore(item.element, this.reportItemSelector.element);

    this.selectItem(item);
  }

  selectItem(item: ReportItem) {
    this.deselectAll();
    item.isSelected = true;
    item.refresh();
    this.reportItemSelector.show(item);
  }

  deselectAll() {
    this.children.forEach((x) => {
      x.isSelected = false;
      x.refresh();
    });

    this.reportItemSelector.hide();
  }
}
