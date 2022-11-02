import { Property } from "./property";
import PropertyGridRow, { ChangeEventArgs } from "./propertyGridRow";
import "./propertyGrid.css";
import Properties from "../../core/properties";

export default class PropertyGrid {
  public readonly element = document.createElement("div");

  private _properties: Property[] = [];

  get properties() {
    return this._properties;
  }

  set properties(value: Property[]) {
    this._properties = value;
    this.refresh();
  }

  private _dataSource: Properties | null = null;

  get dataSource() {
    return this._dataSource;
  }

  set dataSource(value: Properties | null) {
    if (this._dataSource) {
      this._dataSource.removeEventListener("change", this.refresh);
    }

    this._dataSource = value;
    this.refresh();

    if (this._dataSource) {
      this._dataSource.addEventListener("change", this.refresh);
    }
  }

  constructor() {
    this._init();
  }

  private _init() {
    this.element.classList.add("anka-property-grid");

    this.refresh = this.refresh.bind(this);
    this.onChange = this.onChange.bind(this);

    this.refresh();
  }

  refresh() {
    this.element.innerHTML = "";

    if (!this._dataSource || this._properties.length === 0) {
      this.element.innerText = "No property!";
      this.element.style.padding = "3px";
    } else {
      this.element.style.padding = "";
    }

    if (!this._dataSource) return;

    for (let i = 0; i < this._properties.length; i++) {
      const property = this._properties[i];

      const value: any = (this._dataSource as any)[property.field] ?? "";
      const row = new PropertyGridRow(property, value.toString());

      row.addEventListener("change", (e) => {
        this.onChange(property, e);
      });

      this.element.appendChild(row.element);
    }
  }

  private onChange(property: Property, args: ChangeEventArgs) {
    if (this._dataSource == null) return;

    switch (property.type) {
      case "string":
        (this._dataSource as any)[property.field] = args.value as any;
        break;
      case "number":
        const intValue = parseInt(args.value);

        if (!isNaN(intValue)) {
          (this._dataSource as any)[property.field] = intValue as any;
        }
    }
  }

  setDataSource(properties: Properties | null) {
    if (properties) {
      this.properties = properties.getPropertyDefinitions();
      this.dataSource = properties;
    } else {
      this.properties = [];
      this.dataSource = null;
    }
  }
}
