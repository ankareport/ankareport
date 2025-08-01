import { ISection, IStyle } from "../core/layout";
import {
  BarcodeReportItem,
  ImageReportItem,
  ReportItem,
  TextReportItem,
} from "../core/reportItems";
import StyleProperties from "../core/styleProperties";
import { formatDate, formatNumber } from "../core/utils/format";

export default class Section {
  public readonly element = document.createElement("div");
  public readonly elementSections = document.createElement("div");
  private readonly reportItems: ReportItem[] = [];

  constructor(
    private readonly layout: ISection,
    private readonly data: any,
    private readonly defaultStyles: IStyle[],
  ) {
    this._init();
  }

  private _init() {
    this.element.classList.add("anka-section");

    this.element.style.height = this.layout.height + "px";
    this.element.style.position = "relative";

    const defaultStylesList: StyleProperties[] = [];
    this.defaultStyles.forEach((x) =>
      defaultStylesList.push(new StyleProperties(x)),
    );
    defaultStylesList.push(new StyleProperties(this.layout));

    this.layout.items?.forEach((layout) => {
      if (!layout.type || layout.type === "text") {
        const item = new TextReportItem({ parentStyles: defaultStylesList });
        item.loadLayout(layout);
        if (layout.binding) {
          let bindedData = this.data ? this.data[layout.binding] : "NULL";

          if (layout.format) {
            if (typeof bindedData === "number") {
              bindedData = formatNumber(bindedData, layout.format);
            } else if (new Date(bindedData).toString() !== "Invalid Date") {
              bindedData = formatDate(bindedData, layout.format);
            }
          }

          item.properties.text = bindedData;
        }
        this.element.appendChild(item.element);
        this.reportItems.push(item);
      } else if (layout.type === "image") {
        const item = new ImageReportItem({ parentStyles: defaultStylesList });
        item.loadLayout(layout);
        if (layout.binding) {
          item.properties.source = this.data ? this.data[layout.binding] : "";
        }
        this.element.appendChild(item.element);
        this.reportItems.push(item);
      } else if (layout.type === "barcode") {
        const item = new BarcodeReportItem({ parentStyles: defaultStylesList });
        item.loadLayout(layout);
        if (layout.binding) {
          item.properties.value = this.data ? this.data[layout.binding] : "";
        }
        this.element.appendChild(item.element);
        this.reportItems.push(item);
      }
    });

    this.layout.sections?.forEach((sectionLayout) => {
      const subDataSource = this.data ? this.data[sectionLayout.binding] : {};

      subDataSource?.forEach((sectionDataSource: any) => {
        const section = new Section(sectionLayout, sectionDataSource, [
          ...this.defaultStyles,
          this.layout,
        ]);

        this.elementSections.appendChild(section.element);
        this.elementSections.appendChild(section.elementSections);
      });
    });
  }
}
