import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import path from "path";
import externals from "rollup-plugin-node-externals";

import pkg from "./package.json" assert { type: "json" };

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
      // 自动将 dependencies 依赖声明为 externals
      externals({
        devDeps: false,
      }),
      // 处理外部依赖
      resolve(),
      // 支持基于 CommonJS 模块引入
      commonjs(),
      // 支持 typescript，并导出声明文件
      typescript({
        outDir: "es",
        declaration: true,
        declarationDir: "es",
      }),
    ],
  },
];
