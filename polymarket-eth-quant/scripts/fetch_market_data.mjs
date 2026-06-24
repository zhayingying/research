import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const outPath = path.join(projectRoot, "content", "market-data-snapshot.json");

const urls = {
  polymarketSearch:
    "https://gamma-api.polymarket.com/public-search?q=ethereum%20price&limit_per_type=10&events_status=active&search_profiles=false",
  polymarketBook: "https://clob.polymarket.com/book",
  binancePremiumIndex: "https://fapi.binance.com/fapi/v1/premiumIndex?symbol=ETHUSDT",
  binanceOpenInterest: "https://fapi.binance.com/fapi/v1/openInterest?symbol=ETHUSDT",
  binanceFundingRate: "https://fapi.binance.com/fapi/v1/fundingRate?symbol=ETHUSDT&limit=24",
  deribitEthOptions:
    "https://www.deribit.com/api/v2/public/get_book_summary_by_currency?currency=ETH&kind=option",
  farsideEthFlows: "https://farside.co.uk/eth/",
  coinglassEthEtf: "https://www.coinglass.com/etf/ethereum",
  coinglassEthLiquidations: "https://www.coinglass.com/liquidations/ETH",
  coinglassEthLiquidationHeatmap: "https://www.coinglass.com/pro/futures/LiquidationHeatMap?coin=ETH",
  coinglassLiquidationApiDocs: "https://docs.coinglass.com/reference/aggregated-liquidation-history",
};

const headers = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36",
  accept: "application/json,text/html,*/*",
};

function iso(ms) {
  if (ms === null || ms === undefined || Number.isNaN(Number(ms))) return null;
  return new Date(Number(ms)).toISOString();
}

function number(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseJsonArray(value) {
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value || "[]");
  } catch {
    return [];
  }
}

