import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dev from "rollup-plugin-dev";
import dts from "rollup-plugin-dts";
import css from "rollup-plugin-import-css";

import pkg from "./package.json" with { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/ankareport.js",
        name: "AnkaReport",
        format: "iife",
        exports: "named",
        inlineDynamicImports: true,
      },
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "esm",
      },
      {
        file: pkg.browser,
        format: "umd",
        name: "AnkaReport",
      },
    ],
    plugins: [
      typescript(),
      commonjs(),
      resolve({ browser: true }),
      json(),
      css({
        output: "ankareport.css",
      }),
      image(),
      dev({ dirs: ["dev", "dist"] }),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    external: [/.css/],
    plugins: [dts()]
  }
];
