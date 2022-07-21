import { Property } from "./property";
import PropertyGridRow, { ChangeEventArgs } from "./propertyGridRow";
import "./propertyGrid.css";

export default class PropertyGrid<TDataSource> {
  public readonly element = document.createElement("div");

  private _properties: Property<TDataSource>[] = [];

  get properties() {
    return this._properties;
  }

  set properties(value: Property<TDataSource>[]) {
    this._properties = value;
    this.refresh();
  }

  private _dataSource: TDataSource | null = null;

  get dataSource() {
    return this._dataSource;
  }

  set dataSource(value: TDataSource | null) {
    this._dataSource = value;
    this.refresh();
  }

  constructor() {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-property-grid");

    this.onChange = this.onChange.bind(this);

    this.refresh();
  }

  refresh() {
    this.element.innerHTML = "";

    if (!this._dataSource || this._properties.length === 0) {
      this.element.innerText = "No property!";
    }

    if (!this._dataSource) return;

    for (let i = 0; i < this._properties.length; i++) {
      const property = this._properties[i];

      const value: any = this._dataSource[property.field] ?? "";
      const row = new PropertyGridRow<TDataSource>(property, value.toString());

      row.addEventListener("change", (e) => {
        this.onChange(property, e);
      });

      this.element.appendChild(row.element);
    }
  }

  private onChange(property: Property<TDataSource>, args: ChangeEventArgs) {
    if (this._dataSource == null) return;

    switch (property.type) {
      case "string":
        this._dataSource[property.field] = args.value as any;
        break;
      case "number":
        const intValue = parseInt(args.value);

        if (!isNaN(intValue)) {
          this._dataSource[property.field] = intValue as any;
        }
    }
  }
}
