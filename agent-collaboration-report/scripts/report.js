const reportData = {
  terms: [
    ["多智能体协作", "Multi-Agent Collaboration", "多个 agent 通过消息、状态、工具和角色分工共同完成任务。", "不等于多个聊天窗口同时运行。"],
    ["智能体团队", "Agent Teams", "由多个具备不同能力、权限和状态的 agent 组成的运行单元。", "团队存在依赖交接、共享状态和评估记录。"],
    ["智能体到智能体协议", "Agent-to-Agent Protocol, A2A", "Agent 应用之间发现能力、提交任务、交换消息和产物的协议。", "解决 agent 应用互通，不负责单个 agent 的内部推理。"],
    ["模型上下文协议", "Model Context Protocol, MCP", "让 agent 连接工具、资源、提示和外部上下文的协议。", "连接工具和数据，不描述 agent 之间如何协作。"],
    ["交接", "Handoff", "一个 agent 将任务、上下文和控制权转交给另一个 agent。", "没有 schema 的交接会放大错误上下文。"],
    ["可观测性", "Observability", "记录 trace、span、tool call、成本、延迟和失败原因。", "只看最终回答不能解释多 agent 系统。"],
    ["评估集", "Evaluation Set", "用于回放和比较 agent 版本的固定任务集合。", "LLM judge 只能作为评估对象之一。"],
    ["持久执行", "Durable Execution", "把长任务拆成可恢复步骤，支持重试、checkpoint 和人工审批。", "解决运行可靠性，不解决模型能力本身。"]
  ],
  platformCriteria: [
    ["GitHub", "star 数 + 2026 活跃时间 + 官方属性 + 是否直接承载 multi-agent / A2A / agent runtime", "Stars、pushedAt、license、language", "进入项目表；低 star 但官方 A2A SDK 保留。"],
    ["arXiv / 官方研究", "arXiv 原文 + 官方工程博客 + benchmark/系统规模数字 + 机构可信度", "年份、benchmark、系统规模、性能/成本数字", "进入论文与官方工程材料表。"],
    ["X / Twitter", "项目创始人、官方账号、长期高信号技术观察者；只作为入口，不作为事实来源", "账号链接，不使用粉丝数", "进入 builder 观察表。"],
    ["Hacker News", "Show HN / Ask HN + points + comments + 是否暴露工程痛点", "points、comments、HN item id", "进入社区信号表。"],
    ["Reddit", "主题社区 + 具体讨论帖 + 是否反复出现成本、trace、handoff、subagents 争论", "community / votes / thread date", "进入社区信号表。"],
    ["大学课程", "学校官方页面 + 课程年份 + 是否出现 agentic workflows / multi-agent systems / safety / eval", "年份、课程名、学校", "进入课程表。"],
    ["前端 / 产品", "官方 docs 或 repo + 是否显示 trace、graph、session、artifact、agent roster、eval", "repo stars 或官方文档入口", "进入前端参考表。"]
  ],
  questionMap: [
    ["Q1", "核心", "Part 2 GitHub 开源生态；Part 3 SDK 与 A2A 仓库族", "49 个 GitHub 项目、15 个 A2A 仓库、SDK / 协议关系字段", "stars 与 pushedAt 说明开源关注和活跃度，不单独证明生产成熟度。"],
    ["Q2", "核心", "Part 4 Agent Teams 运行机制与单 Agent 生命周期", "团队拓扑、能力卡、权限卡、共享状态、消息协议、trace、eval、version", "生命周期解释运行对象，不等同于具体产品落地流程。"],
    ["Q3", "关键", "Part 5 论文与官方工程材料", "arXiv、Google Research、Anthropic、OpenAI、Gemini 技术材料", "论文证明研究问题和评估边界，不能单独证明产业采用。"],
    ["Q4", "背景", "Part 6 X / Twitter 开发者入口", "项目创始人、官方开发者账号、长期技术观察者", "X 只作为入口和发布轨迹，不作为事实结论来源。"],
    ["Q5", "关键", "Part 6 社区讨论信号", "Hacker News 的 Show HN / Ask HN / 工程讨论", "HN points 和 comments 表示讨论强度，不表示技术正确性。"],
    ["Q6", "关键", "Part 6 社区讨论信号", "Reddit 主题社区与具体争论帖", "Reddit 讨论用于识别痛点，事实能力仍回到官方文档或论文。"],
    ["Q7", "背景", "Part 6 课程与学术入口", "Stanford、CMU、Berkeley、MIT、Harvard、Cornell 等课程或讲座页面", "课程页面证明学术吸收，不证明行业部署规模。"],
    ["Q8", "关键", "Part 6 前端参考对象", "AutoGen Studio、LangSmith、AgentOps、Langfuse、Phoenix、Magentic-UI、Rowboat 等", "前端对象解释界面语法，不证明某一产品是统一标准。"]
  ],
  scopeBoundaries: [
    ["地理与语言", "国外英文来源：官方文档、arXiv、GitHub、HN、Reddit、X、大学课程、产品官网", "中文社区、中文二手文章、无原始链接的转载", "用户问题明确要求国外资源；英文来源便于追溯到原始规范和论文。", "强信号"],
    ["时间范围", "2023-2026 的论文与工程材料；GitHub 活跃时间以 2026-06-03 快照为准", "长期未更新且无历史代表性的项目", "Agent Teams 生态变化快，报告保留历史代表论文，同时把活跃项目与旧框架分开。", "强信号"],
    ["项目范围", "A2A、MCP、agent SDK、multi-agent 框架、观测评估、前端控制面、领域 multi-agent 应用", "只含 chat UI、泛 AI agent 新闻、无协作或协议对象的仓库", "报告解释协同生态，不把所有 agent 项目混入同一表。", "强信号"],
    ["社区范围", "HN / Reddit 中能暴露成本、调试、协议价值、single-agent vs multi-agent 的讨论", "单条低信息量推广帖、没有技术问题的发布帖", "社区只证明开发者阻力和话题热度，事实能力回到强来源验证。", "中信号"],
    ["前端范围", "能显示 trace、graph、session、artifact、roster、eval、Agent Card 的产品或 repo", "纯营销页、无界面对象说明的官网", "前端参考只解释交互对象和界面结构，不判断商业胜出者。", "中信号"]
  ],
  methodRows: [
    ["GitHub", "repo full name、URL、stars、pushedAt、language、owner、role category、relation to core question", "高 star + 2026 活跃 + 官方属性 + 直接承载 A2A / SDK / multi-agent runtime", "产品采用率、生产可靠性、商业收入", "Part 2 项目表、Part 3 A2A 仓库族"],
    ["官方协议 / SDK", "官方 spec、官方 docs、官方 repo、官方公告", "API 对象、协议语义、SDK 边界、运行对象", "第三方采用规模和中立市场比较", "Summary、Part 3、证据映射"],
    ["arXiv / 官方研究", "原始论文、官方工程材料、年份、机构、benchmark 或系统约束", "研究问题、评估设计、机制变化、成本与风险边界", "开源生态热度和产品份额", "Part 5 时间轴与论文表"],
    ["Hacker News", "item id、points、comments、讨论主题、是否链接主来源", "开发者摩擦、协议价值争论、持久执行和调试痛点", "技术事实和 benchmark 正确性", "Part 6 社区信号表、争论主题卡"],
    ["Reddit", "community、votes / thread、主题、是否出现重复争论", "成本、debugging、subagents、single-agent vs multi-agent 的真实阻力", "产品能力与市场规模", "Part 6 社区信号表"],
    ["X / Twitter", "创始人、官方账号、项目账号、长期技术观察者", "builder 入口、发布轨迹、生态线索", "事实结论、数字估计、技术可靠性", "Part 6 X / Twitter 账号表"],
    ["大学课程", "学校官方页面、课程年份、覆盖主题", "学术吸收速度、课程化主题、研究训练方向", "行业采用和产品成熟度", "Part 6 课程表"],
    ["前端 / 产品官网", "官方 docs、repo、产品页面、界面对象", "trace、graph、artifact、session、roster、eval 等交互对象", "统一 UI 标准和商业优劣", "Part 6 前端参考表"]
  ],
  dataDictionary: [
    ["Stars", "GitHub 项目表、A2A 仓库族", "仓库 star 数，表示公开关注度", "GitHub 仓库或 gh CLI 查询快照；数据截止 2026-06-03", "不等于项目成熟度或生产使用量。"],
    ["活跃时间", "GitHub 项目表、A2A 仓库族", "仓库最近 pushedAt 或公开活动时间", "GitHub 仓库元数据；数据截止 2026-06-03", "只能说明近期维护迹象，不说明维护质量。"],
    ["points / comments / votes", "社区讨论信号表", "HN points/comments 或 Reddit votes/thread 标记", "HN Algolia、Reddit 公开页面", "只表示讨论强度，不证明事实正确。"],
    ["年份", "论文表、课程表", "论文发布年、官方材料年份、课程开设时间", "arXiv、官方工程博客、学校课程页面", "未来课程可能变更，需按页面日期理解。"],
    ["报告样本数", "顶部指标", "本报告收录的项目、论文、社区、课程、来源数量", "内部计数，由 reportData 数组生成", "表示报告覆盖量，不表示互联网全量。"],
    ["证据等级", "Summary、信号解读、证据映射", "强信号 / 中信号 / 弱信号 / 噪声排除", "本报告证据分级规则", "用于解释可信度，不是外部排名。"]
  ],
  pipeline: [
    ["1. 问题拆解", "用户 8 个问题、输出格式、国外来源约束", "生成主问题、子问题、问题到章节映射、范围与排除", "研究问题地图", "8 个问题均有报告位置和回答边界。"],
    ["2. 数据源与工具/API 计划", "GitHub、arXiv、官方 docs、HN、Reddit、X、课程、产品页", "为每个平台定义工具/API、纳入口径、不能证明的内容", "平台采集表与字段口径", "每类平台都有证据强度和数据去向。"],
    ["3. 原始证据采集", "repo、paper、docs、thread、course、product URL", "抓取或整理 stars、pushedAt、年份、points、comments、source URL", "项目表、论文表、社区表、课程表、前端表", "外部数字保留来源或采集日期。"],
    ["4. 证据分级", "原始证据表", "按强信号、中信号、弱信号、噪声排除区分来源用途", "判断等级表、高价值信号解读", "弱信号不单独支撑发现。"],
    ["5. 横向比较", "生态层、项目类别、协议/SDK、运行对象", "按生态角色、机制价值、缺口、边界比较", "横向比较表、生态分层表、协议边界表", "不按 star 排名直接生成结论。"],
    ["6. 发现合成", "比较结果、证据等级、反向边界", "把发现映射到决定性证据、支撑证据、机制证明、边界", "发现-证据映射", "Summary 每条发现都有证据链。"],
    ["7. HTML 交付", "报告内容、CSS、JS、交互需求", "生成可导航、可筛选、语义色标的 HTML/CSS/JS 包", "index.html、report.css、report.js", "无不等高双栏、无图片、无禁用表述。"],
    ["8. 验证与通知", "最终源码包", "运行结构校验、JS 语法、禁词扫描、headless Chrome 渲染交互检查", "当前线程回传验证结果", "交付路径和未验证边界在最终回复中说明。"]
  ],
  delivery: [
    ["HTML 主报告", "/Users/zhayingying/Desktop/code/github_code/research/agent-collaboration-report/agent-collaboration-report/index.html", "可打开的 Agent Teams 协同生态 HTML 报告", "结构校验通过；Chrome 渲染交互通过", "本地文件交付，不代表外部发布。"],
    ["样式文件", "/Users/zhayingying/Desktop/code/github_code/research/agent-collaboration-report/agent-collaboration-report/styles/report.css", "报告布局、语义色标、表格、导航、响应式样式", "CSS 被 render-check 读取并应用", "未生成独立设计系统包。"],
    ["交互脚本", "/Users/zhayingying/Desktop/code/github_code/research/agent-collaboration-report/agent-collaboration-report/scripts/report.js", "数据对象、表格渲染、筛选、信号点击、密度切换", "node --check 通过；交互检查通过", "数据为本报告快照。"],
    ["验证脚本", "/Users/zhayingying/Desktop/code/github_code/research/agent-collaboration-report/render-check.cjs", "Playwright/headless Chrome 结构与交互检查", "最终目录执行通过", "依赖本机 Chrome 和 Playwright runtime。"],
    ["通知渠道", "当前 Codex 线程", "回传改动摘要、路径、验证结果、剩余边界", "已在对话中交付", "未配置邮件、微信、Slack 或外部通知。"]
  ],
  executiveFindings: [
    ["互通协议正在从框架能力中独立出来", "A2A 主仓库、A2A Python/JS/Java/Go/.NET SDK、Linux Foundation 项目共同构成协议层信号。", "强信号", "Agent Teams 生态正在形成跨应用边界，而不是只停留在单框架内协作。"],
    ["运行层由官方 SDK 和图框架共同承载", "OpenAI Agents SDK、Claude Agent SDK、Google ADK 与 LangGraph、AutoGen、CrewAI 同时活跃。", "强信号", "SDK 处理单 agent 运行对象，框架处理团队拓扑和状态流。"],
    ["高 star 项目需要按生态角色拆解", "browser-use、TradingAgents、Rowboat 等仓库 star 高，但生态角色分别是 browser agent、领域应用和前端产品。", "中信号", "GitHub 热度只能说明开发者关注度，不能直接等同于 Agent Teams 成熟度。"],
    ["学术研究从构建转向评估和边界", "2023 年集中在 CAMEL、AutoGen、MetaGPT；2025-2026 年出现 scaling、privacy、single-agent 对照和 creativity benchmark。", "强信号", "研究问题已经从“能否编排”转向“何时有效、成本如何变化、风险如何暴露”。"],
    ["社区噪声背后有稳定争论主题", "HN 与 Reddit 反复出现 token burn、durable execution、single-agent vs multi-agent、debugging、A2A 价值。", "中信号", "社区不能单独证明技术方向，但能暴露开发者真实阻力。"]
  ],
  findingEvidenceMap: [
    ["互通协议正在从框架能力中独立出来", "强信号", "A2A official specification、a2aproject/A2A、Linux Foundation A2A announcement", "A2A Python/JS/Java/Go/.NET SDK、Awesome-A2A、A2A Editor", "Agent Card、task、message、artifact 形成跨应用通信对象", "A2A 仍处于早期生态扩展阶段，样例和目录价值高于成熟市场证据。", "https://a2a-protocol.org/latest/specification/"],
    ["运行层由官方 SDK 和图框架共同承载", "强信号", "OpenAI Agents SDK、Claude Agent SDK、Google ADK、LangGraph multi-agent docs", "AutoGen、CrewAI、Microsoft Agent Framework、PydanticAI、smolagents", "SDK 处理 model/tool/handoff/guardrail/trace，框架处理 state graph 和团队拓扑", "不同 SDK 与框架之间仍需要协议或适配层才能跨边界互通。", "https://platform.openai.com/docs/guides/agents-sdk/"],
    ["高 star 项目需要按生态角色拆解", "中信号", "GitHub 项目表中的 stars、pushedAt、language、category、relation 字段", "browser-use、TradingAgents、Rowboat、Langfuse、Phoenix 等相邻项目", "同为 agent 项目，但分别承载 browser agent、领域应用、观测、控制面和框架", "stars 是关注度信号，不代表项目一定具备完整 Agent Teams 运行对象。", "https://github.com/langchain-ai/langchain"],
    ["学术研究从构建转向评估和边界", "强信号", "CAMEL、AutoGen、MetaGPT、Magentic-One、MultiAgentBench、Scaling Agent Systems、MAGPIE", "Anthropic / OpenAI / Gemini official engineering or technical reports", "研究主题从角色协作和软件团队扩展到 benchmark、成本、安全、隐私和 single-agent 对照", "论文和官方材料证明研究问题变化，不证明产业采用规模。", "https://arxiv.org/"],
    ["社区噪声背后有稳定争论主题", "中信号", "HN AgentKit、Temporal + OpenAI Agents SDK、Anthropic multi-agent system threads", "Reddit r/ClaudeCode、r/AI_Agents、r/LangChain、r/modelcontextprotocol", "社区反复围绕 token burn、durable execution、debugging、A2A 价值和 single-agent 对照", "社区讨论不能单独证明技术能力，只用于暴露开发者阻力。", "https://news.ycombinator.com/item?id=43426164"]
  ],
  limitations: [
    ["覆盖完整性", "高影响", "互联网全量无法被单份报告完全覆盖；报告使用高 star、官方属性、活跃度和强来源筛选样本。", "影响 GitHub 长尾项目、低 star 新协议实现、未公开项目。", "用平台纳入口径和来源表标明样本边界。"],
    ["数字时效", "高影响", "stars、pushedAt、HN points、课程时间会变化。", "影响项目热度排序、活跃判断和课程状态。", "所有时间敏感数字按 2026-06-03 或来源页面日期解释。"],
    ["社区偏差", "中影响", "HN / Reddit 代表开发者讨论，不代表整体用户群体。", "影响社区痛点和热度解释。", "社区只作为中信号或弱信号，不单独支撑核心发现。"],
    ["X / Twitter 证据强度", "中影响", "X 账号能提供 builder 入口和发布轨迹，但不稳定且难以复现完整讨论。", "影响开发者列表的完整性。", "X 表只作为入口索引，不进入强事实判断。"],
    ["论文到生产的距离", "中影响", "论文 benchmark 和官方工程材料说明机制与边界，不等于商业产品部署。", "影响对成熟度和可用性的外推。", "论文结论只用于解释研究趋势和机制变化。"],
    ["前端参考非标准", "线索影响", "Agent Teams 前端对象尚未形成统一界面语法。", "影响前端样式参考的归纳稳定性。", "前端表按 trace、graph、session、artifact、roster、eval 等对象拆解。"]
  ],
  horizontalComparison: [
    ["A2A", "跨 agent 应用互通", "官方协议、官方 SDK、Linux Foundation", "跨应用发现、任务通信、产物交换", "早期生态仍依赖样例和目录扩展", "强"],
    ["MCP", "工具与上下文连接", "官方规范、工具生态、开发者社区", "把 tool、resource、prompt 接入 agent", "不描述 agent 间任务生命周期", "强"],
    ["OpenAI / Claude / Google SDK", "单 agent 运行", "官方文档、SDK 仓库、平台能力", "handoff、tools、guardrails、trace", "跨框架互通仍依赖外部协议或适配", "强"],
    ["LangGraph / AutoGen / CrewAI", "框架内团队编排", "高 star、活跃更新、教程和案例", "状态图、角色、消息流、supervisor-worker", "开放互通边界弱于协议层", "强"],
    ["Langfuse / AgentOps / Phoenix", "观测与评估", "trace、eval、dataset、cost、latency", "把失败和版本差异变成可回放事件", "不决定 agent 拓扑和协议互通", "中"],
    ["Rowboat / Magentic-UI / Mission Control", "前端控制面", "agent roster、task、artifact、session、graph", "把团队状态和运行轨迹显示出来", "产品形态差异大，尚未形成统一界面语法", "中"]
  ],
  signalGrades: [
    ["强信号", "官方协议、官方 SDK、顶级论文、原始 benchmark、持续活跃高 star 仓库", "可直接支撑报告判断", "A2A、OpenAI Agents SDK、Google ADK、Anthropic engineering notes、arXiv 原文"],
    ["中信号", "高 star 项目、长期维护框架、课程页面、重复出现的社区争论", "用于解释生态热度和开发者阻力", "LangGraph、AutoGen、CrewAI、Stanford/CMU 课程、HN/Reddit 多次讨论"],
    ["弱信号", "单个帖子、低评论 HN thread、低 star 实验仓库、X 账号入口", "只作为线索入口", "Ask HN 单帖、个人 A2A 实验、单个 builder 账号"],
    ["噪声排除", "只出现 AI agent 名称但没有 multi-agent、A2A、trace、eval、handoff 或 SDK 关系", "不进入核心判断", "纯营销页、泛 AI 新闻、无来源数字的二手列表"]
  ],
  highValueSignals: [
    {
      id: "a2a",
      title: "A2A 协议",
      category: "协议互通层",
      grade: "强信号",
      flow: "Agent Card -> Task -> Message -> Artifact",
      why: "A2A 把 agent 应用之间的能力发现、任务提交、消息交换和产物返回抽成协议对象。",
      compare: "它和 MCP 的边界不同：A2A 处理 agent 应用互通，MCP 处理工具和上下文连接。",
      evidence: "官方 spec、a2aproject 主仓库、Python/JS/Java/Go/.NET SDK 与 Linux Foundation 项目信号同时存在。",
      meaning: "这说明 Agent Teams 生态的互通层正在从框架内部能力中独立出来。",
      sourceLabel: "A2A specification",
      sourceUrl: "https://a2a-protocol.org/latest/specification/"
    },
    {
      id: "openai-sdk",
      title: "OpenAI Agents SDK",
      category: "官方运行 SDK",
      grade: "强信号",
      flow: "Model -> Tool -> Handoff -> Guardrail -> Trace",
      why: "OpenAI Agents SDK 将 agent 运行拆成模型、工具、交接、护栏和追踪对象。",
      compare: "它不是 A2A 这种跨应用协议，而是单 agent 和 agent workflow 的运行入口。",
      evidence: "OpenAI 官方文档、Python SDK、JS SDK 和 agents guide 同时出现。",
      meaning: "官方 SDK 把 agent 从 prompt 技巧推进到可追踪运行结构。",
      sourceLabel: "OpenAI Agents SDK",
      sourceUrl: "https://platform.openai.com/docs/guides/agents-sdk/"
    },
    {
      id: "langgraph",
      title: "LangGraph 多 Agent 状态图",
      category: "框架内编排",
      grade: "强信号",
      flow: "Node -> Edge -> State -> Supervisor -> Handoff",
      why: "LangGraph 把多 agent 协作表示为状态图，强调节点、边、状态和控制流。",
      compare: "和官方 SDK 相比，它更像框架内团队拓扑；和 A2A 相比，它不负责跨应用 agent 发现。",
      evidence: "LangGraph 文档、LangChain 生态和 LangSmith trace/eval 形成同一技术栈。",
      meaning: "多 agent 的关键不只是多个角色，而是状态流和交接流可被记录。",
      sourceLabel: "LangGraph multi-agent concepts",
      sourceUrl: "https://langchain-ai.github.io/langgraph/concepts/multi_agent/"
    },
    {
      id: "anthropic-research",
      title: "Anthropic 多智能体研究系统",
      category: "官方工程材料",
      grade: "强信号",
      flow: "Lead Agent -> Subagents -> Search -> Synthesis -> Trace",
      why: "Anthropic 的工程材料把 orchestrator-worker、subagents、覆盖率和 token 成本放在同一个系统里讨论。",
      compare: "这类材料不是开源框架说明，而是生产型多 agent 系统的成本和失败边界说明。",
      evidence: "Anthropic engineering note 与社区围绕 15x token burn 的讨论共同形成证据链。",
      meaning: "多 agent 系统的收益和成本同时扩大，分析不能只看任务完成率。",
      sourceLabel: "Anthropic engineering note",
      sourceUrl: "https://www.anthropic.com/engineering/multi-agent-research-system"
    },
    {
      id: "google-adk",
      title: "Google ADK 与 A2A 边界",
      category: "官方 SDK / 协议组合",
      grade: "强信号",
      flow: "ADK Runtime -> Agent -> Tool -> A2A Interop",
      why: "Google ADK 负责 agent 构建和运行，A2A 负责跨 agent 应用通信。",
      compare: "这组信号最清楚地区分了 SDK runtime 和 interoperability protocol。",
      evidence: "Google ADK multi-agent docs 与 a2aproject/A2A 同时活跃。",
      meaning: "官方生态把“运行 agent”和“agent 间互通”拆成两层，而不是放进一个框架里。",
      sourceLabel: "Google ADK multi-agent docs",
      sourceUrl: "https://google.github.io/adk-docs/agents/multi-agents/"
    },
    {
      id: "observability",
      title: "Langfuse / AgentOps / Phoenix",
      category: "观测与评估",
      grade: "中信号",
      flow: "Trace -> Span -> Eval -> Dataset -> Version",
      why: "这些项目把 LLM call、tool call、成本、延迟、数据集和评估结果放到同一解释层。",
      compare: "观测层不决定 agent 拓扑，但它决定失败能否被定位和回放。",
      evidence: "Langfuse、AgentOps、Phoenix、RagaAI Catalyst 都围绕 trace/eval/dataset 建立产品对象。",
      meaning: "Agent Teams 成熟度的关键不是界面有多少 agent，而是运行证据是否可复盘。",
      sourceLabel: "AgentOps tracking agents",
      sourceUrl: "https://docs.agentops.ai/v2/usage/tracking-agents"
    },
    {
      id: "courses",
      title: "Stanford / CMU 课程吸收",
      category: "学术吸收信号",
      grade: "中信号",
      flow: "LLM Apps -> Agentic Workflows -> Multi-Agent Systems -> Eval",
      why: "大学课程把 agentic workflows、multi-agent systems、safety、eval 放入课程结构。",
      compare: "课程不是产品采用证据，但能说明研究和工程训练开始固定化。",
      evidence: "Stanford CS224G、CS329A、CMU AI Agents、Berkeley Advanced LLM Agents 等页面都进入样本。",
      meaning: "Agent Teams 已经从社区项目进入 LLM 应用工程和评估教育体系。",
      sourceLabel: "Stanford CS224G",
      sourceUrl: "https://web.stanford.edu/class/cs224g/"
    },
    {
      id: "community-debate",
      title: "HN / Reddit 争论主题",
      category: "开发者阻力信号",
      grade: "中信号",
      flow: "Cost -> Recovery -> Debugging -> Protocol Value -> Single vs Multi",
      why: "社区讨论反复围绕 token burn、durable execution、debugging、A2A 价值和 single-agent 对照。",
      compare: "社区不是事实源，但能暴露开发者在生产化时遇到的阻力。",
      evidence: "HN AgentKit、Temporal + OpenAI Agents SDK、Reddit single-agent vs multi-agent 讨论共同出现。",
      meaning: "生态瓶颈已经从“能否调度 agent”转向成本、恢复、调试和边界解释。",
      sourceLabel: "HN AgentKit discussion",
      sourceUrl: "https://news.ycombinator.com/item?id=43426164"
    }
  ],
  coreInsights: [
    ["互通层和运行层已经分离", "A2A 处理 Agent Card、task、message、artifact；MCP 处理 tool、resource、prompt；SDK 处理 handoff、guardrail、trace。", "Agent Teams 生态不是单一框架竞争，而是协议、运行和观测的分层组合。"],
    ["高 star 不等于团队成熟度", "browser-use、TradingAgents、Rowboat 等项目活跃，但并非都承载跨 agent 团队运行。", "GitHub 表需要区分协议、SDK、编排框架、应用和前端控制台。"],
    ["team 的关键对象是失败归因", "Anthropic、OpenAI、AgentOps、Langfuse、Phoenix 等材料都把 trace、eval、handoff、version 放到运行解释里。", "多 agent 系统的核心不是 agent 数量，而是每个失败能被定位到状态、权限、工具或交接。"],
    ["社区争论集中在可控性", "HN 和 Reddit 信号集中在 token burn、single-agent vs multi-agent、durable execution、debugging。", "开发者关注点已经从能否编排转向成本、恢复、观测和边界。"]
  ],
  ecosystemLayers: [
    ["协议互通层", "A2A、MCP", "官方规范、官方 SDK、Linux Foundation 项目", "解决跨应用能力发现、任务通信和工具上下文连接。"],
    ["运行 SDK 层", "OpenAI Agents SDK、Claude Agent SDK、Google ADK", "官方文档、官方仓库、开发者入口", "解决单 agent 的模型、工具、交接、护栏和 trace。"],
    ["编排框架层", "LangGraph、AutoGen、CrewAI、CAMEL、AgentScope", "高 star、持续更新、文档和案例", "解决框架内部多 agent 拓扑、消息流和状态图。"],
    ["观测评估层", "Langfuse、AgentOps、Phoenix、RagaAI Catalyst", "trace、eval、dataset、cost、latency 功能", "把运行过程变成可回放事件和版本比较对象。"],
    ["前端控制层", "Magentic-UI、Rowboat、Mission Control、Open Multi-Agent Canvas", "agent roster、session、artifact、task、graph UI", "把团队状态、交接、产物和失败节点显示给用户。"],
    ["领域应用层", "TradingAgents、ChatDev、PentestGPT、Agent-S", "领域任务、专门工具、样例密度", "验证多 agent 结构在软件、金融、安全和 computer-use 中的实际边界。"]
  ],
  boundaryComparison: [
    ["A2A", "Agent 应用之间如何发现能力、提交任务和交换产物。", "Agent Card、task、message、artifact", "不负责单 agent 内部推理、工具调用和状态图。", "https://a2a-protocol.org/latest/specification/"],
    ["MCP", "Agent 如何连接外部工具、资源、提示和上下文。", "tool、resource、prompt、server/client", "不描述 agent 应用之间的任务生命周期。", "https://modelcontextprotocol.io/introduction"],
    ["Agent SDK", "单 agent 如何运行、交接、追踪和防护。", "model、tool、handoff、guardrail、trace", "不天然解决跨组织、跨应用 agent 发现。", "https://platform.openai.com/docs/guides/agents-sdk/"],
    ["编排框架", "框架内部如何组织 supervisor、worker、peer handoff 和 state graph。", "node、edge、state、role、message", "不等同于开放协议，跨框架互通需要额外边界。", "https://langchain-ai.github.io/langgraph/concepts/multi_agent/"],
    ["观测评估", "运行后如何解释成本、延迟、失败和版本差异。", "trace、span、eval、dataset、version", "不决定 agent 拓扑，只解释运行结果。", "https://docs.agentops.ai/v2/usage/tracking-agents"]
  ],
  runtimeInsights: [
    ["拓扑不是角色名", "supervisor、worker、peer handoff、plan-execute 描述控制权如何流动。", "只写角色不会解释交接失败和上下文归属。"],
    ["Trace 是失败分析对象", "LLM call、tool call、handoff、cost、latency 需要出现在同一运行轨迹里。", "只看最终回答会隐藏中间错误。"],
    ["Eval 是版本比较对象", "固定任务集和历史轨迹用于比较 prompt、tool schema、route、memory。", "没有评估回放时，改动无法归因。"],
    ["权限是副作用边界", "shell、browser、API、data access 需要和 agent 能力分开记录。", "共享权限会把单点错误扩散成外部副作用。"]
  ],
  researchTimeline: [
    ["2023", "角色协作与社会模拟", "CAMEL、Generative Agents、ChatDev、MetaGPT、AutoGen", "研究重点是角色、通信、模拟社会和软件团队流程。"],
    ["2024", "通用系统与综述", "LLM-based Multi-Agents survey、Magentic-One", "研究问题转向通用任务求解、orchestrator-worker 和复杂任务编排。"],
    ["2025", "评估、扩展与安全", "MultiAgentBench、Scaling Agent Systems、MAGPIE、Anthropic/OpenAI official notes", "研究重点从构建系统转向何时有效、成本如何变化、隐私和安全如何暴露。"],
    ["2026", "单 Agent 对照与长期场景", "Single-Agent with Skills、Creativity benchmark、AgentSchool", "研究开始比较多 agent 与可组合 single-agent skills，并进入教育和创造力长期任务。"]
  ],
  debateThemes: [
    ["成本与 token burn", "Anthropic multi-agent system、Reddit ClaudeCode thread", "多 subagents 扩大覆盖率，也放大 token 和延迟。"],
    ["单 Agent vs 多 Agent", "Google scaling paper、Reddit single-agent discussion", "更多 agent 不自动提升结果，任务分解质量和工具使用决定收益。"],
    ["协议价值", "HN A2A threads、Awesome-A2A", "开发者关心 A2A 是否能带来真实跨应用互通，而不是另一个框架接口。"],
    ["持久执行", "Temporal + OpenAI Agents SDK HN threads", "长任务、恢复、人工介入和 crash recovery 成为生产化焦点。"],
    ["观测与调试", "r/LangChain、AgentOps、Langfuse、Phoenix", "多 agent 的调试对象从 prompt 变成 trace、span、dataset 和 eval。"]
  ],
  projects: [
    ["langchain-ai/langchain", "https://github.com/langchain-ai/langchain", 138354, "2026-06-02", "Python", "通用 agent 平台", "Agent engineering platform；LangGraph / LangSmith 生态入口"],
    ["browser-use/browser-use", "https://github.com/browser-use/browser-use", 96822, "2026-06-01", "Python", "浏览器 agent", "网站自动化 agent；非 team 框架，但前端操作层价值高"],
    ["TauricResearch/TradingAgents", "https://github.com/TauricResearch/TradingAgents", 82354, "2026-06-01", "Python", "领域 multi-agent", "金融交易 multi-agent 应用，非通用框架"],
    ["FoundationAgents/MetaGPT", "https://github.com/FoundationAgents/MetaGPT", 68481, "2026-01-21", "Python", "协作框架", "自有多 Agent SOP 框架"],
    ["earendil-works/pi", "https://github.com/earendil-works/pi", 58908, "2026-06-02", "TypeScript", "开发者入口", "Pi toolkit / coding agent runtime"],
    ["microsoft/autogen", "https://github.com/microsoft/autogen", 58639, "2026-04-15", "Python", "协作框架", "Microsoft multi-agent conversation framework"],
    ["crewAIInc/crewAI", "https://github.com/crewAIInc/crewAI", 52666, "2026-06-02", "Python", "协作框架", "自有 crews / flows 框架"],
    ["run-llama/llama_index", "https://github.com/run-llama/llama_index", 49864, "2026-05-29", "Python", "文档 agent 平台", "document agent / workflow 平台，支持 agentic workflows"],
    ["zhayujie/CowAgent", "https://github.com/zhayujie/CowAgent", 45032, "2026-06-02", "Python", "agent harness", "multi-model / multi-channel agent harness"],
    ["agno-agi/agno", "https://github.com/agno-agi/agno", 40466, "2026-06-02", "Python", "平台框架", "自有 agent platform"],
    ["wshobson/agents", "https://github.com/wshobson/agents", 36281, "2026-06-02", "Python", "开发者入口", "Claude Code / Codex CLI / Cursor / Gemini CLI compatible"],
    ["Yeachan-Heo/oh-my-claudecode", "https://github.com/Yeachan-Heo/oh-my-claudecode", 35627, "2026-06-02", "TypeScript", "开发者入口", "Claude Code adjacent"],
    ["langchain-ai/langgraph", "https://github.com/langchain-ai/langgraph", 33651, "2026-06-02", "Python", "图运行框架", "LangGraph state graph runtime"],
    ["OpenBMB/ChatDev", "https://github.com/OpenBMB/ChatDev", 33298, "2026-05-27", "Python", "协作框架", "虚拟软件公司 multi-agent workflow"],
    ["langfuse/langfuse", "https://github.com/langfuse/langfuse", 28396, "2026-06-03", "TypeScript", "可观测平台", "LLM observability / evals / datasets / prompt management"],
    ["microsoft/semantic-kernel", "https://github.com/microsoft/semantic-kernel", 28032, "2026-05-29", "C#", "企业运行栈", "Microsoft Semantic Kernel"],
    ["huggingface/smolagents", "https://github.com/huggingface/smolagents", 27670, "2026-06-02", "Python", "轻量 agent SDK", "code-agent library；非 A2A，但 agent SDK 信号强"],
    ["openai/openai-agents-python", "https://github.com/openai/openai-agents-python", 26861, "2026-05-31", "Python", "官方 SDK", "OpenAI Agents SDK"],
    ["agentscope-ai/agentscope", "https://github.com/agentscope-ai/agentscope", 26023, "2026-06-01", "Python", "协作框架", "自有可观测 agent framework"],
    ["a2aproject/A2A", "https://github.com/a2aproject/A2A", 24104, "2026-06-02", "Spec / Shell", "协议", "A2A protocol"],
    ["NirDiamant/GenAI_Agents", "https://github.com/NirDiamant/GenAI_Agents", 22331, "2026-05-31", "Jupyter Notebook", "教程/实现集合", "50+ agent 技术实现，信号来自教育与样例密度"],
    ["openai/swarm", "https://github.com/openai/swarm", 21562, "2026-04-15", "Python", "历史/教育框架", "OpenAI Solution team educational multi-agent orchestration"],
    ["camel-ai/owl", "https://github.com/camel-ai/owl", 19821, "2026-05-15", "Python", "通用 multi-agent", "Optimized Workforce Learning；CAMEL 生态"],
    ["google/adk-python", "https://github.com/google/adk-python", 19960, "2026-06-01", "Python", "官方 SDK", "Google Agent Development Kit"],
    ["pydantic/pydantic-ai", "https://github.com/pydantic/pydantic-ai", 17478, "2026-06-03", "Python", "agent SDK", "Pydantic 风格 agent framework"],
    ["camel-ai/camel", "https://github.com/camel-ai/camel", 17109, "2026-06-02", "Python", "协作框架", "CAMEL communicative agents framework"],
    ["QwenLM/Qwen-Agent", "https://github.com/QwenLM/Qwen-Agent", 16454, "2026-03-04", "Python", "模型厂商 agent SDK", "Qwen function calling / MCP / code interpreter agent framework"],
    ["raga-ai-hub/RagaAI-Catalyst", "https://github.com/raga-ai-hub/RagaAI-Catalyst", 16174, "2026-02-11", "Python", "可观测平台", "agent / LLM / tool tracing，multi-agent debugging"],
    ["gastownhall/gastown", "https://github.com/gastownhall/gastown", 15708, "2026-06-01", "Go", "开发者入口", "multi-agent workspace manager"],
    ["rowboatlabs/rowboat", "https://github.com/rowboatlabs/rowboat", 14845, "2026-06-01", "TypeScript", "前端产品", "AI coworker with memory"],
    ["GreyDGL/PentestGPT", "https://github.com/GreyDGL/PentestGPT", 13445, "2026-02-23", "Python", "领域 agent", "automated pentesting agentic framework"],
    ["simular-ai/Agent-S", "https://github.com/simular-ai/Agent-S", 11748, "2026-05-13", "Python", "computer-use agent", "open agentic framework that uses computers"],
    ["microsoft/agent-framework", "https://github.com/microsoft/agent-framework", 10974, "2026-06-03", "Python / .NET", "企业运行栈", "Microsoft Agent Framework"],
    ["livekit/agents", "https://github.com/livekit/agents", 10783, "2026-06-03", "Python", "实时 voice agent SDK", "voice AI agents；team 关系弱但 agent SDK 活跃"],
    ["aden-hive/hive", "https://github.com/aden-hive/hive", 10481, "2026-05-29", "Python", "生产 harness", "Multi-Agent Harness for Production AI"],
    ["microsoft/magentic-ui", "https://github.com/microsoft/magentic-ui", 9885, "2026-05-28", "Python", "前端/实验 agent", "browser + local file system experimental agent"],
    ["Arize-ai/phoenix", "https://github.com/Arize-ai/phoenix", 9971, "2026-06-03", "Python", "可观测平台", "AI observability & evaluation"],
    ["OpenPipe/ART", "https://github.com/OpenPipe/ART", 9886, "2026-06-03", "Python", "训练/演进", "Agent Reinforcement Trainer；训练 multi-step agents"],
    ["VoltAgent/voltagent", "https://github.com/VoltAgent/voltagent", 9324, "2026-05-31", "TypeScript", "agent framework", "TypeScript AI agent framework / engineering platform"],
    ["github/copilot-sdk", "https://github.com/github/copilot-sdk", 8767, "2026-06-03", "Java", "官方 SDK", "GitHub Copilot Agent integration SDK"],
    ["kyegomez/swarms", "https://github.com/kyegomez/swarms", 6789, "2026-06-02", "Python", "协作框架", "multi-agent orchestration framework"],
    ["open-multi-agent/open-multi-agent", "https://github.com/open-multi-agent/open-multi-agent", 6306, "2026-06-02", "TypeScript", "协作框架", "goal-to-task DAG TypeScript-native multi-agent orchestration"],
    ["builderz-labs/mission-control", "https://github.com/builderz-labs/mission-control", 5146, "2026-06-02", "TypeScript", "前端/控制台", "self-hosted AI agent orchestration platform"],
    ["openai/openai-agents-js", "https://github.com/openai/openai-agents-js", 3161, "2026-06-01", "TypeScript", "官方 SDK", "OpenAI Agents SDK JS"],
    ["AgentOps-AI/agentops", "https://github.com/AgentOps-AI/agentops", 5591, "2026-03-19", "Python", "可观测平台", "agent monitoring / cost tracking / benchmarking"],
    ["codeany-ai/open-agent-sdk-typescript", "https://github.com/codeany-ai/open-agent-sdk-typescript", 2688, "2026-04-03", "TypeScript", "Claude SDK 替代", "open-source alternative to Claude Agent SDK"],
    ["NVIDIA/NeMo-Agent-Toolkit", "https://github.com/NVIDIA/NeMo-Agent-Toolkit", 2365, "2026-06-01", "Python", "企业 agent toolkit", "teams of AI agents connection / optimization"],
    ["a2aproject/a2a-python", "https://github.com/a2aproject/a2a-python", 1947, "2026-06-02", "Python", "A2A SDK", "official Python SDK for A2A"],
    ["a2aproject/a2a-samples", "https://github.com/a2aproject/a2a-samples", 1612, "2026-05-21", "Jupyter Notebook", "A2A samples", "official samples using A2A protocol"]
  ],
  protocols: [
    ["协议互通层", "Interoperability Protocol", "Agent Card、task、message、artifact", "A2A 描述 agent 应用之间的能力发现和任务通信。", "https://a2a-protocol.org/latest/specification/"],
    ["工具上下文层", "Tool / Context Protocol", "tool、resource、prompt、server/client", "MCP 描述 agent 如何连接外部工具和上下文。", "https://modelcontextprotocol.io/introduction"],
    ["运行 SDK 层", "Agent SDK Runtime", "model、tool、handoff、guardrail、trace", "OpenAI、Anthropic、Google 的 SDK 描述 agent 内部运行对象。", "https://platform.openai.com/docs/guides/agents-sdk/"],
    ["状态图层", "State Graph Runtime", "node、edge、state、supervisor、handoff", "LangGraph 将 agent 控制流表示为可追踪状态图。", "https://langchain-ai.github.io/langgraph/concepts/multi_agent/"],
    ["可观测层", "Observability Layer", "trace、span、eval、cost、latency", "多 agent 运行需要把每一步变成可审计事件。", "https://docs.agentops.ai/v2/usage/tracking-agents"],
    ["持久执行层", "Durable Execution Layer", "queue、worker、checkpoint、retry", "长任务和人工审批通过持久执行框架恢复。", "https://temporal.io/blog/announcing-openai-agents-sdk-integration"]
  ],
  sdkClasses: [
    ["OpenAI Agents SDK", "直接基于", "openai/openai-agents-python、openai/openai-agents-js", "官方 SDK 提供 handoff、tools、guardrails、tracing。", "https://platform.openai.com/docs/guides/agents-sdk/"],
    ["Claude Agent SDK / Claude Code", "直接 / 邻近", "Claude Agent SDK、oh-my-claudecode、open-agent-sdk-typescript", "Claude Agent SDK 是 Anthropic 官方 agent 构建入口；Claude Code 项目偏 coding-agent 团队化。", "https://docs.anthropic.com/en/docs/claude-agent-sdk/overview"],
    ["Codex CLI", "兼容入口", "wshobson/agents", "当前高 star 信号主要是 Codex CLI harness/plugin 兼容，而不是独立 Codex 多 agent SDK。", "https://github.com/wshobson/agents"],
    ["Pi toolkit", "自有运行时", "earendil-works/pi、dimetron/pi-go", "Pi 是 coding-agent toolkit/runtime；A2A 相关 Pi 项目数量少、star 低。", "https://github.com/earendil-works/pi"],
    ["Google ADK / A2A", "官方 SDK / 协议", "google/adk-python、a2aproject/A2A", "ADK 负责构建与运行；A2A 负责跨 agent 应用通信。", "https://google.github.io/adk-docs/agents/multi-agents/"],
    ["Other frameworks", "自有框架", "LangGraph、AutoGen、CrewAI、Agno、AgentScope、CAMEL", "主流开源框架多数不基于 Claude/OpenAI/Pi SDK，而是接入多模型 provider。", "https://microsoft.github.io/autogen/"]
  ],
  a2aRepos: [
    ["a2aproject/A2A", "https://github.com/a2aproject/A2A", 24104, "Spec / Shell", "2026-06-02", "协议主仓库"],
    ["a2aproject/a2a-python", "https://github.com/a2aproject/a2a-python", 1947, "Python", "2026-06-02", "官方 Python SDK"],
    ["a2aproject/a2a-samples", "https://github.com/a2aproject/a2a-samples", 1612, "Jupyter Notebook", "2026-05-21", "官方样例集合"],
    ["ai-boost/awesome-a2a", "https://github.com/ai-boost/awesome-a2a", 610, "List", "2026-06-02", "A2A 生态索引"],
    ["a2aproject/a2a-js", "https://github.com/a2aproject/a2a-js", 549, "TypeScript", "2026-06-02", "官方 JS SDK"],
    ["a2aproject/a2a-java", "https://github.com/a2aproject/a2a-java", 430, "Java", "2026-06-02", "官方 Java SDK"],
    ["a2aproject/a2a-go", "https://github.com/a2aproject/a2a-go", 387, "Go", "2026-05-15", "官方 Go SDK"],
    ["a2aproject/a2a-dotnet", "https://github.com/a2aproject/a2a-dotnet", 236, "C#", "2026-06-01", "官方 .NET SDK"],
    ["sing1ee/a2a-directory", "https://github.com/sing1ee/a2a-directory", 235, "List", "2026-05-31", "AgentCards / servers / clients directory"],
    ["trpc-group/trpc-a2a-go", "https://github.com/trpc-group/trpc-a2a-go", 230, "Go", "2026-05-26", "第三方 Go implementation"],
    ["qntx/ra2a", "https://github.com/qntx/ra2a", 165, "Rust", "2026-05-08", "Rust SDK"],
    ["elkar-ai/elkar-a2a", "https://github.com/elkar-ai/elkar-a2a", 149, "TypeScript", "2025-05-21", "A2A task management"],
    ["PieterKas/agent2agent-auth-framework", "https://github.com/PieterKas/agent2agent-auth-framework", 11, "Makefile", "2026-06-02", "A2A authentication experiment"],
    ["open-resource-discovery/a2a-editor", "https://github.com/open-resource-discovery/a2a-editor", 19, "TypeScript", "2026-06-01", "A2A UI components"],
    ["DrOlu/pi-a2a-communication", "https://github.com/DrOlu/pi-a2a-communication", 4, "TypeScript", "2026-03-15", "Pi coding agent 的 A2A 实验"]
  ],
  runtime: [
    ["团队拓扑", "Team Topology", "定义 supervisor、worker、peer handoff、debate、plan-execute 等关系。", "拓扑不明时，失败责任和上下文归属不明。"],
    ["能力卡", "Capability Card", "声明 agent 能处理的任务、输入、输出和限制。", "能力描述模糊会导致错误分派。"],
    ["权限卡", "Permission Card", "描述工具、数据、API、shell、浏览器等权限边界。", "权限共享会扩大外部副作用。"],
    ["共享状态", "Shared State", "保存任务、记忆、artifact、版本和中间结论。", "状态不一致会造成重复执行或错误交接。"],
    ["消息协议", "Message Protocol", "描述 agent 间消息、任务、artifact 和状态变更。", "自然语言消息无法支撑稳定交接。"],
    ["轨迹记录", "Trace Logging", "保存 LLM call、tool call、handoff、成本和延迟。", "没有 trace 时无法定位失败节点。"],
    ["评估回放", "Eval Replay", "用固定任务集和历史轨迹比较版本。", "只看最终文本会漏掉内部失败。"],
    ["版本记录", "Versioning", "记录 prompt、tool schema、模型、路由和记忆变化。", "无版本时无法回滚或归因。"]
  ],
  lifecycle: [
    ["任务契约", "Task Contract", "目标、输入、输出、成功条件", "可执行任务对象"],
    ["能力配置", "Capability Setup", "模型、工具、上下文、记忆", "agent capability profile"],
    ["权限配置", "Permission Setup", "工具权限、数据范围、预算", "agent permission profile"],
    ["规划", "Planning", "任务、上下文、约束", "plan / route"],
    ["执行", "Execution", "plan、tool schema、状态", "tool call / message / artifact"],
    ["交接", "Handoff", "任务状态、上下文包、失败原因", "handoff packet"],
    ["验证", "Verification", "artifact、rubric、test、source", "pass / fail / uncertain"],
    ["版本更新", "Version Update", "trace、eval result、失败样本", "prompt/tool/route version"]
  ],
  papers: [
    ["2023", "arXiv", "CAMEL: Communicative Agents for Mind Exploration of LLM Society", "CAMEL-AI", "角色扮演 agent 与 communicative cooperation。", "https://arxiv.org/abs/2303.17760"],
    ["2023", "arXiv", "Generative Agents: Interactive Simulacra of Human Behavior", "Stanford / Google", "memory、reflection、planning 支撑 agent 社会模拟。", "https://arxiv.org/abs/2304.03442"],
    ["2023", "arXiv", "ChatDev: Communicative Agents for Software Development", "ChatDev", "把软件开发拆成多角色通信过程。", "https://arxiv.org/abs/2307.07924"],
    ["2023", "arXiv", "MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework", "MetaGPT", "把 SOP 和专业角色写入 agent 协作流程。", "https://arxiv.org/abs/2308.00352"],
    ["2023", "arXiv", "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation", "Microsoft", "multi-agent conversation framework 的代表论文。", "https://arxiv.org/abs/2308.08155"],
    ["2023", "arXiv", "AgentVerse: Facilitating Multi-Agent Collaboration and Exploring Emergent Behaviors", "AgentVerse", "动态组队与 emergent behavior 的研究入口。", "https://arxiv.org/abs/2308.10848"],
    ["2023", "arXiv", "AgentBench: Evaluating LLMs as Agents", "AgentBench", "agent 评估基线。", "https://arxiv.org/abs/2308.03688"],
    ["2023", "arXiv", "SOTOPIA: Interactive Evaluation for Social Intelligence in Language Agents", "SOTOPIA", "多轮交互和社会智能评估。", "https://arxiv.org/abs/2310.11667"],
    ["2024", "arXiv", "Large Language Model based Multi-Agents: A Survey of Progress and Challenges", "Survey", "LLM-based multi-agent 进展与挑战综述。", "https://arxiv.org/abs/2402.01680"],
    ["2024", "arXiv", "Magentic-One: A Generalist Multi-Agent System for Solving Complex Tasks", "Microsoft", "orchestrator-led multi-agent 架构。", "https://arxiv.org/abs/2411.04468"],
    ["2024", "Google Research", "Chain of Agents: Large Language Models Collaborating on Long-Context Tasks", "Google Research", "长上下文任务通过 agent chain 分段协作。", "https://research.google/pubs/chain-of-agents-large-language-modelscollaborating-on-long-context-tasks/"],
    ["2025", "arXiv", "MultiAgentBench: Evaluating the Collaboration and Competition of LLM agents", "ACL 2025 / MARBLE", "协作与竞争场景 benchmark。", "https://arxiv.org/abs/2503.01935"],
    ["2025", "arXiv", "Multiagent Finetuning: Self Improvement with Diverse Reasoning Chains", "Multiagent Finetuning", "模型组通过多 agent 交互生成 diverse reasoning chains。", "https://arxiv.org/abs/2501.05707"],
    ["2025", "arXiv", "Agents of Change: Self-Evolving LLM Agents for Strategic Planning", "Agents of Change", "self-evolving agents 与 strategic planning。", "https://arxiv.org/abs/2506.04651"],
    ["2025", "arXiv", "G-Memory: Tracing Hierarchical Memory for Multi-Agent Systems", "G-Memory", "multi-agent 自我演进中的层级记忆结构。", "https://arxiv.org/abs/2506.07398"],
    ["2025", "arXiv", "Specification and Evaluation of Multi-Agent LLM Systems", "Cybersecurity Applications", "用安全任务解释 multi-agent specification 与 evaluation。", "https://arxiv.org/abs/2506.10467"],
    ["2025", "arXiv", "Towards a Science of Scaling LLM Agents", "Google / MIT / collaborators", "多配置实验解释单 agent、tool use、multi-agent 何时放大或降低性能。", "https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/"],
    ["2025", "arXiv", "Beyond the Strongest LLM: Multi-Turn Multi-Agent Orchestration vs. Single LLMs", "Gemini / GPT / Claude / Grok benchmark", "多轮多 agent 编排与单模型 baseline 的对照。", "https://arxiv.org/abs/2509.23537"],
    ["2025", "arXiv", "TUMIX: Multi-Agent Test-Time Scaling with Tool-Use Mixture", "Google / MIT / Harvard / DeepMind", "12-15 个工具型 agent 的 test-time scaling 与 early stop。", "https://arxiv.org/abs/2510.01279"],
    ["2025", "arXiv", "MAGPIE: Multi-Agent contextual PrIvacy Evaluation", "MAGPIE", "200 个高风险任务评估 GPT-5、Gemini 2.5-Pro 等隐私泄露。", "https://arxiv.org/abs/2510.15186"],
    ["2026", "arXiv", "When Single-Agent with Skills Replace Multi-Agent Systems and When They Fail", "Single-agent vs multi-agent", "把多 agent 编译为 single-agent skills 的反证框架。", "https://arxiv.org/abs/2601.04748"],
    ["2026", "arXiv", "Multi-agent AI systems outperform human teams in creativity", "Creativity benchmark", "4,541 个 multi-agent LLM ideas 与 341 个人类团队 ideas 对照。", "https://arxiv.org/abs/2605.17885"],
    ["2026", "arXiv", "AgentSchool: An LLM-Powered Multi-Agent Simulation for Education", "AgentSchool", "教育场景中的长期记忆、协调和制度推理测试床。", "https://arxiv.org/abs/2605.30144"],
    ["2025", "Official", "Anthropic: How we built our multi-agent research system", "Anthropic", "orchestrator-worker、多 subagents、token 成本与覆盖率取舍。", "https://www.anthropic.com/engineering/multi-agent-research-system"],
    ["2025", "Official", "Gemini 2.5: advanced reasoning, multimodality, long context and agentic capabilities", "Google / Gemini", "Gemini 2.5 技术报告中的 agentic capabilities 与 long-context 基线。", "https://arxiv.org/abs/2507.06261"],
    ["2025", "Official", "OpenAI: A practical guide to building agents", "OpenAI", "handoffs、agents as tools、guardrails 和运行设计。", "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf"],
    ["2024", "Official", "Anthropic: Building effective agents", "Anthropic", "workflow 与 agent 的边界，routing、parallelization、orchestrator-workers。", "https://www.anthropic.com/engineering/building-effective-agents"]
  ],
  community: [
    ["Show HN: AgentKit", "HN", "64 points / 15 comments", "OpenAI Agents SDK 的 TypeScript 替代、MCP native、deterministic routing。", "https://news.ycombinator.com/item?id=43426164"],
    ["Show HN: Temporal + OpenAI Agents SDK", "HN", "28 points / 0 comments", "durable execution 与 agent SDK 结合。", "https://news.ycombinator.com/item?id=44734374"],
    ["Show HN: OpenAI Agents demos with Temporal", "HN", "15 points / 2 comments", "crash recovery、scale、human interaction。", "https://news.ycombinator.com/item?id=44736713"],
    ["How we built our multi-agent research system", "HN", "35 points / 0 comments", "Anthropic multi-agent research system 进入 HN，焦点是 orchestrator-worker 和成本。", "https://news.ycombinator.com/item?id=44272278"],
    ["Show HN: Awesome-A2A", "HN", "5 points / 1 comment", "Google A2A resource list，反映 A2A 生态索引需求。", "https://news.ycombinator.com/item?id=44181486"],
    ["Ask HN: Google A2A protocol", "HN", "1 point / 0 comments", "A2A 的 client distribution 问题。", "https://news.ycombinator.com/item?id=43650326"],
    ["Ask HN: Which agentic framework/tool do you prefer and why?", "HN", "5 points / 2 comments", "SmolAgents、OpenAI Agents SDK、CrewAI、LangGraph 的取舍讨论。", "https://news.ycombinator.com/item?id=43491351"],
    ["Show HN: Agent Firewall", "HN", "2 points / 1 comment", "多 agent 死循环、token burn、circuit breaker。", "https://news.ycombinator.com/item?id=47308378"],
    ["r/AI_Agents", "Reddit", "community", "agent 框架、课程、评估和开源项目聚合。", "https://www.reddit.com/r/AI_Agents/"],
    ["r/LangChain", "Reddit", "community", "LangGraph、trace、eval、agent workflow 讨论。", "https://www.reddit.com/r/LangChain/"],
    ["r/ClaudeCode", "Reddit", "community", "Claude Code subagents、token 成本、coding-agent team。", "https://www.reddit.com/r/ClaudeCode/"],
    ["r/modelcontextprotocol", "Reddit", "community", "MCP 与 A2A 的协议边界讨论。", "https://www.reddit.com/r/modelcontextprotocol/"],
    ["Single Agents win against Multiple Agents", "Reddit", "30 votes", "Google/DeepMind/MIT scaling paper 被社区用于反驳“更多 agent 更好”。", "https://www.reddit.com/r/AI_Agents/comments/1qtrhpq/single_agents_win_against_multiple_agents/"],
    ["Anthropic multi-agent burns 15x tokens", "Reddit", "thread", "围绕 Anthropic 15x token 成本和 Claude Code subagents 的取舍争论。", "https://www.reddit.com/r/ClaudeCode/comments/1tqiuot/anthropics_own_research_says_multiagent_burns_15x/"],
    ["r/AutoGenAI", "Reddit", "community", "AutoGen 用户项目、framework 迁移、agent conversation 讨论。", "https://www.reddit.com/r/AutoGenAI/"],
    ["r/LocalLLaMA", "Reddit", "community", "本地模型 agent、成本、部署和多模型编排讨论。", "https://www.reddit.com/r/LocalLLaMA/"]
  ],
  xBuilders: [
    ["Harrison Chase", "LangChain / LangGraph", "Founder / maintainer", "state graph、agent observability、LangSmith 生态入口。", "https://x.com/hwchase17"],
    ["LangChain AI", "LangGraph / LangSmith", "Official account", "agent graph、trace、eval、deployment case。", "https://x.com/LangChainAI"],
    ["Joao Moura", "CrewAI", "Founder", "role-based crews / flows / multi-agent collaboration。", "https://x.com/joaomdmoura"],
    ["CrewAI", "CrewAI", "Official account", "crew、flow、enterprise multi-agent platform。", "https://x.com/crewAIInc"],
    ["OpenAI Developers", "OpenAI Agents SDK / Codex", "Official developer account", "Agents SDK、Responses API、Codex、evals。", "https://x.com/OpenAIDevs"],
    ["Anthropic", "Claude Agent SDK / Claude Code", "Official account", "Claude Agent SDK、Claude Code、subagents、multi-agent research。", "https://x.com/AnthropicAI"],
    ["Google Cloud Tech", "A2A / ADK / Gemini", "Official developer account", "A2A、Agent Development Kit、Gemini agent stack。", "https://x.com/GoogleCloudTech"],
    ["Microsoft AutoGen", "AutoGen / Agent Framework", "Project / community account", "AutoGen、Magentic-One、Microsoft Agent Framework。", "https://x.com/pyautogen"],
    ["CAMEL-AI", "CAMEL / OWL", "Project account", "communicative agents、agent society、OWL workforce。", "https://x.com/CamelAIOrg"],
    ["Simon Willison", "Agent engineering analysis", "Technical writer / builder", "agent 技术去噪、prompt injection、tools、evaluations。", "https://x.com/simonw"],
    ["swyx", "AI Engineer ecosystem", "Community builder", "agent product ecosystem、developer tooling、AI Engineer 会议。", "https://x.com/swyx"]
  ],
  courses: [
    ["Stanford", "Building and Scaling LLM Applications", "2026", "agentic workflows、multi-agent systems、LangGraph、CrewAI", "https://web.stanford.edu/class/cs224g/"],
    ["Stanford", "Self-Improving AI Agents", "Autumn 2025", "self-improving agents、eval、workflow", "https://cs329a.stanford.edu/"],
    ["CMU", "AI Agents", "Fall 2026", "LLM-based AI agents、frameworks、reliability、long-horizon reasoning", "https://www.cmu-agents.com/"],
    ["UC Berkeley", "Advanced Large Language Model Agents", "Spring 2025", "LLM agents、reasoning、code、verification", "https://rdi.berkeley.edu/adv-llm-agents/sp25"],
    ["University of Virginia", "Agentic AI", "Spring 2026", "Generative Agents、ToolOrchestra、Magentic-One", "https://www.cs.virginia.edu/~rmw7my/Courses/AgenticAISpring2026/agenticAI.html"],
    ["Stanford ICME", "From LLMs to Agents", "2026", "agentic workflows、reasoning、verification、harness engineering", "https://icme.stanford.edu/events/workshops/llms-agents-building-intelligent-systems-workshop"],
    ["MIT Professional Education", "AI System Architecture and Large Language Model Applications", "Jul 13-17, 2026", "LLM application architecture、agentic AI applications", "https://professional.mit.edu/course-catalog/ai-system-architecture-and-large-language-model-applications"],
    ["CMU Executive Education", "Agentic AI Program", "July 22, 2026", "single-agent and multi-agent architectures、RAG、structured reasoning", "https://execonline.cs.cmu.edu/agentic-ai-program"],
    ["UCSB Computer Science", "Frontier LLM and Agent Capabilities", "Spring 2026", "frontier LLM and agent capabilities、security issues", "https://cs.ucsb.edu/education/courses/special-topics-seminars/special-topics-course/cmpsc-291g-frontier-llm-and-agent"],
    ["Harvard Online", "Agentic AI Foundations", "Aug 5-Sep 2, 2026", "LLM foundations、AI agents、human-AI collaboration", "https://harvardonline.harvard.edu/course/agentic-ai-foundations"],
    ["Cornell Bowers CIS", "Multi-Agent Systems Execute Arbitrary Malicious Code", "Sep 12, 2025", "multi-agent system security；58-90% web-based attack success in seminar abstract", "https://www.cs.cornell.edu/events/systems-research-seminar/multi-agent-systems-execute-arbitrary-malicious-code"],
    ["MIT Sloan", "Deploying AI in the corporation", "IAP 2026", "agentic system roles、tools、workflows、feedback loops", "https://mitsloan.mit.edu/sites/default/files/inline-files/2026JA_15.S65_Syllabus.pdf"]
  ],
  frontend: [
    ["AutoGen Studio", "Workflow Builder", "拖拽定义 agent workflow，运行 task session。", "agent workflow、chat task、gallery、debug/eval panel", "https://microsoft.github.io/autogen/0.5.7/user-guide/autogenstudio-user-guide/index.html"],
    ["LangGraph Studio / LangSmith", "Graph and Trace Studio", "显示 graph、state、trace、eval。", "graph node、state inspector、trace timeline、eval trend", "https://docs.langchain.com/langgraph-platform/self-hosted"],
    ["AgentOps", "Agent Observability", "把 multi-agent session 放入同一 trace。", "session replay、cost、latency、tool invocation", "https://docs.agentops.ai/v2/usage/tracking-agents"],
    ["Langfuse", "LLM Engineering Platform", "LLM observability、metrics、evals、prompt management、datasets。", "trace、span、eval dataset、prompt version", "https://github.com/langfuse/langfuse"],
    ["Arize Phoenix", "AI Observability & Evaluation", "AI observability and evaluation，适合 agent trace 与 eval。", "trace、eval、dataset、experiment", "https://github.com/Arize-ai/phoenix"],
    ["RagaAI Catalyst", "Agent Observability Dashboard", "agent、LLM、tool tracing；execution graph view。", "timeline、execution graph、tool trace、analytics", "https://github.com/raga-ai-hub/RagaAI-Catalyst"],
    ["Rowboat", "AI Coworker Workspace", "前端围绕 coworker、memory、conversation 和 task。", "coworker workspace、memory surface、tasks", "https://github.com/rowboatlabs/rowboat"],
    ["Microsoft Magentic-UI", "Browser / Local Agent UI", "实验性 agent 横跨 browser 和 local file system。", "browser actions、filesystem actions、task state", "https://github.com/microsoft/magentic-ui"],
    ["Builderz Mission Control", "Agent Orchestration Console", "self-hosted orchestration platform，dispatch tasks、monitor spend、govern operations。", "task dispatch、spend monitor、workflow state", "https://github.com/builderz-labs/mission-control"],
    ["Open Multi-Agent Canvas", "Multi-Agent Chat Interface", "多 agent 同一动态对话，支持 MCP servers。", "agent lanes、canvas、MCP server surface", "https://github.com/CopilotKit/open-multi-agent-canvas"],
    ["ClauBoard", "Coding-agent Control Plane", "多 coding-agent 的 launch、monitor、coordinate dashboard。", "agent roster、status、control plane", "https://github.com/Sipoke123/ClauBoard"],
    ["A2A Editor", "Agent Card Editor", "编辑、查看、测试实现 A2A protocol 的 agents。", "Agent Card、test run、protocol validation", "https://github.com/open-resource-discovery/a2a-editor"],
    ["A2A UI objects", "Agent Card Browser", "A2A 前端对象围绕 capability discovery 与 task lifecycle。", "agent card、capability、task、artifact", "https://a2a-protocol.org/latest/specification/"]
  ],
  sources: [
    ["A2A", "https://a2a-protocol.org/latest/specification/", "A2A official specification"],
    ["Linux Foundation", "https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents", "A2A project announcement"],
    ["MCP", "https://modelcontextprotocol.io/introduction", "Model Context Protocol introduction"],
    ["OpenAI", "https://platform.openai.com/docs/guides/agents-sdk/", "Agents SDK docs"],
    ["OpenAI", "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf", "A practical guide to building agents"],
    ["Anthropic", "https://docs.anthropic.com/en/docs/claude-agent-sdk/overview", "Claude Agent SDK overview"],
    ["Anthropic", "https://www.anthropic.com/engineering/building-effective-agents", "Building effective agents"],
    ["Anthropic", "https://www.anthropic.com/engineering/multi-agent-research-system", "Multi-agent research system"],
    ["Google ADK", "https://google.github.io/adk-docs/agents/multi-agents/", "ADK multi-agent systems docs"],
    ["LangGraph", "https://langchain-ai.github.io/langgraph/concepts/multi_agent/", "LangGraph multi-agent concepts"],
    ["AutoGen", "https://microsoft.github.io/autogen/", "AutoGen docs"],
    ["CrewAI", "https://docs.crewai.com/", "CrewAI docs"],
    ["AgentOps", "https://docs.agentops.ai/v2/usage/tracking-agents", "AgentOps tracking agents"],
    ["Langfuse", "https://github.com/langfuse/langfuse", "Langfuse repo"],
    ["Phoenix", "https://github.com/Arize-ai/phoenix", "Arize Phoenix repo"],
    ["RagaAI", "https://github.com/raga-ai-hub/RagaAI-Catalyst", "RagaAI Catalyst repo"],
    ["HN", "https://hn.algolia.com/api", "HN Algolia API"],
    ["GitHub", "https://github.com/a2aproject/A2A", "A2A repo snapshot"],
    ["GitHub", "https://github.com/langchain-ai/langchain", "LangChain repo snapshot"],
    ["GitHub", "https://github.com/browser-use/browser-use", "browser-use repo snapshot"],
    ["GitHub", "https://github.com/pydantic/pydantic-ai", "PydanticAI repo snapshot"],
    ["GitHub", "https://github.com/huggingface/smolagents", "smolagents repo snapshot"],
    ["GitHub", "https://github.com/run-llama/llama_index", "LlamaIndex repo snapshot"],
    ["GitHub", "https://github.com/microsoft/magentic-ui", "Magentic-UI repo snapshot"],
    ["GitHub", "https://github.com/openai/openai-agents-python", "OpenAI Agents Python repo snapshot"],
    ["GitHub", "https://github.com/wshobson/agents", "wshobson agents repo snapshot"],
    ["GitHub", "https://github.com/earendil-works/pi", "Pi toolkit repo snapshot"],
    ["arXiv", "https://arxiv.org/", "arXiv papers listed in Part 5"],
    ["Google Research", "https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/", "Scaling agent systems"],
    ["Google Research", "https://research.google/pubs/chain-of-agents-large-language-modelscollaborating-on-long-context-tasks/", "Chain of Agents"],
    ["Stanford", "https://web.stanford.edu/class/cs224g/", "Stanford CS224G"],
    ["CMU", "https://www.cmu-agents.com/", "CMU AI Agents"],
    ["Berkeley", "https://rdi.berkeley.edu/adv-llm-agents/sp25", "Berkeley Advanced LLM Agents"],
    ["MIT", "https://professional.mit.edu/course-catalog/ai-system-architecture-and-large-language-model-applications", "MIT Professional Education"],
    ["CMU", "https://execonline.cs.cmu.edu/agentic-ai-program", "CMU Agentic AI Program"],
    ["UCSB", "https://cs.ucsb.edu/education/courses/special-topics-seminars/special-topics-course/cmpsc-291g-frontier-llm-and-agent", "UCSB Frontier LLM and Agent Capabilities"],
    ["Harvard", "https://harvardonline.harvard.edu/course/agentic-ai-foundations", "Harvard Agentic AI Foundations"],
    ["Cornell", "https://www.cs.cornell.edu/events/systems-research-seminar/multi-agent-systems-execute-arbitrary-malicious-code", "Cornell multi-agent security seminar"]
  ]
};

