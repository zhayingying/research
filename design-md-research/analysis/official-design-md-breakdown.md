# Google DESIGN.md 官方仓库拆解

采集时间：2026-06-25 20:19:52 +0800

## 目标

拆解 Google Labs Code 官方开源仓库 `google-labs-code/design.md`：先隔离保存官方原始快照，再基于官方规范和官方 examples 归纳 DESIGN.md 的结构、契约和可落地用法。

## 文件边界

| 区域 | 路径 | 内容 | 规则 |
| --- | --- | --- | --- |
| 官方原始区 | `../official/google-design-md/` | 从 `google-labs-code/design.md` 拉下来的 README、spec、PHILOSOPHY、package 和 examples | 只保存原文，不写本地分析 |
| 本地拆解区 | `./` | 本文件、`sources.json`、`verification.md` | 只写我们的拆解、来源台账和验证记录 |

## 官方仓库结构拆解

| 模块 | 本地路径 | 作用 |
| --- | --- | --- |
| 仓库说明 | `../official/google-design-md/README.md` | 说明 DESIGN.md 格式、CLI 用法、lint / diff 命令 |
| 设计理念 | `../official/google-design-md/PHILOSOPHY.md` | 解释为什么用 markdown + tokens 表达设计系统 |
| 规范正文 | `../official/google-design-md/spec.md` | DESIGN.md 格式规范，是拆解的主事实源 |
| 包信息 | `../official/google-design-md/package.json` | 仓库脚本和 monorepo 入口信息 |
| 官方样例 | `../official/google-design-md/examples/*/DESIGN.md` | 官方给出的可 lint 的 DESIGN.md 示例 |
| 导出产物 | `../official/google-design-md/examples/*/design_tokens.json` | 从 DESIGN.md 转出的 token 形态 |
| 工程映射 | `../official/google-design-md/examples/*/tailwind.config.js` | token 到 Tailwind 配置的映射示例 |

## 规范结构拆解

`spec.md` 把 DESIGN.md 分成两层：

| 层 | 形式 | 作用 |
| --- | --- | --- |
| Machine-readable tokens | YAML front matter | 给 agent 和工具精确值，例如 `colors`、`typography`、`rounded`、`spacing`、`components` |
| Human-readable rationale | Markdown body | 解释品牌气质、颜色语义、排版规则、布局原则和组件使用方式 |

规范中的主要章节顺序：

1. `Overview` / `Brand & Style`
2. `Colors`
3. `Typography`
4. `Layout` / `Layout & Spacing`
5. `Elevation & Depth`
6. `Shapes`
7. `Components`
8. `Do's and Don'ts`

## 拆解方法

我按“事实源 -> 结构契约 -> 官方样例 -> 工程落地 -> 验证”的顺序拆：

| 步骤 | 输入 | 拆解动作 | 产出 |
| --- | --- | --- | --- |
| 1. 定事实源 | `../official/google-design-md/spec.md` | 先确认什么是规范要求，避免把社区约定误当官方规范 | DESIGN.md 的两层结构和章节顺序 |
| 2. 拆 token schema | `spec.md` 的 Schema / Token Types | 把 YAML front matter 中可机器读取的字段拆出来 | `name`、`description`、`colors`、`typography`、`rounded`、`spacing`、`components` |
| 3. 拆 prose sections | `spec.md` 的 Sections | 把正文 `##` 章节按语义分类 | 品牌气质、色彩语义、排版策略、布局原则、深度、形状、组件、禁忌 |
| 4. 对照 examples | `examples/*/DESIGN.md` | 检查官方样例是否按同一结构写，记录实际章节和 token 起始位置 | 三个官方样例的横向对照表 |
| 5. 看导出产物 | `design_tokens.json`、`tailwind.config.js` | 判断 DESIGN.md 如何进入工程配置 | token -> JSON -> Tailwind 的映射链路 |
| 6. 跑 CLI 验证 | `npx -y @google/design.md lint ...` | 用官方 CLI 检查样例是否符合规范 | 0 errors；记录 warning，不手改官方原文 |

