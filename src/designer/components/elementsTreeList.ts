import TreeItem, { TreeItemData } from "../../components/treeList/treeItem";
import TreeList from "../../components/treeList/treeList";
import ReportItem from "../../core/reportItem";
import ReportContainer from "../reportContainer/reportContainer";
import ReportSection from "../reportSection/reportSection";

export type ElementsTreeItemData =
  | ElementsTreeItemDataSection
  | ElementsTreeItemDataItem;

export interface ElementsTreeItemDataSection {
  type: "section";
  component: ReportSection;
}

export interface ElementsTreeItemDataItem {
  type: "item";
  component: ReportItem;
}

export interface ElementsTreeListOptions {
  reportContainer: ReportContainer;
}

export default class ElementsTreeList extends TreeList<ElementsTreeItemData> {
  constructor(private readonly options: ElementsTreeListOptions) {
    super({
      collapseByArrow: true,
      itemRenderer: (treeItem, data) => this._itemRenderer(treeItem, data),
    });
  }

  refresh() {
    if (!this.options) return;

    this.dataSource = this.getDataSource();

    super.refresh();
  }

  private _itemRenderer(
    treeItem: TreeItem<ElementsTreeItemData>,
    treeItemData: TreeItemData<ElementsTreeItemData>,
  ) {
    switch (treeItemData.data.type) {
      case "section":
        treeItem.addEventListener("click", () => {
          treeItemData.data.component.element.focus();
        });
        break;
      case "item":
        treeItem.addEventListener("click", () => {
          treeItemData.data.component.element.focus();
        });
        break;
    }
  }

  getDataSource() {
    const s1 = this.options.reportContainer.report.reportSectionHeader;
    const s2 = this.options.reportContainer.report.reportSectionContent;
    const s3 = this.options.reportContainer.report.reportSectionFooter;

    return [
      this.getSectionData(s1, "Header"),
      this.getSectionData(s2, "Content"),
      this.getSectionData(s3, "Footer"),
    ];
  }

  getSectionData(
    section: ReportSection,
    label?: string,
  ): TreeItemData<ElementsTreeItemData> {
    return {
      label: label || `Section [${section.properties.binding}]`,
      data: {
        type: "section",
        component: section,
      },
      children: [
        ...section.items.map((x) => {
          const item: TreeItemData<ElementsTreeItemData> = {
            label: `Text [${x.properties.binding || x.properties.text || ""}]`,
            data: {
              type: "item",
              component: x,
            },
          };
          return item;
        }),
        ...section.subsections.map((x) => this.getSectionData(x)),
      ],
    };
  }
}
