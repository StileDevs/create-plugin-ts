import { defineConfig, type Options } from "tsup";
import { readFileSync, existsSync } from "fs";

let config: Options = {
  entry: ["src/app.ts"],

  splitting: true,
  sourcemap: false,
  target: "node20",
  bundle: true,
  format: "esm",
  clean: true
};

let License = "";
if (existsSync("./LICENSE")) {
  License = readFileSync("./LICENSE", "utf-8");
  config.banner = {
    js: `/*\n${License}\n*/`
  };
}

export default defineConfig(config);
