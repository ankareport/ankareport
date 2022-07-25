---
sidebar_position: 3
---

# Designer

```ts title="Designer"
class Designer {
  menu: ToolbarTopMenu;

  constructor(options: DesignerOptions);

  setDataSource(dataSource: DataSourceTreeItemData[]);

  loadLayout(layout: ReportLayout);

  toJSON(): ReportLayout;
}
```

```ts title="DesignerOptions"
interface DesignerOptions {
  element: HTMLDivElement;
  layout?: ReportLayout;
  dataSource?: DataSourceTreeItemData[];
  onSaveButtonClick?: (layout: ReportLayout) => void;
}
```

```ts title="DataSourceTreeItemData"
interface DataSourceTreeItemData {
  label: string;
  field: string;
  children?: DataSourceTreeItemData[];
}
```