async function fetchJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} ${url}`);
  }
  return response.json();
}

async function fetchStatus(url) {
  try {
    const response = await fetch(url, { headers, redirect: "follow" });
    const text = await response.text();
    return {
      url,
      status: response.status,
      ok: response.ok,
      final_url: response.url,
      sample: text.replace(/\s+/g, " ").slice(0, 220),
    };
  } catch (error) {
    return {
      url,
      status: null,
      ok: false,
      final_url: null,
      error: error.message,
    };
  }
}

function flattenPolymarketMarkets(searchResult) {
  const rows = [];
  for (const event of searchResult.events || []) {
    for (const market of event.markets || []) {
      const outcomes = parseJsonArray(market.outcomes);
      const tokenIds = parseJsonArray(market.clobTokenIds);
      rows.push({
        event_id: event.id,
        event_slug: event.slug,
        event_title: event.title,
        event_volume_24h: number(event.volume24hr),
        event_liquidity: number(event.liquidity),
        market_id: market.id,
        market_slug: market.slug,
        question: market.question,
        active: Boolean(market.active),
        closed: Boolean(market.closed),
        volume_24h: number(market.volume24hr),
        liquidity: number(market.liquidity),
        best_bid: number(market.bestBid),
        best_ask: number(market.bestAsk),
        spread: number(market.spread),
        outcomes,
        token_ids: tokenIds,
      });
    }
  }
  return rows;
}

function choosePolymarketSample(markets) {
  const candidates = markets.filter((market) => {
    return (
      market.active &&
      !market.closed &&
      market.token_ids.length >= 2 &&
      market.best_bid !== null &&
      market.best_ask !== null &&
      market.spread !== null &&
      market.spread > 0 &&
      market.spread <= 0.12 &&
      /ethereum/i.test(market.question)
    );
  });

  candidates.sort((a, b) => {
    const score = (item) =>
      (item.volume_24h || 0) * 0.65 +
      (item.liquidity || 0) * 0.18 -
      (item.spread || 0) * 8000;
    return score(b) - score(a);
  });

  return candidates[0] || markets.find((market) => market.token_ids.length >= 2) || null;
}

async function fetchPolymarketBook(tokenId) {
  const book = await fetchJson(`${urls.polymarketBook}?token_id=${encodeURIComponent(tokenId)}`);
  const bids = (book.bids || []).map((level) => ({ price: number(level.price), size: number(level.size) }));
  const asks = (book.asks || []).map((level) => ({ price: number(level.price), size: number(level.size) }));
  const validBids = bids.filter((level) => level.price !== null && level.size !== null);
  const validAsks = asks.filter((level) => level.price !== null && level.size !== null);
  const bestBid = validBids.length ? Math.max(...validBids.map((level) => level.price)) : null;
  const bestAsk = validAsks.length ? Math.min(...validAsks.map((level) => level.price)) : null;
  const bidDepthTop5 = validBids
    .sort((a, b) => b.price - a.price)
    .slice(0, 5)
    .reduce((sum, level) => sum + level.size, 0);
  const askDepthTop5 = validAsks
    .sort((a, b) => a.price - b.price)
    .slice(0, 5)
    .reduce((sum, level) => sum + level.size, 0);

  return {
    market: book.market,
    asset_id: book.asset_id,
    timestamp: number(book.timestamp),
    timestamp_iso: iso(book.timestamp),
    hash: book.hash,
    min_order_size: number(book.min_order_size),
    tick_size: number(book.tick_size),
    neg_risk: Boolean(book.neg_risk),
    last_trade_price: number(book.last_trade_price),
    best_bid: bestBid,
    best_ask: bestAsk,
    spread: bestBid !== null && bestAsk !== null ? bestAsk - bestBid : null,
    midpoint: bestBid !== null && bestAsk !== null ? (bestBid + bestAsk) / 2 : null,
    bid_depth_top5: bidDepthTop5,
    ask_depth_top5: askDepthTop5,
    bids_top5: validBids.sort((a, b) => b.price - a.price).slice(0, 5),
    asks_top5: validAsks.sort((a, b) => a.price - b.price).slice(0, 5),
  };
}

function parseDeribitExpiry(instrumentName) {
  const match = /^ETH-(\d{1,2})([A-Z]{3})(\d{2})-/.exec(instrumentName || "");
  if (!match) return "unknown";
  const [, day, month, year] = match;
  return `${day.padStart(2, "0")}${month}${year}`;
}

function aggregateDeribitOptions(rows) {
  const summaries = rows.map((row) => ({
    instrument_name: row.instrument_name,
    expiry: parseDeribitExpiry(row.instrument_name),
    open_interest: number(row.open_interest) || 0,
    mark_iv: number(row.mark_iv),
    volume: number(row.volume) || 0,
    bid_price: number(row.bid_price),
    ask_price: number(row.ask_price),
  }));

  const byExpiry = new Map();
  for (const row of summaries) {
    if (!byExpiry.has(row.expiry)) {
      byExpiry.set(row.expiry, {
        expiry: row.expiry,
        instruments: 0,
        open_interest: 0,
        volume: 0,
        mark_iv_oi_weighted_sum: 0,
        mark_iv_oi_weight: 0,
      });
    }
    const bucket = byExpiry.get(row.expiry);
    bucket.instruments += 1;
    bucket.open_interest += row.open_interest;
    bucket.volume += row.volume;
    if (row.mark_iv !== null && row.open_interest > 0) {
      bucket.mark_iv_oi_weighted_sum += row.mark_iv * row.open_interest;
      bucket.mark_iv_oi_weight += row.open_interest;
    }
  }

  const expiries = [...byExpiry.values()].map((bucket) => ({
    expiry: bucket.expiry,
    instruments: bucket.instruments,
    open_interest: Number(bucket.open_interest.toFixed(4)),
    volume: Number(bucket.volume.toFixed(4)),
    mark_iv_open_interest_weighted:
      bucket.mark_iv_oi_weight > 0
        ? Number((bucket.mark_iv_oi_weighted_sum / bucket.mark_iv_oi_weight).toFixed(2))
        : null,
  }));

  return {
    instrument_count: summaries.length,
    total_open_interest: Number(summaries.reduce((sum, row) => sum + row.open_interest, 0).toFixed(4)),
    total_volume: Number(summaries.reduce((sum, row) => sum + row.volume, 0).toFixed(4)),
    expiries: expiries.sort((a, b) => b.open_interest - a.open_interest).slice(0, 12),
    top_open_interest: summaries
      .sort((a, b) => b.open_interest - a.open_interest)
      .slice(0, 12),
  };
}

const collectedAt = new Date().toISOString();

const polymarketSearch = await fetchJson(urls.polymarketSearch);
const markets = flattenPolymarketMarkets(polymarketSearch);
const selectedMarket = choosePolymarketSample(markets);
const books = [];
if (selectedMarket) {
  for (let index = 0; index < Math.min(selectedMarket.token_ids.length, 2); index += 1) {
    const tokenId = selectedMarket.token_ids[index];
    try {
      books.push({
        outcome: selectedMarket.outcomes[index] || `Outcome ${index + 1}`,
        token_id: tokenId,
        book: await fetchPolymarketBook(tokenId),
      });
    } catch (error) {
      books.push({
        outcome: selectedMarket.outcomes[index] || `Outcome ${index + 1}`,
        token_id: tokenId,
        error: error.message,
      });
    }
  }
}

const [
  premiumIndex,
  openInterest,
  fundingHistory,
  deribitSummary,
  farsideStatus,
  coinglassEtfStatus,
  coinglassLiquidationsStatus,
  coinglassLiquidationHeatmapStatus,
  coinglassLiquidationApiDocsStatus,
] =
  await Promise.all([
    fetchJson(urls.binancePremiumIndex),
    fetchJson(urls.binanceOpenInterest),
    fetchJson(urls.binanceFundingRate),
    fetchJson(urls.deribitEthOptions),
    fetchStatus(urls.farsideEthFlows),
    fetchStatus(urls.coinglassEthEtf),
    fetchStatus(urls.coinglassEthLiquidations),
    fetchStatus(urls.coinglassEthLiquidationHeatmap),
    fetchStatus(urls.coinglassLiquidationApiDocs),
  ]);

const deribitOptions = aggregateDeribitOptions(deribitSummary.result || []);

const snapshot = {
  collected_at: collectedAt,
  note: "Research snapshot for model input design. Values are live public API observations, not trading advice.",
  source_endpoints: urls,
  polymarket_sample: {
    search_query: "ethereum price",
    search_total_results: polymarketSearch.pagination?.totalResults ?? null,
    candidate_count: markets.length,
    selected_market: selectedMarket,
    books,
    caveat:
      "Polymarket search and CLOB books are live and can change quickly; selected market is an example for microstructure analysis, not a recommendation.",
  },
  eth_derivatives: {
    binance_usdm_ethusdt: {
      premium_index: {
        ...premiumIndex,
        time_iso: iso(premiumIndex.time),
        nextFundingTime_iso: iso(premiumIndex.nextFundingTime),
      },
      open_interest: {
        ...openInterest,
        time_iso: iso(openInterest.time),
      },
      recent_funding: fundingHistory.map((row) => ({
        ...row,
        fundingTime_iso: iso(row.fundingTime),
      })),
      caveat:
        "Binance ETHUSDT is a single-venue perpetual futures proxy. Cross-venue aggregation requires additional vendors.",
    },
    deribit_eth_options: deribitOptions,
  },
  etf_flows: {
    candidates: [
      {
        name: "Farside Investors Ethereum ETF Flow",
        url: urls.farsideEthFlows,
        machine_check: farsideStatus,
        role: "Daily US spot ETH ETF flow table; automatic fetch may be blocked by Cloudflare and should be manually verified.",
      },
      {
        name: "CoinGlass Ethereum ETF tracker",
        url: urls.coinglassEthEtf,
        machine_check: coinglassEtfStatus,
        role: "ETF flow and net asset tracker page; public web page accessible, no unauthenticated stable JSON endpoint confirmed.",
      },
    ],
    caveat:
      "ETF flow data is issuer/regulatory-adjacent but commonly consolidated by third-party trackers. For production, choose one vendor and keep reconciliation notes.",
  },
  liquidations: {
    candidates: [
      {
        name: "CoinGlass ETH liquidations",
        url: urls.coinglassEthLiquidations,
        machine_check: coinglassLiquidationsStatus,
        role: "Public ETH liquidation dashboard; useful as a visual monitor, but not treated as a stable historical API without vendor access.",
      },
      {
        name: "CoinGlass ETH liquidation heatmap",
        url: urls.coinglassEthLiquidationHeatmap,
        machine_check: coinglassLiquidationHeatmapStatus,
        role: "Heatmap page for liquidation pressure zones; suitable for manual monitoring and dashboard evidence.",
      },
      {
        name: "CoinGlass liquidation API documentation",
        url: urls.coinglassLiquidationApiDocs,
        machine_check: coinglassLiquidationApiDocsStatus,
        role: "Production candidate for historical liquidation data; likely requires API key and plan selection.",
      },
    ],
    caveat:
      "Liquidation data should not be backfilled from screenshots. Use a vendor API, or clearly label dashboard observations as manual evidence.",
  },
};

await fs.writeFile(outPath, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(JSON.stringify({
  collected_at: snapshot.collected_at,
  selected_market: selectedMarket?.question || null,
  polymarket_books: books.length,
  binance_symbol: premiumIndex.symbol,
  deribit_option_instruments: deribitOptions.instrument_count,
  output: path.relative(projectRoot, outPath),
}));
