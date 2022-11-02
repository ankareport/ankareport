import { EventCallback } from "../../../core/eventEmitter";
import { PropertyEditor, PropertyEditorEventsMap } from "../property";
import "./colorPicker.css";

export interface ColorPickerEventArgs {
  value: string;
}

export interface ColorPickerEventsMap {
  change: ColorPickerEventArgs;
}

export default class ColorPicker implements PropertyEditor {
  public readonly element = document.createElement("input");

  constructor() {
    this.element.type = "color";
  }

  get value() {
    return this.element.value;
  }

  set value(value: string) {
    this.element.value = value;
  }

  addEventListener<K extends keyof ColorPickerEventsMap>(
    event: K,
    listener: EventCallback<PropertyEditorEventsMap[K]>,
  ): void {
    switch (event) {
      case "change":
        this.element.addEventListener("change", () => {
          listener({ value: this.value });
        });

        break;
    }
  }
}
