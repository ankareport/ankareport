import { EventCallback } from "../../../core/eventEmitter";
import { PropertyEditor, PropertyEditorEventsMap } from "../property";
import "./imageSelector.css";

export interface ChangeEventArgs {
  value: string;
}

export interface ImageSelectorEventsMap {
  change: ChangeEventArgs;
}

export interface ImageSelectorOptions {
}

export default class ImageSelector implements PropertyEditor {
  public readonly element = document.createElement("div");
  public readonly elementInput = document.createElement("input");
  public readonly elementButton = document.createElement("button");
  public readonly elementFileSelector = document.createElement("input");

  constructor(options?: ImageSelectorOptions) {
    this._onFileInputChange = this._onFileInputChange.bind(this);

    this.elementFileSelector.type = "file";

    this.element.classList.add("image-selector-editor");

    this.element.appendChild(this.elementInput);
    this.element.appendChild(this.elementButton);

    this.elementFileSelector.accept = "image/*";
    this.elementFileSelector.addEventListener("change", this._onFileInputChange);

    this.elementButton.innerHTML = "...";

    if (options) {
      // TODO: Implement
    }

    this.elementButton.addEventListener("click", () => {
      this.elementFileSelector.click();
    });
  }

  get value() {
    return this.elementInput.value;
  }

  set value(value: string) {
    this.elementInput.value = value;
  }

  addEventListener<K extends keyof ImageSelectorEventsMap>(
    event: K,
    listener: EventCallback<PropertyEditorEventsMap[K]>,
  ): void {
    switch (event) {
      case "change":
        this.elementInput.addEventListener("change", () => {
          listener({ value: this.value });
        });

        break;
    }
  }

  _onFileInputChange() {
    if (this.elementFileSelector.files && this.elementFileSelector.files.length > 0) {
      const file = this.elementFileSelector.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.elementInput.value = reader.result as string;
        this.elementInput.dispatchEvent(new Event("change"));
      };
      reader.onerror = (e) => console.error(e);
    }
  }
}
