import "./panel.css";

export interface PanelOptions {
  title: string;
}

export default class Panel {
  public readonly element = document.createElement("div");
  public readonly elementHeader = document.createElement("div");
  public readonly elementContent = document.createElement("div");

  constructor(private readonly options: PanelOptions) {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-panel");
    this.elementHeader.classList.add("anka-panel__header");
    this.elementContent.classList.add("anka-panel__content");

    this.element.appendChild(this.elementHeader);
    this.element.appendChild(this.elementContent);

    this.refresh();
  }

  refresh() {
    this.elementHeader.innerText = this.options.title;
  }

  appendChild(child: HTMLElement) {
    this.elementContent.appendChild(child);
  }
}
