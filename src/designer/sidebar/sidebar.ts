import Panel from "../../components/panel/panel";
import "./sidebar.css";

export default class Sidebar {
  public readonly element = document.createElement("div");
  public readonly elementContent = document.createElement("div");

  private _width = 200;

  get width() {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
    this.refresh();
  }

  constructor() {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-sidebar");
    this.elementContent.classList.add("anka-sidebar__content");

    this.element.appendChild(this.elementContent);

    this.refresh();
  }

  refresh() {
    this.element.style.width = this._width + "px";
  }

  addPanel(icon: string, title: string, content: HTMLElement) {
    const panel = new Panel({ icon, title });

    panel.elementContent.appendChild(content);

    this.elementContent.appendChild(panel.element);
  }
}
