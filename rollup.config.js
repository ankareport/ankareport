import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dev from "rollup-plugin-dev";
import css from "rollup-plugin-import-css";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/ankareport.js",
    name: "AnkaReport",
    format: "iife",
    exports: "named",
  },
  plugins: [
    typescript(),
    commonjs(),
    resolve(),
    json(),
    css(),
    image(),
    dev({ dirs: ["dev", "dist"] }),
  ],
};
