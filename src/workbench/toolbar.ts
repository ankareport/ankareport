import ToolbarButton, { ToolbarButtonOptions } from "./toolbarButton";
import "./toolbar.css";

export enum ToolbarOrientation {
  Horizontal,
  Vertical,
}

export default class Toolbar {
  public element = document.createElement("div");
  public readonly buttons: ToolbarButton[] = [];

  constructor(public orientation = ToolbarOrientation.Vertical) {
    this.element.classList.add("anka-toolbar");

    switch (orientation) {
      case ToolbarOrientation.Vertical:
        this.element.classList.add("anka-toolbar-vertical");
        break;
      case ToolbarOrientation.Horizontal:
        this.element.classList.add("anka-toolbar-horizontal");
        break;
    }
  }

  addButton(options: ToolbarButtonOptions) {
    const button = new ToolbarButton(options);

    this.element.appendChild(button.element);

    this.buttons.push(button);

    return button;
  }
}
