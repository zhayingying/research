const { chromium } = require("/Users/zhayingying/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  const reportPath = path.join(__dirname, "index.html");
  await page.goto(pathToFileURL(reportPath).href, { waitUntil: "networkidle" });
  const checks = await page.evaluate(() => ({
    title: document.title,
    projectRows: document.querySelectorAll("#project-table tbody tr").length,
    metricChips: document.querySelectorAll("#report-metrics .metric-chip").length,
    categoryButtons: document.querySelectorAll("#project-category-filter .filter-chip").length,
    filterStatus: document.querySelector("#project-filter-status")?.textContent || null,
    navItems: document.querySelectorAll(".nav a").length,
    executiveFindings: document.querySelectorAll("#executive-finding-grid .finding-card").length,
    highValueSignals: document.querySelectorAll("#signal-picker .signal-picker__item").length,
    signalDetailTitle: document.querySelector("#signal-detail-panel h3")?.textContent || null,
    signalImages: document.querySelectorAll("#signal-detail-panel img").length,
    questionMapRows: document.querySelectorAll("#question-map-table tbody tr").length,
    scopeRows: document.querySelectorAll("#scope-table tbody tr").length,
    methodRows: document.querySelectorAll("#method-table tbody tr").length,
    dataDictionaryRows: document.querySelectorAll("#data-dictionary-table tbody tr").length,
    pipelineRows: document.querySelectorAll("#pipeline-table tbody tr").length,
    findingEvidenceRows: document.querySelectorAll("#finding-evidence-table tbody tr").length,
    limitationRows: document.querySelectorAll("#limitations-table tbody tr").length,
    deliveryRows: document.querySelectorAll("#delivery-table tbody tr").length,
    coloredEvidenceRows: document.querySelectorAll(".evidence-table tbody tr.evidence-row").length,
    priorityPills: document.querySelectorAll(".priority-pill").length,
    impactPills: document.querySelectorAll(".impact-pill").length,
    horizontalComparisonRows: document.querySelectorAll("#horizontal-comparison-table tbody tr").length,
    signalGradeRows: document.querySelectorAll("#signal-grade-table tbody tr").length,
    splitDenseBlocks: document.querySelectorAll(".split.split--dense").length,
    tableStacks: document.querySelectorAll(".table-stack").length,
    protocolCards: document.querySelectorAll(".protocol-stack .protocol-card").length,
    lifecycleRailItems: document.querySelectorAll(".lifecycle-rail div").length,
    coreInsightCards: document.querySelectorAll("#core-insight-grid .insight-card").length,
    runtimeInsightCards: document.querySelectorAll("#runtime-insight-grid .insight-card").length,
    ecosystemLayerRows: document.querySelectorAll("#ecosystem-layer-table tbody tr").length,
    boundaryRows: document.querySelectorAll("#boundary-table tbody tr").length,
    researchTimelineNodes: document.querySelectorAll("#research-timeline .timeline-node").length,
    debateCards: document.querySelectorAll("#debate-theme-grid .debate-card").length,
    termRows: document.querySelectorAll("#term-table tbody tr").length,
    platformCriteriaRows: document.querySelectorAll("#platform-criteria-table tbody tr").length,
    protocolRows: document.querySelectorAll("#protocol-table tbody tr").length,
    sdkRows: document.querySelectorAll("#sdk-table tbody tr").length,
    a2aRows: document.querySelectorAll("#a2a-table tbody tr").length,
    runtimeRows: document.querySelectorAll("#runtime-table tbody tr").length,
    lifecycleRows: document.querySelectorAll("#lifecycle-table tbody tr").length,
    paperRows: document.querySelectorAll("#paper-table tbody tr").length,
    communityRows: document.querySelectorAll("#community-table tbody tr").length,
    xRows: document.querySelectorAll("#x-table tbody tr").length,
    courseRows: document.querySelectorAll("#course-table tbody tr").length,
    frontendRows: document.querySelectorAll("#frontend-table tbody tr").length,
    sourceRows: document.querySelectorAll("#source-list .source-row").length,
    stylesApplied: getComputedStyle(document.querySelector(".hero")).borderBottomWidth,
    firstProject: document.querySelector("#project-table tbody tr .repo-name")?.textContent || null,
  }));
  await page.fill("#project-filter", "A2A");
  const filteredRows = await page.locator("#project-table tbody tr").count();
  await page.click("[data-signal-id='langgraph']");
  const clickedSignalTitle = await page.locator("#signal-detail-panel h3").textContent();
  await page.click(".density-toggle__button[data-density='comfortable']");
  const densityApplied = await page.evaluate(() => document.body.classList.contains("density-comfortable"));
  checks.filteredRowsForA2A = filteredRows;
  checks.clickedSignalTitle = clickedSignalTitle;
  checks.densityApplied = densityApplied;
  await browser.close();
  console.log(JSON.stringify(checks, null, 2));
})();
