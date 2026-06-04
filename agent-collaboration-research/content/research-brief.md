# Agent Teams / A2A 协同调研问题定义

作者: ziye

采集日期: 2026-06-04

## 核心问题

一个 Agent-to-Agent / Multi-Agent 协同系统什么时候值得从单 Agent 升级为 Agent Teams，并且它应该用什么协议、SDK、运行框架、评估机制和前端交互形态来支撑持续进化。

## 问题树

```text
Agent Teams 是否成立
├─ 生态层: A2A / MCP / AG-UI / agent SDK / orchestration framework 谁在活跃
├─ 工程层: 技术栈、SDK 绑定、协议能力、执行与观测能力
├─ 运行层: 团队协作拓扑、状态/记忆、任务分配、边界合同、停止条件
├─ 进化层: eval、trace、cost、retrospective、skill/context 更新
├─ 研究层: 顶尖论文给出的有效边界、失败模式和 scaling 规律
├─ 社区层: X、Hacker News、Reddit 的 builder 信号和反对意见
├─ 教育层: Stanford、Berkeley、CMU、MIT 等课程是否已覆盖
└─ 产品层: Agent Teams 的前端应该如何呈现协同、状态、证据和失败
```

## 可复用调研流程

```text
Scope -> Plan -> Retrieve -> Evidence -> Reflect -> Compare -> Package
```

本报告按三条强化规则维护：

1. Evidence Ledger: 每个重大结论必须能追到 claim、source、grade、采集日期、支撑问题和冲突备注。HN、Reddit、X 只能作为社区信号，不能单独支撑事实结论。
2. Reflect Loop: 每轮采集后检查缺口、冲突、过期事实、闭源/开源混排和维度不公平；发现 critical gap 时生成 delta query 并更新证据。
3. Comparison First: 先给 layer map、capability matrix、scenario selection，再展示 inventory table，避免报告退化成项目列表。

本轮新增反平铺约束：运行框架、论文、课程、社区、产品 UI 这类章节不能只堆同质卡片；必须优先用系统图、生命周期轨道、证据地图、能力热力图或场景选择图表达关系、顺序、强弱和证据作用。

## 证据口径

```text
A 级: 官方 GitHub、官方文档、arXiv/OpenReview/Nature/高校课程页、公司研究博客
B 级: Hacker News 高讨论度帖子、Reddit 有具体工程经验的讨论、项目作者 X 帖
C 级: 第三方目录、媒体报道、二手转述
```

判断链:

- GitHub: stars 不是唯一指标；同时看 2026 年是否 pushed、license、语言、是否协议/SDK/运行框架、是否只是样例项目。
- Paper: 优先 arXiv / OpenReview / Nature / 官方研究博客；把 benchmark 结果和失败分类单独记录，避免把 demo 当生产规律。
- HN: points/comments 代表 Hacker News 关注度；评论用于识别 adoption friction，不当作事实源。
- Reddit: 优先近期、有自述生产经验或具体 failure mode 的帖子；社区结论只作为实践信号。
- Course: 只采官方大学课程页或学院项目页；第三方课程整理不作为主证据。
- Frontend: 优先开源项目和协议文档；产品官网只抽交互模式，不抽营销结论。

## 反思循环记录

| Gap | 处理 |
| --- | --- |
| 只列开源项目，缺少可比较结论 | 新增 layer map、capability matrix、scenario selection |
| Marvis 是闭源产品，无法和 GitHub stars 同排 | 改为 product benchmark，并单独标明证据等级 |
| 课程列表可读性不足 | 改成 SVG learning path + coverage bars，先讲学习顺序再放课程表 |
| 运行框架章节仍像组件清单 | 改成 SVG 系统图：R>C gate、控制流、控制面和生命周期循环 |
| 论文章节仍像标题卡片 | 改成 SVG evidence flow，按论文 -> 机制 -> 工程动作组织 |
| 社区板块仍像链接清单 | 改成 SVG signal funnel + topic network，明细放折叠台账 |
| X/Twitter 检索受限 | 改为 builder monitor list，不作为事实证据 |

## 一句话结论

Agent Teams 的有效边界不是“更多 agent 更聪明”，而是“任务可并行、边界可验证、状态可追踪、失败可归因”时才有收益；否则协调税、上下文损耗和错误放大会吞掉多 Agent 的并行价值。
