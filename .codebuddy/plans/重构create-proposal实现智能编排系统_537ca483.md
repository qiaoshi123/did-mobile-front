---
name: 重构create-proposal实现智能编排系统
overview: 重构create-proposal技能，实现多任务自由编排系统，包括智能编排引擎、复用优先分析、抽离决策机制、归档功能
todos:
  - id: rewrite-skill-file
    content: 使用 [skill:skill-creator] 重写 create-proposal/SKILL.md，实现智能编排引擎、复用分析、抽离决策、归档管理四大核心模块
    status: completed
  - id: create-archive-dir
    content: 创建归档目录结构 docs/specs/.archive/ 并添加 README 说明
    status: completed
    dependencies:
      - rewrite-skill-file
  - id: update-docs
    content: 更新现有提案文档格式，适配新的任务编排结构
    status: completed
    dependencies:
      - rewrite-skill-file
---

## 产品概述

重构 create-proposal 技能，实现智能化的多任务自由编排系统，支持根据设计稿、API文档、交互文档等输入源动态生成任务组合。

## 核心功能

### 1. 智能编排引擎

- 根据输入源（设计稿/API文档/交互文档）动态生成任务组合，非固定模板
- 支持单页面开发、跨页面修改、多组件联动、全局重构等复杂场景
- 自动分析任务依赖关系，按正确顺序排列

### 2. 复用优先分析

- 组件复用优先级：本地通用组件 → TDesign组件 → 二次封装 → 新建
- Hook/Util/Store复用：扫描代码库查找可复用资源
- 决策输出：复用 / 修改现有 / 新建（优先级递减）

### 3. 抽离决策机制

- AI自动识别可抽离的组件/Hook/Util，输出决策清单供用户确认
- 单页面也能分析抽离机会（基于复杂度+通用性+复用预测）
- 用户决策后再生成任务

### 4. 提案文档管理

- 代码作为真相源，每次生成提案都全新分析代码库
- 活跃文档只包含当前迭代任务
- 归档机制保留历史记录

## 技术方案

### 核心修改文件

- `.codebuddy/skills/create-proposal/SKILL.md` — 完全重写

### 功能模块设计

#### 模块1：输入分析器

识别用户提供的输入源类型，分别处理：

- 设计稿 → 触发 design-analysis → 生成 UI 清单
- API文档 → 直接解析
- 交互文档 → 直接解析
- 口述需求 → 直接分析

#### 模块2：代码库扫描器

扫描现有资源建立清单：

- `src/components/index.ts` → 通用组件
- `src/hooks/index.ts` → Hook 清单
- `src/utils/index.ts` → Util 清单
- `src/store/index.ts` → Store 清单
- `src/http/services/` → API 清单
- `src/pages/` → 页面及页面级组件

#### 模块3：复用分析引擎

需求 → 现有资源匹配 → 决策输出

- 组件匹配：名称相似 + 结构相似 + 样式相似
- Hook匹配：功能相似 + API相似
- Util匹配：功能相同 + 参数兼容

#### 模块4：抽离决策引擎

UI清单 + 代码库 → 抽离分析 → 决策清单

- 组件抽离：复杂度(≥3层/≥2交互) + 通用性 + 复用预测
- Hook抽离：多页面共享 + 复杂状态管理
- Util抽离：纯函数 + 无Vue API依赖

#### 模块5：任务编排引擎

决策结果 → 任务拆分 → 依赖分析 → 排序

- 任务类型：create-api → create-store → create-hook/util → create-ui(组件) → create-ui(页面) → create-logic

#### 模块6：归档管理器

归档已完成任务到 `docs/specs/.archive/<page>/<version>-tasks.md`

### 工作流程

#### 全新开发流程

```
用户提供输入 → 输入分析 → 代码库扫描 → 复用分析 → 抽离分析 → 输出决策清单 → 用户确认 → 任务编排 → 生成提案 → 用户确认 → 执行
```

#### 增量迭代流程

```
用户提供新需求 → 代码库扫描（代码为真相源）→ 分析新增/修改点 → 复用分析 → 抽离分析 → 输出决策清单 → 用户确认 → 更新提案 → 执行
```

### 目录结构

```
.codebuddy/skills/create-proposal/
├── SKILL.md              # [MODIFY] 主技能文件，完全重写
└── rules/                # [KEEP] 现有规则文件保持不变

docs/specs/
├── <name>-spec.md        # 活跃文档（当前迭代任务）
└── .archive/             # [NEW] 归档目录
    └── <name>/
        └── <version>-tasks.md
```

### 关键规则

#### 组件复用优先级（遵循04-组件规范）

1. 本地通用组件 (`src/components/`)
2. TDesign 组件
3. 新建组件

> 注意：去掉了"二次封装"层级，TDesign不满足需求时直接新建组件

#### 抽离判断规则

**核心原则**：所有资源创建都需要用户确认，AI不做自主决策

- **组件**：
- 用户明确说明 → 直接生成任务
- 用户未说明 → AI分析后输出决策清单
- 判断依据：结构≥3层 或 交互≥2个 或 符合通用组件特征

- **Hook**：
- 用户明确说明 → 直接生成任务
- 用户未说明 → AI分析后输出决策清单
- 判断依据：多页面共享逻辑 或 复杂状态管理

- **Util**：
- 用户明确说明 → 直接生成任务
- 用户未说明 → AI分析后输出决策清单
- 判断依据：纯计算/转换/校验函数，无Vue API依赖

- **Store**：
- 用户明确说明 → 直接生成任务
- 用户未说明 → AI分析后输出决策清单
- 判断依据：需要全局状态管理 或 跨多个页面共享状态

#### 职责边界

- create-proposal：判断 + 决策 + 编排
- create-ui：只负责UI（模板+样式）
- create-logic：只负责逻辑
- create-hook/util/store/api：只负责执行，不做抽离判断

## Skill

- **skill-creator**
- Purpose: 创建有效的技能文件，确保格式正确
- Expected outcome: 生成符合规范的 SKILL.md 文件