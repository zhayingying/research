# Research Reports

作者: ziye

这个仓库用于存放调研报告项目。每个子目录对应一份独立调研，通常包含任务材料、结构化内容、最终报告和验证记录。

## 当前报告

| 目录 | 主题 | 报告入口 |
| --- | --- | --- |
| `agent-collaboration-research/` | Agent Teams / A2A / Multi-Agent 协同生态调研 | `agent-collaboration-research/dist/agent-teams-report/index.html` |
| `equity-analysis/` | 公司股权认知框架调研 | `equity-analysis/report/index.html` |

## 推荐目录结构

```text
{research-topic}/
├── README.md              # 该调研项目说明
├── content/               # 结构化问题、来源、证据台账
├── input/                 # 用户提供或可公开保存的输入材料
├── scratch/               # 可重建的过程材料
├── dist/ 或 report/        # 最终 HTML 报告
├── qa/                    # 验证记录
└── script/ 或 scripts/     # 本项目验证或生成脚本
```

## 使用方式

直接打开对应报告入口的 `index.html`。如果子目录包含 README，优先阅读子目录 README，它会说明该报告的入口、证据口径和验证命令。

## 维护规则

- 每份报告要能说明核心问题、证据来源和验证方式。
- HTML 报告要保留本地 CSS / JS / 数据文件，避免只交付不可维护的单文件。
- 视觉编码必须有图例，例如颜色、强/中/弱、chip、stars 条。
- 不把未授权截图、私密原始材料或不可公开文档直接提交进仓库。
- 删除旧报告或旧过程文件时，确认当前主报告入口仍可打开。
