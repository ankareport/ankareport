import { ISection } from "../core/layout";
import ReportItem from "../core/reportItem";
import StyleProperties, { TextAlign } from "../core/styleProperties";

export default class Section {
  public readonly element = document.createElement("div");
  public readonly elementSections = document.createElement("div");
  private readonly reportItems: ReportItem[] = [];

  constructor(
    private readonly layout: ISection,
    private readonly data: any,
  ) {
    this._init();
  }

  private _init() {
    this.element.classList.add("anka-section");

    this.element.style.height = this.layout.height + "px";
    this.element.style.position = "relative";

    this.layout.items?.forEach((layout) => {
      const item = new ReportItem({
        defaultStylesList: [new StyleProperties(this.layout)],
      });
      item.properties.x = layout.x;
      item.properties.y = layout.y;
      item.properties.width = layout.width;
      item.properties.height = layout.height;
      item.properties.color = layout.color;
      item.properties.backgroundColor = layout.backgroundColor;
      item.properties.borderWidth = layout.borderWidth;
      item.properties.borderStyle = layout.borderStyle;
      item.properties.borderColor = layout.borderColor;
      item.properties.fontFamily = layout.fontFamily;
      item.properties.fontSize = layout.fontSize;
      item.properties.fontWeight = layout.fontWeight;
      item.properties.textAlign = layout.textAlign as TextAlign;

      if (layout.binding) {
        item.properties.text = this.data ? this.data[layout.binding] : "NULL";
      } else {
        item.properties.text = layout.text;
      }

      item.refresh();
      this.element.appendChild(item.element);

      this.reportItems.push(item);
    });

    this.layout.sections?.forEach((sectionLayout) => {
      const subDataSource = this.data ? this.data[sectionLayout.binding] : {};

      subDataSource?.forEach((sectionDataSource: any) => {
        const section = new Section(sectionLayout, sectionDataSource);

        this.elementSections.appendChild(section.element);
        this.elementSections.appendChild(section.elementSections);
      });
    });
  }
}
