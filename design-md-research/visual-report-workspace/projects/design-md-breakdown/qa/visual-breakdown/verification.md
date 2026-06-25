# Visual Report Verification

验证时间：2026-06-25 20:52 +0800

## 验证对象

- 报告入口：`dist/visual-breakdown/index.html`
- 内容数据：`content/content.json`
- 发布数据：`dist/visual-breakdown/content.json`
- 报告配置：`dist/visual-breakdown/report.config.json`
- 截图与渲染记录：`qa/visual-breakdown/`

## 命令记录

```bash
jq empty \
  design-md-research/visual-report-workspace/projects/design-md-breakdown/content/content.json \
  design-md-research/visual-report-workspace/projects/design-md-breakdown/dist/visual-breakdown/content.json \
  design-md-research/visual-report-workspace/projects/design-md-breakdown/dist/visual-breakdown/report.config.json
```

结果：通过，JSON 语法有效。

```bash
node /Users/zhayingying/.codex/skills/visual-html-report/tools/verify-report.mjs \
  --dist design-md-research/visual-report-workspace/projects/design-md-breakdown/dist/visual-breakdown
```

结果：通过，报告包依赖的 theme、engine、module、style、script 均存在。

```bash
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path


class AssetParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in {"href", "src"} and value:
                self.refs.append(value)


root = Path("design-md-research/visual-report-workspace/projects/design-md-breakdown/dist/visual-breakdown")
html = (root / "index.html").read_text()
parser = AssetParser()
parser.feed(html)

local_refs = [
    ref
    for ref in parser.refs
    if not ref.startswith(("data:", "#", "http://", "https://", "mailto:"))
]
missing = [ref for ref in local_refs if not (root / ref).exists()]
if missing:
    raise SystemExit(f"missing refs: {missing}")
print("all refs exist")
PY
```

结果：通过，HTML 引用的本地 CSS、JS、JSON 文件均存在。

## 渲染检查

使用本机 Chrome + Playwright 对 `index.html` 做桌面、平板、手机三档截图。

| 视口 | 尺寸 | 章节数 | 控制台错误 | 页面错误 | 横向溢出 | 截图 |
| --- | --- | ---: | ---: | ---: | --- | --- |
| desktop | 1440x900 | 6 | 0 | 0 | 否 | `desktop.png` |
| tablet | 820x1180 | 6 | 0 | 0 | 否 | `tablet.png` |
| mobile | 390x844 | 6 | 0 | 0 | 否 | `mobile.png` |

原始渲染指标保存在 `render-check.json`。

## 结论

这份可视化报告可以作为 `design-md-research` 的阅读入口：先看“拆解流程”，再看“拆出来的内容”，最后看 Codex / Cursor 的日常放置建议。
