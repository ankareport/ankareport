import ContextMenu from "../../components/contextMenu/contextMenu";
import { MenuButton } from "../../components/menu/menu";
import EventEmitter, { EventCallback } from "../../core/eventEmitter";
import { ISection, IReportItem } from "../../core/layout";
import StyleProperties, { TextAlign } from "../../core/styleProperties";
import { MultipleStyles } from "../../core/utils/style.utils";
import { DataSourceTreeItemData } from "../components/dataSourceTreeList";
import Resizer, { ResizerOrientation } from "../components/resizer";
import Designer from "../designer";
import DesignerReportItem from "../reportItem/designerReportItem";
import ReportItemSelector from "../reportItem/reportItemSelector";
import {
  ChangeEventArgs,
  ReportSectionEventMap,
  SelectEventArgs,
} from "./report-section.events";
import {
  findItemsByRect,
  getReportSectionBindings,
  getSubsectionDataList,
} from "./report-section.utils";
import ReportSectionProperties from "./reportSectionProperties";

import "./reportSection.css";
import AreaSelector from "./area-selector";

export interface ReportSectionOptions {
  title: string;
  binding?: string;
  designer: Designer;
  parent?: ReportSection;
  parentStyles: StyleProperties[];
  defaultProperties?: Partial<ISection>;
  appendTo?: HTMLElement;
}

export default class ReportSection {
  public readonly element = document.createElement("div");
  public readonly elementHeader = document.createElement("div");
  public readonly elementContent = document.createElement("div");

  public readonly reportItemSelector = new ReportItemSelector(this);
  public readonly areaSelector: AreaSelector = new AreaSelector({
    area: this.elementContent,
  });
  public readonly resizer = new Resizer({
    orientation: ResizerOrientation.Horizontal,
    onResize: (e) => {
      this.properties.height = this.properties.height + e.offsetY;
    },
  });

  public items: DesignerReportItem[] = [];
  public subsections: ReportSection[] = [];

  public readonly properties = new ReportSectionProperties();
  public readonly styles: MultipleStyles;

  private readonly _changeEventEmitter = new EventEmitter<ChangeEventArgs>();
  private readonly _selectEventEmitter = new EventEmitter<SelectEventArgs>();

  private readonly _designer: Designer;
  public readonly parent?: ReportSection;

  constructor(options: ReportSectionOptions) {
    if (options.appendTo) {
      options.appendTo.appendChild(this.element);
    }

    this.properties.binding = options.binding || "";
    this.properties.title = options.title;
    this._designer = options.designer;
    this.parent = options.parent;

    this.styles = new MultipleStyles(...options.parentStyles, this.properties);

    this._init(options.defaultProperties);
  }

  private _init(defaultProperties?: Partial<ISection>) {
    this.element.classList.add("anka-report-section");
    this.elementHeader.classList.add("anka-report-section__header");
    this.elementContent.classList.add("anka-report-section__content");

    this.element.tabIndex = 0;

    this.element.appendChild(this.elementHeader);
    this.element.appendChild(this.elementContent);
    this.elementContent.appendChild(this.reportItemSelector.element);
    this.elementContent.appendChild(this.resizer.element);

    if (defaultProperties) {
      this.loadLayout(defaultProperties);
    }

    this.refresh();

    this.element.addEventListener("focus", () => {
      this._onSelect({
        type: "ReportSection",
        element: this,
      });
    });
    this.properties.addEventListener("change", (e) => {
      this.refresh();
      this._onChange({
        type: "change-section",
        section: this,
        changes: e.changes,
      });
    });
    this.elementContent.ondragover = (e) => e.preventDefault();
    this.elementContent.ondrop = (e) => this._onContentDrop(e);

    this.areaSelector.addEventListener("select", (e) => {
      const items = findItemsByRect(this.items, e);
      this.selectItem(items);
    });

    this.element.addEventListener("contextmenu", (e) => {
      if (!this.properties.binding) return;

      if (e.target !== this.elementContent && e.target !== this.elementHeader) {
        return;
      }

      const dataSource = this._designer.getDataSource();
      const bindings = getReportSectionBindings(this);

      let sectionDataSource = dataSource;

      for (let i = bindings.length - 1; i >= 0; i--) {
        const field = bindings[i];

        const dataSourceItem = sectionDataSource.find((x) => x.field === field);

        // TODO: Possible null value here
        sectionDataSource = dataSourceItem?.children!;
      }

      const subsectionDataList = getSubsectionDataList(
        sectionDataSource,
        this.subsections,
      );

      const buttons: MenuButton[] = subsectionDataList.map((x) => ({
        key: "add-section",
        label: `Add Section (${x.label})`,
        data: x,
      }));

      if (this.parent) {
        buttons.push({
          key: "remove-section",
          label: "Remove Section",
          data: this,
        });
      }

      if (buttons.length === 0) return;

      e.preventDefault();

      new ContextMenu({
        width: "150px",
        buttons,
        top: e.clientY,
        left: e.clientX,
        onClick: (e) => {
          switch (e.key) {
            case "remove-section":
              this.parent!.removeSection(this);
              break;
            case "add-section":
              const data = e.data as DataSourceTreeItemData;

              this.createSection({ binding: data.field });

              break;
          }
        },
      });
    });

    this.reportItemSelector.addEventListener("contextmenu", (e) => {
      e.buttons = [{ key: "remove", label: "Remove" }];

      e.onClick = (args) => {
        if (args.key === "remove") {
          this.removeSelectedItem();
        }
      };
    });
  }

