import Designer from "./workbench/designer";

export const version = "0.1.0-beta";

export function init(element: HTMLDivElement) {
  return new Designer(element);
}

export default init;
