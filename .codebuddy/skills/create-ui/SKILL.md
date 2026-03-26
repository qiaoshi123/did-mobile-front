---
name: create-ui
description: 创建 UI（模板 + 样式），支持页面、通用组件、页面级组件。触发关键词：铺UI、写模板、画页面、还原设计稿、创建UI。当需要单独编写前端 UI 结构和样式时触发此技能。
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

**只写 UI（模板 + 样式），不写逻辑。**

| 输出 | 说明 |
|------|------|
| `<template>` | ✅ 完整模板结构 |
| `<style>` | ✅ 样式代码 |
| `<script setup>` | ⚠️ 仅声明（组件需要 props/slots，页面留空） |

**不输出：**
- 事件处理函数逻辑
- API 调用
- 状态定义（ref/reactive）
- 生命周期逻辑
- 业务逻辑

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
| `src/pages/<name>/index.vue` | 页面 | 注册路由（pages.json + routes.ts） |
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

#### 1. 注册路由（如需要）

**pages.json：**
```json
{
    "path": "pages/login/index",
    "style": {
        "navigationBarTitleText": "登录"
    }
}
```

> ⚠️ `path` 不以 `/` 开头，不含 `.vue`

**src/constants/routes.ts：**
```typescript
/** 登录页 */
export const PAGE_LOGIN = '/pages/login/index'
```

#### 2. 创建页面文件

```vue
<template>
    <view class="page-login">
        <!-- UI 清单中的内容 -->
    </view>
</template>

<script setup lang="ts">
// 逻辑部分由 create-logic 实现
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

#### 1. 创建组件文件

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

// 事件处理逻辑由 create-logic 实现
</script>

<style lang="scss" scoped>
.user-avatar {
    // 样式内容
}
</style>
```

#### 2. 注册到统一导出

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
- [ ] 路由已注册（pages.json + routes.ts）
- [ ] 页面根 class 为 `page-<name>`
- [ ] 样式使用 `var(--td-xxx)` 变量
- [ ] 图片使用 dummyimage 占位
- [ ] 无业务逻辑代码

### 通用组件 UI
- [ ] 已注册到 `src/components/index.ts`
- [ ] 组件根 class 为组件名
- [ ] Props/Emits 使用泛型语法
- [ ] 每个 prop/emit 有 JSDoc 注释
- [ ] 无业务逻辑代码

### 页面级组件 UI
- [ ] 路径正确（`src/pages/<page>/components/`）
- [ ] 组件根 class 为组件名
- [ ] Props/Emits 使用泛型语法
- [ ] 无业务逻辑代码
