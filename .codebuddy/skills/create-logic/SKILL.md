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

**只写逻辑，不写模板和样式。**

| 输出 | 说明 |
|------|------|
| `<script setup>` | ✅ 完整逻辑代码 |
| `<template>` | ❌ 不涉及 |
| `<style>` | ❌ 不涉及 |

**输出内容：**
- import 语句（hooks/utils/api/store）
- 状态定义（ref/reactive）
- 计算属性（computed）
- 生命周期钩子
- 事件处理函数
- API 调用逻辑
- Store 调用

---

## 支持场景

1. **页面逻辑** — 写入页面的 `<script setup>`
2. **组件逻辑** — 写入组件的 `<script setup>`

---

## 第 0 步：自动判断目标类型

> 💡 **前提**：调用此 Skill 时，`create-proposal` 已规划好目标文件和依赖。

根据目标文件路径自动判断类型：

| 路径模式 | 类型 | 逻辑特征 |
|---------|------|---------|
| `src/pages/<name>/index.vue` | 页面逻辑 | 可有 Store/API/页面生命周期/路由参数 |
| `src/components/.../index.vue` | 通用组件逻辑 | 主要 props/emit/本地状态/组件生命周期 |
| `src/pages/<page>/components/.../index.vue` | 页面级组件逻辑 | 同上 |

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

#### 1. 读取目标文件

读取已有的 UI 代码，了解模板结构和组件引用。

#### 2. 编写逻辑代码

```typescript
<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
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

onShow(() => {
    // 页面显示时的逻辑
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
const onLogin = async () => {
    // 校验逻辑...

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

### 编写要点

- 使用页面生命周期：`onLoad`/`onShow`/`onHide`/`onPullDownRefresh` 等
- 从 `@dcloudio/uni-app` 导入页面生命周期
- API 调用：禁止 `try/catch`，用 `if (res.ok)` 判断
- `reactive` 对象传给 API 时用 `toRaw()` 解包
- Store 解构 state/getters 必须用 `storeToRefs()`
- 事件处理函数命名：`onXxx`（用户触发）/ `handleXxx`（内部处理）

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

#### 1. 读取目标文件

读取已有的 UI 代码和 props/emits 声明。

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

### 组件逻辑
- [ ] 从 `vue` 导入组件生命周期
- [ ] Props/Emits 使用泛型语法
- [ ] 通过 `emit` 通知父组件，无直接 API 调用
- [ ] 无 `any` 类型
- [ ] 事件处理函数有 JSDoc 注释
