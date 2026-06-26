# DESIGN.md Visual Breakdown Report

这份目录保存 Google Labs Code `design.md` 官方资料拆解的 8 层框架版可视化报告。

## 目录边界

- `content/eight-layer-framework.content.json`：8 层框架版报告内容源。
- `dist/eight-layer-framework/`：按“结构、思想、token、dark mode、组件、工程化、隐藏问题、专家追问”八层框架重制的 HTML 报告包。
- `qa/eight-layer-framework/`：8 层框架版报告渲染验证记录。

## 报告入口

- 打开 `dist/eight-layer-framework/index.html` 查看 8 层框架版可视化报告。

## 保留策略

- `dist/eight-layer-framework/` 是当前保留的可视化报告版本。
- 如需继续迭代报告，新增独立 `dist/{report-slug}/` 和对应 `qa/{report-slug}/`，不要复用或清空已有报告目录。

## 事实源

- 官方原文区：`design-md-research/official/google-design-md/`
- 拆解分析区：`design-md-research/analysis/`
- 报告配置：`dist/eight-layer-framework/report.config.json`

修改报告内容时，先改 `content/eight-layer-framework.content.json` 和相关分析文档，再重新组装 `dist/eight-layer-framework/` 并更新 QA 记录。
