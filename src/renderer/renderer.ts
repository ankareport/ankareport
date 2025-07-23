import { ILayout } from "../core/layout";
import Section from "./section";
import { exportToPdf } from "../export/export-to-pdf";

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

  async exportToPdf(fileName: string) {
    const bytes = await exportToPdf(this.options.layout, this.options.data);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}
