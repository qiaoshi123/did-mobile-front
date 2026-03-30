# DID Mobile Front — AI-Coding 方案总体分析报告

> **项目**: DID Mobile Front（企业级数字身份移动端）
> **技术栈**: Vue 3.4 + TypeScript 4.9 + uni-app 3.0 + Pinia 3.0 + TDesign UniApp 0.7 + Vite 5.2
> **目标平台**: H5 / 微信小程序 / 支付宝小程序 / App（iOS + Android）
> **报告日期**: 2026-03-30
> **分析对象**: `.codebuddy/` 目录下 10 个 Skills + 12 个 Rules + 2 个 Commands + 7 份 Memory + Spec 工作流全链路

---

## 一、方案总览

### 1.1 架构设计：三层流水线

```
设计稿截图
    ↓
┌─────────────────────────────────┐
│ 👁️ 第一层：design-analysis       │ → 产出 UI 清单文档
│    （视觉分析）                    │   docs/ui-analysis/<name>-ui-inventory.md
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ 🧠 第二层：create-proposal       │ → 产出 Spec 实施计划
│    （智能编排）                    │   docs/specs/<name>-spec.md
└─────────────────────────────────┘
    ↓  用户确认定稿
┌─────────────────────────────────┐
│ 🤚 第三层：execute-proposal       │ → 逐个调用下游 Skill 执行
│    + 7 个 create-xxx Skills      │   产出实际代码文件
│    + tdesign-uniapp 参考库        │
└─────────────────────────────────┘
```

| 层级 | Skill | 职责 | 输入 | 输出 |
|------|-------|------|------|------|
| 视觉层 | `design-analysis` | 截图 → UI 清单 | 设计稿截图（1~N 张） | `docs/ui-analysis/<name>-ui-inventory.md` |
| 编排层 | `create-proposal` | 需求 → Spec 计划 | UI 清单 + API 清单 + 交互说明 | `docs/specs/<name>-spec.md` |
| 执行层 | `execute-proposal` | Spec → 逐任务执行 | 定稿 Spec | 调用下游 Skill |
| 执行层 | `create-sfc` | 创建/修改 Vue SFC | Spec 任务描述 | `.vue` 文件 |
| 执行层 | `create-api` | 封装 HTTP 接口 | 接口文档 | `http/services/**/*.ts` |
| 执行层 | `create-hook` | 创建 Composable | 需求描述 | `hooks/use-xxx.ts` |
| 执行层 | `create-util` | 创建工具函数 | 需求描述 | `utils/*.ts` |
| 执行层 | `create-store` | 创建 Pinia Store | 需求描述 | `store/*.ts` |
| 执行层 | `create-route` | 配置页面路由 | 路由需求 | `pages.json` + `routes.ts` |
| 参考库 | `tdesign-uniapp` | 65 组件 + 5 指南 API 文档 | — | 组件用法参考 |

### 1.2 规则体系：12 个 Rule 文件

| 编号 | Rule | 作用域 | 加载方式 |
|------|------|--------|----------|
| 01 | 项目概述 | 全局背景 | requested（按需） |
| 02 | 编码规范 | TS / Vue / 命名 | always apply（自动） |
| 03 | 项目结构 | 目录约束 | requested |
| 04 | 组件规范 | 组件分类与契约 | requested |
| 05 | API 规范 | HTTP 架构与约束 | requested |
| 06 | 路由规范 | 路由配置与跳转 | requested |
| 07 | 状态管理 | Pinia Store 约束 | requested |
| 08 | 样式规范 | SCSS / CSS Variables | requested |
| 09 | 工具函数规范 | utils 组织与导出 | requested |
| 10 | Hooks 规范 | Composable 边界与命名 | requested |
| 11 | 多端适配 | 条件编译 + API 兼容 | requested |
| 12 | Spec 产出规范 | Spec 格式约束 | always apply |

### 1.3 核心设计理念

