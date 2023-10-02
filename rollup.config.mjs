import typescript from "@rollup/plugin-typescript";
import cleanup from "rollup-plugin-cleanup";
import sourcemaps from "rollup-plugin-sourcemaps";
import pkg from "./package.json" assert { type: "json" };

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.commonjs,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
    {
      file: pkg.browser,
      format: "umd",
      name: "Hexashades",
    },
  ],
  plugins: [typescript(), sourcemaps(), cleanup()],
};
