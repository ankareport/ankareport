import PropertyGrid from "../components/propertyGrid/propertyGrid";
import TreeList from "../components/treeList/treeList";
import { ReportLayout } from "../core/layout";
import ReportContainer from "./reportContainer";
import ReportItemProperties from "./reportItemProperties";
import Sidebar from "./sidebar";
import ToolbarLeftMenu from "./toolbarLeftMenu";
import ToolbarTopMenu from "./toolbarTopMenu";
import "./designer.css";

interface DataSourceTreeItemData {
  name: string;
}

export default class Designer {
  public readonly elementContent = document.createElement("div");
  public readonly menu = new ToolbarTopMenu();
  public readonly toolbar = new ToolbarLeftMenu();
  public readonly reportContainer = new ReportContainer();
  public readonly sidebar = new Sidebar();

  private readonly dataSourceTreeList = new TreeList<DataSourceTreeItemData>();
  private readonly propertyGrid = new PropertyGrid<ReportItemProperties>();

  constructor(private readonly element: HTMLDivElement) {
    this.init();
  }

  private init() {
    this.element.classList.add("anka-designer");
    this.elementContent.classList.add("anka-designer__content");

    this.element.appendChild(this.menu.element);
    this.element.appendChild(this.elementContent);

    this.elementContent.appendChild(this.toolbar.element);
    this.elementContent.appendChild(this.reportContainer.element);
    this.elementContent.appendChild(this.sidebar.element);

    this.menu.saveButton.addEventListener("click", () => {
      console.log(this.toJSON());
    });

    // DataSourceTreeList
    // TODO: Remove this
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