1. **Rule/Skill 分离**: Rule = 声明式约束（做什么/不做什么），Skill = 操作流程（怎么做）。Rule 间不互引，Skill 引用 Rule 形成规则链
2. **Spec 驱动开发**: 所有功能开发必须经 Spec → 用户确认 → 执行的流程，Spec 是决策档案
3. **人机协作关卡**: AI 不自主决策，所有关键决策点必须用户确认
4. **代码真相源**: 每次 Skill 执行前扫描代码库获取最新状态，不靠记忆
5. **复用优先**: 能复用现有资源就复用，避免重复建设

---

## 二、优点分析

### ✅ 2.1 完善的流程管控——从"随意生成"到"有序工程"

**这是方案最大的核心价值。**

传统 AI 辅助编码的最大问题是"想到哪写到哪"，AI 缺乏全局视野，容易遗漏依赖、重复建设、风格不一致。本方案通过三层流水线实现了：

- **视觉层**保证 UI 信息的结构化提取，而非让 AI 自由发挥
- **编排层**保证需求拆解的完整性和依赖顺序的正确性
- **执行层**保证每个任务按统一 SOP 产出，代码风格一致

**核心指标**：登录页经历 3 次完整迭代（从失败到成功），每次失败都能定位到 Skill/Rule 缺陷并修复，形成了可复盘、可追溯的质量闭环。

### ✅ 2.2 Rule/Skill 分离架构——解耦程度高

| 维度 | Rule | Skill |
|------|------|-------|
| 性质 | 声明式约束 | 操作性流程 |
| 生命周期 | 长期稳定 | 随流程优化迭代 |
| 互引关系 | 彼此不引用 | 引用 Rule 形成规则链 |
| 变更影响 | 修改 Rule 自动影响所有引用它的 Skill | 修改 Skill 不影响其他 Skill |

这种架构的好处：
- **修改收敛**：修改"API 调用方式"只需改 `05-API规范` 一处，所有引用它的 Skill 自动遵循
- **组合灵活**：`create-sfc` 可以引用 04/05/06/08/09/10 六个 Rule，而 `create-api` 只引用 05
- **避免漂移**：组件创建逻辑只在 `create-sfc` 一处，不会因多处维护导致不一致

### ✅ 2.3 迭代驱动的自我修复机制

从 Memory 文件记录可以看到，方案经历了大量实战检验：

| 日期 | 事件 | Skill/Rule 修复 |
|------|------|-----------------|
| 03-20 | 首次 Spec 生成：AI 自行发明 Store、用错 HTTP 响应模式、不复用 Hook | create-proposal 新增 3 条核心原则 + 4 项检查清单 |
| 03-20 | Spec 包含 80 行代码块 | create-proposal 新增"禁止代码块"原则 |
| 03-20 | AI 跳过草稿直接定稿 | create-proposal 强制草稿阶段 + 决策盲点分析 |
| 03-20 | Spec 塞入大量实现细节 | create-proposal v4 重大重写：回归流程控制本质 |
| 03-23 | TDesign 组件 API 用错（v-model / prefix-icon） | 创建 tdesign-uniapp Skill（65 组件文档内置） |
| 03-23 | API 响应用 try/catch 而非 if(res.ok) | create-sfc 新增 API 调用强制规范 |
| 03-23 | 占位图格式不统一 | design-analysis 统一 dummyimage.com URL 格式 |
| 03-23 | reactive() 对象导致请求体为空 | 代码级修复 + 经验沉淀 |

**关键认知**：这不仅是"修 bug"，而是一套**根因分析→Skill/Rule 修复→重新生成验证**的持续改进循环，体现了工程化思维。

### ✅ 2.4 人机决策边界清晰

`create-proposal` 的多次重写最终确立了明确的分工：

```
AI 角色 = 流程编排者（分析需求、发现盲点、拆解任务）
用户角色 = 决策者（确认方案、选择接口、决定交互细节）

AI 不猜、不推断、不发挥
用户未说明的 → 输出决策清单 → 用户确认
```

体现在以下机制中：
- **草稿→定稿两阶段**：AI 必须先输出草稿 + 决策盲点清单，用户确认后才定稿
- **API 使用清单强制化**：AI 不猜接口映射，必须用户提供或从候选列表中确认
- **Store 创建需确认**：AI 不能根据"常识"推断需要 Store

