---
name: create-logic
description: 创建逻辑代码，支持页面逻辑和组件逻辑。触发关键词：写逻辑、写交互、页面逻辑、实现交互、添加逻辑。当需要单独编写前端业务逻辑时触发此技能。
allowed-tools: []
disable: false
---

# 创建逻辑

## 必须遵循的规范

执行此技能前，**必须先读取以下 Rule 文件**，所有生成的代码须严格遵守：

- `.codebuddy/rules/10-Hooks规范.mdc` — Hook 命名、文件组织、与 utils/store 的边界
- `.codebuddy/rules/04-组件规范.mdc` — Props/Emits 契约、组件生命周期

> 编码规范（TypeScript、命名约定）已作为 always apply rule 自动生效，无需手动读取。

---

## 职责边界

**写业务逻辑代码，填充 `<script setup>` 的具体实现。**

| 输出 | 说明 |
|------|------|
| `<script setup>` | ✅ 完整业务逻辑代码 |
| `<template>` | ⚠️ 见下方「适配已有产物规则」 |
| `<style>` | ❌ 不涉及 |

**输出内容：**
- import 语句（hooks/utils/api/store）
- 状态定义（ref/reactive）
- 计算属性（computed）
- 生命周期钩子
- 事件处理函数（填充具体实现）
- API 调用逻辑
- Store 调用

---

## 适配已有产物规则

> **核心原则：谁后执行，谁负责适配先执行的产物。**

### 情况 A：目标 `.vue` 文件已存在且有 template/style（`create-ui` 先执行的情况）

这是最常见的场景。`create-ui` 已生成完整的 template + style + 骨架 script（含变量声明和空函数）。

**执行要求：**

1. **读取已有骨架 script**，理解其中已声明的变量名和空函数名
2. **在骨架基础上填充业务逻辑**：
   - 引入业务模块（hooks / utils / api / store）
   - 用 hook 调用替换或增强骨架中的简单 `ref` 声明（如骨架中的 `const password = ref('')` 可能被整合进更完整的表单管理）
   - 填充空函数的函数体（将 `// TODO: 由 create-logic 实现` 替换为真正的业务逻辑）
   - 添加生命周期钩子、计算属性等骨架中没有的逻辑
3. **保持变量名/函数名与 template 绑定一致**：如果重构了骨架中的变量（如合并多个 `ref` 为一个 `reactive`），**必须同步更新 template 中对应的绑定**
4. **不改变 template 的 HTML 结构和 style 样式**，只在必要时修改 template 中的绑定属性（如 `v-model`、`@click`、`:class`、`v-if` 等）

> 简言之：逻辑适配 UI 骨架，重构变量时同步更新绑定，但不动 HTML 结构和样式。

### 情况 B：目标 `.vue` 文件不存在（没有设计稿，`create-logic` 先执行的情况）

**执行要求：**

1. **只生成 `<script setup>` 块**，包含完整的业务逻辑
2. **template 留空占位**：`<template><view></view></template>`
3. **不生成 `<style>`**
4. 等设计稿来了后，`create-ui` 会读取已有 script 并补充 template + style

> 简言之：没有 UI 就不造 UI，只写逻辑，等 `create-ui` 来补。

### 情况 C：目标 `.vue` 文件已存在但无 template/style（之前 `create-logic` 已执行过）

→ 属于逻辑代码的修改/增强，直接在已有 `<script setup>` 上追加或修改。

---

## 支持场景

1. **页面逻辑** — 写入页面的 `<script setup>`
2. **组件逻辑** — 写入组件的 `<script setup>`

---

## 第 0 步：自动判断目标类型和文件状态

> 💡 **前提**：调用此 Skill 时，`create-proposal` 已规划好目标文件和依赖。

### 判断目标类型

根据目标文件路径自动判断类型：

