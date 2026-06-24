# Polymarket / ETH / Quant 交易认知框架 · 初稿

作者: ziye  
日期: 2026-06-24

> 本文是研究框架，不构成交易、投资、法律或税务建议。所有“规则”都用于解释机制和构建复盘系统，不用于给出具体买卖点。

## 0. 核心判断

顶级交易不是“预测最准”，而是把有限可预测性转化为可控风险下的正期望系统。  
在 Polymarket / ETH 这种短周期、高噪声、强事件驱动市场里，模型能帮助你估计概率、成本、流动性和状态变化，但不能替代仓位纪律、来源审计、执行质量和合规边界。

## 1. 顶级交易员必须遵守的铁律

| 铁律 | 一句话本质 | 在 Polymarket / ETH 里的含义 | 红旗 |
| --- | --- | --- | --- |
| 生存优先于预测 | 不爆仓比猜对一次更重要 | 单个市场、单个方向、单个事件不能决定账户生死 | 为了“确定性很高”梭哈 |
| 只交易正期望 | 胜率没有意义，胜率 × 赔率 - 成本才有意义 | Polymarket 要扣除价差、费用、滑点、结算时间和机会成本 | 只看“我觉得概率更高” |
| 仓位服从不确定性 | 仓位不是表达情绪，是表达风险预算 | 低流动性市场即使 edge 大，也可能不能下大仓 | 用信念强度代替仓位模型 |
| 先定义退出条件 | 入场前写清楚何时错、何时止盈、何时失效 | ETH 短周期方向错了要看 invalidate 条件，不是看情绪 | 持仓后不断改理由 |
| 成本是模型的一部分 | 真实收益 = 预测收益 - 交易成本 - 市场冲击 | CLOB 里吃单、挂单、排队位置和成交概率都影响结果 | 回测忽略 spread / fee / fill |
| 尊重流动性 | 能买到不等于能卖出，价格不等于可成交规模 | Polymarket 小市场、远月市场和窄深度市场尤其明显 | 只看中间价，不看盘口深度 |
| 复盘预测和执行 | 预测错、执行错、仓位错是三种不同错误 | 用 Brier score / calibration 复盘概率判断，用滑点复盘执行 | 只复盘盈亏，不复盘过程 |
| 不做马丁格尔 | 加仓必须来自新证据或预定义模型，不是亏损后的补救 | ETH 趋势行情中“越跌越买”可能迅速变成尾部风险 | 用摊低成本掩盖原判断失效 |
| 分散相关性 | 多个仓位可能本质上是同一个风险 | ETH、BTC、ETF、宏观 risk-on 常常同时暴露 | 看似多个市场，实则同一方向 |
| 合规边界也是风险 | 地域限制、身份限制、市场规则会改变可交易性 | Polymarket 有地域限制、US/国际站差异和监管历史 | 通过违规方式绕限制交易 |

## 2. ETH 市场受什么因素波动

ETH 的波动不是单因子，至少要分成五层：

| 层级 | 因子 | 影响路径 | 时间尺度 |
| --- | --- | --- | --- |
| 宏观流动性 | 利率、美元、风险资产 beta、股市波动、全球流动性 | 改变市场整体风险偏好和折现率 | 中短期到中长期 |
| 机构通道 | 现货 ETH ETF flows、发行人持仓、监管预期 | 改变法币资金进入 ETH 的便利度和边际需求 | 日内到月度 |
| 协议供需 | 质押、验证者进入/退出、EIP-1559 burn、gas、MEV | 改变 ETH 发行、锁定、燃烧和链上使用叙事 | 日度到长期 |
| 扩容结构 | L2 活动、blob demand、Dencun / EIP-4844、rollup 成本 | 可能降低 L2 成本，但也改变 L1 fee burn 叙事 | 中期 |
| 衍生品微观结构 | 永续资金费率、期货基差、期权 IV、open interest、清算瀑布 | 造成短线挤压、反身性和波动率跳变 | 分钟到数日 |
| 事件冲击 | 升级、黑客、安全事故、监管、稳定币、交易所、BTC 事件 | 突发改变概率分布，模型通常只能事后适应 | 瞬时到数周 |

关键区别：