const numberFormat = new Intl.NumberFormat("en-US");
const projectFilterState = {
  query: "",
  category: "全部",
};

const projectCategoryGroups = [
  ["全部", () => true],
  ["协议 / A2A", (category) => /协议|A2A/.test(category)],
  ["官方 / 厂商 SDK", (category) => /官方|SDK|模型厂商|轻量|toolkit/.test(category)],
  ["协作框架", (category) => /协作框架|图运行框架|通用 multi-agent|平台框架|agent framework|历史\/教育框架|领域/.test(category)],
  ["运行 / 企业", (category) => /通用 agent 平台|企业运行栈|生产 harness|训练\/演进|文档 agent 平台/.test(category)],
  ["可观测", (category) => /可观测/.test(category)],
  ["前端 / 控制台", (category) => /前端|产品/.test(category)],
  ["开发者入口", (category) => /开发者入口|浏览器 agent|computer-use agent|教程\/实现集合|agent harness/.test(category)],
];

function safeText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function link(label, url, className = "") {
  return `<a ${className ? `class="${className}"` : ""} href="${url}" target="_blank" rel="noreferrer">${safeText(label)}</a>`;
}

function renderTable(id, rows, mapper) {
  const tbody = document.querySelector(`#${id} tbody`);
  tbody.innerHTML = rows.map(mapper).join("");
}