### ✅ 2.5 TDesign 组件库完整内置

将 65 个 TDesign UniApp 组件的 API 文档 + 5 个使用指南完整内置为 `tdesign-uniapp` Skill，解决了 AI 查阅外部文档不准确的核心痛点。这是登录页第一次实现失败（`prefix-icon` 用错、`v-model` 不可用）后的根本修复。

### ✅ 2.6 多端适配意识全链路贯穿

从 Rule（`11-多端适配`）到 Skill（所有 create-xxx 的检查清单均包含多端兼容检查），形成了：
- ECMAScript vs 宿主环境 API 的判断规则
- 条件编译语法使用规范
- 替代方案策略（uni API → npm 纯 JS 包 → 条件编译）

### ✅ 2.7 Memory 系统提供完整审计轨迹

7 个 Memory 文件（2026-03-13 ~ 03-23）完整记录了：
- 每个 Skill/Rule 的创建、修改原因和具体变更
- 每次代码生成的产出文件和功能点
- 每次失败的根因分析和修复方案
- 架构决策的演进过程

这为后续维护者提供了完整的"为什么这样设计"的上下文。

---

## 三、缺点与风险分析

### ⚠️ 3.1 Skill 复杂度膨胀——维护成本高

**核心问题**：`create-proposal` 的 SKILL.md 已达 **1028 行**，经历了 v1→v4 四个大版本重写。

| Skill | 行数 | 复杂度 |
|-------|------|--------|
| create-proposal | ~1028 | 极高（7 步工作流 + 变更模式 + 决策盲点 + API 确认分支） |
| create-sfc | ~509 | 高（4 种行为模式 + 场景一/二） |
| create-route | ~356 | 中等 |
| create-api | ~314 | 中等 |
| execute-proposal | ~285 | 中等 |
| create-hook | ~242 | 中等 |
| create-util | ~205 | 中等 |
| create-store | ~203 | 中等 |
| design-analysis | ~159 + 7 个子文件 | 中等 |

**风险**：
- 超长 Skill 文件会显著消耗 AI 的上下文窗口，可能导致执行时遗漏末尾规则
- 每次修复都是"补丁式追加"，缺乏定期的结构性重构
- 新维护者理解 `create-proposal` 的完整逻辑需要较高的认知成本

### ⚠️ 3.2 Spec 工作流过于重度——效率瓶颈

当前流程的完整链路：

```
截图分析（design-analysis）
    ↓ 用户提供截图
UI 清单产出
    ↓
需求分析（create-proposal 第0~2步）
    ↓ 用户提供 API 清单 + 交互说明
草稿 Spec + 决策盲点（第3~4步）
    ↓ 用户逐项确认决策
定稿 Spec（第5步）
    ↓ 用户确认执行
逐任务执行（execute-proposal + create-xxx）
    ↓
代码产出
```

**问题**：
- 对于简单页面（如纯展示页、简单列表页），完整流程的**沟通成本远超编码成本**
- 用户需要在多个节点进行确认（API 清单、决策盲点、草稿定稿、执行触发），交互轮次多
- 没有"轻量级通道"——一个简单的工具函数添加也需要通过 Spec 流程（虽然 Spec 规范说"全局改动不走 Spec"，但边界模糊）

**数据佐证**：登录页经历 3 次迭代，每次都是完整的 Spec 生成→确认→执行循环，总耗时显著

### ⚠️ 3.3 过度依赖 AI 上下文理解——规则遵循率不稳定

从 Memory 记录的失败案例可以看出，即使规则已经写入 Skill，AI 仍可能：
- 不读取指定文件（如不读 `src/http/core/types.ts` 就猜测 API 响应模式）
- 使用错误的组件 API（即使有 tdesign-uniapp Skill）
- 在长 Skill 中遗漏末尾的检查清单项

**根因**：AI 的规则遵循是概率性的，不是确定性的。Skill 越长、规则越多，遵循率越低。

