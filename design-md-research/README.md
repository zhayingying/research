# DESIGN.md Research

本目录用于保存 Google Labs Code 官方开源仓库 `google-labs-code/design.md` 的 DESIGN.md 调研材料。

## 当前结论

- DESIGN.md 的规范源头是 Google Labs Code 开源仓库 `google-labs-code/design.md`，对应 Stitch 文档与 `@google/design.md` CLI。
- Google 官方仓库没有根目录单独命名为 `DESIGN.md` 的品牌文件；官方可拆解的 `DESIGN.md` 样例位于 `examples/*/DESIGN.md`。
- 本目录已改为只保留 Google 官方仓库快照：规范文档、理念文档、仓库包信息、3 组官方 examples。
- Vercel 社区条目已从本目录移除，不再作为本次调研目标。

## 目录

```text
design-md-research/
├── README.md
├── content/
│   ├── research-brief.md
│   └── sources.json
├── input/
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
└── qa/
    └── verification.md
```

## 后续拆解入口

优先从 Google 官方规范和官方 examples 拆解：

1. 规范：`input/google-design-md/spec.md`。
2. 仓库说明：`input/google-design-md/README.md`、`input/google-design-md/PHILOSOPHY.md`。
3. 官方样例：`input/google-design-md/examples/*/DESIGN.md`。
4. 关联产物：每个 example 的 `design_tokens.json` 和 `tailwind.config.js`。
5. 来源校验：用 `content/sources.json` 中的 upstream URL 和 commit 信息追溯。

## 验证

本轮已做文件存在、行数字节数、JSON 语法和 Google CLI lint 检查，记录见 `qa/verification.md`。3 个 Google 官方 example 的 `DESIGN.md` 均通过 `npx -y @google/design.md lint`，结果为 0 errors。
