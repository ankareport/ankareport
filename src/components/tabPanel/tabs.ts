import Tab, { TabOptions } from "./tab";
import "./tabs.css";

export interface TabsOptions {
  tabs: TabOptions[];
}

export default class Tabs {
  public readonly element = document.createElement("div");
  public readonly elementHeader = document.createElement("div");
  public readonly elementContent = document.createElement("div");

  private selectedTab?: Tab;
  private tabs: Tab[] = [];

  constructor(private readonly options: TabsOptions) {
    this._init();
  }

  private _init() {
    this.element.classList.add("anka-tabs");
    this.elementHeader.classList.add("anka-tabs__header");
    this.elementContent.classList.add("anka-tabs__content");

    this.element.appendChild(this.elementHeader);
    this.element.appendChild(this.elementContent);

    this.options.tabs.forEach((tabOptions) => {
      const tab = new Tab(tabOptions);

      tab.addEventListener("click", () => {
        this.selectTab(tab);
      });

      this.tabs.push(tab);
      this.elementHeader.appendChild(tab.element);
    });

    if (this.tabs.length > 0) {
      this.selectTab(this.tabs[0]);
    }
  }

  selectTab(tab: Tab) {
    this.selectedTab?.unselect();
    this.selectedTab = tab;
    tab.select();

    this.elementContent.innerHTML = "";
    this.elementContent.appendChild(tab.content);
  }
}
