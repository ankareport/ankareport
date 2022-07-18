import Designer from "./workbench/designer";
import "./index.css";

export const version = "0.1.0-beta";

export function init(element: HTMLDivElement) {
  return new Designer(element);
}

export default init;
