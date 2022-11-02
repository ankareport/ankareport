import "./panel.css";

export interface PanelOptions {
  icon?: string;
  title: string;
}

export default class Panel {
  public readonly element = document.createElement("div");
  public readonly elementHeader = document.createElement("div");
  public readonly elementHeaderImage = document.createElement("img");
  public readonly elementHeaderText = document.createElement("span");
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
    this.elementHeader.appendChild(this.elementHeaderImage);
    this.elementHeader.appendChild(this.elementHeaderText);
    this.elementContentContainer.appendChild(this.elementContent);

    this.refresh();
  }

  refresh() {
    if (this.options.icon) {
      this.elementHeaderImage.src = this.options.icon || "";
      this.elementHeaderImage.style.paddingRight = "5px";
      this.elementHeaderImage.style.display = "";
    } else {
      this.elementHeaderImage.style.display = "none";
    }

    this.elementHeaderText.innerText = this.options.title;
  }

  appendChild(child: HTMLElement) {
    this.elementContent.appendChild(child);
  }
}
