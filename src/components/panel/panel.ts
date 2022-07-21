import "./panel.css";

export interface PanelOptions {
  title: string;
}

export default class Panel {
  public readonly element = document.createElement("div");
  public readonly elementHeader = document.createElement("div");
  public readonly elementContentContainer = document.createElement("div");
  public readonly elementContent = document.createElement("div");

  constructor(public readonly options: PanelOptions) {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-panel");
    this.elementHeader.classList.add("anka-panel__header");
    this.elementContentContainer.classList.add("anka-panel__content-container");
    this.elementContent.classList.add("anka-panel__content");

    this.element.appendChild(this.elementHeader);
    this.element.appendChild(this.elementContentContainer);
    this.elementContentContainer.appendChild(this.elementContent);

    this.refresh();
  }

  refresh() {
    this.elementHeader.innerText = this.options.title;
  }

  appendChild(child: HTMLElement) {
    this.elementContent.appendChild(child);
  }
}