### ⚠️ 3.4 缺少自动化验证——全靠人工 Review

当前方案的质量保障完全依赖：
1. Skill 中的检查清单（AI 自检，但遵循率不稳定）
2. 用户人工 Review（Spec 确认 + 代码检查）
3. Lint 检查（仅覆盖语法层面）

**缺失的验证手段**：
- 无单元测试框架和测试 Skill
- 无端到端测试
- 无自动化的 UI 截图对比
- 无类型覆盖率检查
- 无 Skill 执行结果的自动验证（如检查产出文件是否符合 Rule）

### ⚠️ 3.5 知识固化滞后——TDesign 版本锁定风险

`tdesign-uniapp` Skill 内置了 65 个组件的 API 文档，对应 `@tdesign/uniapp@0.7.3`。当组件库升级时：
- 内置文档不会自动更新
- 旧文档可能导致生成不兼容的代码
- 需要人工重新生成/更新 70 个 markdown 文件

### ⚠️ 3.6 Memory 系统未结构化——难以程序化利用

当前 Memory 以自由文本 markdown 形式记录，内容详尽但：
- 无标准化标签/分类（如 `bug-fix`、`skill-update`、`architecture-decision`）
- 无关联索引（如"这次修复关联了哪些 Skill/Rule"）
- 体积会持续增长，AI 读取全部 Memory 的成本越来越高
- 没有自动归档/摘要机制

### ⚠️ 3.7 Skill 间耦合——create-proposal 是超级枢纽

`create-proposal` 承担了过多职责：
- 需求分析
- API 确认（3 分支流程）
- 决策盲点发现
- 任务拆解
- Spec 文档生成
- 变更模式管理

如果 `create-proposal` 的某条规则有误，会级联影响所有页面的开发流程。这是系统的**单点故障源**。

### ⚠️ 3.8 缺少组件级复用度量

当前方案强调"复用优先"，但没有度量手段：
- 不知道通用组件的复用率
- 不知道哪些页面级组件应该提升为通用组件
- 没有组件依赖图的自动生成

---

## 四、待优化项

### 🔧 4.1 引入轻量级通道（高优先级）

**现状**：所有功能开发都走 Spec 全流程
**建议**：建立任务分级机制

| 级别 | 场景 | 流程 |
|------|------|------|
| L1 - 微型 | 改个文案、加个样式、修个 bug | 直接用 create-xxx Skill，不走 Spec |
| L2 - 轻量 | 添加简单工具函数、修改单一组件 | 简化 Spec（只做任务列表，跳过决策盲点） |
| L3 - 标准 | 新建页面、多文件联动 | 完整 Spec 流程 |
| L4 - 重大 | 跨页面重构、架构变更 | 完整 Spec + 影响分析 |

可在 `create-proposal` 入口处根据用户描述的复杂度自动推荐级别，用户确认后进入对应通道。

### 🔧 4.2 Skill 拆分与模块化（高优先级）

**建议**：将 `create-proposal` 拆分为更小的模块

```
create-proposal/
├── SKILL.md              ← 主入口（精简为流程编排 + 模式判断）
├── rules/
│   ├── output-spec.md    ← Spec 模板（已有）
│   ├── api-confirm.md    ← API 确认 3 分支逻辑（从主文件拆出）
│   ├── decision-scan.md  ← 决策盲点扫描规则（从主文件拆出）
│   └── task-split.md     ← 任务拆解规则（从主文件拆出）
```

效果：主文件从 1028 行降到 300~400 行，子模块按需加载。

### 🔧 4.3 补充自动化测试 Skill（高优先级）

**建议**：创建 `create-test` Skill

- 支持单元测试（Vitest）和组件测试
- 与 `create-hook`、`create-util`、`create-store` 联动
- 在 `execute-proposal` 执行完成后自动触发测试任务
- 检查清单新增"测试覆盖"检查项

### 🔧 4.4 Skill 执行结果验证机制（中优先级）

**建议**：在每个 create-xxx Skill 执行完成后，增加自动验证步骤

