import PropertyGrid from "../components/propertyGrid/propertyGrid";
import { ReportLayout } from "../core/layout";
import DataSourceTreeList, {
  DataSourceTreeItemData,
} from "./dataSourceTreeList";
import ReportContainer from "./reportContainer";
import Sidebar from "./sidebar";
import ToolbarLeftMenu from "./toolbarLeftMenu";
import ToolbarTopMenu from "./toolbarTopMenu";
import "./designer.css";

export type SaveButtonClickCallback = (layout: ReportLayout) => void;

export interface DesignerOptions {
  element: HTMLDivElement;
  dataSource?: DataSourceTreeItemData[];
  onSaveButtonClick?: SaveButtonClickCallback;
  layout?: ReportLayout;
}

export default class Designer {
  public readonly elementContent = document.createElement("div");

  public readonly menu = new ToolbarTopMenu();
  public readonly toolbar = new ToolbarLeftMenu();

  public readonly reportContainer = new ReportContainer();

  public readonly sidebar = new Sidebar();
  private readonly dataSourceTreeList = new DataSourceTreeList();
  private readonly propertyGrid = new PropertyGrid();

  constructor(options: DesignerOptions) {
    const { element } = options;
    element.classList.add("anka-designer");
    this.elementContent.classList.add("anka-designer__content");

    element.appendChild(this.menu.element);
    element.appendChild(this.elementContent);

    this.elementContent.appendChild(this.toolbar.element);
    this.elementContent.appendChild(this.reportContainer.element);
    this.elementContent.appendChild(this.sidebar.element);

    this.sidebar.addPanel("Data Source", this.dataSourceTreeList.element);
    this.sidebar.addPanel("Properties", this.propertyGrid.element);

    if (options.dataSource) this.setDataSource(options.dataSource);

    this.reportContainer.addEventListener("select", (e) => {
      switch (e.type) {
        case "ReportSection":
        case "ReportItem":
          this.propertyGrid.setDataSource(e.element.properties);
          break;
        default:
          this.propertyGrid.setDataSource(null);
          break;
      }
    });

    if (options.layout) {
      this.loadLayout(options.layout);
    }

    if (options.onSaveButtonClick) {
      this.menu.saveButton.addEventListener("click", () => {
        const layout = this.toJSON();
        options.onSaveButtonClick!(layout);
      });
    }
  }

  setDataSource(dataSource: DataSourceTreeItemData[]) {
    this.dataSourceTreeList.setDataSource(dataSource);
  }

  loadLayout(layout: ReportLayout) {
    return this.reportContainer.loadLayout(layout);
  }

  toJSON(): ReportLayout {
    return this.reportContainer.toJSON();
  }
}
