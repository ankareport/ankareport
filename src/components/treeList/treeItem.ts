import { TreeDataItem } from "./treeList";
import "./treeItem.css";

export default class TreeItem<T> {
  public readonly element = document.createElement("div");
  private readonly elementIcon = document.createElement("div");
  private readonly elementLabel = document.createElement("div");
  private readonly elementChildren = document.createElement("div");

  private _collapsed = false;

  get collapsed() {
    return this._collapsed;
  }

  set collapsed(value: boolean) {
    this._collapsed = value;
    this.refresh();
  }

  constructor(public readonly data: TreeDataItem<T>) {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-tree-item");
    this.elementIcon.classList.add("icon");
    this.elementLabel.classList.add("label");
    this.elementChildren.classList.add("children");

    this.element.appendChild(this.elementIcon);
    this.element.appendChild(this.elementLabel);

    if (this.hasChild) {
      this.element.appendChild(this.elementChildren);

      this.data.children!.forEach((x) => {
        const item = new TreeItem<T>(x);
        this.elementChildren.appendChild(item.element);
      });

      this.elementIcon.onclick = () => (this.collapsed = !this.collapsed);
      this.elementLabel.onclick = () => (this.collapsed = !this.collapsed);
    } else {
      this.elementLabel.draggable = true;

      this.elementLabel.addEventListener("dragstart", (e) => {
        e.dataTransfer?.setData("name", (this.data.data as any).name); // TODO: Fix any
        e.dataTransfer?.setData("text", this.data.text); // TODO: Fix any
      });
    }

    this.refresh();
  }

  refresh() {
    this.elementLabel.innerText = this.data.text;

    if (this.hasChild) {
      if (this.collapsed) {
        this.elementIcon.innerText = "→";
      } else {
        this.elementIcon.innerText = "↓";
      }
    } else {
      this.elementIcon.innerText = "";
    }

    this.elementChildren.style.display = this.collapsed ? "none" : "block";
  }

  get hasChild() {
    return this.data.children && this.data.children.length > 0;
  }
}
