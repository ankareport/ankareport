import ContextMenu from "../../components/contextMenu/contextMenu";
import { ClickEventArgs, MenuButton } from "../../components/menu/menu";
import DragDrop from "../../core/dragDrop";
import { EventCallback } from "../../core/eventEmitter";
import Point from "../../core/point";
import { ChangeEventArgs } from "../../core/properties";
import Size from "../../core/size";
import ReportSection from "../reportSection/reportSection";
import DesignerReportItem from "./designerReportItem";
import SelectorBound, { SelectorBoundOrientation } from "./selectorBound";
import "./reportItemSelector.css";
import { NormalizeEdges, normalizePoints } from "./normalizePoint";

const LONG_MOVE_DISTANCE = 10;
const SHORT_MOVE_DISTANCE = 1;

export interface ReportItemSelectorContextMenuArgs {
  item: DesignerReportItem;
  width: string;
  buttons: MenuButton[];
  onClick: (ev: ClickEventArgs) => void;
}

export interface ReportItemSelectorEventMap {
  contextmenu: ReportItemSelectorContextMenuArgs;
}

export default class ReportItemSelector {
  public readonly element = document.createElement("div");
  public attachedTo?: DesignerReportItem;

  private readonly boundTL = new SelectorBound(
    SelectorBoundOrientation.TopLeft,
  );
  private readonly boundTC = new SelectorBound(
    SelectorBoundOrientation.TopCenter,
  );
  private readonly boundTR = new SelectorBound(
    SelectorBoundOrientation.TopRight,
  );
  private readonly boundML = new SelectorBound(
    SelectorBoundOrientation.MiddleLeft,
  );
  private readonly boundMR = new SelectorBound(
    SelectorBoundOrientation.MiddleRight,
  );
  private readonly boundBL = new SelectorBound(
    SelectorBoundOrientation.BottomLeft,
  );
  private readonly boundBC = new SelectorBound(
    SelectorBoundOrientation.BottomCenter,
  );
  private readonly boundBR = new SelectorBound(
    SelectorBoundOrientation.BottomRight,
  );

  public readonly originalLocation = new Point();
  public readonly originalSize = new Size();
  public readonly newLocation = new Point();
  public readonly newSize = new Size();

  constructor(private readonly mouseMoveContainer: ReportSection) {
    this.init();
  }

  private init() {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onItemPropertyChange = this.onItemPropertyChange.bind(this);

    this.element.classList.add("anka-report-item-selector");

    this.element.appendChild(this.boundTL.element);
    this.element.appendChild(this.boundTC.element);
    this.element.appendChild(this.boundTR.element);
    this.element.appendChild(this.boundML.element);
    this.element.appendChild(this.boundMR.element);
    this.element.appendChild(this.boundBL.element);
    this.element.appendChild(this.boundBC.element);
    this.element.appendChild(this.boundBR.element);

    this.element.tabIndex = -1;

    this.hide();

    this.initMoveDragDrop();
    this.initBoundsDragDrop();
  }

  private initMoveDragDrop() {
    new DragDrop({
      element: this.element,
      container: this.mouseMoveContainer.element,
      onMouseMove: (e) => {
        this.newLocation.x = this.originalLocation.x + e.offsetX;
        this.newLocation.y = this.originalLocation.y + e.offsetY;
        this.normalize({ left: true, right: true, top: true, bottom: true });
        this.refresh();
      },
      onMouseUp: () => this.applyInfoToElement(),
    });
  }

  private initBoundsDragDrop() {
    // Top Left
    new DragDrop({
      element: this.boundTL.element,
      container: this.mouseMoveContainer.element,
      onMouseMove: (e) => {
        this.newLocation.x = this.originalLocation.x + e.offsetX;
        this.newLocation.y = this.originalLocation.y + e.offsetY;
        this.newSize.width = this.originalSize.width - e.offsetX;
        this.newSize.height = this.originalSize.height - e.offsetY;
        this.normalize({ top: true, left: true });
        this.refresh();
      },
      onMouseUp: () => this.applyInfoToElement(),
    });

    // Top Center
    new DragDrop({
      element: this.boundTC.element,
      container: this.mouseMoveContainer.element,
      onMouseMove: (e) => {
        this.newLocation.y = this.originalLocation.y + e.offsetY;
        this.newSize.height = this.originalSize.height - e.offsetY;
        this.normalize({ top: true });
        this.refresh();
      },
      onMouseUp: () => this.applyInfoToElement(),
    });

    // Top Right
    new DragDrop({
      element: this.boundTR.element,
      container: this.mouseMoveContainer.element,
      onMouseMove: (e) => {
        this.newLocation.y = this.originalLocation.y + e.offsetY;
        this.newSize.width = this.originalSize.width + e.offsetX;
        this.newSize.height = this.originalSize.height - e.offsetY;
        this.normalize({ top: true, right: true });
        this.refresh();
      },
      onMouseUp: () => this.applyInfoToElement(),
    });

    // Middle Left
    new DragDrop({
      element: this.boundML.element,
      container: this.mouseMoveContainer.element,
      onMouseMove: (e) => {
        this.newLocation.x = this.originalLocation.x + e.offsetX;
        this.newSize.width = this.originalSize.width - e.offsetX;
        this.normalize({ left: true });
        this.refresh();
      },
      onMouseUp: () => this.applyInfoToElement(),
    });

    // Middle Right
    new DragDrop({
      element: this.boundMR.element,
      container: this.mouseMoveContainer.element,
      onMouseMove: (e) => {
        this.newSize.width = this.originalSize.width + e.offsetX;
        this.normalize({ right: true });
        this.refresh();
      },
      onMouseUp: () => this.applyInfoToElement(),
    });

    // Bottom Left
    new DragDrop({
      element: this.boundBL.element,
      container: this.mouseMoveContainer.element,
      onMouseMove: (e) => {
        this.newLocation.x = this.originalLocation.x + e.offsetX;
        this.newSize.width = this.originalSize.width - e.offsetX;
        this.newSize.height = this.originalSize.height + e.offsetY;
        this.normalize({ bottom: true, left: true });
        this.refresh();
      },
      onMouseUp: () => this.applyInfoToElement(),
    });

    // Bottom Center
    new DragDrop({
      element: this.boundBC.element,
      container: this.mouseMoveContainer.element,
      onMouseMove: (e) => {
        this.newSize.height = this.originalSize.height + e.offsetY;
        this.normalize({ bottom: true });
        this.refresh();
      },
      onMouseUp: () => this.applyInfoToElement(),
    });

    // Bottom Right
    new DragDrop({
      element: this.boundBR.element,
      container: this.mouseMoveContainer.element,
      onMouseMove: (e) => {
        this.newSize.width = this.originalSize.width + e.offsetX;
        this.newSize.height = this.originalSize.height + e.offsetY;
        this.normalize({ bottom: true, right: true });
        this.refresh();
      },
      onMouseUp: () => this.applyInfoToElement(),
    });
  }

