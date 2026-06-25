# DESIGN.md 日常开发落地

本文说明如何把 Google 官方 DESIGN.md 模式放进日常业务项目，让 Codex 和 Cursor 都能稳定使用。

## 推荐放置位置

单项目仓库：

```text
your-project/
├── AGENTS.md
├── DESIGN.md
├── .cursor/
│   └── rules/
│       └── design-md.mdc
├── package.json
└── src/
```

多项目仓库：

```text
repo/
├── AGENTS.md
├── DESIGN.md
├── .cursor/
│   └── rules/
│       └── design-md.mdc
└── apps/
    ├── admin/
    │   └── DESIGN.md
    └── web/
        └── DESIGN.md
```

规则：根目录 `DESIGN.md` 是默认视觉事实源；如果某个子应用有独立视觉系统，就在子应用目录放更近的 `DESIGN.md`。

## Codex 接入

Codex 会读取 `AGENTS.md` 作为项目指令。为了让 Codex 在 UI 任务中使用 DESIGN.md，在项目根目录 `AGENTS.md` 增加：

```md
## UI / Design System

- Before any UI, CSS, layout, component, or frontend visual change, read `DESIGN.md`.
- Treat `DESIGN.md` as the visual design SSOT.
- Do not invent colors, typography, spacing, radius, shadows, or component styles outside `DESIGN.md`.
- If implementation needs a visual rule not covered by `DESIGN.md`, update `DESIGN.md` first, then implement.
- Run `npx -y @google/design.md lint DESIGN.md` after editing `DESIGN.md`.
```

## Cursor 接入

Cursor 项目规则放在 `.cursor/rules/`。建议新增：

```text
.cursor/rules/design-md.mdc
```

内容：

```md
---
description: Use DESIGN.md for all UI and frontend visual work
globs: **/*.{ts,tsx,js,jsx,vue,css,scss,html}
alwaysApply: true
---

Before UI, CSS, layout, component, or frontend visual changes, read the nearest `DESIGN.md`.

Follow `DESIGN.md` as the visual design source of truth:
- colors
- typography
- spacing
- radius
- shadows/elevation
- component styling
- responsive behavior

Do not invent visual styles outside `DESIGN.md`.
If a needed visual rule is missing, update `DESIGN.md` first.
```

## 使用方式

日常提需求时直接说：

```text
按 DESIGN.md 改这个页面，不要新增未定义的颜色和字号。
```

更严格的说法：

```text
先读取 DESIGN.md，列出会用到的 colors / typography / spacing / components token，再开始改 UI。
```

## 维护原则

- `DESIGN.md` 是长期事实源，不写过程草稿。
- 每次新增颜色、字号、间距、圆角、组件视觉规则，先改 `DESIGN.md`，再改代码。
- 不把 Google 官方 examples 原样放进业务项目；业务项目需要自己的 `DESIGN.md`。
- 官方资料继续保存在本调研目录的 `../official/`，业务项目只复制最终整理后的 `DESIGN.md`。
