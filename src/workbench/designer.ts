import PropertyGrid from "../components/propertyGrid/propertyGrid";
import TreeList from "../components/treeList/treeList";
import { ReportLayout } from "../core/layout";
import ReportContainer from "./reportContainer";
import ReportItemProperties from "./reportItemProperties";
import Sidebar from "./sidebar";
import Toolbar, { ToolbarOrientation } from "./toolbar";
import "./designer.css";

interface DataSourceTreeItemData {
  name: string;
}

export default class Designer {
  private readonly menu = new Toolbar(ToolbarOrientation.Horizontal);
  private readonly content = document.createElement("div");
  private toolbar = new Toolbar();
  private reportContainer = new ReportContainer();
  private sidebar = new Sidebar();

  public readonly dataSourceTreeList = new TreeList<DataSourceTreeItemData>();
  public readonly propertyGrid = new PropertyGrid<ReportItemProperties>();

  constructor(private readonly element: HTMLDivElement) {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-designer");
    this.content.classList.add("anka-designer__content");

    this.element.appendChild(this.menu.element);
    this.element.appendChild(this.content);

    this.content.appendChild(this.toolbar.element);
    this.content.appendChild(this.reportContainer.element);
    this.content.appendChild(this.sidebar.element);

    const saveButton = this.menu.addButton("▒");
    saveButton.onClick(() => {
      console.log(this.toJSON());
    });
    this.menu.addButton("↩");
    this.menu.addButton("↪");

    this.toolbar.addButton("Ͳ", true);

    // DataSourceTreeList
    this.dataSourceTreeList.setDataSource([
      {
        text: "Item 1",
        data: {
          name: "item1",
        },
      },
    ]);
    this.sidebar.addPanel("Data Source", this.dataSourceTreeList.element);

    // PropertyGrid
    this.sidebar.addPanel("Properties", this.propertyGrid.element);

    const styles = new ReportItemProperties();
    this.propertyGrid.properties = styles.getPropertyDefinitions();

    this.reportContainer.addEventListener("select", (e) => {
      this.propertyGrid.dataSource = e.item.properties;

      // TODO: Remove this
      e.item.properties.addEventListener("change", () => {
        this.propertyGrid.refresh();
      });
    });
  }

  loadJSON(data: ReportLayout) {
    return this.reportContainer.loadJSON(data);
  }

  toJSON(): ReportLayout {
    return this.reportContainer.toJSON();
  }
}
