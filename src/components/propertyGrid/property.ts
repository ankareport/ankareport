export type PropertyType = "boolean" | "string" | "number" | "color";

export interface Property {
  field: string;
  label: string;
  type: PropertyType;
}
