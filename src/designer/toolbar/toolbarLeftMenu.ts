import { ITranslations } from "../../core/translations/translations-contract";
import Toolbar, { ToolbarOrientation } from "./toolbar";
import ToolbarButton from "./toolbarButton";

export default class ToolbarLeftMenu extends Toolbar {
  public readonly labelButton: ToolbarButton;

  constructor(translations: ITranslations) {
    super(ToolbarOrientation.Vertical);

    this.labelButton = this.addButton({
      text: "Ͳ",
      title: translations.text,
      draggable: true,
      type: "text",
    });

    this.labelButton = this.addButton({
      text: "I",
      title: translations.image,
      draggable: true,
      type: "image",
    });

    this.labelButton = this.addButton({
      text: "B",
      title: translations.barcode,
      draggable: true,
      type: "barcode",
    });

    this.addButton({
      text: "☰",
      title: translations.section,
      draggable: true,
      type: "section",
    });
  }
}
