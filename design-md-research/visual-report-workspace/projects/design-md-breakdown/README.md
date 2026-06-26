# DESIGN.md Visual Breakdown Report

这份目录保存 Google Labs Code `design.md` 官方资料拆解的可视化报告。

## 目录边界

- `content/content.json`：第一版报告内容源，记录报告标题、来源目录、分析目录和选用模块。
- `content/eight-layer-framework.content.json`：8 层框架版报告内容源。
- `dist/visual-breakdown/`：可直接打开的 HTML 报告包，由 `visual-html-report` 的 `token-report` 引擎和 `editorial-paper` 风格组装。
- `dist/eight-layer-framework/`：按“结构、思想、token、dark mode、组件、工程化、隐藏问题、专家追问”八层框架重制的 HTML 报告包。
- `qa/visual-breakdown/`：报告渲染验证记录，包含桌面、平板、手机截图和检查结果。
- `qa/eight-layer-framework/`：8 层框架版报告渲染验证记录。

## 报告入口

- 打开 `dist/eight-layer-framework/index.html` 查看 8 层框架版可视化报告。
- 打开 `dist/visual-breakdown/index.html` 查看第一版可视化报告。

## 保留策略

- `dist/visual-breakdown/` 是第一版“DESIGN.md 拆解地图”，保留作为快速阅读入口，不删除、不覆盖。
- `dist/eight-layer-framework/` 是后续按 8 层框架重制的深拆版，只能作为新增版本存在，不能替代第一版目录。
- 如需继续迭代报告，新增独立 `dist/{report-slug}/` 和对应 `qa/{report-slug}/`，不要复用或清空已有报告目录。

## 事实源

- 官方原文区：`design-md-research/official/google-design-md/`
- 拆解分析区：`design-md-research/analysis/`
- 报告配置：`dist/visual-breakdown/report.config.json`

修改报告内容时，先改 `content/content.json` 和相关分析文档，再重新组装 `dist/visual-breakdown/` 并更新 QA 记录。
