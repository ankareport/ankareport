import DragDrop from "../core/dragDrop";
import Point from "../core/point";
import Size from "../core/size";
import ReportItem from "./reportItem";
import ReportSection from "./reportSection";
import SelectorBound, { SelectorBoundOrientation } from "./selectorBound";
import "./reportItemSelector.css";

export default class ReportItemSelector {
  public readonly element = document.createElement("div");
  private attachedTo?: ReportItem;

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

  private readonly originalLocation = new Point();
  private readonly originalSize = new Size();
  private readonly newLocation = new Point();
  private readonly newSize = new Size();

  constructor(private readonly mouseMoveContainer: ReportSection) {
    this.init();
  }

  init() {
    this.element.classList.add("anka-report-item-selector");
    this.element.appendChild(this.boundTL.element);
    this.element.appendChild(this.boundTC.element);
    this.element.appendChild(this.boundTR.element);
    this.element.appendChild(this.boundML.element);
    this.element.appendChild(this.boundMR.element);
    this.element.appendChild(this.boundBL.element);
    this.element.appendChild(this.boundBC.element);
    this.element.appendChild(this.boundBR.element);

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
        this.refresh();
      },
      onMouseUp: () => this.applyInfoToElement(),
    });
  }

  refresh() {
    this.element.style.left = this.newLocation.x + "px";
    this.element.style.top = this.newLocation.y + "px";
    this.element.style.width = this.newSize.width + "px";
    this.element.style.height = this.newSize.height + "px";
  }

  show(item: ReportItem) {
    this.attachedTo = item;

    this.originalLocation.x = item.location.x;
    this.originalLocation.y = item.location.y;
    this.originalSize.width = item.size.width;
    this.originalSize.height = item.size.height;

    this.newLocation.x = item.location.x;
    this.newLocation.y = item.location.y;
    this.newSize.width = item.size.width;
    this.newSize.height = item.size.height;

    this.element.style.display = "block";

    this.refresh();
  }

  hide() {
    this.attachedTo = undefined;
    this.element.style.display = "none";
  }

  private applyInfoToElement() {
    this.attachedTo!.location.x = this.newLocation.x;
    this.attachedTo!.location.y = this.newLocation.y;
    this.attachedTo!.size.width = this.newSize.width;
    this.attachedTo!.size.height = this.newSize.height;

    this.show(this.attachedTo!);
  }
}
