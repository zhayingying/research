# DESIGN.md Research

本目录用于保存 DESIGN.md 相关调研材料，重点是后续拆解 Vercel 风格 DESIGN.md。

## 当前结论

- DESIGN.md 的规范源头是 Google Labs Code 开源仓库 `google-labs-code/design.md`，对应 Stitch 文档与 `@google/design.md` CLI。
- 社区集合是 `VoltAgent/awesome-design-md`，README 标题为 `Awesome DESIGN.md`，其中包含 `design-md/vercel/DESIGN.md`。
- 已找到并保存的 Vercel 文件来自 `VoltAgent/awesome-design-md` 社区集合，是对 Vercel 公开视觉语言的独立分析，不是 `vercel/vercel` 或 `vercel-labs` 官方仓库发布的 Vercel DESIGN.md。
- 另存了 Vercel 官方相邻项目 `vercel-labs/design-systems-to-agent-skills`，它用于把设计系统转成 agent skills，不是本次 Vercel DESIGN.md 的直接来源。

## 目录

```text
design-md-research/
├── README.md
├── content/
│   ├── research-brief.md
│   └── sources.json
├── input/
│   ├── awesome-design-md/
│   │   └── README.md
│   ├── google-design-md/
│   │   ├── README.md
│   │   └── spec.md
│   ├── vercel/
│   │   ├── DESIGN.md
│   │   └── README.md
│   └── vercel-labs-design-systems-to-agent-skills/
│       └── README.md
└── qa/
    └── verification.md
```

## 后续拆解入口

优先从 `input/vercel/DESIGN.md` 拆解，按以下层级展开：

1. YAML front matter：`colors`、`typography`、`rounded`、`spacing`、`components`。
2. Markdown 正文：Overview、Colors、Typography、Layout、Elevation & Depth、Shapes、Components、Do's and Don'ts。
3. 来源校验：用 `content/sources.json` 中的 upstream URL 和 commit 信息追溯。

## 验证

本轮已做文件存在、行数字节数、JSON 语法和 Google CLI lint 检查，记录见 `qa/verification.md`。`npx -y @google/design.md lint input/vercel/DESIGN.md` 结果为 0 errors、51 warnings、1 info；warning 主要来自社区文件使用了 Google alpha spec 尚未认可的扩展字段。
