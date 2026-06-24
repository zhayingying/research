import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL, fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const reportPath = path.join(projectRoot, "dist", "polymarket-eth-quant-report", "index.html");
const qaDir = path.join(projectRoot, "qa", "polymarket-eth-quant-report");
const outPath = path.join(qaDir, "render-results.json");
const bundledNodeModules =
  "/Users/zhayingying/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";

function loadPlaywright() {
  try {
    return require("playwright");
  } catch (firstError) {
    try {
      return createRequire(path.join(bundledNodeModules, "package.json"))("playwright");
    } catch {
      throw firstError;
    }
  }
}

const { chromium } = loadPlaywright();
const chromeCandidates = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "mobile", width: 390, height: 844 },
];

async function inspectPage(page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    const allowedOverflowSelectors = ".matrix-wrap, .heatmap, .svg-scroll";
    const overflowing = [];
    const all = Array.from(document.querySelectorAll("body *"));

    for (const element of all) {
      if (element.closest(allowedOverflowSelectors)) continue;
      const style = window.getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const box = element.getBoundingClientRect();
      if (box.width <= 0 || box.height <= 0) continue;
      if (element.scrollWidth > element.clientWidth + 2 && style.overflowX === "visible") {
        overflowing.push({
          tag: element.tagName.toLowerCase(),
          className: String(element.className || ""),
          text: element.textContent.trim().slice(0, 80),
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
        });
      }
    }

    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((link) => ({
      href: link.getAttribute("href"),
      loaded: Boolean(link.sheet),
    }));

    const scripts = Array.from(document.querySelectorAll("script[src]")).map((script) => ({
      src: script.getAttribute("src"),
    }));

    const svgIssues = Array.from(document.querySelectorAll("svg")).map((svg) => {
      const rect = svg.getBoundingClientRect();
      return {
        aria: svg.closest("[aria-label]")?.getAttribute("aria-label") || svg.getAttribute("aria-label") || "",
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        blank: rect.width < 80 || rect.height < 40,
      };
    });

    return {
      title: document.title,
      bodyScrollWidth: document.body.scrollWidth,
      viewportWidth: root.clientWidth,
      horizontalOverflow: document.body.scrollWidth > root.clientWidth + 2,
      canvasCount: document.querySelectorAll("canvas").length,
      sectionCount: document.querySelectorAll("main section").length,
      sourceLinkCount: document.querySelectorAll(".source a[href^='http']").length,
      stylesheets,
      scripts,
      overflowing,
      svgIssues,
    };
  });
}

await fs.mkdir(qaDir, { recursive: true });

async function existingExecutable(candidates) {
  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Try the next browser candidate.
    }
  }
  return null;
}

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    const executablePath = await existingExecutable(chromeCandidates);
    if (!executablePath) throw error;
    return chromium.launch({
      executablePath,
      headless: true,
    });
  }
}

const browser = await launchBrowser();
const results = [];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    const consoleMessages = [];
    const pageErrors = [];
    const requestFailures = [];

    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        consoleMessages.push({ type: message.type(), text: message.text() });
      }
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) => {
      requestFailures.push({
        url: request.url(),
        failure: request.failure()?.errorText || "unknown",
      });
    });

    await page.goto(pathToFileURL(reportPath).href, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(qaDir, `${viewport.name}.png`),
      fullPage: true,
    });

    const inspection = await inspectPage(page);
    results.push({
      viewport,
      screenshot: `${viewport.name}.png`,
      consoleMessages,
      pageErrors,
      requestFailures,
      inspection,
    });

    await page.close();
  }
} finally {
  await browser.close();
}

const summary = {
  total: results.length,
  page_errors: results.reduce((sum, result) => sum + result.pageErrors.length, 0),
  console_messages: results.reduce((sum, result) => sum + result.consoleMessages.length, 0),
  request_failures: results.reduce((sum, result) => sum + result.requestFailures.length, 0),
  horizontal_overflow: results.filter((result) => result.inspection.horizontalOverflow).map((result) => result.viewport.name),
  overflowing_elements: results.reduce((sum, result) => sum + result.inspection.overflowing.length, 0),
  blank_svgs: results.reduce(
    (sum, result) => sum + result.inspection.svgIssues.filter((svg) => svg.blank).length,
    0
  ),
};

const payload = {
  generated_at: new Date().toISOString(),
  report: path.relative(projectRoot, reportPath),
  summary,
  results,
};

await fs.writeFile(outPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(JSON.stringify(summary));

if (
  summary.page_errors > 0 ||
  summary.console_messages > 0 ||
  summary.request_failures > 0 ||
  summary.horizontal_overflow.length > 0 ||
  summary.overflowing_elements > 0 ||
  summary.blank_svgs > 0
) {
  process.exitCode = 1;
}
