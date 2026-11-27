import { spawn, spawnSync } from "node:child_process";
import { watch } from "node:fs";

const sectionDirectory = "frontdesk/home/sections";
const build = () => {
  const result = spawnSync(process.execPath, ["scripts/build-local-sections.js"], {
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

build();

let buildTimer;
const watcher = watch(sectionDirectory, (_, filename) => {
  if (!filename?.endsWith(".md")) return;
  clearTimeout(buildTimer);
  buildTimer = setTimeout(build, 100);
});

const wrangler = spawn(
  "wrangler",
  ["dev", "--local", "--port", "8787", "--live-reload"],
  { stdio: "inherit" },
);

const shutdown = (signal) => {
  clearTimeout(buildTimer);
  watcher.close();
  wrangler.kill(signal);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
wrangler.on("exit", (code) => process.exit(code ?? 0));