  private onKeyDown(e: KeyboardEvent) {
    const moveDistance = e.shiftKey ? SHORT_MOVE_DISTANCE : LONG_MOVE_DISTANCE;

    switch (e.key) {
      case "ArrowUp":
        this.newLocation.y -= moveDistance;
        this.applyInfoToElement();
        break;
      case "ArrowDown":
        this.newLocation.y += moveDistance;
        this.applyInfoToElement();
        break;
      case "ArrowLeft":
        this.newLocation.x -= moveDistance;
        this.applyInfoToElement();
        break;
      case "ArrowRight":
        this.newLocation.x += moveDistance;
        this.applyInfoToElement();
        break;
    }
  }

  normalize(edges: NormalizeEdges) {
    const normalizedPoints = normalizePoints(
      edges,
      this,
      this.mouseMoveContainer.items,
    );

    this.newLocation.x = normalizedPoints.left;
    this.newLocation.y = normalizedPoints.top;
    this.newSize.width = normalizedPoints.right - normalizedPoints.left;
    this.newSize.height = normalizedPoints.bottom - normalizedPoints.top;
  }

  refresh() {
    this.element.style.left = this.newLocation.x + "px";
    this.element.style.top = this.newLocation.y + "px";
    this.element.style.width = this.newSize.width + "px";
    this.element.style.height = this.newSize.height + "px";
  }

  show(item: DesignerReportItem) {
    if (this.attachedTo) {
      this.hide();
    }

    this.attachedTo = item;

    this.originalLocation.x = item.properties.x;
    this.originalLocation.y = item.properties.y;
    this.originalSize.width = item.properties.width;
    this.originalSize.height = item.properties.height;

    this.newLocation.x = item.properties.x;
    this.newLocation.y = item.properties.y;
    this.newSize.width = item.properties.width;
    this.newSize.height = item.properties.height;
    this.element.style.display = "block";

    this.element.addEventListener("keydown", this.onKeyDown);

    this.refresh();

    item.properties.addEventListener("change", this.onItemPropertyChange);

    this.element.focus();
  }

  onItemPropertyChange(e: ChangeEventArgs) {
    const properties = ["width", "height", "x", "y"];
    const changedProperties = e.changes.filter((x) =>
      properties.includes(x.property),
    );

    if (changedProperties.length > 0) {
      this.show(this.attachedTo!);
    }
  }

  hide() {
    this.element.removeEventListener("keydown", this.onKeyDown);
    this.attachedTo?.properties.removeEventListener(
      "change",
      this.onItemPropertyChange,
    );
    this.attachedTo = undefined;
    this.element.style.display = "none";
  }

  private applyInfoToElement() {
    this.attachedTo!.properties.beginUpdate();
    this.attachedTo!.properties.x = this.newLocation.x;
    this.attachedTo!.properties.y = this.newLocation.y;
    this.attachedTo!.properties.width = this.newSize.width;
    this.attachedTo!.properties.height = this.newSize.height;
    this.attachedTo!.properties.endUpdate();

    this.show(this.attachedTo!);
  }

  addEventListener<K extends keyof ReportItemSelectorEventMap>(
    event: K,
    listener: EventCallback<ReportItemSelectorEventMap[K]>,
  ) {
    switch (event) {
      case "contextmenu":
        this.element.addEventListener("contextmenu", (e) => {
          if (!this.attachedTo) return;

          const args: ReportItemSelectorContextMenuArgs = {
            item: this.attachedTo,
            width: "150px",
            buttons: [],
            onClick: () => {},
          };

          listener(args);

          if (args.buttons.length === 0) return;

          e.preventDefault();

          new ContextMenu({
            width: args.width,
            buttons: args.buttons,
            top: e.clientY,
            left: e.clientX,
            onClick: args.onClick,
          });
        });

        break;
    }
  }
}
