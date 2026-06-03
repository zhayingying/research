# Agent Teams / A2A 协同生态深度调研

作者: ziye

采集日期: 2026-06-04

## 报告入口

打开静态 HTML:

```text
agent-collaboration-research/dist/agent-teams-report/index.html
```

这份报告研究的问题是:

```text
一个 Agent-to-Agent / Multi-Agent 协同系统什么时候值得从单 Agent 升级为 Agent Teams，
以及它应该用什么协议、SDK、运行框架、评估机制和前端交互形态来支撑持续进化。
```

## 内容覆盖

- GitHub 活跃开源项目分层: A2A、OpenAI Agents SDK、Claude Agent SDK、Google ADK、LangGraph、CrewAI、AutoGen、Mastra、Pi、Codex、Rowboat 等。
- 闭源产品基准: Tencent Marvis 马维斯。
- 横向比较: 生态层级图、能力矩阵、场景选型矩阵。
- Agent Teams 运行框架: R>C gate、brief contract、shared blackboard、eval、trace、cost、retrospective。
- 单 Agent 生命周期: define、hydrate、plan、act、observe、verify、handoff、learn、retire。
- 论文与研究信号: scaling、failure taxonomy、co-scientist、Magentic-One、AutoGen、ACE 等。
- 社区与课程: Hacker News、Reddit、X monitor list、Stanford、Berkeley、CMU、MIT。
- 前端参考: AG-UI、CopilotKit、Rowboat、AutoGen Studio、LangSmith / LangGraph Studio、Open Multi-Agent Canvas、Marvis。

## 目录结构

```text
agent-collaboration-research/
├── README.md
├── content/
│   ├── research-brief.md
│   └── sources.json
├── dist/
│   └── agent-teams-report/
│       ├── index.html
│       ├── content.json
│       ├── report.config.json
│       ├── scripts/report.js
│       └── styles/
│           ├── report.css
│           ├── theme.css
│           └── theme-fonts.css
└── qa/
    └── agent-teams-report/
        ├── style-check.md
        └── verify.mjs
```

## 证据口径

```text
A 级: 官方 GitHub、官方文档、arXiv/OpenReview/Nature/高校课程页、公司研究博客
B 级: Hacker News 高讨论度帖子、Reddit 有具体工程经验的讨论、项目作者 X 帖
C 级: 第三方目录、媒体报道、二手转述
```

平台判断链:

- GitHub: 不只看 stars，同时看 pushedAt、license、语言、是否协议/SDK/框架/产品、是否只是样例项目。
- Paper: 优先 arXiv、OpenReview、Nature、官方研究博客；把 benchmark 和失败分类单独记录。
- HN / Reddit / X: 作为社区信号，不作为单独事实源。
- Course: 只采高校官方课程页或官方课程站。
- Frontend: 优先开源项目和官方文档；截图不直接搬入仓库，使用 CSS 缩略示意。

## 验证

运行:

```bash
node agent-collaboration-research/qa/agent-teams-report/verify.mjs
node --check agent-collaboration-research/dist/agent-teams-report/scripts/report.js
```

当前验证结果:

```text
verified 8 sections, 22 repo rows, 1 product benchmarks
```

## 未验证项

浏览器截图级验证未执行。当前仓库未安装 Playwright，当前会话也未暴露可用浏览器自动化工具。

## 维护说明

- 修改调研结论时，同步更新 `content/sources.json`。
- 修改视觉样式时，同步记录到 `qa/agent-teams-report/style-check.md`。
- 增删项目表行时，确认 `verify.mjs` 的 repo row 数量预期是否需要更新。
- 任何颜色、chip、强/中/弱、stars 条等视觉编码都必须在页面里有图例。
