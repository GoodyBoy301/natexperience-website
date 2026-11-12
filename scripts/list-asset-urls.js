import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const cdn = new URL(process.argv[2] || "");
if (cdn.protocol !== "https:" || cdn.pathname !== "/") {
  throw new Error("Pass the deployed HTTPS CDN origin, without a path.");
}

const assetDirectory = "exports/custom-assets";

function listFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
}

for (const file of listFiles(assetDirectory)) {
  const path = relative(assetDirectory, file).split(sep).join("/");
  console.log(`${cdn.origin}/${path}`);
}
