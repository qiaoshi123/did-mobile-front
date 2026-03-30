---
name: create-hook
description: 创建、编写可复用的 Composable（Hook）。当用户提到以下任意场景时必须使用此技能：创建Hook、写Hook、新建Hook、封装Hook、提取Hook、抽离Hook。触发关键词包括但不限于：hook、Hook、hooks、composable、useXxx、写hook、创建hook、新建hook、封装hook、提取hook、抽离hook。只要涉及在 src/hooks/ 下新建或修改 Hook 文件的工作，都应该触发此技能。
allowed-tools: []
disable: false
---

# 创建 Hook（Composable）

## 必须遵循的规范

执行此技能前，**必须先读取以下 Rule 文件**，所有生成的代码须严格遵守：

- `.codebuddy/rules/10-Hooks规范.mdc` — 命名约定、文件组织、提取时机、与 utils/store 的边界划分

> 编码规范（TypeScript、命名约定）已作为 always apply rule 自动生效，无需手动读取。

---

## 支持场景

1. **新建 Hook**（高频）— 在 `src/hooks/` 下创建新的 Composable
2. **在已有 Hook 中追加逻辑**（中频）— 扩展现有 Hook 的功能

---

## 场景一：新建 Hook

### 步骤总览

0. **确认 Hook 定位**（必须先做）— 确定名称、职责、确认是否属于 Hook
1. **创建 Hook 文件** — 在 `src/hooks/` 下新建
2. **编写 Hook 代码** — 类型定义 + 函数实现
3. **注册到统一导出** — 在 `src/hooks/index.ts` 中导出

### 第 0 步（必须先做）：确认 Hook 定位

> ⚠️ **每次新建 Hook 时都必须执行，不可跳过。**

**重名检查（必须执行）：**

确认名称后，立即检查 `src/hooks/` 目录下是否已有同名文件：

| 扫描结果 | 处理方式 |
|---------|---------|
| `src/hooks/use-<name>.ts` 不存在 | 正常继续后续步骤 |
| `src/hooks/use-<name>.ts` 已存在 | **询问用户**："已有 Hook `use<Name>`，是要修改现有 Hook 还是新建一个不同名称的？"用户确认修改 → 转场景二；用户要新建 → 换名后继续 |

**禁止未经检查直接创建文件，防止覆盖已有 Hook。**

**需确认以下信息：**

| 信息 | 说明 | 示例 |
|------|------|------|
| 文件名 | `use-xxx.ts`（kebab-case，`use-` 开头） | `use-loading.ts`、`use-pagination.ts` |
| 函数名 | `useXxx`（camelCase，`use` 开头） | `useLoading()`、`usePagination()` |
| 职责 | 这个 Hook 做什么 | "管理列表分页加载的状态与请求逻辑" |
| 入参 | 是否需要配置项（Options） | 有 → 定义 `UseXxxOptions`；无 → 无参 |

---

### 第 1 步：创建 Hook 文件

文件路径：`src/hooks/use-<name>.ts`

一个 Hook 对应一个文件，文件名与函数名对应。

---

### 第 2 步：编写 Hook 代码

#### 无配置项（简单场景）

```typescript
// src/hooks/use-<name>.ts
import { ref } from 'vue'

/** UseXxx 返回值类型 */
export interface UseXxxReturn {
    /** 状态描述 */
    someState: Ref<string>
    /** 方法描述 */
    doSomething: () => void
}

/**
 * 一句话描述 Hook 的用途
 * @returns Hook 返回的状态和方法
 * @example
 * ```ts
 * const { someState, doSomething } = useXxx()
 * ```
 */
export const useXxx = (): UseXxxReturn => {
    // ========== State ==========
    const someState = ref<string>('')

    // ========== Methods ==========
    const doSomething = () => {
        someState.value = 'done'
    }

    return {
        someState,
        doSomething,
    }
}
```

#### 有配置项（标准场景）

