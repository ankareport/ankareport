import Properties, { PropertyChangeEventArgs } from "../core/properties";
import { ChangeEventArgs } from "./report/report.events";

export class ChangeStack {
  private readonly stack: ChangeEventArgs[] = [];
  private index = -1;
  private _lock = false;

  get canUndo() {
    return this.index > -1;
  }

  get canRedo() {
    return this.index + 1 < this.stack.length;
  }

  add(change: ChangeEventArgs) {
    if (this._lock) return;

    this.index++;

    if (this.index < this.stack.length) {
      this.stack.splice(this.index);
    }

    this.stack.push(change);

    console.log(this.stack);
  }

  undo() {
    if (!this.canUndo) return;

    const change = this.stack[this.index];

    this.index--;

    switch (change.type) {
      case "change-report":
        this._undoProperties(change.report.properties, change.changes);
        break;
      case "change-section":
        this._undoProperties(change.section.properties, change.changes);
        break;
      case "change-item":
        this._undoProperties(change.item.properties, change.changes);
        break;
    }
  }

  redo() {
    if (!this.canRedo) return;

    this.index++;

    const change = this.stack[this.index];

    switch (change.type) {
      case "change-report":
        this._redoProperties(change.report.properties, change.changes);
        break;
      case "change-section":
        this._redoProperties(change.section.properties, change.changes);
        break;
      case "change-item":
        this._redoProperties(change.item.properties, change.changes);
        break;
    }
  }

  lock() {
    this._lock = true;
  }

  unlock() {
    this._lock = false;
  }

  private _undoProperties(
    properties: Properties,
    changes: PropertyChangeEventArgs[],
  ) {
    this._changeProperties(properties, changes, true);
  }

  private _redoProperties(
    properties: Properties,
    changes: PropertyChangeEventArgs[],
  ) {
    this._changeProperties(properties, changes, false);
  }

  private _changeProperties(
    properties: Properties,
    changes: PropertyChangeEventArgs[],
    undo: boolean,
  ) {
    this.lock();
    properties.beginUpdate();

    for (const change of changes) {
      (properties as any)[change.property] = undo
        ? change.oldValue
        : change.newValue;
    }

    properties.endUpdate();
    this.unlock();
  }
}
