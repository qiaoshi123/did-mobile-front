---
name: create-ui
description: 创建 UI（模板 + 样式 + 骨架 script），支持页面、通用组件、页面级组件。触发关键词：铺UI、写模板、画页面、还原设计稿、创建UI。当需要单独编写前端 UI 结构和样式时触发此技能。
allowed-tools: []
disable: false
---

# 创建 UI

## 必须遵循的规范

执行此技能前，**必须先读取以下 Rule 文件**，所有生成的代码须严格遵守：

- `.codebuddy/rules/04-组件规范.mdc` — 组件分类、Props/Emits 契约、命名约定
- `.codebuddy/rules/08-样式规范.mdc` — SCSS 变量体系、尺寸单位、样式组织方式

> 编码规范（TypeScript、命名约定、格式化规则）已作为 always apply rule 自动生效，无需手动读取。

---

## 职责边界

**写 UI（模板 + 样式）+ 骨架 script（从 UI 推导的变量和空函数），不写业务逻辑。**

| 输出 | 说明 |
|------|------|
| `<template>` | ✅ 完整模板结构，包含 `v-model`、`@click` 等绑定 |
| `<style>` | ✅ 样式代码 |
| `<script setup>` | ✅ **骨架 script**：从 UI 推导的响应式变量声明 + 空的事件处理函数 + Vue 基础 import |

### 骨架 script 的定义

**骨架 script 是从 UI 结构推导出来的最小 script**，目的是让 template 中的绑定能正常工作：

**✅ 骨架 script 包含：**
- `import { ref, computed } from 'vue'` 等 Vue 基础导入
- 从 UI 推导的响应式变量（看到输入框 → `ref('')`，看到列表 → `ref([])`）
- 从 UI 推导的空事件处理函数（看到提交按钮 → `function onSubmit() { /* TODO */ }`）
- `v-model`、`@click`、`:class`、`v-if` 等模板绑定所需的变量和函数声明
- 组件的 Props/Emits 声明（泛型语法）

**❌ 骨架 script 不包含：**
- 业务模块的 import（hooks / utils / api / store）
- API 调用逻辑
- Store 初始化和调用
- Hook 调用
- 校验逻辑
- 复杂的业务流程代码
- 生命周期钩子（onLoad / onShow / onMounted 等）

> **核心原则**：骨架 script 只回答「UI 上有什么」，不回答「业务上做什么」。函数体统一写 `// TODO: 由 create-logic 实现`。

---

## 适配已有产物规则

> **核心原则：谁后执行，谁负责适配先执行的产物。**

### 情况 A：目标 `.vue` 文件不存在（全新创建）

→ 按正常流程创建完整 SFC（template + style + 骨架 script）。

### 情况 B：目标 `.vue` 文件已存在且有 `<script setup>` 内容（`create-logic` 先执行的情况）

→ **必须先读取已有的 `<script setup>` 内容**，理解其中已定义的变量名和函数名，然后：

1. **template 中的绑定必须使用已有 script 中的变量名和函数名**（不另起新名）
2. **不覆盖、不重写已有的 `<script setup>`**，只在其中追加 UI 需要但逻辑中尚未声明的变量/函数
3. **不删除已有 script 中的任何内容**（包括 import、业务逻辑等）

> 简言之：UI 适配已有逻辑，而不是逻辑适配 UI。

---

## 支持场景

1. **创建页面 UI** — 需要注册路由
2. **创建通用组件 UI** — 放 `src/components/`
3. **创建页面级组件 UI** — 放 `src/pages/<page>/components/`

---

## 第 0 步：自动判断目标类型

> 💡 **前提**：调用此 Skill 时，`create-proposal` 已规划好路径和名称。

根据目标路径自动判断类型：

| 路径模式 | 类型 | 额外操作 |
|---------|------|---------| 
| `src/pages/<name>/index.vue` | 页面 | ⚠️ 路由注册由 `create-route` Skill 负责，此处不处理 |
| `src/components/<name>/index.vue` | 通用组件 | 注册到 `src/components/index.ts` |
| `src/pages/<page>/components/<name>/index.vue` | 页面级组件 | 无需注册 |

---

## 场景一：创建页面 UI

### 输入参数（来自 create-proposal）

| 参数 | 说明 | 示例 |
|------|------|------|
| 页面名称 | kebab-case | `login` |
| 页面中文名 | 用于注释 | 登录页 |
| 路径 | 目标文件路径 | `src/pages/login/index.vue` |
| 是否需要注册路由 | 通常为是 | `true` |
| 路由常量名 | routes.ts 中的常量 | `PAGE_LOGIN` |
| UI 清单 | 设计稿分析结果 | `{ 区域划分、组件清单、样式信息 }` |

### 执行步骤

#### 1. 确认路由已注册（前置条件）

> ⚠️ 页面路由的注册（`pages.json` + `routes.ts`）由 `create-route` Skill 负责。
> 创建页面 UI 前，请确认 `create-route` 任务已完成，路由已就绪。
> 如果路由尚未注册，应先执行 `create-route` 任务。

#### 2. 检查目标文件是否已存在

- **不存在** → 进入步骤 3（全新创建）
- **已存在且有 `<script setup>` 内容** → 读取已有 script，按「适配已有产物规则 · 情况 B」执行

