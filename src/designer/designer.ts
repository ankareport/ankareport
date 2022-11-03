import PropertyGrid from "../components/propertyGrid/propertyGrid";
import EventEmitter, { EventCallback } from "../core/eventEmitter";
import { ILayout } from "../core/layout";
import DataSourceTreeList, {
  DataSourceTreeItemData,
} from "./components/dataSourceTreeList";
import ReportContainer from "./reportContainer/reportContainer";
import Sidebar from "./sidebar/sidebar";
import ToolbarLeftMenu from "./toolbar/toolbarLeftMenu";
import ToolbarTopMenu from "./toolbar/toolbarTopMenu";
import "./designer.css";
import { Database, TreeStructure } from "../images";
import ElementsTreeList from "./components/elementsTreeList";
import { ChangeEventArgs as ReportChangeEventArgs } from "./report/report";

export interface DataSourceChangeEventArgs {
  dataSource: DataSourceTreeItemData[];
}

export interface DesignerEventsMap {
  dataSourceChange: DataSourceChangeEventArgs;
  change: ReportChangeEventArgs;
}

export interface DesignerOptions {
  element: HTMLDivElement;
  dataSource?: DataSourceTreeItemData[];
  onSaveButtonClick?: EventCallback<ILayout>;
  layout?: ILayout;
}

export default class Designer {
  public readonly elementContent = document.createElement("div");

  public readonly menu = new ToolbarTopMenu();
  public readonly toolbar = new ToolbarLeftMenu();

  public readonly reportContainer: ReportContainer;

  public readonly sidebar = new Sidebar();
  private readonly dataSourceTreeList = new DataSourceTreeList();
  private readonly elementsTreeList: ElementsTreeList;
  private readonly propertyGrid = new PropertyGrid();

  private readonly _dataSourceChangeEventEmitter =
    new EventEmitter<DataSourceChangeEventArgs>();

  constructor(options: DesignerOptions) {
    const { element } = options;

    this.reportContainer = new ReportContainer({
      designer: this,
    });

    this.elementsTreeList = new ElementsTreeList({
      reportContainer: this.reportContainer,
    });

    element.classList.add("anka-designer");
    this.elementContent.classList.add("anka-designer__content");

    element.appendChild(this.menu.element);
    element.appendChild(this.elementContent);

    this.elementContent.appendChild(this.toolbar.element);
    this.elementContent.appendChild(this.reportContainer.element);
    this.elementContent.appendChild(this.sidebar.element);

    this.sidebar.addTabs([
      {
        icon: Database,
        title: "Data Source",
        content: this.dataSourceTreeList.element,
      },
      {
        title: "Elements",
        content: this.elementsTreeList.element,
      },
    ]);

    this.sidebar.addPanel(
      TreeStructure,
      "Properties",
      this.propertyGrid.element,
    );

    if (options.dataSource) this.setDataSource(options.dataSource);

    this.reportContainer.addEventListener("select", (e) => {
      switch (e.type) {
        case "Report":
        case "ReportSection":
        case "ReportItem":
          this.propertyGrid.setDataSource(e.element.properties);
          break;
        default:
          this.propertyGrid.setDataSource(null);
          break;
      }
    });

    this.reportContainer.addEventListener("change", (e) => {
      switch (e.type) {
        case "add-section":
        case "remove-section":
        case "add-item":
        case "remove-item":
          this.elementsTreeList.refresh();
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

  addEventListener<K extends keyof DesignerEventsMap>(
    event: K,
    callback: EventCallback<DesignerEventsMap[K]>,
  ) {
    switch (event) {
      case "dataSourceChange":
        const callbackDataSourceChange = callback as EventCallback<
          DesignerEventsMap["dataSourceChange"]
        >;
        this._dataSourceChangeEventEmitter.add(callbackDataSourceChange);
        break;
      case "change":
        const callbackOnChange = callback as EventCallback<
          DesignerEventsMap["change"]
        >;
        this.reportContainer.addEventListener("change", callbackOnChange);
        break;
    }
  }

  setDataSource(dataSource: DataSourceTreeItemData[]) {
    this.dataSourceTreeList.setDataSource(dataSource);
    this._dataSourceChangeEventEmitter.emit({ dataSource });
  }

  getDataSource(): DataSourceTreeItemData[] {
    return this.dataSourceTreeList.dataSource.map((x) => x.data);
  }

  loadLayout(layout: ILayout) {
    this.reportContainer.loadLayout(layout);
    this.elementsTreeList.refresh();
  }

  toJSON(): ILayout {
    return this.reportContainer.toJSON();
  }
}
