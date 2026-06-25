# DESIGN.md Visual Breakdown Report

这份目录保存 Google Labs Code `design.md` 官方资料拆解的可视化报告。

## 目录边界

- `content/content.json`：报告内容源，记录报告标题、来源目录、分析目录和选用模块。
- `dist/visual-breakdown/`：可直接打开的 HTML 报告包，由 `visual-html-report` 的 `token-report` 引擎和 `editorial-paper` 风格组装。
- `qa/visual-breakdown/`：报告渲染验证记录，包含桌面、平板、手机截图和检查结果。

## 报告入口

打开 `dist/visual-breakdown/index.html` 查看可视化报告。

## 事实源

- 官方原文区：`design-md-research/official/google-design-md/`
- 拆解分析区：`design-md-research/analysis/`
- 报告配置：`dist/visual-breakdown/report.config.json`

修改报告内容时，先改 `content/content.json` 和相关分析文档，再重新组装 `dist/visual-breakdown/` 并更新 QA 记录。
