import { EventCallback } from "../../../core/eventEmitter";
import { PropertyEditor, PropertyEditorEventsMap } from "../property";
import "./dropdownList.css";

export interface DropdownListItem {
  label: string;
  value: string;
}

export interface DropdownListOptions {
  items: DropdownListItem[];
  defaultValue: string;
}

export default class DropdownList implements PropertyEditor {
  public readonly element = document.createElement("select");
  public readonly items: HTMLOptionElement[] = [];

  private _value: string = "";

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.refresh();
  }

  constructor(public readonly options: DropdownListOptions) {
    this._init();
  }

  private _init() {
    this._value = this.options.defaultValue;

    this.refresh();
  }

  refresh() {
    this.element.innerHTML = "";
    this.items.length = 0;

    for (let i = 0; i < this.options.items.length; i++) {
      const item = this.options.items[i];

      const option = document.createElement("option");
      option.innerText = item.label;
      option.value = item.value;

      if (this.options.defaultValue === item.value) {
        option.selected = true;
      }

      this.element.appendChild(option);
      this.items.push(option);
    }
  }

  addEventListener<K extends keyof PropertyEditorEventsMap>(
    event: K,
    listener: EventCallback<PropertyEditorEventsMap[K]>,
  ) {
    switch (event) {
      case "change":
        this.element.addEventListener("change", () => {
          listener({ value: this.element.value });
        });

        break;
    }
  }
}
