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
  "research-flow",
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

if (!content.researchWorkflow || !Array.isArray(content.researchWorkflow.enhancements) || content.researchWorkflow.enhancements.length !== 3) {
  failures.push("missing three research workflow enhancements");
}

for (const label of ["Evidence Ledger", "Reflect Loop", "Comparison First"]) {
  if (!html.includes(label)) {
    failures.push(`missing workflow label: ${label}`);
  }
}

if (html.includes("Reflect Loop 怎么改写报告") || html.includes("reflect-loop")) {
  failures.push("old reflect rewrite panel should be removed");
}

for (const selector of ["research-visual", "workflow-spine", "quality-gates", "evidence-bars"]) {
  if (!html.includes(selector) && !css.includes(selector)) {
    failures.push(`missing visual workflow selector: ${selector}`);
  }
}

if (!content.comparisonDashboard || !Array.isArray(content.comparisonDashboard.items) || content.comparisonDashboard.items.length < 6) {
  failures.push("missing visual comparison dashboard data");
}

for (const selector of ["comparison-dashboard", "fit-lanes", "fit-meter"]) {
  if (!html.includes(selector) && !css.includes(selector)) {
    failures.push(`missing visual comparison selector: ${selector}`);
  }
}

if (!content.operatingFrameworkVisual || !Array.isArray(content.operatingFrameworkVisual.sections) || content.operatingFrameworkVisual.sections.length < 5) {
  failures.push("missing operating framework visual data");
}

for (const selector of ["ops-board", "ops-topology", "ops-control-plane", "ops-evolution", "agent-rail"]) {
  if (html.includes(selector)) {
    failures.push(`old operating framework selector still present in html: ${selector}`);
  }
}

for (const selector of ["diagram-frame", "framework-system-diagram"]) {
  if (!html.includes(selector) || !css.includes(selector)) {
    failures.push(`missing operating framework visual selector: ${selector}`);
  }
}

if (!content.paperEvidenceFlow || !Array.isArray(content.paperEvidenceFlow.flows) || content.paperEvidenceFlow.flows.length < 4) {
  failures.push("missing paper evidence flow data");
}

for (const selector of ["paper-evidence-diagram", "svg-evidence-flow"]) {
  if (!html.includes(selector) || !css.includes(selector)) {
    failures.push(`missing paper evidence diagram selector: ${selector}`);
  }
}

if (!content.communitySignalMap || !Array.isArray(content.communitySignalMap.topicClusters) || content.communitySignalMap.topicClusters.length < 4) {
  failures.push("missing community signal map data");
}

for (const selector of ["community-signal-diagram", "community-flow", "topic-node"]) {
  if (!html.includes(selector) || !css.includes(selector)) {
    failures.push(`missing community signal diagram selector: ${selector}`);
  }
}

if (!content.coursePathDiagram || !Array.isArray(content.coursePathDiagram.path) || content.coursePathDiagram.path.length < 6) {
  failures.push("missing course path diagram data");
}

for (const selector of ["course-path-diagram", "course-path-line", "course-node"]) {
  if (!html.includes(selector) || !css.includes(selector)) {
    failures.push(`missing course path diagram selector: ${selector}`);
  }
}

for (const staleSelector of [
  "lifecycle-grid",
  "paper-grid",
  "paper-evidence-map",
  "community-grid",
  "course-guide",
  "framework-decision-board",
  "framework-flow",
  "framework-control-grid",
  "agent-lifecycle-band",
  "paper-decision-board",
  "paper-lanes",
  "paper-source-ribbon",
  "community-signal-board",
  "community-ledger",
  "course-learning-map",
  "course-pathway",
  "course-coverage"
]) {
  if (html.includes(staleSelector)) {
    failures.push(`old flat selector still present in html: ${staleSelector}`);
  }
}

if (!Array.isArray(content.productBenchmarks) || !content.productBenchmarks.some((item) => item.product.includes("Marvis"))) {
  failures.push("missing Tencent Marvis product benchmark");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`verified ${requiredAnchors.length} sections, ${content.repoSnapshot.length} repo rows, ${content.productBenchmarks.length} product benchmarks`);
