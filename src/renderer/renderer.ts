import { ILayout } from "../core/layout";
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
    );
    this.footerSection = new Section(
      this.options.layout.footerSection,
      this.options.data,
    );

    this.options.element.style.width = this.options.layout.width + "px";
    this.options.element.style.position = "relative";

    this.options.element.appendChild(this.headerSection.element);

    const contentProperty = this.options.layout.contentSection.binding;

    this.options.data[contentProperty].forEach((data: any) => {
      const contentSection = new Section(
        this.options.layout.contentSection,
        data,
      );
      this.options.element.appendChild(contentSection.element);
    });

    this.options.element.appendChild(this.footerSection.element);
  }
}
