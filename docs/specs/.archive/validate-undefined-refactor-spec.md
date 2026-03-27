# 校验函数返回值策略改造（undefined 语义） — 实施计划（Spec）

> **状态**：✅ 已完成
> **关联 UI 清单**：无
> **关联 API 文档**：无
> **关联交互文档**：无
> **生成日期**：2026-03-27

---

## 一、需求摘要

### 功能概述

将校验工具函数的返回值策略从 `true | string` 改为 `string | undefined`。校验通过时返回 `undefined`（falsy），校验不通过时返回错误信息字符串（truthy）。这样业务层可以使用 `!` 直接取反判断，无需写 `=== true`，代码更简洁。同时修改注册页业务逻辑，适配新的返回值策略。

### 交互要点

- 不修改 `useFormValidation` Hook 本身，仅在页面中设置 validator 函数时做适配
- 校验通过：函数返回 `undefined`
- 校验不通过：函数返回错误信息字符串
- `getContactType` 等内部消费方适配为 `!` 取反判断

---

## 二、任务清单（Task List）

| 序号 | 任务名称 | 触发 Skill | 依赖 | 状态 |
|------|---------|-----------|------|------|
| T1 | 改造校验工具函数返回值策略为 string \| undefined | create-util | — | ✅ |
| T2 | 适配注册页业务逻辑中的 validator 配置 | create-logic | T1 | ✅ |

---

## 三、任务详情

### T1：改造校验工具函数返回值策略为 string | undefined

**触发 Skill**：`create-util`

**需求描述**：

修改 `src/utils/validate.ts` 中所有校验函数的返回值策略：
- 校验通过时返回 `undefined`（而非当前的 `true`）
- 校验不通过时返回错误信息字符串（保持不变）
- 函数返回值类型标注改为 `string | undefined`

同时修改 `getContactType` 函数中对校验函数返回值的判断方式，从 `=== true` 改为 `!` 取反判断（`undefined` 为 falsy，可直接用 `!` 判断通过）。

**使用的已有资源**：
- `src/utils/validate.ts`（现有文件，修改）

**预期产出**：
- [ ] `src/utils/validate.ts`（修改）

---

### T2：适配注册页业务逻辑中的 validator 配置

**触发 Skill**：`create-logic`

**需求描述**：

修改 `src/pages/register/index.vue` 中 `useFormValidation` 的 rules 配置中各字段的 validator 函数。由于不修改 `useFormValidation` Hook（其 validator 期望返回 `boolean | string`），需要在 validator 包装函数中将校验函数的新返回值（`string | undefined`）适配为 Hook 接受的格式：
- 校验函数返回 `undefined`（通过）时，validator 返回 `true`
- 校验函数返回 `string`（不通过）时，validator 原样返回该 string

对于 `phoneOrEmail` 字段，将 `!== true` 判断改为直接使用 truthy/falsy 判断。
对于 `confirmPassword` 字段，保留"两次密码一致性"校验逻辑在页面中。

**使用的已有资源**：
- `src/utils/validate.ts`（T1 改造后）
- `src/hooks/use-form-validation.ts`（直接使用，不修改）

**预期产出**：
- [ ] `src/pages/register/index.vue`（修改）

---

## 四、API 接口清单

无新增接口。

---

## 五、资源方案总览

### 工具函数

| 函数名 | 操作 | 需求概述 | 对应任务 |
|--------|------|---------|---------|
| isValidUserName | 修改 | 返回值从 `true \| string` 改为 `string \| undefined` | T1 |
| isPhone | 修改 | 返回值从 `true \| string` 改为 `string \| undefined` | T1 |
| isEmail | 修改 | 返回值从 `true \| string` 改为 `string \| undefined` | T1 |
| isValidPassword | 修改 | 返回值从 `true \| string` 改为 `string \| undefined` | T1 |
| isValidAdminName | 修改 | 返回值从 `true \| string` 改为 `string \| undefined` | T1 |
| getContactType | 修改 | 适配新返回值判断方式 | T1 |

### Hook

| Hook 名称 | 操作 | 需求概述 | 对应任务 |
|-----------|------|---------|---------|
| useFormValidation | 直接使用 | 不修改，在 validator 配置处做适配 | — |

---

## 六、决策记录

| # | 决策问题 | 用户决定 | 确认时间 |
|---|---------|---------|---------|
| D1 | 校验函数返回值策略 | 通过返回 `undefined`，不通过返回错误信息 `string` | 2026-03-27 |
| D2 | 是否修改 useFormValidation Hook | 不修改 Hook，只在页面 validator 函数处做适配 | 2026-03-27 |

---

## 七、执行顺序

1. T1：改造校验工具函数返回值策略
2. T2：适配注册页业务逻辑中的 validator 配置

---

## 变更记录

### v1 — 初始创建（2026-03-27）
- 将校验函数返回值从 `true | string` 改为 `string | undefined`
- 适配注册页 validator 配置
