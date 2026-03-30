---
name: create-sfc
description: 创建或修改完整的 Vue SFC 文件（template + script + style），支持页面、通用组件、页面级组件。触发关键词：铺UI、写模板、画页面、还原设计稿、创建UI、写逻辑、写交互、页面逻辑、实现交互、添加逻辑、创建页面、创建组件。当需要创建或修改 .vue 文件时触发此技能。
allowed-tools: []
disable: false
---

# 创建 / 修改 SFC

## 必须遵循的规范

执行此技能前，**必须先读取以下 Rule 文件**，所有生成的代码须严格遵守：

- `.codebuddy/rules/04-组件规范.mdc` — 组件分类、Props/Emits 契约、命名约定
- `.codebuddy/rules/08-样式规范.mdc` — SCSS 变量体系、尺寸单位、样式组织方式
- `.codebuddy/rules/10-Hooks规范.mdc` — Hook 命名、文件组织、与 utils/store 的边界

> 编码规范（TypeScript、命名约定、格式化规则）已作为 always apply rule 自动生效，无需手动读取。

---

## 职责边界

**创建或修改一个完整的 `.vue` SFC 文件，包含 template、script setup、style 三个部分。**

| 输出 | 说明 |
|------|------|
| `<template>` | ✅ 完整模板结构，包含 `v-model`、`@click` 等绑定 |
| `<script setup>` | ✅ 完整业务逻辑代码（import、状态、生命周期、事件处理） |
| `<style>` | ✅ 样式代码（SCSS scoped） |

**不负责的事情：**
- ❌ 不创建 Hook 文件（由 `create-hook` Skill 负责）
- ❌ 不创建 Store 文件（由 `create-store` Skill 负责）
- ❌ 不创建 Util 文件（由 `create-util` Skill 负责）
- ❌ 不创建 API 服务文件（由 `create-api` Skill 负责）
- ❌ 不修改路由配置（由 `create-route` Skill 负责）

> **核心原则**：create-sfc 只负责一个 `.vue` 文件。它可以 import 其他模块（hooks/utils/api/store），但不创建这些模块——那是其他 Skill 的职责，由 Spec 编排。

---

## SFC 结构顺序（强制）

```vue
<template>
    ...
</template>

<script setup lang="ts">
    ...
</script>

<style lang="scss" scoped>
    ...
</style>
```

---

## 行为模式自动判断

create-sfc 接收到任务后，根据两个维度自动判断行为模式：

### 维度一：输入源

| 输入源 | template 行为 | style 行为 | script 行为 |
|--------|-------------|-----------|-------------|
| **有 UI 清单**（设计稿经过 design-analysis） | 基于 UI 清单精确还原视觉，逐区域对照颜色、间距、字号、圆角 | 精确到 rpx 的样式还原，TDesign 变量映射 | 完整业务逻辑 |
| **无 UI 清单，有交互稿** | 按交互描述 + 组件规范铺设基础 UI 结构 | 基础合理布局（flex、间距、对齐），使用 TDesign 变量 | 完整业务逻辑 |

### 维度二：文件状态

| 文件状态 | 行为 |
|---------|------|
| **文件不存在** | 全新创建完整 SFC |
| **文件已存在** | 修改模式：读取已有内容，按需求修改对应部分 |

### 四种组合场景

| 场景 | 文件状态 | 输入源 | 具体行为 |
|------|---------|--------|---------|
| A | 不存在 | 有 UI 清单 | 全新创建完整 SFC，template 精确还原设计稿 |
| B | 不存在 | 无 UI 清单 | 全新创建完整 SFC，template 按交互稿 + 组件规范铺基础 UI |
| C | 已存在 | 有 UI 清单 | 修改模式：读取已有内容，按 UI 清单还原/调整视觉，保持已有逻辑不动（除非需求涉及） |
| D | 已存在 | 无 UI 清单 | 修改模式：读取已有内容，按需求修改对应部分 |

---

## 支持场景

1. **创建/修改页面** — `src/pages/<name>/index.vue`
2. **创建/修改通用组件** — `src/components/<name>/index.vue`
3. **创建/修改页面级组件** — `src/pages/<page>/components/<name>/index.vue`

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

## 第 1 步：检查文件状态

**必须先读取目标文件**，判断当前属于哪种文件状态：

| 文件状态 | 后续行为 |
|---------|---------|
| 文件不存在 | → 全新创建模式 |
| 文件已存在 | → 修改模式（读取已有内容，按需修改） |

---

## 第 2 步：编写 SFC

### 场景一：创建页面

#### 输入参数（来自 Spec）

