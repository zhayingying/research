# DESIGN.md 调研简报

采集时间：2026-06-25 20:19:52 +0800

## 目标

为后续拆解 Google Labs Code 官方开源仓库 `google-labs-code/design.md` 准备可追溯材料。当前口径不再使用社区 Vercel 条目。

## 来源关系

| 层级 | 来源 | 本地文件 | 判断 |
| --- | --- | --- | --- |
| 规范源头 | `google-labs-code/design.md` | `input/google-design-md/spec.md` | Google 开源的 DESIGN.md 格式规范 |
| 仓库说明 | `google-labs-code/design.md` | `input/google-design-md/README.md`, `input/google-design-md/PHILOSOPHY.md`, `input/google-design-md/package.json` | Google 官方仓库说明、理念和包信息 |
| 官方样例 | `google-labs-code/design.md/examples/*` | `input/google-design-md/examples/*/DESIGN.md` | Google 官方仓库内的 DESIGN.md 示例文件 |
| 样例产物 | `google-labs-code/design.md/examples/*` | `design_tokens.json`, `tailwind.config.js` | 官方样例导出的 token 和 Tailwind 配置 |

## 官方 DESIGN.md 样例

Google 官方仓库没有根目录单独命名为 `DESIGN.md` 的品牌文件；官方可拆解样例位于：

- `input/google-design-md/examples/atmospheric-glass/DESIGN.md`
- `input/google-design-md/examples/paws-and-paths/DESIGN.md`
- `input/google-design-md/examples/totality-festival/DESIGN.md`

三个样例都包含 YAML front matter，并在正文使用 `## Brand & Style`、`## Colors`、`## Typography`、`## Layout & Spacing`、`## Elevation & Depth`、`## Shapes`、`## Components` 等章节。

## 后续拆解建议

1. 先读 `spec.md`：抽出规范结构、token schema、章节顺序、未知字段处理规则。
2. 再拆 3 个官方 `examples/*/DESIGN.md`：比较它们如何表达 YAML token 和 Markdown rationale。
3. 对照每个 example 的 `design_tokens.json` 与 `tailwind.config.js`：确认 DESIGN.md 如何映射到机器可用 token 和工程配置。
4. 输出时明确：本目录研究的是 Google 官方 DESIGN.md 格式与官方 examples，不包含 Vercel 社区条目。

## 待确认点

- 若后续仍要研究 Vercel 风格，需要重新单独建立社区来源目录，并在报告中标注非官方。
- 若要引用 Google 官方仓库状态，以 `content/sources.json` 的 commit、release 和 raw file URL 为准。
