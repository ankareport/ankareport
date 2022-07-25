import TreeItem, { TreeItemData, TreeItemRenderer } from "./treeItem";

export interface TreeListOptions<TData> {
  dataSource?: TreeItemData<TData>[];
  itemRenderer?: TreeItemRenderer<TData>;
}

export default class TreeList<TData> {
  public readonly element = document.createElement("div");

  public dataSource: TreeItemData<TData>[];
  public itemRenderer?: TreeItemRenderer<TData>;

  constructor(options?: TreeListOptions<TData>) {
    this.dataSource = options?.dataSource || [];
    this.itemRenderer = options?.itemRenderer;

    this.init();
  }

  private init() {
    this.element.classList.add("anka-tree-list");

    this.refresh();
  }

  refresh() {
    this.element.innerHTML = "";

    this.dataSource.forEach((data) => {
      const item = new TreeItem({
        data,
        renderer: this.itemRenderer,
      });

      this.element.appendChild(item.element);
    });
  }
}
