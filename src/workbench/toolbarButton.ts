import Button from "./button";
import "./toolbarButton.css";

export interface ToolbarButtonOptions {
  draggable?: boolean;
}

export default class ToolbarButton extends Button {
  public draggable = false;

  constructor(text: string, options?: ToolbarButtonOptions) {
    super(text);

    this.element.classList.add("anka-toolbar-button");

    this.size.width = 25;
    this.size.height = 25;

    if (options) {
      this.draggable = options.draggable ?? this.draggable;
    }
  }

  refresh() {
    super.refresh();

    this.element.draggable = this.draggable;
  }
}