#### 3. 创建页面文件（全新创建示例）

```vue
<template>
    <view class="page-login">
        <!-- UI 清单中的内容，包含 v-model / @click 等绑定 -->
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ========== 从 UI 推导的状态 ==========

const phone = ref('')
const password = ref('')

// ========== 从 UI 推导的事件处理 ==========

/** 提交表单 */
function onSubmit() {
    // TODO: 由 create-logic 实现
}
</script>

<style lang="scss" scoped>
.page-login {
    // 样式内容
}
</style>
```

### 编写要点

- 页面根 class：`page-<page-name>`（kebab-case）
- 使用 `var(--td-xxx)` 变量引用 TDesign 设计令牌
- 图片资源使用 `https://dummyimage.com/{宽}x{高}` 占位
- 按区域分区编写，用注释分隔：`// ========== 区域名 ==========`
- **骨架 script 中的变量名和函数名要语义清晰**，因为 `create-logic` 会基于这些名称填充业务逻辑

---

## 场景二：创建通用组件 UI

### 输入参数（来自 create-proposal）

| 参数 | 说明 | 示例 |
|------|------|------|
| 组件名称 | kebab-case | `user-avatar` |
| 组件中文名 | 用于注释 | 用户头像 |
| 路径 | 目标文件路径 | `src/components/user-avatar/index.vue` |
| Props 清单 | 组件入参定义 | `{ avatar: string, size?: number }` |
| Slots 清单 | 插槽定义 | `{ default, extra }` |
| UI 清单 | 设计稿分析结果 | `{ 结构、样式 }` |

### 执行步骤

#### 1. 检查目标文件是否已存在

- **不存在** → 全新创建
- **已存在且有 `<script setup>` 内容** → 读取已有 script，按「适配已有产物规则 · 情况 B」执行

#### 2. 创建组件文件（全新创建示例）

```vue
<template>
    <view class="user-avatar">
        <image
            class="avatar-image"
            :src="avatar"
            :style="{ width: `${size}px`, height: `${size}px` }"
        />
        <slot />
        <slot name="extra" />
    </view>
</template>

<script setup lang="ts">
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

// ========== 从 UI 推导的事件处理 ==========

/** 点击头像 */
function handleClick() {
    // TODO: 由 create-logic 实现
}
</script>

<style lang="scss" scoped>
.user-avatar {
    // 样式内容
}
</style>
```

#### 3. 注册到统一导出

在 `src/components/index.ts` 中追加：

```typescript
/** 用户头像组件 */
export { default as UserAvatar } from './user-avatar/index.vue'
```

### 编写要点

- 组件根 class：组件名（kebab-case）
- Props 使用泛型语法：`defineProps<Props>()`
- Emits 使用泛型语法：`defineEmits<Emits>()`
- 每个 prop/emit 必须有 JSDoc 注释
- 使用 `withDefaults` 设置默认值

---

## 场景三：创建页面级组件 UI

### 输入参数（来自 create-proposal）

| 参数 | 说明 | 示例 |
|------|------|------|
| 所属页面 | 父页面名称 | `login` |
| 组件名称 | kebab-case | `login-form` |
| 组件中文名 | 用于注释 | 登录表单 |
| 路径 | 目标文件路径 | `src/pages/login/components/login-form/index.vue` |
| Props 清单 | 组件入参定义 | `{ ... }` |
| UI 清单 | 设计稿分析结果 | `{ 结构、样式 }` |

### 执行步骤

与通用组件类似，但：
- 路径在 `src/pages/<page>/components/` 下
- 不需要注册到 `src/components/index.ts`
- 同样需要先检查目标文件是否已存在，遵循「适配已有产物规则」

---

## TDesign 组件使用规范

> ⚠️ **强制要求**：每个 TDesign 组件使用前**必须查阅 `tdesign-uniapp` Skill 文档确认实际 API**

### 常见坑位

| 坑位 | 错误写法 | 正确写法 |
|------|---------|---------|
| t-input v-model | `v-model="value"` | `:value="value" @change="onChange"` |
| prefix-icon | `:prefix-icon="{ name: 'user' }"` | `prefix-icon="user"` |
| suffix-icon 插槽 | `#suffixIcon` | `#suffix-icon` |

---

## 检查清单

### 页面 UI
- [ ] 路由已由 `create-route` 注册（pages.json + routes.ts）
- [ ] 页面根 class 为 `page-<name>`
- [ ] 样式使用 `var(--td-xxx)` 变量
- [ ] 图片使用 dummyimage 占位
- [ ] 骨架 script 只包含从 UI 推导的变量和空函数，不包含业务逻辑
- [ ] 骨架 script 不包含 hooks / utils / api / store 的 import
- [ ] 如果目标文件已存在且有 script，template 绑定使用了已有变量名/函数名

### 通用组件 UI
- [ ] 已注册到 `src/components/index.ts`
- [ ] 组件根 class 为组件名
- [ ] Props/Emits 使用泛型语法
- [ ] 每个 prop/emit 有 JSDoc 注释
- [ ] 骨架 script 不包含业务逻辑

### 页面级组件 UI
- [ ] 路径正确（`src/pages/<page>/components/`）
- [ ] 组件根 class 为组件名
- [ ] Props/Emits 使用泛型语法
- [ ] 骨架 script 不包含业务逻辑
