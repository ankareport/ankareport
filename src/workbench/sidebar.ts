import Panel from "../components/panel/panel";
import TreeList from "../components/treeList/treeList";
import "./sidebar.css";

interface DataSourceTreeItemData {
  name: string;
}

export default class Sidebar {
  public readonly element = document.createElement("div");
  public readonly panel = new Panel({ title: "Data Source" });
  public readonly treeList = new TreeList<DataSourceTreeItemData>();

  constructor() {
    this.init();
  }

  init() {
    this.element.classList.add("anka-sidebar");

    this.element.style.width = "200px";

    this.element.appendChild(this.panel.element);
    this.panel.appendChild(this.treeList.element);

    this.treeList.setDataSource([
      { data: { name: "item1" }, text: "Item 1", children: [] },
      {
        data: { name: "item2" },
        text: "Item 2",
        children: [
          {
            data: { name: "item3" },
            text: "Item 3",
            children: [],
          },
          {
            data: { name: "item4" },
            text: "Item 4",
            children: [
              {
                data: { name: "item5" },
                text: "Item 5",
                children: [],
              },
              {
                data: { name: "item6" },
                text: "Item 6",
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  }
}
