import Panel from "../components/panel/panel";
import TreeList from "../components/treeList/treeList";
import "./sidebar.css";

export default class Sidebar {
  public readonly element = document.createElement("div");
  public readonly panel = new Panel({ title: "Data Source" });
  public readonly treeList = new TreeList<number>();

  constructor() {
    this.init();
  }

  init() {
    this.element.classList.add("anka-sidebar");

    this.element.style.width = "200px";

    this.element.appendChild(this.panel.element);
    this.panel.appendChild(this.treeList.element);

    this.treeList.setDataSource([
      { data: 1, text: "Item 1", children: [] },
      {
        data: 2,
        text: "Item 2",
        children: [
          {
            data: 3,
            text: "Item 3",
            children: [],
          },
          {
            data: 4,
            text: "Item 4",
            children: [
              {
                data: 5,
                text: "Item 5",
                children: [],
              },
              {
                data: 6,
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
