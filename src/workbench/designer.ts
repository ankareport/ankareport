import { ReportLayout } from "../core/layout";
import ReportContainer from "./reportContainer";
import Sidebar from "./sidebar";
import Toolbar, { ToolbarOrientation } from "./toolbar";
import "./designer.css";

export default class Designer {
  private readonly menu = new Toolbar(ToolbarOrientation.Horizontal);
  private readonly content = document.createElement("div");
  private toolbar = new Toolbar();
  private reportContainer = new ReportContainer();
  private sidebar = new Sidebar();

  constructor(private readonly element: HTMLDivElement) {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-designer");
    this.content.classList.add("anka-designer__content");

    this.element.appendChild(this.menu.element);
    this.element.appendChild(this.content);

    this.content.appendChild(this.toolbar.element);
    this.content.appendChild(this.reportContainer.element);
    this.content.appendChild(this.sidebar.element);

    const saveButton = this.menu.addButton("▒");
    saveButton.onClick(() => {
      console.log(this.toJSON());
    });
    this.menu.addButton("↩");
    this.menu.addButton("↪");

    this.toolbar.addButton("Ͳ", true);
  }

  loadJSON(data: ReportLayout) {
    return this.reportContainer.loadJSON(data);
  }

  toJSON(): ReportLayout {
    return this.reportContainer.toJSON();
  }
}
