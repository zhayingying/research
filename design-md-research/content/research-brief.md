# DESIGN.md 调研简报

采集时间：2026-06-25 18:26:55 +0800

## 目标

为后续拆解 Vercel 风格的 `DESIGN.md` 准备可追溯材料，先把规范源头、社区集合、Vercel 条目和 Vercel 官方相邻项目分开保存。

## 来源关系

| 层级 | 来源 | 本地文件 | 判断 |
| --- | --- | --- | --- |
| 规范源头 | `google-labs-code/design.md` | `input/google-design-md/README.md`, `input/google-design-md/spec.md` | Google 开源的 DESIGN.md 格式规范和 CLI 仓库 |
| 社区集合 | `VoltAgent/awesome-design-md` | `input/awesome-design-md/README.md` | 社区整理的 Awesome DESIGN.md 集合 |
| 本次目标 | `VoltAgent/awesome-design-md/design-md/vercel/DESIGN.md` | `input/vercel/DESIGN.md` | 后续拆解 Vercel 风格的直接输入 |
| 相关但非目标 | `vercel-labs/design-systems-to-agent-skills` | `input/vercel-labs-design-systems-to-agent-skills/README.md` | Vercel 官方相邻项目，但不是 DESIGN.md 文件来源 |

## Vercel DESIGN.md 结构锚点

`input/vercel/DESIGN.md` 当前共 736 行，结构如下：

- YAML front matter：第 1 行开始，包含 `version`、`name`、`description`、`colors`、`typography`、`rounded`、`spacing`、`components`。
- `## Overview`：第 393 行。
- `## Colors`：第 409 行。
- `## Typography`：第 449 行。
- `## Layout`：第 489 行。
- `## Elevation & Depth`：第 538 行。
- `## Shapes`：第 556 行。
- `## Components`：第 579 行。
- `## Do's and Don'ts`：第 718 行。

## 后续拆解建议

1. 先拆 YAML tokens：抽出色彩角色、字体层级、间距半径、组件 token 表。
2. 再拆正文规则：把 Vercel 的视觉气质、布局原则、组件模式和禁忌项转成中文研究表。
3. 最后与 Google `spec.md` 对照：确认社区文件哪些字段是规范字段，哪些是社区扩展或代理提示。
4. 拆解时保留“非官方”标记：该文件是社区独立分析，不应写成 Vercel 官方发布的 DESIGN.md。

## 待确认点

- 如果调研报告要表述为“Vercel 刚刚开源”，需要再找 Vercel 官方发布源；当前证据只支持“社区 awesome-design-md 中有 Vercel 条目”。
- 如果要研究 Vercel 官方设计系统到 agent skill 的路线，则另开分支材料分析 `vercel-labs/design-systems-to-agent-skills`，不要和 `DESIGN.md` 文件混写。
