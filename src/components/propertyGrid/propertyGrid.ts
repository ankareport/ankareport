import { Property } from "./property";
import PropertyGridRow from "./propertyGridRow";
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

    this.refresh();
  }

  refresh() {
    this.element.innerHTML = "";

    if (!this._dataSource) return;

    for (let i = 0; i < this._properties.length; i++) {
      const property = this._properties[i];

      const value: any = this._dataSource[property.field] ?? "";
      const row = new PropertyGridRow<TDataSource>(property, value.toString());

      row.addEventListener("change", (e) => {
        if (this._dataSource == null) return;

        switch (property.type) {
          case "string":
            this._dataSource[property.field] = e.value as any;
            break;
          case "number":
            const intValue = parseInt(e.value);

            if (!isNaN(intValue)) {
              this._dataSource[property.field] = intValue as any;
            }
        }
      });

      this.element.appendChild(row.element);
    }
  }
}
