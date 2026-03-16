---
name: create-component
description: 创建、封装、新建可复用组件。当用户提到以下任意场景时必须使用此技能：创建组件、新建组件、封装组件、抽离组件、拆分组件。触发关键词包括但不限于：组件、component、创建组件、新建组件、封装组件、抽离组件、拆分组件、二次封装。只要涉及独立创建 Vue 组件（非页面编写过程中的顺带创建）的工作，都应该触发此技能。
allowed-tools: []
disable: false
---

# 创建组件

## 必须遵循的规范

执行此技能前，**必须先读取以下 Rule 文件**，所有生成的代码须严格遵守：

- `.codebuddy/rules/04-组件规范.md` — 组件分类、目录结构、命名约定、Props/Emits 契约、导出注册要求
- `.codebuddy/rules/02-编码规范.md` — TypeScript 规范、Vue 3 组件规范、命名约定

如有冲突，组件领域以 `04-组件规范` 为准，通用编码以 `02-编码规范` 为准。

## 文档查阅工具

- 使用 **TDesign 组件**时 → 查阅 `tdesign-uniapp` Skill 确认 Props/Events/Slots
- 使用 **uni-app 内置组件**（`<view>`/`<scroll-view>`/`<image>` 等）时 → 使用 `uni-doc` MCP 工具（`search-docs-by-Uniapp-official`）搜索官方文档，确认用法和参数

> ⚠️ 遇到不确定的 uni-app 内置组件用法时，**必须先通过 `uni-doc` 查阅官方文档再编写代码**，禁止凭记忆猜测。

---

## 支持场景

1. **创建通用组件**（放在 `src/components/`，跨页面复用）
2. **创建页面级组件**（放在 `src/pages/<page>/components/`，仅当前页面使用）
3. **二次封装 TDesign 组件**（基于 TDesign 组件封装业务组件）

---

## 步骤总览

0. **确认组件定位**（必须先做）— 确定分类、放置目录
1. **创建目录与文件** — 按规范建目录和文件
2. **编写组件代码** — Props/Emits 契约、模板、样式
3. **注册导出**（通用组件时）— 在 `index.ts` 中导出

---

## 第 0 步（必须先做）：确认组件定位

> ⚠️ **每次创建组件时都必须执行，不可跳过。**

**需确认以下信息：**

| 信息 | 说明 | 示例 |
|------|------|------|
| 组件名称 | kebab-case | `did-card`、`security-modal` |
| 组件分类 | 通用组件 or 页面级组件 | 被 2+ 页面复用 → 通用；仅当前页面用 → 页面级 |
| 放置目录 | 根据分类确定 | `src/components/did-card/` 或 `src/pages/xxx/components/did-card/` |
| 是否基于 TDesign | 是否二次封装 TDesign 组件 | 是 → 需查阅 `tdesign-uniapp` Skill 确认原始组件用法 |

**判断规则：**
- 如果用户明确说了"给 xxx 页面用的"且没提复用 → 页面级组件
- 如果用户说了"通用的"、"公共的"、"可复用的" → 通用组件
- 如果不确定，先作为页面级组件创建，后续提升为通用组件时再迁移

**重名检查（必须执行）：**

确认组件名称后，立即扫描以下目录是否已有同名组件：
1. `src/components/<component-name>/`
2. `src/pages/*/components/<component-name>/`

| 扫描结果 | 处理方式 |
|---------|---------|
| 不存在同名组件 | 正常继续后续步骤 |
| 通用组件中已有同名 | **询问用户**："已有通用组件 `<ComponentName>`，是要修改现有组件还是新建一个不同名称的？" |
| 其他页面下已有同名 | **询问用户**："页面 X 下已有 `<ComponentName>`，是否将其提升为通用组件？还是为当前场景新建一个不同名称的？" |

**禁止未经检查直接创建文件，防止覆盖已有组件。**

---

## 第 1 步：创建目录与文件

### 通用组件

```
src/components/<component-name>/
├── index.vue      # 组件主文件（必须）
└── types.ts       # 类型定义（Props/Emits 较复杂时创建）
```

