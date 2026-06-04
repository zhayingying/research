# Agent Teams Report Style QA

作者: ziye

时间: 2026-06-04

## 本轮视觉优化

- 按 `editorial-paper` 风格拆出 `theme-fonts.css` 和 `theme.css`。
- 顶部增加 KPI 信息条，强化报告覆盖范围。
- GitHub 项目表增加 caption、筛选结果计数和 stars 迷你条。
- 导航增加当前章节高亮。
- 补充 print 样式和移动端单列降级。
- Frontend 章节增加项目界面缩略示意，覆盖 AG-UI、CopilotKit、Rowboat、AutoGen Studio、LangSmith / LangGraph Studio、Open Multi-Agent Canvas、Tencent Marvis。
- “调研流程强化”章节从三张平铺卡片改为流程 spine、三道质量门和证据强度条。
- 删除“Reflect Loop 怎么改写报告”独立面板和反思循环小图，避免重复解释。
- 新视觉模块在平板和手机端降级为纵向流程与单列质量门。
- GitHub 生态章节在完整矩阵前新增视觉对比仪表盘，用能力条比较 A2A、OpenAI SDK、LangGraph、CrewAI、CopilotKit、Marvis。
- 仪表盘在桌面为说明栏 + 3 列能力卡，平板 2 列，手机 1 列，减少平铺表格阅读负担。
- 修复 Reusable research flow 错位：删除全局绝对定位横线，改为每个流程节点自己的连接线，断点下切换为竖向连接。
- “真正的 Agent Teams 运行和进化框架”从文字清单改为运行系统板：R>C gate、执行拓扑、控制面、进化回路同屏呈现。
- 单 Agent 生命周期从平铺阶段说明改为 `agent-rail` 轨道，突出从定义、执行、验证到学习/归档的顺序关系。
- 运行框架再次从 `ops-board` / `agent-rail` 改为 `framework-decision-board` / `agent-lifecycle-band`：用 R>C 对比、Brief -> Update 控制流、控制面和四段生命周期统一呈现。
- 运行框架继续升级为 `framework-system-diagram` SVG：R>C gate、主控制流、worker 分支、控制面和单 Agent 生命周期在一张图中呈现，不再用卡片模拟图。
- 论文章节从 `paper-grid` 平铺卡片改为 `paper-evidence-map`，按收益边界、失败分类、系统模式和持续进化组织证据。
- 论文章节继续从 `paper-evidence-map` 改为 `paper-decision-board`：左侧决策镜头解释读法，右侧四条证据泳道连接论文、结论和工程动作，底部 `paper-source-ribbon` 作为来源速览。
- 论文章节继续升级为 `paper-evidence-diagram` SVG：左侧论文来源、中间机制判断、右侧工程动作，用箭头表达 evidence flow。
- 验证脚本增加反向检查：HTML 中不能再出现 `lifecycle-grid` 和 `paper-grid` 这类旧平铺结构。
- 社区板块从 X/HN/Reddit 分栏清单改为 `community-signal-board`：先展示信号强度漏斗，再展示 protocol friction、workflow reliability、visible collaboration、coding agents 四个主题聚类。
- 社区来源明细下沉到 `community-ledger`，保留账号、HN 帖和 subreddit，但不再作为主表达。
- 社区板块继续升级为 `community-signal-diagram` SVG：平台信号强度漏斗连接到 topic network，来源明细改为折叠台账。
- 验证脚本继续反向检查：HTML 中不能再出现旧的 `community-grid` 卡片墙。
- 课程板块从 `course-guide` 课程卡片墙改为 `course-learning-map`：左侧解释学习路径，右侧按 Build / Map / Framework / Advanced / Improve / Architecture 排序，底部用 coverage bars 展示能力覆盖。
- Playwright 局部截图发现课程左侧说明卡被 grid stretch 拉出大空白，已给 `course-learning-map` 和 `framework-decision-board` 增加 `align-items: start`，并收紧 framework flow 节点内部间距。
- 课程板块继续升级为 `course-path-diagram` SVG：用曲线路径表达课程先后关系，用覆盖条表达能力覆盖，课程表只保留审计明细。
- Playwright 验证 `report-svg-diagrams-desktop.png` 和 `report-svg-diagrams-mobile.png`：桌面四块主表达均为 SVG 图；移动端页面不整体爆版，SVG 图在图框内横向查看。
- 英文图中文化：运行框架、论文、社区、课程四张 SVG 改成中文主标签，英文只保留为项目名、论文名、协议名或辅助对照；`title`、`desc`、`figcaption` 均可被中文读者理解。
- 排版复查：Playwright 截取 `report-section-framework-cn-final.png`、`report-section-papers-cn-final.png`、`report-section-community-cn-final-v2.png`、`report-section-courses-cn-final.png`、`report-svg-diagrams-cn-final-desktop.png`、`report-svg-diagrams-cn-final-mobile.png`；修正论文长标题溢出和社区右侧项目名贴边问题。

## 验证

```text
node --check agent-collaboration-research/dist/agent-teams-report/scripts/report.js
node agent-collaboration-research/qa/agent-teams-report/verify.mjs
```

结果:

```text
verified 9 sections, 22 repo rows, 1 product benchmarks
```