function renderInsightCards(id, rows) {
  document.getElementById(id).innerHTML = rows
    .map(([title, evidence, meaning]) => `
      <article class="insight-card">
        <h3>${safeText(title)}</h3>
        <p>${safeText(evidence)}</p>
        <strong>${safeText(meaning)}</strong>
      </article>`)
    .join("");
}

function renderTimeline(id, rows) {
  document.getElementById(id).innerHTML = rows
    .map(([year, title, evidence, meaning]) => `
      <article class="timeline-node">
        <span>${safeText(year)}</span>
        <h3>${safeText(title)}</h3>
        <p>${safeText(evidence)}</p>
        <strong>${safeText(meaning)}</strong>
      </article>`)
    .join("");
}

function renderDebateThemes() {
  document.getElementById("debate-theme-grid").innerHTML = reportData.debateThemes
    .map(([theme, evidence, meaning]) => `
      <article class="debate-card">
        <h3>${safeText(theme)}</h3>
        <p>${safeText(evidence)}</p>
        <strong>${safeText(meaning)}</strong>
      </article>`)
    .join("");
}

function gradeClass(grade) {
  if (grade.includes("强")) return "grade grade--strong";
  if (grade.includes("中")) return "grade grade--medium";
  if (grade.includes("弱")) return "grade grade--weak";
  return "grade";
}

