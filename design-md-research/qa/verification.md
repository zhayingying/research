# Verification

验证时间：2026-06-25 18:26 +0800

## 命令与结果

### JSON 语法

```bash
jq empty research/design-md-research/content/sources.json
```

结果：退出码 0，`sources.json` 语法有效。

### 文件清单

```bash
find research/design-md-research -maxdepth 4 -type f | sort
```

结果：确认生成以下 9 个文件。

```text
research/design-md-research/README.md
research/design-md-research/content/research-brief.md
research/design-md-research/content/sources.json
research/design-md-research/input/awesome-design-md/README.md
research/design-md-research/input/google-design-md/README.md
research/design-md-research/input/google-design-md/spec.md
research/design-md-research/input/vercel-labs-design-systems-to-agent-skills/README.md
research/design-md-research/input/vercel/DESIGN.md
research/design-md-research/input/vercel/README.md
```

### 文件尺寸

```bash
wc -l -c research/design-md-research/README.md \
  research/design-md-research/content/research-brief.md \
  research/design-md-research/content/sources.json \
  research/design-md-research/input/google-design-md/README.md \
  research/design-md-research/input/google-design-md/spec.md \
  research/design-md-research/input/awesome-design-md/README.md \
  research/design-md-research/input/vercel/DESIGN.md \
  research/design-md-research/input/vercel/README.md \
  research/design-md-research/input/vercel-labs-design-systems-to-agent-skills/README.md
```

结果：总计 2131 行、105151 bytes。Vercel `DESIGN.md` 为 736 行、41405 bytes。

### Google DESIGN.md lint

```bash
cd research/design-md-research
npx -y @google/design.md lint input/vercel/DESIGN.md
```

结果：退出码 0。

```json
{
  "summary": {
    "errors": 0,
    "warnings": 51,
    "infos": 1
  }
}
```

warning 归类：

- `components.*.borderColor`、`components.*.description`、`components.*.activeIndicator` 等字段不是 Google alpha spec 认可的 component sub-token。
- 多个 `colors.*` token 已定义但未被 component 引用。
- CLI 统计该文件包含 36 个 colors、14 个 typography scales、9 个 rounding levels、12 个 spacing tokens、40 个 components。

处理：保持原始社区文件不变，把 warning 作为后续拆解时需要区分“规范字段”和“社区扩展字段”的证据。