这个顺序的原因：先用 `spec.md` 锁定官方契约，再读 examples，避免直接从样例归纳出错误规则。examples 是“官方怎么写”的证据，但 `spec.md` 才是判断字段和章节是否规范的主事实源。

## Agent 可读结构

面向 Codex / Cursor 这类编码 agent，DESIGN.md 最有价值的不是“漂亮文案”，而是把视觉决策分成两类：

| 类型 | agent 怎么用 | 例子 |
| --- | --- | --- |
| 精确 token | 直接用于代码、样式变量、Tailwind theme、组件 token | `colors.primary`、`typography.body-md`、`spacing.md`、`rounded.sm` |
| 设计理由 | 当没有精确 token 覆盖时，用来判断风格方向 | “这个品牌应该显得安静、专业、技术感强” |

日常开发时，应让 agent 先读 token，再读 rationale：先保证值不乱，再保证风格不跑偏。

## 官方 examples 对照

Google 官方仓库没有根目录单独命名为 `DESIGN.md` 的品牌文件；官方可拆解样例位于：

| Example | DESIGN.md | 正文章节 |
| --- | --- | --- |
| Atmospheric Glass | `../official/google-design-md/examples/atmospheric-glass/DESIGN.md` | Brand & Style, Colors, Typography, Layout & Spacing, Elevation & Depth, Shapes, Components |
| Paws & Paths | `../official/google-design-md/examples/paws-and-paths/DESIGN.md` | Brand & Style, Colors, Typography, Layout & Spacing, Elevation & Depth, Shapes, Components |
| Totality Festival | `../official/google-design-md/examples/totality-festival/DESIGN.md` | Brand & Style, Colors, Typography, Layout & Spacing, Elevation & Depth, Shapes, Components |

三个官方样例的 YAML front matter 都包含同一组核心 token 分区：

| Example | Token 分区 | 正文起点 |
| --- | --- | --- |
| Atmospheric Glass | `colors`, `typography`, `rounded`, `spacing`, `components` | `## Brand & Style` at line 144 |
| Paws & Paths | `colors`, `typography`, `rounded`, `spacing`, `components` | `## Brand & Style` at line 159 |
| Totality Festival | `colors`, `typography`, `rounded`, `spacing`, `components` | `## Brand & Style` at line 148 |

这说明官方 examples 的核心模式是稳定的：前半段给机器 token，后半段给人和 agent 解释这些 token 应该如何被使用。

## 日常项目拆解模板

把官方模式迁移到自己的业务项目时，可以按这个模板写项目根目录 `DESIGN.md`：

1. `name` / `description`：这个产品或子系统的视觉定位。
2. `colors`：只放可复用 token，不把一次性颜色散落在代码里。
3. `typography`：定义展示、正文、标签、代码等层级。
4. `rounded` / `spacing`：定义半径和间距尺度，避免魔法值。
5. `components`：定义按钮、卡片、表单、导航等稳定组件 token。
6. `## Brand & Style`：说明整体气质和适用场景。
7. `## Colors` 到 `## Components`：解释 token 的用途和组合方式。
8. `## Do's and Don'ts`：写明 agent 不能做什么，例如不要新增未定义颜色、不要随意换字体。

## 当前结论

- Google 官方事实源是 `../official/google-design-md/spec.md`，不是社区集合里的某个品牌文件。
- 官方 examples 展示的是“一个 DESIGN.md 如何同时给机器精确 token、给人和 agent 设计理由”。
- 后续如果要继续拆，应优先拆 `spec.md` 的 schema，再逐个对照 `examples/*/DESIGN.md`、`design_tokens.json`、`tailwind.config.js`。
- 若后续仍要研究 Vercel 风格，需要另建社区来源目录，并明确标注非官方。

## 来源与验证

- 来源台账：`sources.json`
- 验证记录：`verification.md`
