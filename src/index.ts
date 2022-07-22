import Renderer, { RendererOptions } from "./renderer/renderer";
import Designer from "./workbench/designer";
import * as pkg from "../package.json";
import "./index.css";

export const version = pkg.version as string;

export function designer(element: HTMLDivElement) {
  return new Designer(element);
}

export function render(options: RendererOptions) {
  return new Renderer(options);
}