function importanceClass(value) {
  if (value.includes("核心")) return "priority-pill priority-pill--core";
  if (value.includes("关键")) return "priority-pill priority-pill--key";
  if (value.includes("背景")) return "priority-pill priority-pill--context";
  return "priority-pill";
}

function impactClass(value) {
  if (value.includes("高")) return "impact-pill impact-pill--high";
  if (value.includes("中")) return "impact-pill impact-pill--medium";
  return "impact-pill impact-pill--low";
}

function evidenceRowClass(value) {
  if (value.includes("强") || value.includes("核心") || value.includes("高")) return "evidence-row evidence-row--strong";
  if (value.includes("中") || value.includes("关键")) return "evidence-row evidence-row--medium";
  if (value.includes("弱") || value.includes("背景") || value.includes("线索")) return "evidence-row evidence-row--weak";
  return "evidence-row";
}

function renderExecutiveSummary() {
  document.getElementById("executive-finding-grid").innerHTML = reportData.executiveFindings
    .map(([title, evidence, grade, meaning]) => `
      <article class="finding-card">
        <div class="finding-card__top">
          <h3>${safeText(title)}</h3>
          <span class="${gradeClass(grade)}">${safeText(grade)}</span>
        </div>
        <p>${safeText(evidence)}</p>
        <strong>${safeText(meaning)}</strong>
      </article>`)
    .join("");

  renderTable("horizontal-comparison-table", reportData.horizontalComparison, ([object, role, signal, value, gap, grade]) => `
    <tr>
      <td>${safeText(object)}</td>
      <td>${safeText(role)}</td>
      <td>${safeText(signal)}</td>
      <td>${safeText(value)}</td>
      <td>${safeText(gap)}</td>
      <td><span class="${gradeClass(grade)}">${safeText(grade)}</span></td>
    </tr>`);

  renderTable("signal-grade-table", reportData.signalGrades, ([grade, source, use, example]) => `
    <tr>
      <td><span class="${gradeClass(grade)}">${safeText(grade)}</span></td>
      <td>${safeText(source)}</td>
      <td>${safeText(use)}</td>
      <td>${safeText(example)}</td>
    </tr>`);
}

