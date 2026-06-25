# Eight Layer Framework Report Verification

验证时间：2026-06-25 21:17 +0800

## 验证对象

- 报告入口：`dist/eight-layer-framework/index.html`
- 内容数据：`content/eight-layer-framework.content.json`
- 发布数据：`dist/eight-layer-framework/content.json`
- 报告配置：`dist/eight-layer-framework/report.config.json`
- 截图与渲染记录：`qa/eight-layer-framework/`

## 静态校验

```bash
jq empty \
  design-md-research/visual-report-workspace/projects/design-md-breakdown/content/eight-layer-framework.content.json \
  design-md-research/visual-report-workspace/projects/design-md-breakdown/dist/eight-layer-framework/content.json \
  design-md-research/visual-report-workspace/projects/design-md-breakdown/dist/eight-layer-framework/report.config.json
```

结果：通过，JSON 语法有效。

```bash
node /Users/zhayingying/.codex/skills/visual-html-report/tools/verify-report.mjs \
  --dist design-md-research/visual-report-workspace/projects/design-md-breakdown/dist/eight-layer-framework
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


root = Path("design-md-research/visual-report-workspace/projects/design-md-breakdown/dist/eight-layer-framework")
parser = AssetParser()
parser.feed((root / "index.html").read_text())
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

使用本机 Chrome + Playwright 对 `index.html` 做桌面、平板、手机三档截图。宽表允许在 `.matrix-wrap` 和 `.heatmap` 内部横向滚动；页面主体不允许横向滚动。

| 视口 | 尺寸 | 章节数 | 控制台错误 | 页面错误 | 页面横向溢出 | 截图 |
| --- | --- | ---: | ---: | ---: | --- | --- |
| desktop | 1440x900 | 10 | 0 | 0 | 否 | `desktop.png` |
| tablet | 820x1180 | 10 | 0 | 0 | 否 | `tablet.png` |
| mobile | 390x844 | 10 | 0 | 0 | 否 | `mobile.png` |

原始渲染指标保存在 `render-check.json`。

## 结论

8 层框架版 HTML 报告可直接打开，用作 `design-system-contract-deep-dive.md` 的可视化阅读入口。
