import Menu, { MenuOptions } from "../menu/menu";
import "./contextMenu.css";

export interface ContextMenuOptions extends MenuOptions {
  left: number;
  top: number;
}

export default class ContextMenu {
  public readonly element = document.createElement("div");

  private readonly menu: Menu;

  constructor(private readonly options: ContextMenuOptions) {
    this.menu = new Menu(options);

    this.init();
  }

  private init() {
    this.element.classList.add("anka-context-menu-container");

    document.body.appendChild(this.element);

    this.element.appendChild(this.menu.element);

    this.element.addEventListener("click", (e) => {
      if (e.target === this.element) {
        this.dispose();
      }
    });

    this.menu.addEventListener("click", () => this.dispose());

    this.refresh();
  }

  refresh() {
    this.menu.refresh();

    this.menu.element.style.left = `${this.options.left}px`;
    this.menu.element.style.top = `${this.options.top}px`;
  }

  dispose() {
    this.element.remove();
  }
}
