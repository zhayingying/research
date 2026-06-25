# DESIGN.md Research

本目录用于保存 Google Labs Code 官方开源仓库 `google-labs-code/design.md` 的 DESIGN.md 调研材料，并把原始资料与本地拆解隔离。

## 当前结论

- DESIGN.md 的规范源头是 Google Labs Code 开源仓库 `google-labs-code/design.md`，对应 Stitch 文档与 `@google/design.md` CLI。
- Google 官方仓库没有根目录单独命名为 `DESIGN.md` 的品牌文件；官方可拆解的 `DESIGN.md` 样例位于 `examples/*/DESIGN.md`。
- `official/` 只放 Google 官方仓库拉下来的原始快照，不手工改内容。
- `analysis/` 只放我们基于官方快照整理的拆解、来源台账和验证记录。
- Vercel 社区条目已从本目录移除，不再作为本次调研目标。

## 目录

```text
design-md-research/
├── README.md
├── official/
│   └── google-design-md/
│       ├── PHILOSOPHY.md
│       ├── README.md
│       ├── examples/
│       │   ├── atmospheric-glass/
│       │   │   ├── DESIGN.md
│       │   │   ├── README.md
│       │   │   ├── design_tokens.json
│       │   │   └── tailwind.config.js
│       │   ├── paws-and-paths/
│       │   │   ├── DESIGN.md
│       │   │   ├── README.md
│       │   │   ├── design_tokens.json
│       │   │   └── tailwind.config.js
│       │   └── totality-festival/
│       │       ├── DESIGN.md
│       │       ├── README.md
│       │       ├── design_tokens.json
│       │       └── tailwind.config.js
│       ├── package.json
│       └── spec.md
└── analysis/
    ├── README.md
    ├── daily-development-usage.md
    ├── official-design-md-breakdown.md
    ├── sources.json
    └── verification.md
```

## 后续拆解入口

优先从 Google 官方规范和官方 examples 拆解：

1. 原始官方资料：`official/google-design-md/spec.md`、`official/google-design-md/examples/*/DESIGN.md`。
2. 本地拆解入口：`analysis/official-design-md-breakdown.md`。
3. 日常开发落地：`analysis/daily-development-usage.md`。
4. 来源校验：`analysis/sources.json`。
5. 验证记录：`analysis/verification.md`。

## 验证

本轮已做文件存在、行数字节数、JSON 语法和 Google CLI lint 检查，记录见 `analysis/verification.md`。3 个 Google 官方 example 的 `DESIGN.md` 均通过 `npx -y @google/design.md lint`，结果为 0 errors。