- **短线 ETH** 更像“流动性 + 衍生品仓位 + 新闻冲击 + BTC 联动”。
- **中线 ETH** 更像“ETF flows + 宏观 risk-on/off + 链上 activity 叙事”。
- **长期 ETH** 更像“协议现金流叙事、应用需求、监管定位、货币属性和竞争链格局”。

## 3. 纯数学模型拟合市场预测，需要哪些数学领域

| 数学 / 方法域 | 解决的问题 | 典型方法 | 交易里的作用 |
| --- | --- | --- | --- |
| 概率论 | 不确定性如何表达 | 条件概率、贝叶斯、期望、方差、尾部概率 | 把“看好”变成概率分布 |
| 统计推断 | 信号是否真实 | 假设检验、置信区间、多重检验修正 | 防止把噪声当 edge |
| 时间序列 | 价格/波动是否有结构 | ARIMA、GARCH、VAR、协整 | 处理趋势、均值回复、波动聚集 |
| 随机过程 | 市场如何连续/跳跃演化 | Brownian motion、jump process、Hawkes process | 建模跳变、成交到达、事件强度 |
| 状态空间模型 | 市场状态不可直接观测 | Kalman filter、Hidden Markov Model | 识别 regime、动态 hedge ratio |
| 优化 | 给定预测如何配置仓位 | 凸优化、Kelly、均值方差、约束优化 | 把预测变成仓位和组合 |
| 风险度量 | 最坏情况下亏多少 | VaR、CVaR、drawdown、stress test | 控制尾部风险和账户生存 |
| 机器学习 | 非线性高维预测 | tree/boosting、regularization、ensemble | 从多特征中提取非线性关系 |
| 深度学习 | 盘口/文本/序列模式 | CNN、LSTM、Transformer、DeepLOB | 处理 LOB、新闻、链上序列 |
| 信息论 | 信息是否有增量价值 | entropy、mutual information、KL divergence | 衡量特征是否真的增加预测力 |
| 博弈论 | 其他交易者如何反应 | market making、strategic trading | 处理订单簿、抢跑、流动性竞争 |
| 因果推断 | 相关是否可交易 | DAG、instrumental variables、diff-in-diff | 避免把共同驱动误认为因果 |

纯数学拟合最大的陷阱：

1. 市场是非平稳系统，过去分布会变。
2. 市场是对抗性系统，edge 被发现后会衰减。
3. 金融数据样本少、噪声大、自由度高，极易过拟合。
4. 回测如果忽略成本、滑点、成交概率和容量，结果通常不可交易。
5. 预测方向不等于赚钱，交易系统还需要仓位、执行和风控。

## 4. 顶级量化公司的预测模型大致怎么做

公开资料能确认的是方法论轮廓，而不是内部秘密。顶级量化团队通常不是“找一个神奇模型”，而是搭一个研究工厂：

```text
数据采集
-> 清洗、对齐、去重、时间戳校准
-> 假设生成
-> 特征工程
-> 标签定义
-> 样本切分和防泄漏验证
-> 模型训练
-> 回测与交易成本建模
-> 组合构建
-> 执行算法
-> 风控约束
-> 小规模上线
-> 监控、复盘、衰减检测
-> 迭代或下线
```

| 阶段 | 顶级团队关心什么 | 普通曲线拟合容易漏什么 |
| --- | --- | --- |
| 数据 | 时间戳、存活者偏差、缺失值、异常、延迟 | 直接用干净 CSV 当真实市场 |
| 标签 | 预测 horizon、可交易价格、收益定义 | 用未来收盘价泄漏信息 |
| 特征 | 是否有经济含义、是否稳定、是否可实时获得 | 特征越多越好 |
| 训练 | walk-forward、out-of-sample、regime 分层 | 随机切分时间序列 |
| 回测 | spread、fee、slippage、market impact、fill probability | 默认所有信号都能按中间价成交 |
| 组合 | 相关性、风险预算、容量、约束 | 单策略收益曲线很好看 |
| 执行 | 挂单/吃单选择、排队位置、库存风险 | 忽略订单簿 |
| 风控 | drawdown、tail exposure、kill switch、stress test | 只看 Sharpe |
| 上线 | 小资金灰度、监控、报警、回滚 | 一次性满仓上线 |
| 迭代 | alpha decay、模型漂移、市场结构变化 | 策略失效后继续相信旧回测 |

