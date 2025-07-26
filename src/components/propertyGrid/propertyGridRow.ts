import EventEmitter, { EventCallback } from "../../core/eventEmitter";
import Textbox from "./editors/textbox";
import { Property, PropertyEditor } from "./property";
import "./propertyGridRow.css";

export interface ChangeEventArgs {
  value: string;
}

export interface PropertyGridRowEventsMap {
  change: ChangeEventArgs;
}

export default class PropertyGridRow {
  public readonly element = document.createElement("div");
  public readonly elementLabel = document.createElement("div");
  public readonly elementEditorContainer = document.createElement("div");
  public readonly editor: PropertyEditor;

  private readonly _changeEventEmitter = new EventEmitter<ChangeEventArgs>();

  constructor(
    public readonly property: Property,
    private readonly value: string,
  ) {
    this.editor = property.editor || new Textbox();

    this._init();
  }

  private _init() {
    this.element.classList.add("anka-property-grid-row");
    this.elementLabel.classList.add("anka-property-grid-row__label");
    this.elementEditorContainer.classList.add(
      "anka-property-grid-row__editor-container",
    );

    this.element.appendChild(this.elementLabel);
    this.element.appendChild(this.elementEditorContainer);
    this.elementEditorContainer.appendChild(this.editor.element);

    this.editor.addEventListener("change", (e) => {
      this._changeEventEmitter.emit({ value: e.value });
    });

    this.refresh();
  }

  refresh() {
    this.elementLabel.innerText = this.property.label;
    this.editor.value = this.value;
  }

  addEventListener<K extends keyof PropertyGridRowEventsMap>(
    event: K,
    callback: EventCallback<PropertyGridRowEventsMap[K]>,
  ) {
    switch (event) {
      case "change":
        this._changeEventEmitter.add(callback);
        break;
    }
  }
}
