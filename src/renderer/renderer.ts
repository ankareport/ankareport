import { saveAs } from "file-saver";
import { ILayout } from "../core/layout";
import { exportToXlsx } from "../exports/excel-exporter";
import { exportToPdf } from "../exports/pdf-exporter";
import Section from "./section";

export interface RendererOptions {
  element: HTMLDivElement;
  layout: ILayout;
  data: any;
}

export default class Renderer {
  private readonly headerSection: Section;
  private readonly footerSection: Section;

  constructor(private readonly options: RendererOptions) {
    if (!options.data) throw "Data is required";
    if (Array.isArray(options.data)) throw "Data must be an object";

    this.headerSection = new Section(
      this.options.layout.headerSection,
      this.options.data,
      [this.options.layout],
    );
    this.footerSection = new Section(
      this.options.layout.footerSection,
      this.options.data,
      [this.options.layout],
    );

    this.options.element.style.width = this.options.layout.width + "px";
    this.options.element.style.position = "relative";

    this.options.element.appendChild(this.headerSection.element);

    const contentProperty = this.options.layout.contentSection.binding;

    this.options.data[contentProperty].forEach((data: any) => {
      const contentSection = new Section(
        this.options.layout.contentSection,
        data,
        [this.options.layout],
      );
      this.options.element.appendChild(contentSection.element);
      this.options.element.appendChild(contentSection.elementSections);
    });

    this.options.element.appendChild(this.footerSection.element);
  }

  public exportToPdf(filename: string) {
    const pdf = exportToPdf(this.options.layout, this.options.data);

    pdf.save(filename);
  }

  public async exportToXlsx(filename: string) {
    const workbook = exportToXlsx(this.options.layout, this.options.data);

    const data = await workbook.xlsx.writeBuffer();

    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });

    saveAs(blob, filename);
  }
}
