import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const sourceDirectory = "frontdesk/home/sections";
const outputPath = "exports/custom-assets/local-sections.html";
const filenames = (await readdir(sourceDirectory))
  .filter((filename) => /^\d{2}-.+\.md$/.test(filename))
  .sort();

const templates = await Promise.all(
  filenames.map(async (filename) => {
    const source = await readFile(join(sourceDirectory, filename), "utf8");
    const html = source.match(/```html\s*([\s\S]*?)```/)?.[1]?.trim();
    if (!html) throw new Error(`Missing HTML block in ${filename}`);
    const name = filename.replace(/^\d{2}-/, "").replace(/\.md$/, "");
    return `<template data-nat-preview-section="${name}">\n${html}\n</template>`;
  }),
);

await writeFile(outputPath, `${templates.join("\n")}\n`);