function renderResearchFrame() {
  renderTable("question-map-table", reportData.questionMap, ([question, importance, location, evidence, boundary]) => `
    <tr class="${evidenceRowClass(importance)}">
      <td>${safeText(question)}</td>
      <td><span class="${importanceClass(importance)}">${safeText(importance)}</span></td>
      <td>${safeText(location)}</td>
      <td>${safeText(evidence)}</td>
      <td>${safeText(boundary)}</td>
    </tr>`);

  renderTable("scope-table", reportData.scopeBoundaries, ([object, included, excluded, boundary, grade]) => `
    <tr class="${evidenceRowClass(grade)}">
      <td>${safeText(object)}</td>
      <td>${safeText(included)}</td>
      <td>${safeText(excluded)}</td>
      <td>${safeText(boundary)}</td>
      <td><span class="${gradeClass(grade)}">${safeText(grade)}</span></td>
    </tr>`);

  renderTable("method-table", reportData.methodRows, ([platform, inclusion, signal, cannotProve, destination]) => `
    <tr>
      <td>${safeText(platform)}</td>
      <td>${safeText(inclusion)}</td>
      <td>${safeText(signal)}</td>
      <td>${safeText(cannotProve)}</td>
      <td>${safeText(destination)}</td>
    </tr>`);

  renderTable("data-dictionary-table", reportData.dataDictionary, ([field, location, definition, source, boundary]) => `
    <tr>
      <td>${safeText(field)}</td>
      <td>${safeText(location)}</td>
      <td>${safeText(definition)}</td>
      <td>${safeText(source)}</td>
      <td>${safeText(boundary)}</td>
    </tr>`);
}

