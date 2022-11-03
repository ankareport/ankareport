import { Property } from "../components/propertyGrid/property";
import EventEmitter, { EventCallback } from "./eventEmitter";

export interface PropertyChangeEventArgs {
  property: string;
  newValue: any;
  oldValue: any;
}

export interface ChangeEventArgs {
  changes: PropertyChangeEventArgs[];
}

export interface PropertiesEventMap {
  change: ChangeEventArgs;
}

export default abstract class Properties {
  private _cache: PropertyChangeEventArgs[] = [];
  private _updating = false;

  private readonly _changeEventEmitter = new EventEmitter<ChangeEventArgs>();

  protected emitOnChange(property: string, newValue: any, oldValue: any) {
    if (oldValue === newValue) return;

    this._cache.push({
      property,
      newValue,
      oldValue,
    });

    if (this._updating) return;

    this._emitOnChange();
  }

  private _emitOnChange() {
    if (this._cache.length === 0) return;

    this._changeEventEmitter.emit({ changes: [...this._cache] });

    this._cache.length = 0;
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

    this._emitOnChange();
  }

  abstract getPropertyDefinitions(): Property[];
}
