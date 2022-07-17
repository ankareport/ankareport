import Point from "../core/point";
import Size from "../core/size";
import ReportItem from "./reportItem";
import "./reportItemSelector.css";
import ReportSection from "./reportSection";

export default class ReportItemSelector {
  public readonly element = document.createElement("div");
  private attachedTo?: ReportItem;

  private readonly originalLocation = new Point();
  private readonly originalSize = new Size();
  private readonly newLocation = new Point();
  private readonly newSize = new Size();

  private offsetX = 0;
  private offsetY = 0;

  constructor(private readonly parent: ReportSection) {
    this.element.classList.add("anka-report-item-selector");

    this.init();
  }

  init() {
    this.onMouseMove = this.onMouseMove.bind(this);

    this.hide();

    this.element.onmousedown = (e) => this.onMouseDown(e);
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

  onMouseDown(e: MouseEvent) {
    document.addEventListener("mouseup", () => this.onMouseUp(), {
      once: true,
    });

    this.offsetX = e.x - this.attachedTo!.location.x;
    this.offsetY = e.y - this.attachedTo!.location.y;
    this.parent.element.addEventListener("mousemove", this.onMouseMove);
  }

  onMouseMove(e: MouseEvent) {
    this.newLocation.x = e.x - this.offsetX;
    this.newLocation.y = e.y - this.offsetY;
    this.refresh();
  }

  onMouseUp() {
    this.parent.element.removeEventListener("mousemove", this.onMouseMove);

    this.attachedTo!.location.x = this.newLocation.x;
    this.attachedTo!.location.y = this.newLocation.y;
    this.attachedTo!.size.width = this.newSize.width;
    this.attachedTo!.size.height = this.newSize.height;
  }
}
