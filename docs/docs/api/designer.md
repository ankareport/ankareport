---
sidebar_position: 3
---

# Designer

```ts title="Designer"
class Designer {
  menu: ToolbarTopMenu;

  constructor(options: DesignerOptions);

  setDataSource(dataSource: DataSourceTreeItemData[]);

  loadLayout(layout: ILayout);

  toJSON(): ILayout;
}
```

```ts title="DesignerOptions"
interface DesignerOptions {
  element: HTMLDivElement;
  layout?: ILayout;
  dataSource?: DataSourceTreeItemData[];
  onSaveButtonClick?: (layout: ILayout) => void;
}
```

```ts title="DataSourceTreeItemData"
interface DataSourceTreeItemData {
  label: string;
  field: string;
  children?: DataSourceTreeItemData[];
}
```