```
Skill 执行完成
    ↓
自动验证（新步骤）:
  1. TypeScript 类型检查（vue-tsc --noEmit）
  2. 文件存在性检查（产出文件是否都创建了）
  3. 导出注册检查（index.ts 是否已更新）
  4. 基础规范检查（命名、import 方式）
    ↓
验证通过 → 标记完成
验证失败 → 自动修复 or 报告用户
```

### 🔧 4.5 TDesign 文档自动更新机制（中优先级）

**建议**：
- 在 `package.json` 中记录当前文档对应的 TDesign 版本
- 创建一个脚本从 TDesign 仓库/npm 自动抓取最新组件文档
- 版本升级时运行脚本自动更新 70 个 markdown 文件
- 在 `tdesign-uniapp/SKILL.md` 中标注文档版本号

### 🔧 4.6 Memory 结构化改造（中优先级）

**建议**：

```yaml
# Memory 条目格式
- date: 2026-03-23
  type: bug-fix          # bug-fix | skill-update | rule-update | architecture-decision | code-delivery
  summary: "TDesign t-input prefix-icon 用法修正"
  affected:
    - .codebuddy/skills/create-sfc/SKILL.md
    - src/pages/login/index.vue
  root-cause: "AI 未查阅 tdesign-uniapp Skill 文档"
  tags: [tdesign, component-api, login]
```

结构化后可实现：
- 按类型筛选（只看 bug-fix）
- 按 Skill 关联（这个 Skill 改过几次、为什么改）
- 自动摘要（超过 N 条后归档旧条目）

### 🔧 4.7 多人协作支持（低优先级）

当前方案面向单人开发场景。多人协作时需要考虑：
- Spec 文件的并发修改冲突
- Memory 文件的合并策略
- Skill/Rule 变更的版本管理和通知机制

### 🔧 4.8 Skill 版本管理（低优先级）

当前 Skill 没有版本号，每次修改直接覆盖。建议：
- 在 SKILL.md 头部添加 `version` 字段
- Memory 中记录 Skill 版本变更
- 重大重写时保留旧版本备份

---

## 五、生产环境可行性分析

### 5.1 评估维度

| 维度 | 评分 | 说明 |
|------|------|------|
| 代码质量 | ⭐⭐⭐⭐ | TypeScript 严格模式、0 lint 错误、统一的命名规范和代码组织 |
| 架构完整性 | ⭐⭐⭐⭐ | HTTP 封装、拦截器链、Store 管理、路由守卫、工具函数体系完善 |
| 多端兼容 | ⭐⭐⭐⭐ | 全链路贯穿多端适配意识，条件编译规范明确 |
| 流程可控性 | ⭐⭐⭐⭐⭐ | Spec 驱动 + 人工确认关卡 + 决策盲点扫描，不会出现"AI 失控" |
| 开发效率 | ⭐⭐⭐ | 流程完善但偏重，简单任务的交互轮次多 |
| 可维护性 | ⭐⭐⭐ | Skill/Rule 分离好，但核心 Skill 复杂度高，新人上手成本大 |
| 测试覆盖 | ⭐⭐ | 缺少自动化测试框架，全靠人工验证 |
| 可扩展性 | ⭐⭐⭐⭐ | 新增 Skill/Rule 的机制成熟，已有 10 个 Skill 证明可扩展性 |

### 5.2 生产可行性结论

#### ✅ 可以投入生产的方面

1. **基础设施层已就绪**
   - HTTP 请求封装（`ApiRequest` + 拦截器链 + `CoreResponse<T>`）成熟
   - Storage 工具函数（带过期时间、类型安全）完善
   - 路由管理（常量 + 工具函数 + 守卫框架）齐备
   - 11 个 API 函数已实现，类型定义完整

2. **代码产出质量可控**
   - 严格 TypeScript（无 `any`、`verbatimModuleSyntax`）
   - 统一的组件/Store/Hook 编写模板
   - 0 lint 错误的产出标准
   - TDesign 组件 API 文档内置，减少错误使用

3. **需求管理有据可循**
   - Spec 作为决策档案可追溯
   - Memory 提供完整的变更历史
   - 用户确认机制保证需求不偏离

