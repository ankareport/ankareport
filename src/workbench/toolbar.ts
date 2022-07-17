import ToolbarButton from "./toolbarButton";
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

  addButton(text: string, draggable: boolean = false) {
    const button = new ToolbarButton(text, {
      draggable,
    });

    button.refresh();
    button.appendTo(this.element);

    this.buttons.push(button);

    return button;
  }
}
