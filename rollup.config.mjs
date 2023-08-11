import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "fs";
import path from "path";
import externals from "rollup-plugin-node-externals";
import { terser } from "rollup-plugin-terser";

const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8")
);

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        dir: path.dirname(pkg.module),
        format: "es",
        name: pkg.name,
        exports: "named",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    plugins: [
      json(),
      externals({
        devDeps: false,
      }),
      nodeResolve(),
      commonjs(),
      typescript({
        outDir: "es",
        declaration: true,
        declarationDir: "es",
        exclude: "src/stories/*",
      }),
      terser(),
    ],
  },
];
