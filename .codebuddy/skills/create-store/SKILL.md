---
name: create-store
description: 创建、新增、修改 Pinia Store。当用户提到以下任意场景时必须使用此技能：创建Store、新建Store、添加Store、写Store、新增状态管理。触发关键词包括但不限于：store、Store、状态管理、pinia、新建store、创建store、添加store。只要涉及在 src/store/ 下新建或修改 Store 文件的工作，都应该触发此技能。
allowed-tools: []
disable: false
---

# 创建 Store

## 必须遵循的规范

执行此技能前，**必须先读取以下 Rule 文件**，所有生成的代码须严格遵守：

- `.codebuddy/rules/07-状态管理.mdc` — Store 写法、文件组织、持久化、命名约定、解构规则

> 编码规范（TypeScript、命名约定）已作为 always apply rule 自动生效，无需手动读取。

---

## 支持场景

1. **新建 Store 模块**（高频）
2. **在已有 Store 中追加状态/方法**（中频）

---

## 场景一：新建 Store 模块

### 步骤总览

0. **确认 Store 定位**（必须先做）— 确定模块名、职责边界、是否需要持久化
1. **创建 Store 文件** — 在 `src/store/` 下新建
2. **编写 Store 代码** — Composition API 风格
3. **注册到统一导出** — 在 `src/store/index.ts` 中导出

### 第 0 步（必须先做）：确认 Store 定位

> ⚠️ **每次新建 Store 时都必须执行，不可跳过。**

**重名检查（必须执行）：**

确认模块名称后，立即检查 `src/store/` 目录下是否已有同名文件：

| 扫描结果 | 处理方式 |
|---------|---------| 
| `src/store/<module-name>.ts` 不存在 | 正常继续后续步骤 |
| `src/store/<module-name>.ts` 已存在 | **询问用户**："已有 Store 模块 `<module-name>`，是要修改现有 Store 还是新建一个不同名称的？"用户确认修改现有 → 转场景二；用户要新建 → 换名后继续 |

**禁止未经检查直接创建文件，防止覆盖已有 Store。**

**需确认以下信息：**

| 信息 | 说明 | 示例 |
|------|------|------|
| 模块名称 | 英文小写，kebab-case，用作文件名 | `user`、`auth`、`did-detail` |
| Store ID | 传给 `defineStore` 的第一个参数，kebab-case | `'user'`、`'auth'`、`'did-detail'` |
| 导出函数名 | `useXxxStore`，PascalCase 拼接 | `useUserStore`、`useAuthStore` |
| 职责边界 | 这个 Store 管什么、不管什么 | "管理用户登录态和基本信息，不管具体业务数据" |
| 是否持久化 | 必须由用户明确指定，禁止 AI 自行判断 | 用户说"需要持久化" → 加 `persist: true` |

**持久化规则：**
- 用户未提及持久化 → **默认不开启**，不加 `persist`
- 用户明确要求持久化 → 加 `persist: true`
- 如果不确定是否需要持久化，**主动询问用户**，不要自行决策

---

### 第 1 步：创建 Store 文件

文件路径：`src/store/<module-name>.ts`

一个模块一个文件，文件名与模块名一致。

---

### 第 2 步：编写 Store 代码

**统一使用 Composition API 风格（setup 函数形式）：**

```typescript
// src/store/<module-name>.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/** <模块中文名> Store */
export const use<ModuleName>Store = defineStore('<module-name>', () => {
    // ========== State ==========

    /** 状态字段说明 */
    const someState = ref<string>('')

    /** 列表数据 */
    const list = ref<SomeItem[]>([])

    // ========== Getters ==========

    /** 计算属性说明 */
    const someGetter = computed(() => someState.value.length)

    // ========== Actions ==========

    /** 操作说明 */
    const fetchData = async () => {
        // 调用 API
    }

    /** 重置状态 */
    const reset = () => {
        someState.value = ''
        list.value = []
    }

    return {
        // State
        someState,
        list,
        // Getters
        someGetter,
        // Actions
        fetchData,
        reset,
    }
})
// 👆 默认不加 persist。仅当用户明确要求持久化时，改为：
// }, {
//     persist: true,
// })
```

**编写规范：**
- 必须使用 Composition API 风格（`defineStore('id', () => { ... })`），禁止 Options API
- State 使用 `ref()`，Getters 使用 `computed()`，Actions 是普通函数
- 每个 state/getter/action 必须有 JSDoc 注释
- return 语句中按 State → Getters → Actions 分组，用注释分隔
- Store 中不要直接耦合 UI 组件，只存纯数据与业务行为
- 如 State 涉及复杂类型，在同文件顶部用 `interface` 定义（简单场景不需要独立类型文件）

---

### 第 3 步：注册到统一导出

在 `src/store/index.ts` 中追加导出：

```typescript
export * from './<module-name>'
```

放在 `// ========== Store 统一导出 ==========` 注释下方。

---

## 场景二：在已有 Store 中追加状态/方法

### 操作步骤

1. **读取已有 Store 文件**，了解现有的 state/getters/actions
2. **在对应分区追加**：
   - 新增 state → 放在 `// ========== State ==========` 下
   - 新增 getter → 放在 `// ========== Getters ==========` 下
   - 新增 action → 放在 `// ========== Actions ==========` 下
3. **在 return 语句中补充导出**，放在对应分组中
4. **如新增了类型**，在文件顶部补充 interface 定义

---

## 业务层调用示例

```vue
<script setup lang="ts">
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

// ✅ 解构 state/getters 必须用 storeToRefs
const { userName, isLoggedIn } = storeToRefs(userStore)

// ✅ 解构 actions 直接从 store 实例取
const { login, logout } = userStore

// ✅ template 中自动解包，不需要 .value
// ✅ script 中需要通过 .value 访问
console.log(userName.value)
</script>
```

---

## 检查清单

- [ ] 已执行重名检查：确认 `src/store/` 下无同名文件，或已与用户确认处理方式
- [ ] 已确认 Store 定位：模块名、职责边界、是否持久化
- [ ] 使用了 Composition API 风格（setup 函数形式）
- [ ] Store 文件放在 `src/store/` 目录下
- [ ] 导出函数命名为 `useXxxStore`
- [ ] 每个 state/getter/action 有 JSDoc 注释
- [ ] return 语句按 State → Getters → Actions 分组
- [ ] 已在 `src/store/index.ts` 中注册导出
- [ ] 如需持久化，已设置 `persist: true`
- [ ] Store 中没有直接耦合 UI 组件
- [ ] 所有代码符合 TypeScript 规范，无 `any` 类型
