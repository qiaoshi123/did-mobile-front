---
name: create-util
description: 创建、编写工具函数。当用户提到以下任意场景时必须使用此技能：写工具函数、新建工具函数、封装工具方法、添加utils、写个格式化函数、写个校验函数。触发关键词包括但不限于：工具函数、utils、util、工具方法、格式化函数、校验函数、辅助函数、helper、写个函数到utils、封装一个方法。只要涉及在 src/utils/ 下新建或修改工具函数文件的工作，都应该触发此技能。
allowed-tools: []
disable: false
---

# 创建工具函数

## 必须遵循的规范

执行此技能前，**必须先读取以下 Rule 文件**，所有生成的代码须严格遵守：

- `.codebuddy/rules/09-工具函数规范.mdc` — 文件组织、命名约定、导出方式、使用优先级、分类标准

> 编码规范（TypeScript、命名约定）已作为 always apply rule 自动生效，无需手动读取。

---

## 支持场景

1. **新建工具函数文件**（高频）— 在 `src/utils/` 下创建新文件并编写函数
2. **在已有工具文件中追加函数**（高频）— 向已有的模块文件中添加新函数
3. **新建工具函数并追加到已有文件**（中频）— 功能属于已有分类但函数不存在

---

## 步骤总览

0. **确认函数定位**（必须先做）— 确定归属、命名、放在哪个文件
1. **创建/定位目标文件** — 新建文件或找到已有文件
2. **编写函数代码** — 类型 + 实现 + JSDoc
3. **更新统一导出** — 在 `src/utils/index.ts` 中注册

---

## 第 0 步（必须先做）：确认函数定位

> ⚠️ **每次新增工具函数时都必须执行，不可跳过。**

### 0.1 检查是否已有同类函数

> ⚠️ **必须先执行此检查，禁止跳过。**

**读取 `src/utils/index.ts`**，查看当前所有已导出的工具函数：

| 检查结果 | 处理方式 |
|---------|---------|
| 已有完全相同功能的函数 | **告知用户**："已有工具函数 `xxx()`，建议直接使用"，不重复创建 |
| 已有相似功能的函数 | **询问用户**："已有 `xxx()`，新需求是扩展它还是另建一个？" |
| 无同类函数 | 正常继续后续步骤 |

**同时检查 uni-app 是否有内置 API 能满足需求**（如 `uni.showToast()`、`uni.getSystemInfoSync()` 等），如果有则告知用户不需要额外封装（除非需要统一行为）。

### 0.3 确定文件归属

| 信息 | 说明 | 示例 |
|------|------|------|
| 函数名称 | camelCase，遵循命名前缀规范 | `formatDate()`、`isPhone()`、`parseQuery()` |
| 目标文件 | 同类函数放同一文件 | 格式化 → `format.ts`；校验 → `validate.ts` |
| 是新建文件还是追加 | 判断目标文件是否已存在 | 已有 `format.ts` → 追加；没有 → 新建 |

**函数命名前缀参考：**

| 函数类别 | 命名前缀/模式 | 示例 |
|---------|-------------|------|
| 格式化 | `format` 前缀 | `formatDate()`、`formatPrice()` |
| 校验 | `is` / `validate` 前缀 | `isEmail()`、`isPhone()` |
| 类型判断 | `is` 前缀 | `isString()`、`isEmpty()` |
| 转换 | `to` / `parse` 前缀 | `toNumber()`、`parseQuery()` |
| 获取 | `get` 前缀 | `getSystemInfo()` |
| 设置 | `set` 前缀 | `setStorage()` |

---

## 第 1 步：创建/定位目标文件

### 新建文件

文件路径：`src/utils/<module-name>.ts`

文件名使用 kebab-case（如 `date-format.ts`、`validate.ts`）。

### 追加到已有文件

直接读取已有文件内容，在合适的位置追加新函数。

---

## 第 2 步：编写函数代码

### 标准模板

```typescript
// src/utils/<module-name>.ts

/**
 * 一句话描述函数用途
 * @param paramName - 参数说明
 * @returns 返回值说明
 * @example
 * ```ts
 * const result = formatDate(new Date(), 'YYYY-MM-DD')
 * // => '2025-03-20'
 * ```
 */
export const formatDate = (date: Date, pattern: string): string => {
    // 实现逻辑
    return ''
}
```

### 带泛型的模板

```typescript
/**
 * 一句话描述函数用途
 * @param list - 原始数组
 * @param key - 用于去重的字段名
 * @returns 去重后的数组
 */
export const uniqueBy = <T>(list: T[], key: keyof T): T[] => {
    const map = new Map<unknown, T>()
    for (const item of list) {
        const k = item[key]
        if (!map.has(k)) {
            map.set(k, item)
        }
    }
    return [...map.values()]
}
```

### 带类型守卫的模板（类型判断函数）

```typescript
/**
 * 判断值是否为非空字符串
 * @param value - 待判断的值
 * @returns 是否为非空字符串
 */
export const isNonEmptyString = (value: unknown): value is string => {
    return typeof value === 'string' && value.length > 0
}
```

### 编写要点

- 使用 `export const` + 箭头函数，禁止 `export default`
- 入参和返回值必须有明确的 TypeScript 类型，禁止 `any`
- 必须有完整的 JSDoc 注释（`@param`、`@returns`、`@example`）
- 如函数需要复杂的入参/返回值类型，在同文件顶部用 `interface` / `type` 定义
- 纯类型导出使用 `export type`
- 函数应是纯函数（相同输入 → 相同输出），不依赖外部可变状态
- 函数内不要使用 Vue 响应式 API（`ref`/`computed` 等），那是 Hook 的职责

---

## 第 3 步：更新统一导出

在 `src/utils/index.ts` 中追加导出。

### 新建文件时

添加新的导出分组：

```typescript
// ========== 模块名 ==========
/** 模块功能简述 */
export { formatDate, formatPrice } from './format'
export type { FormatOptions } from './format'
```

### 追加到已有文件时

在对应的分组下追加新函数的导出：

```typescript
// ========== 格式化 ==========
/** 日期、价格等数据的格式化函数 */
export { formatDate, formatPrice, formatPhone } from './format'  // ← 追加 formatPhone
```

**导出规范：**
- 值导出和类型导出必须分开写（`verbatimModuleSyntax` 要求）
- 每组 re-export 必须有 `// ========== xxx ==========` 分组注释和 JSDoc 说明
- 新增函数时同步更新导出，不要遗漏

---

## 检查清单

- [ ] 已确认属于 utils（无状态纯函数），不属于 hooks / store / api / 页面内部
- [ ] 已读取 `src/utils/index.ts`，检查无同名/同功能函数
- [ ] 已检查 uni-app 是否有内置 API 满足需求
- [ ] 函数名遵循命名前缀规范（format/is/validate/to/parse/get/set）
- [ ] 同类函数放在同一文件中（如所有格式化函数放 `format.ts`）
- [ ] 使用了 `export const` + 箭头函数，无 `export default`
- [ ] 入参和返回值有明确的 TypeScript 类型，无 `any`
- [ ] 有完整的 JSDoc 注释（`@param`、`@returns`、`@example`）
- [ ] 值导出和类型导出分开写
- [ ] 已在 `src/utils/index.ts` 中注册导出，带分组注释
- [ ] 函数是纯函数，不依赖 Vue 响应式 API