| 路径模式 | 类型 | 逻辑特征 |
|---------|------|---------|
| `src/pages/<name>/index.vue` | 页面逻辑 | 可有 Store/API/页面生命周期/路由参数 |
| `src/components/.../index.vue` | 通用组件逻辑 | 主要 props/emit/本地状态/组件生命周期 |
| `src/pages/<page>/components/.../index.vue` | 页面级组件逻辑 | 同上 |

### 判断文件状态

**必须先读取目标文件**，判断当前属于哪种情况：

| 文件状态 | 对应规则 |
|---------|---------|
| 文件不存在 | → 情况 B：只写 script，template 留空 |
| 文件存在，有 template + style + 骨架 script | → 情况 A：基于骨架填充业务逻辑 |
| 文件存在，只有 script | → 情况 C：修改/增强已有逻辑 |

---

## 场景一：页面逻辑

### 输入参数（来自 create-proposal）

| 参数 | 说明 | 示例 |
|------|------|------|
| 目标文件 | 页面路径 | `src/pages/login/index.vue` |
| 需要的 API | 接口列表 | `['didappLogin']` |
| 需要的 Hook | Hook 列表 | `['usePasswordVisible', 'useLoading']` |
| 需要的 Store | Store 列表 | `['useUserStore']` |
| 需要的 Util | 工具函数列表 | `['router', 'setStorageSync']` |
| 交互文档 | 交互说明 | `{ 事件处理、状态流转 }` |

### 执行步骤

#### 1. 读取目标文件并判断状态

读取已有文件内容，判断属于情况 A / B / C。

#### 2. 编写逻辑代码

**情况 A 示例（基于骨架填充）：**

假设骨架 script 中已有 `const phone = ref('')`、`function onSubmit() { /* TODO */ }`：

```typescript
<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { usePasswordVisible, useLoading } from '@/hooks'
import { didappLogin } from '@/http'
import { router, setStorageSync } from '@/utils'
import { PAGE_HOME } from '@/constants/routes'

// ========== 状态 ==========

const formData = reactive({
    phoneOrEmail: '',
    password: '',
})

const { loading, withLoading } = useLoading()

const { passwordVisible, togglePasswordVisible } = usePasswordVisible()

// ========== 生命周期 ==========

onLoad((query) => {
    // 页面加载时的逻辑
})

// ========== 事件处理 ==========

/** 输入框变化 */
const onPhoneChange = (ctx: { value: string }) => {
    formData.phoneOrEmail = ctx.value
}

const onPasswordChange = (ctx: { value: string }) => {
    formData.password = ctx.value
}

/** 登录 */
const onSubmit = async () => {
    await withLoading(async () => {
        const res = await didappLogin(toRaw(formData))
        if (res.ok) {
            setStorageSync('token', res.data.token)
            router.replace(PAGE_HOME)
        } else {
            uni.showToast({ title: res.msg, icon: 'none' })
        }
    })
}
</script>
```

> ⚠️ 注意：上例中骨架的 `phone` / `password` 被重构为 `formData` reactive 对象，此时**必须同步更新 template 中的 `v-model` 绑定**。

**情况 B 示例（无 UI，只写 script）：**

```vue
<template>
    <view></view>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { usePasswordVisible, useLoading } from '@/hooks'
import { didappLogin } from '@/http'
import { router, setStorageSync } from '@/utils'
import { PAGE_HOME } from '@/constants/routes'

// ========== 状态 ==========

const formData = reactive({
    phoneOrEmail: '',
    password: '',
})

const { loading, withLoading } = useLoading()
const { passwordVisible, togglePasswordVisible } = usePasswordVisible()

// ... 完整逻辑
</script>
```

### 编写要点

- 使用页面生命周期：`onLoad`/`onShow`/`onHide`/`onPullDownRefresh` 等
- 从 `@dcloudio/uni-app` 导入页面生命周期
- API 调用：禁止 `try/catch`，用 `if (res.ok)` 判断
- `reactive` 对象传给 API 时用 `toRaw()` 解包
- Store 解构 state/getters 必须用 `storeToRefs()`
- 事件处理函数命名：`onXxx`（用户触发）/ `handleXxx`（内部处理）
- **情况 A 时：如果重构了骨架变量，必须同步更新 template 绑定**

