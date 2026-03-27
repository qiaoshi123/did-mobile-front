# 校验函数命名重构 Spec

> **状态：✅ 已完成**
> **创建时间：2026-03-27**

## 需求摘要

`src/utils/validate.ts` 中的表单校验函数使用了 `is` 前缀（如 `isValidUserName`、`isPhone` 等），但这些函数的实际语义是「校验并返回错误信息字符串或 undefined」，而非「判断是否为某类型（返回布尔值）」。`is` 前缀与函数实际行为不符，需要统一改为 `validate` 前缀，并同步更新所有调用处的引用。

## 任务清单

| 序号 | 任务 | 执行方式 | 产出文件 |
|------|------|---------|---------|
| 1 | ✅ 重命名校验函数 + 更新统一导出 | `create-util` | `src/utils/validate.ts`、`src/utils/index.ts` |
| 2 | ✅ 更新注册页面中的引用 | `create-logic` | `src/pages/register/index.vue` |
| 3 | 更新发送验证码 Hook 中的引用 | `create-hook` | `src/hooks/use-send-code.ts` |

## 任务详情

### 任务 1：重命名校验函数 + 更新统一导出

**执行方式：`create-util`**

**需求描述：**

将 `src/utils/validate.ts` 中以下 5 个校验函数统一改为 `validate` 前缀命名：

| 旧名称 | 新名称 |
|--------|--------|
| `isValidUserName` | `validateUserName` |
| `isPhone` | `validatePhone` |
| `isEmail` | `validateEmail` |
| `isValidPassword` | `validatePassword` |
| `isValidAdminName` | `validateAdminName` |

- `getContactType` 函数保持不变（其返回类型字符串，`get` 前缀语义合理），但内部调用的旧函数名需要同步更新为新名称
- 函数的 JSDoc 注释和示例代码中的旧名称也需要同步更新
- 文件头部的模块注释保持不变
- 同步更新 `src/utils/index.ts` 中的导出名称

**已有资源：** 无需新增文件，仅修改现有文件

**预期产出：** 更新后的 `src/utils/validate.ts` 和 `src/utils/index.ts`

### 任务 2：更新注册页面中的引用

**执行方式：`create-logic`**

**需求描述：**

更新 `src/pages/register/index.vue` 中所有对旧校验函数名的引用，包括：

- 导入语句中的函数名
- 表单校验规则 `rules` 配置中对校验函数的调用

对照表与任务 1 一致，将所有 `isValidUserName`、`isPhone`、`isEmail`、`isValidPassword`、`isValidAdminName` 替换为对应的 `validate` 前缀新名称。

**已有资源：** 页面文件已存在，仅修改引用名称

**预期产出：** 更新后的 `src/pages/register/index.vue`

### 任务 3：更新发送验证码 Hook 中的引用

**执行方式：`create-hook`**

**需求描述：**

更新 `src/hooks/use-send-code.ts` 中所有对旧校验函数名的引用，包括：

- 从 `@/utils` 的导入语句中将 `isPhone`、`isEmail` 替换为 `validatePhone`、`validateEmail`
- `getContactType` 仍从 `@/utils` 导入，无需修改

注意：`use-send-code.ts` 中并未直接调用 `isPhone` / `isEmail` 做校验，仅在导入列表中存在（实际校验由 `getContactType` 内部处理）。确认导入列表中是否仍需要这两个函数，如不需要则移除多余导入。

**已有资源：** Hook 文件已存在，仅修改引用名称

**预期产出：** 更新后的 `src/hooks/use-send-code.ts`

## 资源方案总览

| 资源类型 | 资源名称 | 操作 | 文件路径 |
|---------|---------|------|---------|
| Util | `validateUserName` | 重命名（原 `isValidUserName`） | `src/utils/validate.ts` |
| Util | `validatePhone` | 重命名（原 `isPhone`） | `src/utils/validate.ts` |
| Util | `validateEmail` | 重命名（原 `isEmail`） | `src/utils/validate.ts` |
| Util | `validatePassword` | 重命名（原 `isValidPassword`） | `src/utils/validate.ts` |
| Util | `validateAdminName` | 重命名（原 `isValidAdminName`） | `src/utils/validate.ts` |
| Util | `getContactType` | 仅更新内部调用 | `src/utils/validate.ts` |
| Util 导出 | `index.ts` | 更新导出名 | `src/utils/index.ts` |
| 页面 | 注册页 | 更新引用 | `src/pages/register/index.vue` |
| Hook | `useSendCode` | 更新引用 | `src/hooks/use-send-code.ts` |

## 决策记录

| 决策项 | 决策结果 | 说明 |
|--------|---------|------|
| 校验函数命名前缀 | 统一使用 `validate` 前缀 | 符合项目工具函数规范中校验类函数的命名约定 |
| `getContactType` 是否改名 | 保持不变 | 该函数返回类型字符串，`get` 前缀语义合理 |

## 执行顺序

1. **任务 1**（重命名校验函数 + 更新导出） — 基础依赖，必须先执行
2. **任务 2**（更新注册页面引用）— 依赖任务 1
3. **任务 3**（更新 Hook 引用）— 依赖任务 1，可与任务 2 并行

## 变更记录

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| v1.0 | 2026-03-27 | 初始定稿 |
