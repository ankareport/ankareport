import Renderer, { RendererOptions } from "./renderer/renderer";
import Designer, { DesignerOptions } from "./workbench/designer";
import * as pkg from "../package.json";
import "./index.css";

export const version = pkg.version as string;

export function designer(options: DesignerOptions) {
  return new Designer(options);
}

export function render(options: RendererOptions) {
  return new Renderer(options);
}