4. **多端兼容有保障**
   - 全链路多端检查（Rule 约束 + Skill 检查清单）
   - ECMAScript vs 宿主环境 API 的严格区分
   - 条件编译使用规范

#### ⚠️ 投入生产前需要补齐的短板

| 短板 | 风险等级 | 建议 |
|------|----------|------|
| 无自动化测试 | 🔴 高 | 接入 Vitest，创建 `create-test` Skill，至少覆盖 Hooks/Utils/Store |
| 无 CI/CD 集成 | 🔴 高 | 配置 GitHub Actions / GitLab CI，包含 lint + type-check + test |
| 无错误监控 | 🟡 中 | 接入 Sentry 或同类服务，覆盖多端错误上报 |
| 无性能基线 | 🟡 中 | 建立首屏加载时间、包体积等基线指标 |
| 缺少页面骨架 | 🟡 中 | 当前仅登录页 + 注册页 + 首页，核心业务页面尚未开发 |
| Skill 维护成本 | 🟡 中 | 定期重构 `create-proposal`，拆分子模块 |
| 无权限/安全审计 | 🟡 中 | token 管理、接口鉴权、敏感数据脱敏需专项设计 |

#### 5.3 推荐的生产上线路径

```
Phase 1 — 基础补齐（1~2 周）
├── 接入 Vitest + 编写核心模块测试
├── 配置 CI/CD（lint + type-check + test）
├── 接入错误监控
└── 建立包体积基线

Phase 2 — 核心业务开发（按需求排期）
├── 使用 AI-Coding 方案开发业务页面
├── 每个页面走完整 Spec 流程
├── 每完成 3~5 个页面做一次 Skill 复盘
└── 积累通用组件库

Phase 3 — 效率优化（与 Phase 2 并行）
├── 引入轻量级通道
├── 拆分 create-proposal 子模块
├── TDesign 文档自动更新机制
└── Memory 结构化改造

Phase 4 — 规模化验证
├── 多人协作支持
├── Skill 版本管理
├── 自动化 UI 对比测试
└── 组件复用度量
```

---

## 六、总结

### 6.1 方案定位

本项目的 AI-Coding 方案是一套**面向企业级多端应用的 Spec 驱动型 AI 辅助开发框架**，核心价值在于：

1. 将 AI 从"随意生成代码"升级为"按流程、有标准、可追溯的工程化开发"
2. 通过 Rule/Skill 分离实现了"约束稳定、流程灵活"的架构
3. 通过人机协作关卡保证了需求不偏离、AI 不失控

### 6.2 方案成熟度评估

| 层面 | 成熟度 | 说明 |
|------|--------|------|
| 架构设计 | 🟢 成熟 | 三层流水线 + Rule/Skill 分离，经过多轮验证 |
| 规则体系 | 🟢 成熟 | 12 个 Rule 覆盖全面，职责边界清晰 |
| Skill 体系 | 🟡 可用 | 10 个 Skill 功能完整，但核心 Skill 复杂度偏高 |
| 质量保障 | 🟡 需补强 | 有 Lint + 检查清单，缺自动化测试和 CI/CD |
| 效率体验 | 🟡 需优化 | 流程完善但交互轮次多，缺轻量级通道 |
| 生产就绪 | 🟡 条件性就绪 | 补齐测试/CI/监控后可生产使用 |

### 6.3 最终建议

1. **短期**（立即）：补齐自动化测试和 CI/CD，这是生产上线的硬性前提
2. **中期**（1~2 月）：引入轻量级通道提升效率，拆分 `create-proposal` 降低维护成本
3. **长期**：建立 Skill 版本管理、TDesign 自动更新、Memory 结构化，为规模化使用奠定基础

**核心结论**：本方案在流程管控和代码质量保障方面表现优异，是目前 AI-Coding 实践中较为成熟的工程化方案。其最大优势是"可复盘、可修复"的质量闭环，最大短板是效率和自动化验证的缺失。补齐短板后，完全具备支撑生产环境开发的能力。
