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

## 官方 examples 对照

Google 官方仓库没有根目录单独命名为 `DESIGN.md` 的品牌文件；官方可拆解样例位于：

| Example | DESIGN.md | 正文章节 |
| --- | --- | --- |
| Atmospheric Glass | `../official/google-design-md/examples/atmospheric-glass/DESIGN.md` | Brand & Style, Colors, Typography, Layout & Spacing, Elevation & Depth, Shapes, Components |
| Paws & Paths | `../official/google-design-md/examples/paws-and-paths/DESIGN.md` | Brand & Style, Colors, Typography, Layout & Spacing, Elevation & Depth, Shapes, Components |
| Totality Festival | `../official/google-design-md/examples/totality-festival/DESIGN.md` | Brand & Style, Colors, Typography, Layout & Spacing, Elevation & Depth, Shapes, Components |

## 当前结论

- Google 官方事实源是 `../official/google-design-md/spec.md`，不是社区集合里的某个品牌文件。
- 官方 examples 展示的是“一个 DESIGN.md 如何同时给机器精确 token、给人和 agent 设计理由”。
- 后续如果要继续拆，应优先拆 `spec.md` 的 schema，再逐个对照 `examples/*/DESIGN.md`、`design_tokens.json`、`tailwind.config.js`。
- 若后续仍要研究 Vercel 风格，需要另建社区来源目录，并明确标注非官方。

## 来源与验证

- 来源台账：`sources.json`
- 验证记录：`verification.md`