  refresh() {
    this.elementHeader.innerText = this._getHeaderText();
    this.elementContent.style.height = `${this.properties.height}px`;
  }

  addEventListener<K extends keyof ReportSectionEventMap>(
    event: K,
    listener: EventCallback<ReportSectionEventMap[K]>,
  ) {
    switch (event) {
      case "select":
        const callbackSelect = listener as EventCallback<
          ReportSectionEventMap["select"]
        >;
        this._selectEventEmitter.add(callbackSelect);
        break;
      case "change":
        const callbackOnChange = listener as EventCallback<
          ReportSectionEventMap["change"]
        >;
        this._changeEventEmitter.add(callbackOnChange);
        break;
    }
  }

  createItem(defaultProperties: Partial<IReportItem>) {
    const item = new DesignerReportItem({
      parentStyles: this.styles.getList(),
      defaultProperties,
      appendTo: this.elementContent,
    });
    item.addEventListener("change", (e) => {
      this._onChange({ type: "change-item", item, changes: e.changes });
    });
    item.addEventListener("focus", () => this.selectItem([item]));
    this.items.push(item);

    this._onChange({ type: "add-item", item });

    return item;
  }

  removeSelectedItem() {
    const items = this.reportItemSelector.attachedTo;

    for (const item of items) {
      this.reportItemSelector.hide();
      this.removeItem(item);

      this._onChange({ type: "remove-item", item });
    }
  }

  removeItem(item: DesignerReportItem) {
    const index = this.items.findIndex((x) => x === item);
    this.items.splice(index, 1);
    item.dispose();
  }

  selectItem(items: DesignerReportItem[]) {
    this.deselectAll();

    if (items.length === 0) return;

    this.reportItemSelector.show(items);

    this._onSelect({ type: "ReportItem", element: items[0] }); // Fix here
  }

  deselectAll() {
    this.reportItemSelector.hide();

    this.subsections.forEach((x) => x.deselectAll());
  }

  createSection(defaultProperties: Partial<ISection>) {
    const section = new ReportSection({
      title: "Content",
      binding: "",
      designer: this._designer,
      parent: this,
      parentStyles: this.styles.getList(),
      defaultProperties,
      appendTo: this.element,
    });

    section.addEventListener("change", (e) => this._onChange(e));
    section.addEventListener("select", (e) => this._onSelect(e));

    this.subsections.push(section);

    this._onChange({ type: "add-section", section });

    return section;
  }

  removeSection(section: ReportSection) {
    const index = this.subsections.findIndex((x) => x === section);

    if (index < 0) return;

    this.subsections.splice(index, 1);

    this._onChange({ type: "remove-section", section });

    section.dispose();
  }

  loadLayout(layout: Partial<ISection>) {
    if (layout.height) this.properties.height = layout.height;
    if (layout.binding) this.properties.binding = layout.binding;

    layout.items?.forEach((data) => {
      this.createItem(data);
    });

    layout.sections?.forEach((data) => {
      this.createSection(data);
    });

    this.properties.beginUpdate();
    this.properties.color = layout.color;
    this.properties.backgroundColor = layout.backgroundColor;
    this.properties.textAlign = layout.textAlign as TextAlign;
    this.properties.borderWidth = layout.borderWidth;
    this.properties.borderStyle = layout.borderStyle;
    this.properties.borderColor = layout.borderColor;
    this.properties.fontFamily = layout.fontFamily;
    this.properties.fontSize = layout.fontSize;
    this.properties.fontWeight = layout.fontWeight;
    this.properties.endUpdate();

    this.refresh();
  }

  toJSON(): ISection {
    return {
      height: this.properties.height,
      binding: this.properties.binding,
      items: this.items.map((x) => x.toJSON()),
      sections: this.subsections.map((x) => x.toJSON()),
      color: this.properties.color,
      backgroundColor: this.properties.backgroundColor,
      textAlign: this.properties.textAlign,
      borderWidth: this.properties.borderWidth,
      borderStyle: this.properties.borderStyle,
      borderColor: this.properties.borderColor,
      fontFamily: this.properties.fontFamily,
      fontSize: this.properties.fontSize,
      fontWeight: this.properties.fontWeight,
    };
  }

  dispose() {
    this.element.remove();
  }

  private _getHeaderText() {
    let title = this.properties.title;

    if (this.properties.binding) {
      title += ` (${this.properties.binding})`;
    }

    return title;
  }

  private _onChange(args: ChangeEventArgs) {
    this._changeEventEmitter.emit(args);
  }

  private _onContentDrop(e: DragEvent) {
    e.preventDefault();

    const text = e.dataTransfer?.getData("label");

    const item = this.createItem({
      text: text || "Label",
      binding: e.dataTransfer?.getData("field") || "",
      x: e.offsetX,
      y: e.offsetY,
      width: 100,
      height: 20,
    });

    this.selectItem([item]);
  }

  private _onSelect(args: SelectEventArgs) {
    this._selectEventEmitter.emit(args);
  }
}
