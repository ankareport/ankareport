import "./sidebar.css";

export default class Sidebar {
  public readonly element = document.createElement("div");

  constructor() {
    this.init();
  }

  init() {
    this.element.classList.add("anka-sidebar");

    this.element.style.width = "200px";
  }
}
