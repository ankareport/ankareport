import IDisposable from "./disposable";
import Point from "./point";
import Size from "./size";

export default abstract class Control implements IDisposable {
  protected readonly element = document.createElement("div");

  public text = "";
  public location = new Point();
  public size = new Size();
  public draggable = false;

  constructor(protected readonly className: string) {
    this.element.classList.add(className);
  }

  refresh() {
    this.element.innerText = this.text;
    this.element.draggable = this.draggable;
    this.element.style.left = this.location.x + "px";
    this.element.style.top = this.location.y + "px";
    this.element.style.width = this.size.width + "px";
    this.element.style.height = this.size.height + "px";
  }

  appendTo(parent: HTMLElement) {
    parent.appendChild(this.element);
  }

  dispose() {
    this.element.remove();
  }
}
