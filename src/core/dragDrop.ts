import Point from "./point";

export interface MoveEventArgs {
  originalX: number;
  originalY: number;
  newX: number;
  newY: number;
  offsetX: number;
  offsetY: number;
}

export interface DragDropOptions {
  element: HTMLElement;
  container: GlobalEventHandlers;
  onMouseMove: (e: MoveEventArgs) => void;
  onMouseUp: (e: MoveEventArgs) => void;
}

export default class DragDrop {
  private readonly originalLocation = new Point();
  private readonly newLocation = new Point();
  private readonly offset = new Point();

  constructor(private readonly options: DragDropOptions) {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.options.element.addEventListener("mousedown", this.onMouseDown);
  }

  onMouseDown(e: MouseEvent) {
    if (e.target !== this.options.element) return;

    this.originalLocation.x = e.x;
    this.originalLocation.y = e.y;
    this.newLocation.x = this.originalLocation.x;
    this.newLocation.y = this.originalLocation.y;
    this.offset.x = e.x;
    this.offset.y = e.y;

    this.onMouseMove(e);

    this.options.container.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp, {
      once: true,
    });
  }

  onMouseMove(e: MouseEvent) {
    this.newLocation.x = e.x;
    this.newLocation.y = e.y;
    this.offset.x = this.newLocation.x - this.originalLocation.x;
    this.offset.y = this.newLocation.y - this.originalLocation.y;

    const args: MoveEventArgs = {
      originalX: this.originalLocation.x,
      originalY: this.originalLocation.y,
      newX: this.newLocation.x,
      newY: this.newLocation.y,
      offsetX: this.offset.x,
      offsetY: this.offset.y,
    };

    this.options.onMouseMove(args);
  }

  onMouseUp() {
    this.options.container.removeEventListener("mousemove", this.onMouseMove);

    const args: MoveEventArgs = {
      originalX: this.originalLocation.x,
      originalY: this.originalLocation.y,
      newX: this.newLocation.x,
      newY: this.newLocation.y,
      offsetX: this.offset.x,
      offsetY: this.offset.y,
    };

    this.options.onMouseUp(args);
  }
}
