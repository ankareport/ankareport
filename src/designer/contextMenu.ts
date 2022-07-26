import "./contextMenu.css";

export default class ContextMenu {
  public readonly contextMenuElement = document.createElement("div");

  public readonly removeElement = document.createElement("div");
  public scope = document.querySelector("body")!;

  public designerElement: HTMLElement;

  public onClick: () => void;

  constructor(designerElement: HTMLElement, onClick: () => void) {
    this.onClick = onClick;
    this.designerElement = designerElement;
    this.init();
  }

  init() {
    this.contextMenuElement.id = "context-menu";
    this.removeElement.classList.add("item");
    this.removeElement.innerText = "Remove item";
    this.removeElement.addEventListener("click", this.onClick);
    this.contextMenuElement.appendChild(this.removeElement);

    this.designerElement.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const { clientX: mouseX, clientY: mouseY } = event;

      const { normalizedX, normalizedY } = this.normalizePosition(
        mouseX,
        mouseY,
      );

      this.contextMenuElement.classList.remove("visible");

      this.contextMenuElement.style.top = `${normalizedY}px`;
      this.contextMenuElement.style.left = `${normalizedX}px`;

      setTimeout(() => {
        this.contextMenuElement.classList.add("visible");
      });
    });

    this.scope.addEventListener("click", (e: any) => {
      if (e.target !== this.contextMenuElement) {
        this.contextMenuElement.classList.remove("visible");
      }
    });
  }

  normalizePosition(mouseX: number, mouseY: number) {
    let { left: scopeOffsetX, top: scopeOffsetY } =
      this.designerElement.getBoundingClientRect();

    scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
    scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;

    const scopeX = mouseX - scopeOffsetX;
    const scopeY = mouseY - scopeOffsetY;

    const outOfBoundsOnX =
      scopeX + this.contextMenuElement.clientWidth >
      this.designerElement.clientWidth;

    const outOfBoundsOnY =
      scopeY + this.contextMenuElement.clientHeight >
      this.designerElement.clientHeight;

    let normalizedX = mouseX;
    let normalizedY = mouseY;

    if (outOfBoundsOnX) {
      normalizedX =
        scopeOffsetX +
        this.designerElement.clientWidth -
        this.contextMenuElement.clientWidth;
    }

    if (outOfBoundsOnY) {
      normalizedY =
        scopeOffsetY +
        this.designerElement.clientHeight -
        this.contextMenuElement.clientHeight;
    }

    return { normalizedX, normalizedY };
  }
}
