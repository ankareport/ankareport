import { EventCallback } from "../../core/eventEmitter";
import "./treeItem.css";

export interface TreeItemData<TData> {
  label: string;
  data: TData;
  parent?: TreeItemData<TData>;
  children?: TreeItemData<TData>[];
}

export type TreeItemRenderer<TData> = (
  item: TreeItem<TData>,
  itemData: TreeItemData<TData>,
) => void;

export interface TreeItemOptions<TData> {
  data: TreeItemData<TData>;
  renderer?: TreeItemRenderer<TData>;
  collapseByArrow?: boolean;
}

export default class TreeItem<TData> {
  public readonly element = document.createElement("div");
  private readonly elementHeader = document.createElement("div");
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

  constructor(public readonly options: TreeItemOptions<TData>) {
    this._init();
  }

  private _init() {
    this.element.classList.add("anka-tree-item");
    this.elementHeader.classList.add("header");
    this.elementIcon.classList.add("icon");
    if (this.options.collapseByArrow) {
      this.elementIcon.classList.add("hover");
    }
    this.elementLabel.classList.add("label");
    this.elementChildren.classList.add("children");

    this.element.appendChild(this.elementHeader);
    this.elementHeader.appendChild(this.elementIcon);
    this.elementHeader.appendChild(this.elementLabel);

    if (this.options.renderer) {
      this.options.renderer(this, this.options.data);
    }

    if (this.hasChild) {
      this.element.appendChild(this.elementChildren);

      this.options.data.children!.forEach((x) => {
        const item = new TreeItem<TData>({
          data: x,
          renderer: this.options.renderer,
        });
        this.elementChildren.appendChild(item.element);
      });

      this.elementIcon.addEventListener("click", () => {
        this.collapsed = !this.collapsed;
      });

      if (!this.options.collapseByArrow) {
        this.elementLabel.addEventListener("click", () => {
          this.collapsed = !this.collapsed;
        });
      }
    }

    this.refresh();
  }

  refresh() {
    this.elementLabel.innerText = this.options.data.label;

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

  addEventListener<T extends keyof TreeItemEventsMap>(
    event: T,
    listener: EventCallback<TreeItemEventsMap[T]>,
  ) {
    if (event === "click") {
      this.elementLabel.addEventListener("click", () => listener(undefined));
    }
  }

  get hasChild() {
    return this.options.data.children && this.options.data.children.length > 0;
  }
}

export interface TreeItemEventsMap {
  click: unknown;
}