## 5. Polymarket / ETH 上什么可以模型化，什么不能

| 类型 | 可模型化程度 | 例子 | 处理方式 |
| --- | --- | --- | --- |
| 盘口结构 | 高 | bid/ask、spread、depth、imbalance、last trade | 可建短周期特征，但必须含成本 |
| 历史价格序列 | 中高 | momentum、mean reversion、vol clustering | 需要防过拟合和 regime split |
| ETF flows / 链上指标 | 中 | ETF 净流入、gas、burn、staking queue | 适合做状态变量，不宜单因子交易 |
| 事件概率 | 中 | 升级、监管窗口、宏观会议 | 需要贝叶斯更新和人工来源审计 |
| 新闻和舆情 | 中低 | 社媒、公告、黑客消息 | 可做 NLP/事件检测，但噪声和延迟高 |
| 内幕/突发事件 | 低 | 监管突袭、黑客、战争、交易所事故 | 只能做风险缓冲，不能稳定预测 |
| 政策/合规边界 | 低 | 地域限制、市场下架、结算争议 | 写进风险约束，不当 alpha |

## 6. 下一步实时数据源层

本轮新增 `scripts/fetch_market_data.mjs`，生成 `content/market-data-snapshot.json`。它不是交易信号，而是把后续研究系统的数据接口先固定下来。

| 数据层 | 当前接入 | 可进入模型的字段 | Caveat |
| --- | --- | --- | --- |
| Polymarket CLOB | Gamma public-search + CLOB `/book` | token id、bid、ask、spread、depth、last trade | 市场会关闭，盘口变化快，样本不是推荐 |
| 永续资金费率 | Binance USD-M ETHUSDT fundingRate / premiumIndex | funding rate、mark price、index price、next funding time | 单交易所 proxy，不代表全市场 |
| Open interest | Binance USD-M ETHUSDT openInterest | current OI、timestamp | 需要跨交易所单位标准化 |
| 期权 IV / OI | Deribit ETH options summary | instrument、expiry、mark IV、open interest、volume | Deribit venue bias |
| ETF flows | Farside / CoinGlass ETF tracker | daily net flow、issuer split、cumulative flow | 本轮不写入未复核数值；需人工或 vendor API |
| 清算数据 | CoinGlass liquidations / API docs | long/short liquidation、exchange split、time bucket | 历史序列应接 API，不从 dashboard 截图回填 |

当前样本盘口由脚本自动选择 ETH price 相关且可读取 CLOB 的 Polymarket 市场。最新快照选择了 “Will Ethereum reach $2,200 in June?”：

| 盘口项 | 数值 |
| --- | --- |
| Yes bid / ask | 0.006 / 0.008 |
| Yes midpoint | 0.007 |
| Yes top-5 bid depth | 76,043.34 |
| Yes top-5 ask depth | 11,465.00 |
| No bid / ask | 0.992 / 0.994 |

当前 ETH 衍生品快照：

| 指标 | 数值 |
| --- | --- |
| Binance ETHUSDT mark / index | 1666.747 / 1667.138 |
| Latest funding | 0.00000255 |
| Binance open interest | 2,282,433.678 |
| Deribit ETH options instruments | 724 |
| Deribit ETH option open interest | 2,197,614 |
| Largest expiry IV/OI bucket | 26JUN26 · 111.27% |

## 7. 后续成稿要补的证据缺口

- Polymarket 国际站与 Polymarket US 当前费用、可交易市场范围、地域限制，需要最终成稿前再次刷新官方页面。
- ETH ETF flows 需要选定固定 vendor 或人工复核流程，不把单日数据写成长期结论。
- ETH 衍生品因子已经接入 Binance / Deribit 公共接口，但仍需跨交易所聚合。
- 清算历史需要接入 CoinGlass 或同类供应商 API；不能从 dashboard 截图反推历史序列。
- 顶级量化公司流程只能写“公开可观察方法论”和“行业通用 pipeline”，不能冒充内部机密。
