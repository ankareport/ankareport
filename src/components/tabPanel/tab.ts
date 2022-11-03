import "./tab.css";

export interface TabOptions {
  icon?: string;
  title: string;
  content: HTMLElement;
}

export default class Tab {
  public readonly element = document.createElement("div");
  public readonly elementIcon = document.createElement("img");
  public readonly elementText = document.createElement("span");

  get content() {
    return this.options.content;
  }

  constructor(private readonly options: TabOptions) {
    this._init();
  }

  private _init() {
    this.element.classList.add("anka-tab");
    this.elementIcon.classList.add("anka-tab__icon");
    this.elementText.classList.add("anka-tab__text");

    this.element.appendChild(this.elementIcon);
    this.element.appendChild(this.elementText);

    this.elementText.innerText = this.options.title;
  }

  select() {
    this.element.classList.add("selected");
  }

  unselect() {
    this.element.classList.remove("selected");
  }

  addEventListener(event: "click", listener: (content: HTMLElement) => void) {
    if (event === "click") {
      this.element.addEventListener("click", () => {
        listener(this.options.content);
      });
    }
  }
}
