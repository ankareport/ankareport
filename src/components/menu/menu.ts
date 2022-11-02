import EventEmitter, { EventCallback } from "../../core/eventEmitter";
import "./menu.css";

export interface ClickEventArgs {
  key: string;
  data?: any;
}

export interface MenuEventMap {
  click: ClickEventArgs;
}

export interface MenuButton {
  key: string;
  label: string;
  data?: any;
}

export interface MenuOptions {
  buttons: MenuButton[];
  width?: string;
  height?: string;
  onClick?: (ev: ClickEventArgs) => void;
}

export default class Menu {
  public readonly element = document.createElement("div");

  private readonly _clickEventEmitter = new EventEmitter<ClickEventArgs>();

  constructor(private readonly options: MenuOptions) {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-menu");

    if (this.options.onClick) {
      this.addEventListener("click", this.options.onClick);
    }

    this.refresh();
  }

  refresh() {
    this.element.innerHTML = "";

    this.element.style.width = this.options.width || "";
    this.element.style.height = this.options.height || "";

    this.options.buttons.filter(x => x).forEach((button) => {
      const elementButton = document.createElement("div");
      elementButton.classList.add("anka-menu-button");
      elementButton.innerText = button.label;
      elementButton.addEventListener("click", () => {
        this.emitOnClick(button.key, button.data);
      });

      this.element.appendChild(elementButton);
    });
  }

  addEventListener<K extends keyof MenuEventMap>(
    event: K,
    listener: EventCallback<MenuEventMap[K]>,
  ) {
    switch (event) {
      case "click":
        this._clickEventEmitter.add(listener);
        break;
    }
  }

  private emitOnClick(key: string, data?: any) {
    this._clickEventEmitter.emit({ key, data });
  }
}
