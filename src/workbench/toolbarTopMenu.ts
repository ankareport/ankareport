import Toolbar, { ToolbarOrientation } from "./toolbar";
import ToolbarButton from "./toolbarButton";

export default class ToolbarTopMenu extends Toolbar {
  public readonly saveButton: ToolbarButton;
  public readonly undoButton: ToolbarButton;
  public readonly redoButton: ToolbarButton;

  constructor() {
    super(ToolbarOrientation.Horizontal);

    this.saveButton = this.addButton({ text: "▒", title: "Save" });
    this.undoButton = this.addButton({ text: "↩", title: "Undo" });
    this.redoButton = this.addButton({ text: "↪", title: "Redo" });
  }
}
