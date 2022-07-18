import TreeItem from "./treeItem";

export interface TreeDataItem<T> {
  text: string;
  parent?: TreeDataItem<T>;
  children?: TreeDataItem<T>[];
  data: T;
}

export default class TreeList<T> {
  public readonly element = document.createElement("div");
  public readonly dataSource: TreeDataItem<T>[] = [];

  constructor() {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-tree-list");

    this.dataSource.forEach((data) => {
      const item = new TreeItem(data);

      this.element.appendChild(item.element);
    });
  }

  setDataSource(data: TreeDataItem<T>[]) {
    this.dataSource.length = 0;

    data.forEach((x) => this.dataSource.push(x));

    this.init();
  }

  refresh() {}
}