### 页面级组件

```
src/pages/<page-name>/components/<component-name>/
├── index.vue      # 组件主文件（必须）
└── types.ts       # 类型定义（Props/Emits 较复杂时创建）
```

**何时需要 `types.ts`：**
- Props 超过 5 个字段
- 存在嵌套对象类型
- 需要被外部引用的类型

---

## 第 2 步：编写组件代码

### 简单 Props（内联定义）

```vue
<template>
    <view class="<component-name>">
        <!-- 组件内容 -->
    </view>
</template>

<script setup lang="ts">
/** 组件名称 — 组件用途简述 */

// ========== Props ==========
interface Props {
    /** 标题文本 */
    title: string
    /** 是否显示 */
    visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    visible: false,
})

// ========== Emits ==========
interface Emits {
    /** 关闭时触发 */
    (e: 'close'): void
    /** 确认时触发，携带结果数据 */
    (e: 'confirm', value: string): void
}

const emit = defineEmits<Emits>()

// ========== 状态 ==========

// ========== 方法 ==========
</script>

<style lang="scss" scoped>
.<component-name> {
    //
}
</style>
```

### 复杂 Props（独立 types.ts）

```typescript
// types.ts

/** 组件名称 Props */
export interface <ComponentName>Props {
    /** 标题文本 */
    title: string
    /** 是否显示 */
    visible?: boolean
    /** 列表数据 */
    items: <ComponentName>Item[]
}

/** 组件名称 Emits */
export interface <ComponentName>Emits {
    /** 关闭时触发 */
    (e: 'close'): void
    /** 选中项变化时触发 */
    (e: 'change', item: <ComponentName>Item): void
}

/** 列表项数据结构 */
export interface <ComponentName>Item {
    id: string
    label: string
}
```

```vue
<script setup lang="ts">
import type { <ComponentName>Props, <ComponentName>Emits } from './types'

const props = withDefaults(defineProps<<ComponentName>Props>(), {
    visible: false,
})

const emit = defineEmits<<ComponentName>Emits>()
</script>
```

### 二次封装 TDesign 组件

如果是基于 TDesign 组件的二次封装：

1. 先查阅 `tdesign-uniapp` Skill，确认原始 TDesign 组件的 Props/Events/Slots
2. 封装组件中引用原始 TDesign 组件，透传必要的 Props
3. 封装后的组件放在 `src/components/` 下（二次封装一般是为了复用）

---

## 第 3 步：注册导出（仅通用组件）

在 `src/components/index.ts` 中添加导出：

```typescript
/** 用途说明 — 简要描述组件的功能和适用场景 */
export { default as <ComponentName> } from './<component-name>/index.vue'
```

**导出规范：**
- 必须附带 JSDoc 注释，说明组件的用途和适用场景
- 导出名使用 PascalCase
- 页面级组件**不需要**在全局 `index.ts` 中导出

---

## 检查清单

- [ ] 已确认组件定位：通用/页面级，放置目录正确
- [ ] 已执行重名检查：扫描了 `src/components/` 和 `src/pages/*/components/`，无冲突或已与用户确认
- [ ] 组件目录名使用 kebab-case
- [ ] 使用了 `<script setup lang="ts">` 语法
- [ ] Props 使用 `defineProps<T>()` + `withDefaults()` 定义
- [ ] Emits 使用 `defineEmits<T>()` 定义
- [ ] Props 接口中每个字段有 JSDoc 注释
- [ ] 组件没有直接修改 Props（通过 emit 通知父组件）
- [ ] 组件内没有直接使用 uni API 进行路由跳转（通过 emit 通知页面层）
- [ ] 如为二次封装 TDesign 组件，已通过 `tdesign-uniapp` Skill 确认原始组件用法
- [ ] 如为通用组件，已在 `src/components/index.ts` 中导出并附带 JSDoc 注释
- [ ] 样式使用 `<style lang="scss" scoped>`，无内联样式（动态样式除外）
- [ ] 单文件不超过 400 行
