export type PropertyType = "boolean" | "string" | "number" | "color";

export interface Property<TDataSource> {
  field: keyof TDataSource;
  label: string;
  type: PropertyType;
}
