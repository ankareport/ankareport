import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-import-css";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    name: "AnkaReport",
    format: "iife",
    exports: "named",
  },
  plugins: [typescript(), commonjs(), resolve(), css()],
};
