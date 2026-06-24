# Polymarket / ETH / Quant 交易认知框架

作者: ziye

本项目用于制作一份面向主动交易者的调研报告：解释顶级交易员的铁律、ETH 市场波动因子、纯数学模型拟合预测需要的数学体系，以及顶级量化公司如何组织预测模型研发。

## 当前阶段

已进入 `visual-html-report` 初版阶段：结构化任务书、问题树、来源台账和文字初稿已经落地，并生成了可本地打开的 HTML 报告源码包。

当前主入口：

```text
dist/polymarket-eth-quant-report/index.html
```

## 核心材料

| 路径 | 用途 |
| --- | --- |
| `content/research-brief.md` | 调研任务书、问题树、覆盖地图、可视化计划 |
| `content/coverage-map.csv` | 问题到章节、证据和输出形态的映射 |
| `content/sources.json` | 第一轮来源台账和证据等级 |
| `content/market-data-snapshot.json` | Polymarket / Binance / Deribit / ETF / liquidation 数据源快照 |
| `report/draft.md` | 可读文字初稿 |
| `dist/polymarket-eth-quant-report/` | 当前 HTML 报告源码包 |
| `qa/polymarket-eth-quant-report/` | 链接检查、截图和多端 QA 结果 |
| `scripts/` | 本项目的链接检查和渲染验证脚本 |

## 预期报告结构

1. 顶级交易员的铁律：风险、赔率、仓位、纪律、复盘、执行。
2. Polymarket 的市场结构：预测市场、CLOB、流动性、费用、监管和结算风险。
3. ETH 市场波动因子：宏观、ETF、链上供需、质押、L2、gas、衍生品、叙事和事件冲击。
4. 纯数学模型需要的知识域：概率、统计、时间序列、随机过程、优化、信息论、机器学习、微观结构和因果推断。
5. 顶级量化公司怎么做预测模型：数据、特征、标签、回测、交易成本、组合、风控、上线、监控和迭代。
6. 对 Polymarket / ETH 的落地框架：什么可以模型化，什么不能只靠模型。
7. 实时数据源与样本盘口：Polymarket CLOB、Binance funding/OI、Deribit IV/OI、ETF flows 和 liquidation vendor 源。

## 当前限制

- 本报告是教育和研究用途，不构成交易、投资、法律或税务建议。
- ETH 和 Polymarket 的监管、费用、ETF flows、市场微观结构会快速变化；成稿前必须刷新关键来源。
- 自动外链检查可能被 SEC、交易所、监管和数据站点反爬拦截；关键来源需要人工复核。
- 顶级量化公司流程只能写“公开可观察方法论”和“行业通用 pipeline”，不能冒充内部机密。
- Binance / Deribit 快照是 venue-specific，不代表全市场聚合衍生品指标。
- ETF flows 和 liquidation history 已有来源入口，但仍需固定 vendor/API 或人工复核后才能进入回测。

## 验证命令

在 `research/` 仓库根目录运行：

```bash
node polymarket-eth-quant/scripts/check_links.mjs
node polymarket-eth-quant/scripts/render_report.mjs
node polymarket-eth-quant/scripts/fetch_market_data.mjs
python3 -m json.tool polymarket-eth-quant/content/content.json >/dev/null
python3 -m json.tool polymarket-eth-quant/content/sources.json >/dev/null
python3 -m json.tool polymarket-eth-quant/content/market-data-snapshot.json >/dev/null
python3 -m json.tool polymarket-eth-quant/dist/polymarket-eth-quant-report/report.config.json >/dev/null
```

QA 输出目录：

```text
qa/polymarket-eth-quant-report/
```