---

## 场景二：组件逻辑

### 输入参数（来自 create-proposal）

| 参数 | 说明 | 示例 |
|------|------|------|
| 目标文件 | 组件路径 | `src/components/user-avatar/index.vue` |
| 需要的 Hook | Hook 列表 | `['useLoading']` |
| 需要的 Util | 工具函数列表 | `['formatDate']` |
| 交互文档 | 交互说明 | `{ 事件处理 }` |

### 执行步骤

#### 1. 读取目标文件并判断状态

读取已有的文件内容，判断属于情况 A / B / C。

#### 2. 编写逻辑代码

```typescript
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLoading } from '@/hooks'

// ========== Props ==========

interface Props {
    /** 头像地址 */
    avatar: string
    /** 尺寸（px） */
    size?: number
}

const props = withDefaults(defineProps<Props>(), {
    size: 48,
})

// ========== Emits ==========

interface Emits {
    /** 点击头像 */
    (e: 'click'): void
}

const emit = defineEmits<Emits>()

// ========== 状态 ==========

const { loading } = useLoading()
const isPressed = ref(false)

// ========== 计算属性 ==========

const avatarStyle = computed(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`,
}))

// ========== 生命周期 ==========

onMounted(() => {
    // 组件挂载后的逻辑
})

// ========== 事件处理 ==========

const handleClick = () => {
    emit('click')
}

const handlePress = () => {
    isPressed.value = true
}

const handleRelease = () => {
    isPressed.value = false
}
</script>
```

### 编写要点

- 使用组件生命周期：`onMounted`/`onUnmounted`/`onBeforeUpdate` 等
- 从 `vue` 导入组件生命周期（不是 `@dcloudio/uni-app`）
- 主要通过 `emit` 通知父组件，避免直接调用 API
- 保持组件逻辑简单，复杂逻辑应抽离到 Hook 或由父页面处理

---

## API 调用规范

> ⚠️ **强制要求**：调用 API 前**必须先读 `src/http/core/types.ts`**，确认 `CoreResponse<T>` 结构

### 正确写法

```typescript
const res = await someApi(params)
if (res.ok) {
    // 成功处理
    console.log(res.data)
} else {
    // 失败处理
    uni.showToast({ title: res.msg, icon: 'none' })
}
```

### 禁止写法

```typescript
// ❌ 禁止 try/catch（uni.request 不会 reject）
try {
    const res = await someApi(params)
} catch (e) {
    // 永远不会执行到这里
}
```

---

## Store 使用规范

```typescript
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

// ✅ 解构 state/getters 必须用 storeToRefs
const { userName, isLoggedIn } = storeToRefs(userStore)

// ✅ 解构 actions 直接从 store 实例取
const { login, logout } = userStore

// ✅ script 中通过 .value 访问
console.log(userName.value)

// ✅ template 中自动解包，不需要 .value
```

---

## 检查清单

### 页面逻辑
- [ ] 从 `@dcloudio/uni-app` 导入页面生命周期
- [ ] API 调用使用 `if (res.ok)` 模式，无 try/catch
- [ ] reactive 对象传 API 时使用了 `toRaw()`
- [ ] Store 解构使用了 `storeToRefs()`
- [ ] 无 `any` 类型
- [ ] 事件处理函数有 JSDoc 注释
- [ ] **情况 A：基于骨架填充，未另起新的变量名（或重构后已同步更新 template 绑定）**
- [ ] **情况 B：文件不存在时，只写了 script + 空 template，未生成 style**

### 组件逻辑
- [ ] 从 `vue` 导入组件生命周期
- [ ] Props/Emits 使用泛型语法
- [ ] 通过 `emit` 通知父组件，无直接 API 调用
- [ ] 无 `any` 类型
- [ ] 事件处理函数有 JSDoc 注释
