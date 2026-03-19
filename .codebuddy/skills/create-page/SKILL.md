---
name: create-page
description: 创建、编写、铺写页面。当用户提到以下任意场景时必须使用此技能：写页面、新建页面、铺页面、创建页面、开发页面、实现页面。触发关键词包括但不限于：页面、page、写页面、铺页面、新建页面、创建页面。只要涉及在 src/pages/ 下新建或编写 .vue 页面文件的工作，都应该触发此技能。
allowed-tools: []
disable: false
---

# 创建页面

## 必须遵循的规范

执行此技能前，**必须先读取以下 Rule 文件**，所有生成的代码须严格遵守：

- `.codebuddy/rules/03-项目结构.mdc` — 页面目录结构、路由约束
- `.codebuddy/rules/04-组件规范.mdc` — 组件选择优先级、TDesign 使用约束、组件创建规范
- `.codebuddy/rules/06-路由规范.mdc` — 路径常量、跳转方式、路由守卫、分包、tabBar 规范
- `.codebuddy/rules/08-样式规范.mdc` — SCSS 变量、样式组织、安全区域适配、禁止内联样式
- `.codebuddy/rules/09-工具函数规范.mdc` — 工具函数使用优先级、避免重复编写

> 编码规范（TypeScript、Vue 3、命名约定）已作为 always apply rule 自动生效，无需手动读取。

如有冲突，页面相关以 `03-项目结构` 为准，组件相关以 `04-组件规范` 为准，样式相关以 `08-样式规范` 为准。

## 文档查阅工具

- 使用 **TDesign 组件**时 → 查阅 `tdesign-uniapp` Skill 确认 Props/Events/Slots
- 使用 **uni-app 内置组件**（`<view>`/`<scroll-view>`/`<swiper>` 等）或 **uni API**（`uni.navigateTo`/`uni.showToast`/`onLoad` 等）时 → 使用 `uni-doc` MCP 工具（`search-docs-by-Uniapp-official`）搜索官方文档，确认用法、参数和平台兼容性

> ⚠️ 遇到不确定的 uni-app 用法时，**必须先通过 `uni-doc` 查阅官方文档再编写代码**，禁止凭记忆猜测。

---

## 步骤总览

0. **组件扫描与匹配**（必须先做）— 确定页面中每个 UI 元素使用什么组件
1. **注册页面路由** — 在 `pages.json` 中添加路由配置
2. **创建待新建的组件**（如有）— 按 `04-组件规范` Rule 创建
3. **编写页面代码** — 组装组件、编写逻辑

---

## 第 0 步（必须先做）：组件扫描与匹配

> ⚠️ **每次创建页面时都必须执行，不可跳过。**

**操作：**

1. **读取本地通用组件清单**：读取 `src/components/index.ts`，获取所有已导出的通用组件及其 JSDoc 说明
2. **扫描所有页面级组件**：读取 `src/pages/*/components/` 目录结构，获取各页面下已有的页面级组件名称
3. **分析页面需求**：根据页面设计/描述，列出页面中需要的所有 UI 元素
4. **逐个匹配**，按以下优先级：
   - **优先级 1 — 本地通用组件**：`src/components/index.ts` 中已有的，直接使用
   - **优先级 2 — TDesign 组件**：查阅 `tdesign-uniapp` Skill 中的组件文档，确认 Props/Events/Slots 后使用
   - **优先级 3 — 复用其他页面的组件**：如果其他页面已有同名/同功能的页面级组件，**询问用户是否将其提升为通用组件**供两个页面共用
   - **优先级 4 — 新建组件**：以上都不满足时，标记为"待新建"
5. **输出组件方案表格**：

| UI 元素 | 使用组件 | 来源 | 说明 |
|---------|---------|------|------|
| 顶部导航 | `<t-navbar>` | TDesign | title="xxx", left-arrow |
| 列表项 | `<DidCard>` | 本地通用 | 已有组件 |
| 操作确认弹窗 | `<ConfirmModal>` | 页面 B 已有 → 建议提升 | ⚠️ 需用户确认是否提升为通用组件 |
| 底部操作栏 | 待新建 `<ActionBar>` | 页面级组件 | 仅本页使用 |

**发现其他页面已有同功能组件时的处理：**
- **禁止直接跨页面引用页面级组件**（违反目录规范）
- **禁止默默复制一份到当前页面**（产生重复代码）
- **必须询问用户**："页面 X 下已有 `<ComponentName>`，是否将其提升为通用组件供多个页面共用？"
  - 用户同意 → 将组件从 `src/pages/X/components/` 迁移到 `src/components/`，更新两个页面的 import，并在 `index.ts` 中导出
  - 用户拒绝 → 为当前页面新建独立的页面级组件

**禁止跳过此步骤直接编写页面代码。**

---

## 第 1 步：注册页面路由

> ⚠️ **注册前必须执行重名检查。**

**页面重名检查（必须执行）：**

确认页面名称后，立即检查以下内容：

