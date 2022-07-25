import { ReportSection } from "../core/layout";
import ReportItem from "../designer/reportItem";

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
      item.properties.x = layout.x;
      item.properties.y = layout.y;
      item.properties.width = layout.width;
      item.properties.height = layout.height;

      if (layout.binding) {
        item.properties.text = this.data[layout.binding];
      } else {
        item.properties.text = layout.text;
      }

      item.refresh();
      this.element.appendChild(item.element);

      this.reportItems.push(item);
    });
  }
}