```typescript
// src/hooks/use-<name>.ts
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

/** UseXxx 配置项 */
export interface UseXxxOptions {
    /** 配置项描述 */
    pageSize?: number
    /** 是否自动执行 */
    immediate?: boolean
}

/** UseXxx 返回值类型 */
export interface UseXxxReturn {
    /** 状态描述 */
    loading: Ref<boolean>
    /** 数据列表 */
    list: Ref<unknown[]>
    /** 加载方法 */
    loadData: () => Promise<void>
    /** 重置方法 */
    reset: () => void
}

/**
 * 一句话描述 Hook 的用途
 * @param options - 配置项
 * @returns Hook 返回的状态和方法
 * @example
 * ```ts
 * const { loading, list, loadData } = useXxx({ pageSize: 20 })
 * ```
 */
export const useXxx = (options: UseXxxOptions = {}): UseXxxReturn => {
    const { pageSize = 10, immediate = false } = options

    // ========== State ==========
    const loading = ref(false)
    const list = ref<unknown[]>([])

    // ========== Methods ==========
    const loadData = async () => {
        loading.value = true
        try {
            // 具体逻辑
        } finally {
            loading.value = false
        }
    }

    const reset = () => {
        list.value = []
        loading.value = false
    }

    // ========== 初始化 ==========
    if (immediate) {
        loadData()
    }

    return {
        loading,
        list,
        loadData,
        reset,
    }
}
```

### 编写要点

- 使用 `export const` + 箭头函数，禁止 `export default`
- 入参类型定义为 `UseXxxOptions`，返回值类型定义为 `UseXxxReturn`
- **返回值必须是具名对象**，禁止返回数组
- 每个字段/方法必须有 JSDoc 注释
- 内部按 `State → Computed → Methods → 初始化` 分区，用注释分隔
- Hook 内部可以调用 Store（如 `useUserStore()`），但禁止直接修改其他页面状态
- 如需调用 API，从 `@/api` 导入对应函数

---

### 第 3 步：注册到统一导出

在 `src/hooks/index.ts` 中追加导出：

```typescript
/** 功能简述 */
export { useXxx } from './use-<name>'
export type { UseXxxOptions, UseXxxReturn } from './use-<name>'
```

**导出规范：**
- 值导出和类型导出必须分开写（`verbatimModuleSyntax` 要求）
- 必须附带 JSDoc 注释说明 Hook 的功能
- 类型（Options / Return）也要一并导出

---

## 场景二：在已有 Hook 中追加逻辑

### 操作步骤

1. **读取已有 Hook 文件**，了解现有的 state/methods/return
2. **在对应分区追加**：
   - 新增 state → 放在 `// ========== State ==========` 下
   - 新增 method → 放在 `// ========== Methods ==========` 下
3. **更新 return 对象**，补充新增的导出
4. **更新类型定义**：
   - 如新增了入参配置 → 更新 `UseXxxOptions`
   - 如新增了返回字段 → 更新 `UseXxxReturn`
5. **检查 `src/hooks/index.ts`**，确认新增的类型已被导出

---

## 检查清单

- [ ] 已确认属于 Hook（内部使用了 Vue 响应式 API），不属于 utils 或 store
- [ ] 已执行重名检查：确认 `src/hooks/` 下无同名文件，或已与用户确认处理方式
- [ ] 文件名为 `use-xxx.ts`（kebab-case，`use-` 开头）
- [ ] 函数名为 `useXxx`（camelCase，`use` 开头）
- [ ] 使用了 `export const` + 箭头函数，无 `export default`
- [ ] 定义了 `UseXxxOptions`（如有入参）和 `UseXxxReturn` 类型
- [ ] 返回值是具名对象，不是数组
- [ ] 每个 state/method/返回字段有 JSDoc 注释
- [ ] 函数有完整的 JSDoc（`@param`、`@returns`、`@example`）
- [ ] 已在 `src/hooks/index.ts` 中注册导出（值和类型分开）
- [ ] 所有代码符合 TypeScript 规范，无 `any` 类型
- [ ] Hook 内部没有直接修改其他页面的状态
- [ ] **多端兼容性检查**：Hook 中使用的每个全局 API / 构造函数，确认它属于 ECMAScript 语言规范而非浏览器/Node.js 宿主环境提供的；不确定时先搜索 MDN 确认其所属规范
