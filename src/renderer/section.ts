import { ReportSection } from "../core/layout";
import ReportItem from "../workbench/reportItem";

export default class Section {
  public readonly element = document.createElement("div");
  private readonly reportItems: ReportItem[] = [];

  constructor(
    private readonly layout: ReportSection,
    private readonly data: any,
  ) {
    this.init();
  }

  init() {
    this.element.classList.add("anka-section");

    this.element.style.height = this.layout.height + "px";
    this.element.style.position = "relative";

    this.layout.items.forEach((layout) => {
      const item = new ReportItem();
      item.location.x = layout.x;
      item.location.y = layout.y;
      item.size.width = layout.width;
      item.size.height = layout.height;

      if (layout.binding) {
        item.text = this.data[layout.binding];
      } else {
        item.text = layout.text;
      }

      item.refresh();
      this.element.appendChild(item.element);

      this.reportItems.push(item);
    });
  }
}