1. `src/pages/<page-name>/` 目录是否已存在
2. `src/pages.json` 的 `pages` 数组中是否已有对应路由

| 扫描结果 | 处理方式 |
|---------|---------| 
| 目录不存在且路由未注册 | 正常继续后续步骤 |
| 目录已存在或路由已注册 | **询问用户**："页面 `<page-name>` 已存在，是要修改现有页面还是新建一个不同名称的？"用户确认修改 → 读取已有页面代码后进行修改；用户要新建 → 换名后继续 |

**禁止未经检查直接创建文件，防止覆盖已有页面。**

在 `src/pages.json` 的 `pages` 数组中添加路由配置：

```json
{
    "path": "pages/<page-name>/index",
    "style": {
        "navigationBarTitleText": "页面标题"
    }
}
```

**路由约束：**
- `path` 不以 `/` 开头、不含 `.vue` 后缀
- 目录名使用 kebab-case
- 如页面使用了自定义导航栏（如 TDesign Navbar），设置 `"navigationStyle": "custom"`

---

## 第 2 步：创建待新建的组件（如有）

对于第 0 步中标记为"待新建"的组件：

- 读取 `04-组件规范` Rule，按其约束创建组件
- 判断组件定位：
  - 仅当前页面使用 → 放 `src/pages/<page-name>/components/<component-name>/index.vue`
  - 可能被复用 → 放 `src/components/<component-name>/index.vue`
- 创建 `index.vue`，如 Props 复杂则创建 `types.ts`
- 如果是通用组件，在 `src/components/index.ts` 中导出并附带 JSDoc 注释

---

## 第 3 步：编写页面代码

### 页面文件结构

```
src/pages/<page-name>/
├── index.vue                    # 页面主文件（必须）
└── components/                  # 页面级组件（按需）
    └── <component-name>/
        └── index.vue
```

### 页面代码模板

```vue
<template>
    <view class="page-<page-name>">
        <!-- 页面内容 -->
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

// ========== 类型 ==========

// ========== Store ==========

// ========== 状态 ==========

// ========== 生命周期 ==========
onLoad(() => {
    // 页面加载
})

// ========== 事件处理 ==========

// ========== 方法 ==========
</script>

<style lang="scss" scoped>
.page-<page-name> {
    // 页面级通用样式

    // 各区块样式
    .section-header {
        //
    }

    .section-content {
        //
    }
}
</style>
```

### 页面样式模板说明

- 页面根容器 class 固定为 `page-<page-name>`
- 内部区块用嵌套写法，区块级 class 使用 kebab-case
- 嵌套层级不超过 3 层
- 颜色、字号、间距优先使用 `var(--td-xxx)` CSS Variables

**编写规范：**
- SFC 结构顺序：`<template>` → `<script setup lang="ts">` → `<style lang="scss" scoped>`
- 页面生命周期使用 `onLoad`、`onShow` 等（从 `@dcloudio/uni-app` 导入）
- Store 从 `@/store` 导入，解构 state/getters 时必须使用 `storeToRefs()`
- API 从 `@/http` 导入
- 工具函数从 `@/utils` 导入（如 `formatDate`、`router` 等），禁止在页面内重复编写已有工具函数
- template 根元素 class 命名：`page-<page-name>`
- 禁止在 template 中写复杂逻辑，提取为 `computed` 或方法
- 样式中颜色、字号、间距优先使用 `var(--td-xxx)` CSS Variables（如 `var(--td-brand-color)`），禁止使用 `$uni-xxx` SCSS 变量，禁止硬编码已有变量的值
- 底部有固定按钮/操作栏时，必须适配安全区域（`padding-bottom: env(safe-area-inset-bottom)`）

---

## 检查清单

- [ ] 已执行第 0 步：扫描了通用组件、页面级组件和 TDesign 组件，输出了组件方案表格
- [ ] 如发现其他页面有同功能组件，已询问用户是否提升为通用组件
- [ ] 已执行页面重名检查：确认 `src/pages/` 下无同名目录且 `pages.json` 无同名路由，或已与用户确认
- [ ] 页面路由已在 `pages.json` 中注册
- [ ] 使用了 `<script setup lang="ts">` 语法
- [ ] 页面生命周期使用了 uni-app 钩子（`onLoad`/`onShow` 等）
- [ ] TDesign 组件用法经过 `tdesign-uniapp` Skill 确认
- [ ] 新建的通用组件已在 `src/components/index.ts` 中导出
- [ ] Store 的 state/getters 解构使用了 `storeToRefs()`
- [ ] 所有代码符合 TypeScript 规范，无 `any` 类型
- [ ] 页面级组件放在 `src/pages/<page-name>/components/` 下
- [ ] 工具函数从 `@/utils` 导入，未在页面内重复编写已有工具逻辑
- [ ] 样式中颜色/字号/间距优先使用 `var(--td-xxx)` CSS Variables，无硬编码已有变量的值
- [ ] 样式使用 SCSS 嵌套，层级不超过 3 层
- [ ] 如有底部固定区域，已适配 `safe-area-inset-bottom`