| 参数 | 说明 | 示例 |
|------|------|------|
| 页面名称 | kebab-case | `register` |
| 页面中文名 | 用于注释 | 企业注册页 |
| 路径 | 目标文件路径 | `src/pages/register/index.vue` |
| UI 清单 | 设计稿分析结果（可选） | `docs/ui-analysis/register-ui-inventory.md` |
| 需要的 API | 接口列表 | `['didappRegister']` |
| 需要的 Hook | Hook 列表 | `['usePasswordVisible', 'useLoading']` |
| 需要的 Store | Store 列表 | `['useUserStore']` |
| 需要的 Util | 工具函数列表 | `['router']` |
| 交互文档 | 交互说明 | `{ 事件处理、状态流转 }` |

#### 编写要点

**template：**
- 页面根 class：`page-<page-name>`（kebab-case）
- 有 UI 清单 → 逐区域对照 UI 清单文件还原，颜色、间距、字号、圆角逐项 diff
- 无 UI 清单 → 按交互稿描述 + 组件规范铺设 UI，使用 TDesign 组件
- 使用 `var(--td-xxx)` 变量引用 TDesign 设计令牌
- 图片资源使用 `https://dummyimage.com/{宽}x{高}` 占位
- 按区域分区编写，用注释分隔

**script setup：**
- 使用页面生命周期：`onLoad`/`onShow`/`onHide`/`onPullDownRefresh` 等
- 从 `@dcloudio/uni-app` 导入页面生命周期
- API 调用：禁止 `try/catch`，用 `if (res.ok)` 判断
- `reactive` 对象传给 API 时用 `toRaw()` 解包
- Store 解构 state/getters 必须用 `storeToRefs()`
- 事件处理函数命名：`onXxx`（用户触发）/ `handleXxx`（内部处理）
- 用注释分区：`// ========== 区域名 ==========`

**style：**
- `<style lang="scss" scoped>`
- 页面根 class：`.page-<page-name>`
- 使用 `var(--td-xxx)` CSS Variables
- 嵌套不超过 3 层
- 有 UI 清单 → 精确样式还原
- 无 UI 清单 → 基础合理布局

#### 页面全新创建示例

```vue
<template>
    <view class="page-login">
        <!-- ========== 表单区域 ========== -->
        <view class="form-section">
            <t-input
                :value="formData.phoneOrEmail"
                placeholder="请输入"
                @change="onPhoneChange"
            />
        </view>

        <!-- ========== 底部操作区域 ========== -->
        <view class="action-section">
            <t-button theme="primary" block :loading="loading" @click="onSubmit">
                登录
            </t-button>
        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useLoading } from '@/hooks'
import { didappLogin } from '@/http'
import { router } from '@/utils'
import { PAGE_HOME } from '@/constants/routes'

// ========== 状态 ==========

const formData = reactive({
    phoneOrEmail: '',
    password: '',
})

const { loading, withLoading } = useLoading()

// ========== 生命周期 ==========

onLoad(() => {
    // 页面加载时的逻辑
})

// ========== 事件处理 ==========

/** 手机号输入变化 */
const onPhoneChange = (ctx: { value: string }) => {
    formData.phoneOrEmail = ctx.value
}

/** 登录 */
const onSubmit = async () => {
    await withLoading(async () => {
        const res = await didappLogin(toRaw(formData))
        if (res.ok) {
            router.replace(PAGE_HOME)
        } else {
            uni.showToast({ title: res.msg, icon: 'none' })
        }
    })
}
</script>

<style lang="scss" scoped>
.page-login {
    min-height: 100vh;
    background: var(--td-bg-color-page);

    .form-section {
        padding: 32rpx;
    }

    .action-section {
        padding: 48rpx 32rpx;
    }
}
</style>
```

---

### 场景二：创建通用组件

#### 输入参数（来自 Spec）

| 参数 | 说明 | 示例 |
|------|------|------|
| 组件名称 | kebab-case | `user-avatar` |
| 组件中文名 | 用于注释 | 用户头像 |
| 路径 | 目标文件路径 | `src/components/user-avatar/index.vue` |
| Props 清单 | 组件入参定义 | `{ avatar: string, size?: number }` |
| Slots 清单 | 插槽定义 | `{ default, extra }` |
| UI 清单 | 设计稿分析结果（可选） | `{ 结构、样式 }` |
| 需要的 Hook | Hook 列表 | `['useLoading']` |

#### 编写要点

**template：**
- 组件根 class：组件名（kebab-case）
- 有 UI 清单 → 精确还原视觉
- 无 UI 清单 → 按交互描述 + 组件规范铺基础 UI

**script setup：**
- Props 使用泛型语法：`defineProps<Props>()`
- Emits 使用泛型语法：`defineEmits<Emits>()`
- 每个 prop/emit 必须有 JSDoc 注释
- 使用 `withDefaults` 设置默认值
- 使用组件生命周期：`onMounted`/`onUnmounted` 等（从 `vue` 导入）
- 主要通过 `emit` 通知父组件，避免直接调用 API
- 保持组件逻辑简单，复杂逻辑应抽离到 Hook 或由父页面处理

