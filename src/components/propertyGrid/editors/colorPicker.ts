import { EventCallback } from "../../../core/eventEmitter";
import { PropertyEditor, PropertyEditorEventsMap } from "../property";
import "./colorPicker.css";

export interface ColorPickerEventArgs {
  value: string;
}

export interface ColorPickerEventsMap {
  change: ColorPickerEventArgs;
}

export interface ColorPickerOptions {
  defaultValue: string;
}

export default class ColorPicker implements PropertyEditor {
  public readonly element = document.createElement("input");

  constructor(private readonly options: ColorPickerOptions) {
    this.element.type = "color";
  }

  get value() {
    if (this.element.value === this.options.defaultValue) {
      return "";
    }

    return this.element.value;
  }

  set value(value: string) {
    if (!value) {
      this.element.value = this.options.defaultValue;
    } else {
      this.element.value = value;
    }
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
