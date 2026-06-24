# 公司股权认知框架调研

作者: ziye

这份报告面向早期员工 / 未来创业者，解释公司、股权、融资、退出和员工变现机制。重点不是给行动建议，而是建立可追溯的机制认知。

## 报告入口

直接打开静态 HTML:

```text
equity-analysis/report/index.html
```

## 关键材料

| 路径 | 用途 |
| --- | --- |
| `document/调研任务书_公司股权认知框架.md` | 原始任务书和问题树 |
| `content/sources.json` | 从报告附录拆出的来源索引和维护口径 |
| `report/index.html` | 最终 HTML 报告 |
| `output/` | 截图、渲染检查和外链检查结果 |
| `script/check_render_report.py` | Playwright 渲染和关键章节截图检查 |
| `script/check_external_links.py` | 外链可达性检查 |

## 覆盖结构

报告采用 `Part 0-10 + 附录`:

- Part 0: 公司成立、股权分配、融资、归宿、变现全景图。
- Part 1-3: 股权本质、激励工具、融资机制。
- Part 4-6: IPO、并购、老股转让、VIE / 红筹 / 境内外架构。
- Part 7-8: 未来创始人视角和持股后可行使的权利。
- Part 9: 中国式陷阱，尤其是口头承诺、确权、平台、离职和创始人改口。
- Part 10: 当下阅读优先级和未来 5 年复盘节点。

## 验证

在 `research/` 仓库根目录运行:

```bash
python3 equity-analysis/script/check_render_report.py
python3 equity-analysis/script/check_external_links.py
node --check equity-analysis/report/scripts/report.js
node --check equity-analysis/report/scripts/theme-runtime.js
```

`check_render_report.py` 需要 Python Playwright 和 Chromium。当前 Codex 桌面内置 Node Playwright 可用于等价渲染检查；如果在普通终端运行 Python 脚本，需要先安装 `playwright` 并执行 `python3 -m playwright install chromium`。

当前外链检查会使用 `HEAD`，失败后降级 `GET`。SEC、HKEX、法院、公报、数据库和媒体站点可能返回 403 / 412 / 5xx，这通常代表反爬、地区限制或临时网关错误，不直接等于报告引用错误；更新报告前需要人工打开复核关键来源。

## 维护规则

- 修改事实、数字、法规或案例时，同步更新 `content/sources.json` 和 HTML 附录 B。
- 新增章节时，在任务书问题编号和 Part/Section 之间保持可追溯关系。
- 重新跑渲染检查后，把 `output/render-results.json` 与关键截图一起更新。
- 重新跑链接检查后，区分真实坏链和官网拒绝自动请求；对关键来源优先保留官方入口。
- 不把法律、税务或投资建议写成行动指令；报告只解释机制和风险。