**style：**
- `<style lang="scss" scoped>`
- 组件根 class：组件名
- 子元素用 BEM `__` 连接

#### 通用组件全新创建示例

```vue
<template>
    <view class="user-avatar" @click="handleClick">
        <image
            class="user-avatar__image"
            :src="avatar"
            :style="{ width: `${size}rpx`, height: `${size}rpx` }"
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
    /** 尺寸（rpx） */
    size?: number
}

const props = withDefaults(defineProps<Props>(), {
    size: 96,
})

// ========== Emits ==========

interface Emits {
    /** 点击头像 */
    (e: 'click'): void
}

const emit = defineEmits<Emits>()

// ========== 事件处理 ==========

/** 点击头像 */
const handleClick = () => {
    emit('click')
}
</script>

<style lang="scss" scoped>
.user-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &__image {
        border-radius: 50%;
    }
}
</style>
```

#### 注册到统一导出（通用组件必须执行）

在 `src/components/index.ts` 中追加：

```typescript
/** 用户头像组件 */
export { default as UserAvatar } from './user-avatar/index.vue'
```

---

### 场景三：创建页面级组件

与通用组件类似，但：
- 路径在 `src/pages/<page>/components/` 下
- 不需要注册到 `src/components/index.ts`
- 同样需要先检查目标文件是否已存在

---

## 修改模式的详细规则

当目标文件已存在时，进入修改模式。

### 修改原则

1. **先读取完整的已有 SFC 内容**，理解其中的 template 结构、script 变量/函数、style 类名
2. **只修改需求涉及的部分**，不动需求之外的内容
3. **保持一致性**：
   - 修改 script 变量名 → 同步更新 template 绑定
   - 修改 template 结构 → 同步更新 style 类名
   - 新增交互 → 同步在 script 中添加对应函数
4. **使用 `replace_in_file` 工具**进行精确替换，不整体重写文件

### 常见修改场景

| 场景 | 修改范围 | 注意事项 |
|------|---------|---------|
| 设计稿来了，补 UI | template + style | 保持已有 script 不动，template 绑定使用已有变量名 |
| 新增交互功能 | script + template | 新增函数/变量，template 添加绑定 |
| 样式调整 | style（可能涉及 template class） | 不动 script |
| 重构变量 | script + template | 重命名变量时必须同步 template 绑定 |

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

### 通用检查（所有场景）

- [ ] SFC 结构顺序正确：template → script setup → style
- [ ] `<script setup lang="ts">` 语法
- [ ] `<style lang="scss" scoped>` 语法
- [ ] 无 `any` 类型
- [ ] 类型导入使用 `import type`
- [ ] 事件处理函数有 JSDoc 注释
- [ ] template 中无复杂逻辑（提取为 computed 或方法）
- [ ] template 绑定与 script 变量名/函数名一致
- [ ] **多端兼容性检查**：script 中使用的每个全局 API / 构造函数，确认它属于 ECMAScript 语言规范而非浏览器/Node.js 宿主环境提供的；不确定时先搜索 MDN 确认其所属规范

### 页面

- [ ] 路由已由 `create-route` 注册（pages.json + routes.ts）
- [ ] 页面根 class 为 `page-<name>`
- [ ] 从 `@dcloudio/uni-app` 导入页面生命周期
- [ ] API 调用使用 `if (res.ok)` 模式，无 try/catch
- [ ] reactive 对象传 API 时使用了 `toRaw()`
- [ ] Store 解构使用了 `storeToRefs()`

### 通用组件

- [ ] 已注册到 `src/components/index.ts`（附 JSDoc 注释）
- [ ] 组件根 class 为组件名
- [ ] Props/Emits 使用泛型语法
- [ ] 每个 prop/emit 有 JSDoc 注释
- [ ] 可选 Props 使用 `withDefaults` 设置默认值
- [ ] 通过 `emit` 通知父组件，无直接 API 调用

### 页面级组件

- [ ] 路径正确（`src/pages/<page>/components/`）
- [ ] 组件根 class 为组件名
- [ ] Props/Emits 使用泛型语法

### 样式

- [ ] 使用 `var(--td-xxx)` CSS Variables，无硬编码色值
- [ ] 图片使用 dummyimage 占位（如适用）
- [ ] 嵌套不超过 3 层
- [ ] 有 UI 清单时：逐区域对照了 UI 清单中的颜色、间距、字号、圆角
- [ ] 无 UI 清单时：使用了基础合理的 flex 布局 + TDesign 变量

### 修改模式

- [ ] 已读取完整的已有 SFC 内容
- [ ] 只修改了需求涉及的部分
- [ ] 修改变量名时同步更新了 template 绑定
- [ ] 使用 `replace_in_file` 精确替换，未整体重写
