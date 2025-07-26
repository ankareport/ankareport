import { EventCallback } from "../../../core/eventEmitter";
import { PropertyEditor, PropertyEditorEventsMap } from "../property";
import "./NumberInput.css";

export interface ChangeEventArgs {
  value: number;
}

export interface NumberInputEventsMap {
  change: ChangeEventArgs;
}

export interface NumberInputOptions {
  minValue?: number;
  maxValue?: number;
}

export default class NumberInput implements PropertyEditor {
  public readonly element = document.createElement("input");

  constructor(options?: NumberInputOptions) {
    this.element.type = "number";

    if (options?.minValue !== undefined) {
      this.element.min = options.minValue.toString();
    }

    if (options?.maxValue !== undefined) {
      this.element.max = options.maxValue.toString();
    }
  }

  get value() {
    return this.element.value;
  }

  set value(value: string) {
    this.element.value = value;
  }

  addEventListener<K extends keyof NumberInputEventsMap>(
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
