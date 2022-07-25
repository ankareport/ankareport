import TreeItem, { TreeItemData } from "../components/treeList/treeItem";
import TreeList from "../components/treeList/treeList";

export interface DataSourceTreeItemData {
  label: string;
  field: string;
  children?: DataSourceTreeItemData[];
}

export interface DataSourceTreeListOptions {
  dataSource?: DataSourceTreeItemData[];
}

export default class DataSourceTreeList extends TreeList<DataSourceTreeItemData> {
  constructor(options?: DataSourceTreeListOptions) {
    const dataSource = options?.dataSource
      ? convertToDataSource(options.dataSource)
      : undefined;

    super({
      dataSource,
      itemRenderer: dataSourceItemRenderer,
    });
  }

  setDataSource(dataSource: DataSourceTreeItemData[]): void {
    this.dataSource = convertToDataSource(dataSource);
    this.refresh();
  }
}

const convertToDataSource = (
  data: DataSourceTreeItemData[],
): TreeItemData<DataSourceTreeItemData>[] => {
  return data.map((x) => ({
    label: x.label,
    data: x,
    children: x.children ? convertToDataSource(x.children) : undefined,
  }));
};

const dataSourceItemRenderer = (
  item: TreeItem<DataSourceTreeItemData>,
  itemData: TreeItemData<DataSourceTreeItemData>,
) => {
  if (item.hasChild) return;

  item.element.draggable = true;

  item.element.addEventListener("dragstart", (e) => {
    e.dataTransfer?.setData("label", itemData.label);
    e.dataTransfer?.setData("field", itemData.data.field);
  });
};
