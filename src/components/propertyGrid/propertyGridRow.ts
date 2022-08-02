import EventEmitter, { EventCallback } from "../../core/eventEmitter";
import { Property } from "./property";
import "./propertyGridRow.css";

export interface ChangeEventArgs {
  value: string;
}

export default class PropertyGridRow {
  public readonly element = document.createElement("div");
  public readonly elementLabel = document.createElement("div");
  public readonly elementEditorContainer = document.createElement("div");
  public readonly elementEditor = document.createElement("input");

  private readonly _changeEventEmitter = new EventEmitter<ChangeEventArgs>();

  constructor(
    public readonly property: Property,
    private readonly value: string,
  ) {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-property-grid-row");
    this.elementLabel.classList.add("anka-property-grid-row__label");
    this.elementEditorContainer.classList.add(
      "anka-property-grid-row__editor-container",
    );

    this.element.appendChild(this.elementLabel);
    this.element.appendChild(this.elementEditorContainer);
    this.elementEditorContainer.appendChild(this.elementEditor);

    this.elementEditor.addEventListener("change", () => {
      this._changeEventEmitter.emit({ value: this.elementEditor.value });
    });

    this.refresh();
  }

  refresh() {
    this.elementLabel.innerText = this.property.label;
    this.elementEditor.value = this.value;
  }

  addEventListener(event: "change", callback: EventCallback<ChangeEventArgs>) {
    switch (event) {
      case "change":
        this._changeEventEmitter.add(callback);
        break;
    }
  }
}
