import Toolbar, { ToolbarOrientation } from "./toolbar";
import ToolbarButton from "./toolbarButton";

export default class ToolbarLeftMenu extends Toolbar {
  public readonly labelButton: ToolbarButton;

  constructor() {
    super(ToolbarOrientation.Vertical);

    this.labelButton = this.addButton({
      text: "Ͳ",
      title: "Text",
      draggable: true,
      type: "text",
    });

    this.labelButton = this.addButton({
      text: "I",
      title: "Image",
      draggable: true,
      type: "image",
    });
  }
}
