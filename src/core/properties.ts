import { Property } from "../components/propertyGrid/property";
import EventEmitter, { EventCallback } from "./eventEmitter";

export interface ChangeEventArgs {
  property: string;
}

export interface PropertiesEventMap {
  change: ChangeEventArgs;
}

export default abstract class Properties {
  private _updating = false;

  private readonly _changeEventEmitter = new EventEmitter<ChangeEventArgs>();

  protected emitOnChange(property: string) {
    if (this._updating) return;

    this._changeEventEmitter.emit({ property });
  }

  addEventListener<K extends keyof PropertiesEventMap>(
    event: K,
    listener: EventCallback<PropertiesEventMap[K]>,
  ) {
    switch (event) {
      case "change":
        this._changeEventEmitter.add(listener);
        break;
    }
  }

  removeEventListener<K extends keyof PropertiesEventMap>(
    event: K,
    listener: EventCallback<PropertiesEventMap[K]>,
  ) {
    switch (event) {
      case "change":
        this._changeEventEmitter.remove(listener);
        break;
    }
  }

  beginUpdate() {
    this._updating = true;
  }

  endUpdate() {
    this._updating = false;

    this.emitOnChange("endUpdate");
  }

  abstract getPropertyDefinitions(): Property[];
}
