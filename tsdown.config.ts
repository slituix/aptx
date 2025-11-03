import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm"],
  sourcemap: true,
  minify: false,
  target: "node24",
  splitting: false,
  clean: true,
});
