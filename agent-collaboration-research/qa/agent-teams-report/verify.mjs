import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const reportDir = resolve(here, "../../dist/agent-teams-report");
const html = readFileSync(resolve(reportDir, "index.html"), "utf8");
const css = readFileSync(resolve(reportDir, "styles/report.css"), "utf8");
const js = readFileSync(resolve(reportDir, "scripts/report.js"), "utf8");
const config = JSON.parse(readFileSync(resolve(reportDir, "report.config.json"), "utf8"));
const content = JSON.parse(readFileSync(resolve(reportDir, "content.json"), "utf8"));

const requiredAnchors = [
  "question",
  "ecosystem",
  "framework",
  "papers",
  "community",
  "courses",
  "frontend",
  "sources"
];

const failures = [];

for (const id of requiredAnchors) {
  if (!html.includes(`id="${id}"`)) {
    failures.push(`missing section #${id}`);
  }
}

for (const asset of [...config.assets.css, ...config.assets.js, ...config.assets.data]) {
  if (!html.includes(asset) && asset !== "content.json") {
    failures.push(`asset not linked: ${asset}`);
  }
}

if (!html.includes("作者: ziye")) {
  failures.push("missing author signature");
}

if (!css.includes("@media (max-width: 640px)")) {
  failures.push("missing mobile media query");
}

if (!js.includes("applyRepoFilters")) {
  failures.push("missing interactive repo filter");
}

if (!Array.isArray(content.repoSnapshot) || content.repoSnapshot.length < 15) {
  failures.push("content repo snapshot is too small");
}

if (!Array.isArray(content.productBenchmarks) || !content.productBenchmarks.some((item) => item.product.includes("Marvis"))) {
  failures.push("missing Tencent Marvis product benchmark");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`verified ${requiredAnchors.length} sections, ${content.repoSnapshot.length} repo rows, ${content.productBenchmarks.length} product benchmarks`);
