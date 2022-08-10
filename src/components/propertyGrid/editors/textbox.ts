import { EventCallback } from "../../../core/eventEmitter";
import { PropertyEditor, PropertyEditorEventsMap } from "../property";
import "./textbox.css";

export interface ChangeEventArgs {
  value: string;
}

export interface TextboxEventsMap {
  change: ChangeEventArgs;
}

export default class Textbox implements PropertyEditor {
  public readonly element = document.createElement("input");

  get value() {
    return this.element.value;
  }

  set value(value: string) {
    this.element.value = value;
  }

  addEventListener<K extends keyof TextboxEventsMap>(
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
