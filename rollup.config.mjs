import typescript from "@rollup/plugin-typescript";
import cleanup from "rollup-plugin-cleanup";
import pkg from "./package.json" assert { type: "json" };

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      strict: false,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
      strict: false,
    },
    {
      file: pkg.browser,
      format: "umd",
      name: "Hexashades",
    },
  ],
  plugins: [typescript(), cleanup()],
};
