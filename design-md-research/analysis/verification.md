# Verification

验证时间：2026-06-25 20:36 +0800

## 命令与结果

### JSON 语法

```bash
jq empty research/design-md-research/analysis/sources.json
```

结果：退出码 0，`sources.json` 语法有效。

### 文件清单

```bash
find research/design-md-research -type f | sort
```

结果：确认目录中只保留 Google 官方仓库快照和本地调研记录。

```text
research/design-md-research/README.md
research/design-md-research/analysis/README.md
research/design-md-research/analysis/official-design-md-breakdown.md
research/design-md-research/analysis/sources.json
research/design-md-research/analysis/verification.md
research/design-md-research/official/google-design-md/PHILOSOPHY.md
research/design-md-research/official/google-design-md/README.md
research/design-md-research/official/google-design-md/examples/atmospheric-glass/DESIGN.md
research/design-md-research/official/google-design-md/examples/atmospheric-glass/README.md
research/design-md-research/official/google-design-md/examples/atmospheric-glass/design_tokens.json
research/design-md-research/official/google-design-md/examples/atmospheric-glass/tailwind.config.js
research/design-md-research/official/google-design-md/examples/paws-and-paths/DESIGN.md
research/design-md-research/official/google-design-md/examples/paws-and-paths/README.md
research/design-md-research/official/google-design-md/examples/paws-and-paths/design_tokens.json
research/design-md-research/official/google-design-md/examples/paws-and-paths/tailwind.config.js
research/design-md-research/official/google-design-md/examples/totality-festival/DESIGN.md
research/design-md-research/official/google-design-md/examples/totality-festival/README.md
research/design-md-research/official/google-design-md/examples/totality-festival/design_tokens.json
research/design-md-research/official/google-design-md/examples/totality-festival/tailwind.config.js
research/design-md-research/official/google-design-md/package.json
research/design-md-research/official/google-design-md/spec.md
```

### 文件尺寸

```bash
wc -l -c research/design-md-research/README.md \
  research/design-md-research/analysis/README.md \
  research/design-md-research/analysis/official-design-md-breakdown.md \
  research/design-md-research/analysis/sources.json \
  research/design-md-research/analysis/verification.md \
  research/design-md-research/official/google-design-md/PHILOSOPHY.md \
  research/design-md-research/official/google-design-md/README.md \
  research/design-md-research/official/google-design-md/examples/atmospheric-glass/DESIGN.md \
  research/design-md-research/official/google-design-md/examples/atmospheric-glass/README.md \
  research/design-md-research/official/google-design-md/examples/atmospheric-glass/design_tokens.json \
  research/design-md-research/official/google-design-md/examples/atmospheric-glass/tailwind.config.js \
  research/design-md-research/official/google-design-md/examples/paws-and-paths/DESIGN.md \
  research/design-md-research/official/google-design-md/examples/paws-and-paths/README.md \
  research/design-md-research/official/google-design-md/examples/paws-and-paths/design_tokens.json \
  research/design-md-research/official/google-design-md/examples/paws-and-paths/tailwind.config.js \
  research/design-md-research/official/google-design-md/examples/totality-festival/DESIGN.md \
  research/design-md-research/official/google-design-md/examples/totality-festival/README.md \
  research/design-md-research/official/google-design-md/examples/totality-festival/design_tokens.json \
  research/design-md-research/official/google-design-md/examples/totality-festival/tailwind.config.js \
  research/design-md-research/official/google-design-md/package.json \
  research/design-md-research/official/google-design-md/spec.md
```

结果：完整目录总计 5038 行、145879 bytes；其中 Google 官方仓库快照部分总计 4659 行、127999 bytes。三个官方 `DESIGN.md` 样例分别为：

- `examples/atmospheric-glass/DESIGN.md`：210 行、8659 bytes。
- `examples/paws-and-paths/DESIGN.md`：219 行、8413 bytes。
- `examples/totality-festival/DESIGN.md`：210 行、9045 bytes。

### Google DESIGN.md lint

```bash
cd research/design-md-research
npx -y @google/design.md lint official/google-design-md/examples/atmospheric-glass/DESIGN.md
npx -y @google/design.md lint official/google-design-md/examples/paws-and-paths/DESIGN.md
npx -y @google/design.md lint official/google-design-md/examples/totality-festival/DESIGN.md
```

结果：三条命令退出码均为 0。

| 文件 | errors | warnings | infos |
| --- | ---: | ---: | ---: |
| `official/google-design-md/examples/atmospheric-glass/DESIGN.md` | 0 | 4 | 1 |
| `official/google-design-md/examples/paws-and-paths/DESIGN.md` | 0 | 0 | 1 |
| `official/google-design-md/examples/totality-festival/DESIGN.md` | 0 | 0 | 1 |

`atmospheric-glass` 的 4 个 warning 均为透明玻璃背景与白色文字的 WCAG contrast warning。处理：三个官方 example 保持原始快照不变；后续拆解以这些文件和 `spec.md` 为准。
