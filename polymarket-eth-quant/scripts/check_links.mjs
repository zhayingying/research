import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const reportPath = path.join(projectRoot, "dist", "polymarket-eth-quant-report", "index.html");
const sourcesPath = path.join(projectRoot, "content", "sources.json");
const qaDir = path.join(projectRoot, "qa", "polymarket-eth-quant-report");
const outPath = path.join(qaDir, "link-check-results.json");

const manualReviewStatuses = new Set([401, 403, 405, 406, 408, 409, 412, 418, 429, 451, 500, 502, 503, 504]);

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function extractHtmlUrls(html) {
  const urls = [];
  const hrefRe = /\bhref=["'](https?:\/\/[^"']+)["']/gi;
  let match;
  while ((match = hrefRe.exec(html))) urls.push(match[1]);
  return urls;
}

function sourceUrls(sourceLedger) {
  return (sourceLedger.sources || []).map((source) => source.url);
}

async function request(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36",
        accept: "text/html,application/pdf,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      finalUrl: response.url,
    };
  } finally {
    clearTimeout(timer);
  }
}

async function checkUrl(url) {
  const attempts = [];
  for (const method of ["HEAD", "GET"]) {
    try {
      const result = await request(url, method);
      attempts.push({ method, ...result });
      if (result.ok) {
        return {
          url,
          status: "ok",
          http_status: result.status,
          final_url: result.finalUrl,
          method,
          attempts,
        };
      }
      if (!manualReviewStatuses.has(result.status) && method === "HEAD") continue;
      if (method === "GET") {
        return {
          url,
          status: manualReviewStatuses.has(result.status) ? "manual_review" : "bad",
          http_status: result.status,
          final_url: result.finalUrl,
          method,
          attempts,
        };
      }
    } catch (error) {
      attempts.push({ method, error: error.name === "AbortError" ? "timeout" : error.message });
      if (method === "GET") {
        return {
          url,
          status: "manual_review",
          http_status: null,
          final_url: null,
          method,
          attempts,
        };
      }
    }
  }
}

await fs.mkdir(qaDir, { recursive: true });

const html = await fs.readFile(reportPath, "utf8");
const sourceLedger = JSON.parse(await fs.readFile(sourcesPath, "utf8"));
const urls = unique([...extractHtmlUrls(html), ...sourceUrls(sourceLedger)]);
const results = [];

for (const url of urls) {
  results.push(await checkUrl(url));
}

const summary = {
  total: results.length,
  ok: results.filter((item) => item.status === "ok").length,
  manual_review: results.filter((item) => item.status === "manual_review").length,
  bad: results.filter((item) => item.status === "bad").length,
};

const payload = {
  generated_at: new Date().toISOString(),
  report: path.relative(projectRoot, reportPath),
  source_ledger: path.relative(projectRoot, sourcesPath),
  summary,
  results,
};

await fs.writeFile(outPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(JSON.stringify(summary));

if (summary.bad > 0) {
  process.exitCode = 1;
}
