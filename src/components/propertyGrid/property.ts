import { EventCallback } from "../../core/eventEmitter";

export type PropertyType = "boolean" | "string" | "number" | "color";

export interface ChangeEventArgs {
  value: string;
}

export interface PropertyEditorEventsMap {
  change: ChangeEventArgs;
}

export interface PropertyEditor {
  element: HTMLElement;
  value: string;
  addEventListener<K extends keyof PropertyEditorEventsMap>(
    event: K,
    listener: EventCallback<PropertyEditorEventsMap[K]>,
  ): void;
}

export interface Property {
  field: string;
  label: string;
  type: PropertyType;
  editor?: PropertyEditor;
}