function renderPipelineAndDelivery() {
  renderTable("pipeline-table", reportData.pipeline, ([step, input, action, output, check]) => `
    <tr>
      <td>${safeText(step)}</td>
      <td>${safeText(input)}</td>
      <td>${safeText(action)}</td>
      <td>${safeText(output)}</td>
      <td>${safeText(check)}</td>
    </tr>`);

  renderTable("delivery-table", reportData.delivery, ([object, destination, content, status, boundary]) => `
    <tr>
      <td>${safeText(object)}</td>
      <td>${safeText(destination)}</td>
      <td>${safeText(content)}</td>
      <td>${safeText(status)}</td>
      <td>${safeText(boundary)}</td>
    </tr>`);
}

function renderEvidenceAndLimits() {
  renderTable("finding-evidence-table", reportData.findingEvidenceMap, ([finding, grade, decisive, supporting, mechanism, boundary, url]) => `
    <tr class="${evidenceRowClass(grade)}">
      <td>${safeText(finding)}</td>
      <td><span class="${gradeClass(grade)}">${safeText(grade)}</span></td>
      <td>${safeText(decisive)}</td>
      <td>${safeText(supporting)}</td>
      <td>${safeText(mechanism)}</td>
      <td>${safeText(boundary)}</td>
      <td>${link("source", url)}</td>
    </tr>`);

  renderTable("limitations-table", reportData.limitations, ([type, impact, boundary, scope, handling]) => `
    <tr class="${evidenceRowClass(impact)}">
      <td>${safeText(type)}</td>
      <td><span class="${impactClass(impact)}">${safeText(impact)}</span></td>
      <td>${safeText(boundary)}</td>
      <td>${safeText(scope)}</td>
      <td>${safeText(handling)}</td>
    </tr>`);
}

