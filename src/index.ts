import Renderer, { RendererOptions } from "./renderer/renderer";
import Designer from "./workbench/designer";
import "./index.css";

export const version = "0.1.0-beta";

export function designer(element: HTMLDivElement) {
  return new Designer(element);
}

export function render(options: RendererOptions) {
  return new Renderer(options);
}
