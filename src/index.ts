import Designer from "./workbench/designer";
import "./index.css";
import Renderer, { RendererOptions } from "./renderer/renderer";

export const version = "0.1.0-beta";

export function init(element: HTMLDivElement) {
  return new Designer(element);
}

export function renderer(options: RendererOptions) {
  return new Renderer(options);
}

export default init;