function renderSignalDetail(signal) {
  document.getElementById("signal-detail-panel").innerHTML = `
    <div class="signal-detail__top">
      <div>
        <p class="eyebrow">High-value Signal / ${safeText(signal.category)}</p>
        <h3>${safeText(signal.title)}</h3>
      </div>
      <div class="signal-detail__actions">
        <span class="${gradeClass(signal.grade)}">${safeText(signal.grade)}</span>
        <a class="source-button" href="${signal.sourceUrl}" target="_blank" rel="noreferrer">${safeText(signal.sourceLabel)}</a>
      </div>
    </div>
    <div class="signal-flow">${safeText(signal.flow)}</div>
    <div class="signal-detail__grid">
      <section>
        <h4>为什么重要</h4>
        <p>${safeText(signal.why)}</p>
      </section>
      <section>
        <h4>对比对象</h4>
        <p>${safeText(signal.compare)}</p>
      </section>
      <section>
        <h4>证据链</h4>
        <p>${safeText(signal.evidence)}</p>
      </section>
      <section>
        <h4>报告含义</h4>
        <p>${safeText(signal.meaning)}</p>
      </section>
    </div>
  `;
}

function renderHighValueSignals() {
  const [firstSignal] = reportData.highValueSignals;
  document.getElementById("signal-picker").innerHTML = reportData.highValueSignals
    .map((signal, index) => `
      <button class="signal-picker__item${index === 0 ? " is-active" : ""}" type="button" data-signal-id="${safeText(signal.id)}">
        <span>${safeText(signal.category)}</span>
        <strong>${safeText(signal.title)}</strong>
        <small>${safeText(signal.grade)}</small>
      </button>`)
    .join("");
  renderSignalDetail(firstSignal);
}

function renderReportMetrics() {
  const metrics = [
    ["GitHub 项目", reportData.projects.length],
    ["A2A 仓库", reportData.a2aRepos.length],
    ["论文材料", reportData.papers.length],
    ["社区信号", reportData.community.length],
    ["证据映射", reportData.findingEvidenceMap.length],
    ["课程入口", reportData.courses.length],
    ["数据源", reportData.sources.length],
  ];
  document.getElementById("report-metrics").innerHTML = metrics
    .map(([label, value]) => `<div class="metric-chip"><strong>${numberFormat.format(value)}</strong><span>${safeText(label)}</span></div>`)
    .join("");
}

function projectCategoryGroup(label) {
  return projectCategoryGroups.find(([groupLabel]) => groupLabel === label) || projectCategoryGroups[0];
}

function projectCategories() {
  return projectCategoryGroups;
}

function categoryClass(category) {
  if (/协议|A2A/.test(category)) return "category-pill--protocol";
  if (/官方|SDK|Codex|Claude|Pi|模型厂商|轻量/.test(category)) return "category-pill--official";
  if (/可观测/.test(category)) return "category-pill--observability";
  if (/前端|控制台|产品/.test(category)) return "category-pill--frontend";
  if (/框架|平台|图运行|企业|harness|multi-agent|领域/.test(category)) return "category-pill--framework";
  return "";
}

function filteredProjects() {
  const needle = projectFilterState.query.trim().toLowerCase();
  return reportData.projects.filter((row) => {
    const matchesText = !needle || row.join(" ").toLowerCase().includes(needle);
    const [, matchesGroup] = projectCategoryGroup(projectFilterState.category);
    const matchesCategory = matchesGroup(row[5]);
    return matchesText && matchesCategory;
  });
}

function renderProjectCategoryFilter() {
  const counts = new Map(
    projectCategoryGroups.map(([label, matcher]) => [
      label,
      reportData.projects.filter((row) => matcher(row[5])).length,
    ])
  );
  document.getElementById("project-category-filter").innerHTML = projectCategories()
    .map(([category]) => {
      const active = category === projectFilterState.category ? " is-active" : "";
      return `<button class="filter-chip${active}" type="button" data-category="${safeText(category)}">${safeText(category)} <span>${numberFormat.format(counts.get(category) || 0)}</span></button>`;
    })
    .join("");
}

function renderTerms() {
  renderInsightCards("core-insight-grid", reportData.coreInsights);
  renderTable("term-table", reportData.terms, ([zh, en, meaning, boundary]) => `
    <tr>
      <td>${safeText(zh)}</td>
      <td>${safeText(en)}</td>
      <td>${safeText(meaning)}</td>
      <td>${safeText(boundary)}</td>
    </tr>`);

  renderTable("platform-criteria-table", reportData.platformCriteria, ([platform, chain, metric, mechanism]) => `
    <tr>
      <td>${safeText(platform)}</td>
      <td>${safeText(chain)}</td>
      <td>${safeText(metric)}</td>
      <td>${safeText(mechanism)}</td>
    </tr>`);
}

function renderEcosystemAnalysis() {
  renderTable("ecosystem-layer-table", reportData.ecosystemLayers, ([layer, projects, signal, judgment]) => `
    <tr>
      <td>${safeText(layer)}</td>
      <td>${safeText(projects)}</td>
      <td>${safeText(signal)}</td>
      <td>${safeText(judgment)}</td>
    </tr>`);
}

function renderProjects() {
  const rows = filteredProjects();
  renderTable("project-table", rows, ([name, url, stars, active, stack, category, relation]) => `
    <tr>
      <td>${link(name, url, "repo-name")}</td>
      <td>${numberFormat.format(stars)}</td>
      <td>${safeText(active)}</td>
      <td>${safeText(stack)}</td>
      <td><span class="category-pill ${categoryClass(category)}">${safeText(category)}</span></td>
      <td>${safeText(relation)}</td>
      <td>${link("GitHub", url)}</td>
    </tr>`);
  document.getElementById("project-filter-status").textContent =
    `匹配 ${numberFormat.format(rows.length)} / ${numberFormat.format(reportData.projects.length)} 个 GitHub 项目`;
}

function renderProtocolLayer() {
  renderTable("boundary-table", reportData.boundaryComparison, ([object, question, payload, notFor, url]) => `
    <tr>
      <td>${safeText(object)}</td>
      <td>${safeText(question)}</td>
      <td>${safeText(payload)}</td>
      <td>${safeText(notFor)}</td>
      <td>${link("source", url)}</td>
    </tr>`);

  renderTable("protocol-table", reportData.protocols, ([layer, en, object, boundary, url]) => `
    <tr>
      <td>${safeText(layer)}</td>
      <td>${safeText(en)}</td>
      <td>${safeText(object)}</td>
      <td>${safeText(boundary)}</td>
      <td>${link("source", url)}</td>
    </tr>`);

  renderTable("sdk-table", reportData.sdkClasses, ([name, relation, projects, explanation, url]) => `
    <tr>
      <td>${safeText(name)}</td>
      <td>${safeText(relation)}</td>
      <td>${safeText(projects)}</td>
      <td>${safeText(explanation)}</td>
      <td>${link("source", url)}</td>
    </tr>`);

  renderTable("a2a-table", reportData.a2aRepos, ([name, url, stars, lang, active, role]) => `
    <tr>
      <td>${link(name, url, "repo-name")}</td>
      <td>${numberFormat.format(stars)}</td>
      <td>${safeText(lang)}</td>
      <td>${safeText(active)}</td>
      <td>${safeText(role)}</td>
      <td>${link("GitHub", url)}</td>
    </tr>`);
}

function renderRuntime() {
  renderInsightCards("runtime-insight-grid", reportData.runtimeInsights);
  renderTable("runtime-table", reportData.runtime, ([object, en, role, failure]) => `
    <tr>
      <td>${safeText(object)}</td>
      <td>${safeText(en)}</td>
      <td>${safeText(role)}</td>
      <td>${safeText(failure)}</td>
    </tr>`);

  renderTable("lifecycle-table", reportData.lifecycle, ([stage, en, input, output]) => `
    <tr>
      <td>${safeText(stage)}</td>
      <td>${safeText(en)}</td>
      <td>${safeText(input)}</td>
      <td>${safeText(output)}</td>
    </tr>`);
}

function renderPapers() {
  renderTimeline("research-timeline", reportData.researchTimeline);
  renderTable("paper-table", reportData.papers, ([year, type, title, org, value, url]) => `
    <tr>
      <td>${safeText(year)}</td>
      <td>${safeText(type)}</td>
      <td>${link(title, url, "repo-name")}</td>
      <td>${safeText(org)}</td>
      <td>${safeText(value)}</td>
      <td>${link("source", url)}</td>
    </tr>`);
}

function renderContextSignals() {
  renderDebateThemes();
  renderTable("community-table", reportData.community, ([source, type, numbers, signal, url]) => `
    <tr>
      <td>${safeText(source)}</td>
      <td>${safeText(type)}</td>
      <td>${safeText(numbers)}</td>
      <td>${safeText(signal)}</td>
      <td>${link("source", url)}</td>
    </tr>`);

  renderTable("x-table", reportData.xBuilders, ([account, project, role, signal, url]) => `
    <tr>
      <td>${link(account, url, "repo-name")}</td>
      <td>${safeText(project)}</td>
      <td>${safeText(role)}</td>
      <td>${safeText(signal)}</td>
      <td>${link("X", url)}</td>
    </tr>`);

  renderTable("course-table", reportData.courses, ([school, title, time, coverage, url]) => `
    <tr>
      <td>${safeText(school)}</td>
      <td>${link(title, url, "repo-name")}</td>
      <td>${safeText(time)}</td>
      <td>${safeText(coverage)}</td>
      <td>${link("source", url)}</td>
    </tr>`);

  renderTable("frontend-table", reportData.frontend, ([name, en, mechanism, objects, url]) => `
    <tr>
      <td>${link(name, url, "repo-name")}</td>
      <td>${safeText(en)}</td>
      <td>${safeText(mechanism)}</td>
      <td>${safeText(objects)}</td>
      <td>${link("source", url)}</td>
    </tr>`);
}

function renderSources() {
  document.getElementById("source-list").innerHTML = reportData.sources
    .map(([kind, url, label]) => `<div class="source-row"><span>${safeText(kind)}</span><div>${link(label, url)}</div></div>`)
    .join("");
}

function setupFilter() {
  const input = document.getElementById("project-filter");
  const clearButton = document.getElementById("project-filter-clear");
  const categoryHost = document.getElementById("project-category-filter");
  input.addEventListener("input", () => {
    projectFilterState.query = input.value;
    renderProjects();
  });
  clearButton.addEventListener("click", () => {
    input.value = "";
    projectFilterState.query = "";
    renderProjects();
    input.focus();
  });
  categoryHost.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    projectFilterState.category = button.dataset.category;
    renderProjectCategoryFilter();
    renderProjects();
  });
}

function setupHighValueSignals() {
  const picker = document.getElementById("signal-picker");
  picker.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-signal-id]");
    if (!button) return;
    const signal = reportData.highValueSignals.find((item) => item.id === button.dataset.signalId);
    if (!signal) return;
    picker.querySelectorAll(".is-active").forEach((activeButton) => activeButton.classList.remove("is-active"));
    button.classList.add("is-active");
    renderSignalDetail(signal);
  });
}

function setupDensityControls() {
  const buttons = Array.from(document.querySelectorAll(".density-toggle__button"));
  const applyDensity = (density) => {
    document.body.classList.toggle("density-comfortable", density === "comfortable");
    document.body.classList.toggle("density-compact", density === "compact");
    buttons.forEach((button) => button.classList.toggle("is-active", button.dataset.density === density));
  };
  buttons.forEach((button) => {
    button.addEventListener("click", () => applyDensity(button.dataset.density));
  });
  applyDensity("compact");
}

function setupRowSelection() {
  document.addEventListener("click", (event) => {
    if (event.target.closest("a, button, input")) return;
    const row = event.target.closest(".data-table tbody tr");
    if (!row) return;
    const wasSelected = row.classList.contains("is-selected");
    row.parentElement.querySelectorAll(".is-selected").forEach((selectedRow) => selectedRow.classList.remove("is-selected"));
    row.classList.toggle("is-selected", !wasSelected);
  });
}

function setupBackTop() {
  const button = document.querySelector(".back-top");
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    button.classList.toggle("is-visible", window.scrollY > 700);
  });
}

function setupActiveNav() {
  const links = Array.from(document.querySelectorAll(".nav a"));
  const sections = links.map((anchor) => document.querySelector(anchor.getAttribute("href"))).filter(Boolean);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((linkEl) => {
          linkEl.classList.toggle("is-active", linkEl.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
  );
  sections.forEach((section) => observer.observe(section));
}

function init() {
  renderReportMetrics();
  renderExecutiveSummary();
  renderHighValueSignals();
  renderResearchFrame();
  renderPipelineAndDelivery();
  renderTerms();
  renderEcosystemAnalysis();
  renderProjectCategoryFilter();
  renderProjects();
  renderProtocolLayer();
  renderRuntime();
  renderPapers();
  renderContextSignals();
  renderEvidenceAndLimits();
  renderSources();
  setupFilter();
  setupHighValueSignals();
  setupDensityControls();
  setupRowSelection();
  setupBackTop();
  setupActiveNav();
}

init();
