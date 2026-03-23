# 登录页 — 实施计划（Spec）

> **状态**：🟢 定稿
> **关联 UI 清单**：`docs/ui-analysis/login-ui-inventory.md`
> **关联 API 文档**：`docs/Interactions/login-desc.md`
> **关联交互文档**：`docs/Interactions/login-desc.md`
> **生成日期**：2026-03-20

---

## 一、需求摘要

### 页面基本信息

| 项目 | 内容 |
|------|------|
| 页面名称 | 登录页 |
| 页面路由 | `/pages/login/index` |
| 路径常量名 | `PAGE_LOGIN` |
| 页面类型 | 表单页 |
| 主包/分包 | 主包 |
| 导航栏 | custom |
| tabBar 页面 | 否 |

### 功能概述

企业用户通过手机号+密码登录系统。登录成功后将 token 和用户信息持久化存储（有效期 6 小时），不跳转页面。该页面作为应用启动页。

### 交互要点

- 表单校验：手机号不可为空，标准大陆手机号格式；密码不可为空，6-16位，包含数字、字母、特殊字符
- 点击登录按钮 → 表单校验 → 校验通过后调用登录 API → 成功后持久化存储 token 和用户信息（6 小时有效期），不跳转页面
- 登录失败时使用 toast 提示错误信息
- "创建新的企业账号"点击后暂不跳转，`console.log` 占位
- "忘记密码？"点击后暂不跳转，`console.log` 占位
- 密码输入框支持密码可见性切换

---

## 二、任务清单（Task List）

> 每个任务 = 一次 create-xxx Skill 调用。
> 按依赖顺序排列。
> 状态：⬜ 待执行 / 🔄 执行中 / ✅ 已完成

| 序号 | 任务名称 | 触发 Skill | 依赖 | 状态 |
|------|---------|-----------|------|------|
| T1 | 创建登录页 | create-page | — | ⬜ |

---

## 三、任务详情

### T1：创建登录页

**触发 Skill**：`create-page`

**需求描述**：

创建登录页面，作为应用启动页。页面包含顶部品牌装饰图区域和表单区域。表单区域包含手机号输入框（带左侧用户图标）、密码输入框（带左侧密码图标和右侧密码可见性切换）、快捷链接行（"创建新的企业账号"和"忘记密码？"）、登录按钮。

登录流程：
1. 用户填写手机号和密码
2. 点击登录按钮，先执行表单校验（手机号：大陆手机号格式；密码：6-16位，包含数字、字母、特殊字符）
3. 校验通过后调用 `didappLogin` API
4. 登录成功：使用 `setStorageSync` 将 token 和用户信息持久化存储，有效期 6 小时（`expireIn: 6 * 60 * 60 * 1000`），不跳转页面
5. 登录失败：toast 提示错误信息
6. "创建新的企业账号"和"忘记密码？"暂不跳转，`console.log` 占位

页面配置：
- 导航栏样式：custom
- 作为应用启动页（pages.json 中第一项）
- 新增路由常量 `PAGE_LOGIN`

**UI 清单参考**：`docs/ui-analysis/login-ui-inventory.md`

**使用的已有资源**：
- API：`didappLogin`（`src/http/services/did-app/index.ts`）
- Hook：`useFormValidation`（`src/hooks/use-form-validation`）— 表单校验
- Hook：`useLoading`（`src/hooks/use-loading`）— 登录按钮 loading 态
- Util：`setStorageSync`（`src/utils/storage.ts`）— token 和用户信息持久化存储（带过期时间）
- Util：`router`（`src/utils/route.ts`）— 路由跳转（预留）
- TDesign 组件：`<t-input>`、`<t-button>`

**关键交互逻辑**：
1. 用户输入手机号和密码，实时 v-model 双向绑定
2. 点击"登 录"按钮，触发表单校验
3. 校验失败 → toast 提示第一条校验错误信息
4. 校验通过 → 按钮进入 loading 态 → 调用 `didappLogin({ phoneOrEmail, password })`
5. API 成功 → `setStorageSync('token', res.data.token, { expireIn: 6 * 60 * 60 * 1000 })`，`setStorageSync('userInfo', res.data.useInfo, { expireIn: 6 * 60 * 60 * 1000 })`
6. API 失败 → toast 提示错误信息（拦截器已处理）
7. 无论成功失败 → 退出 loading 态
8. 点击"创建新的企业账号" → `console.log('创建新的企业账号')`
9. 点击"忘记密码？" → `console.log('忘记密码')`

**特殊样式要点**：

| 要点 | 说明 |
|------|------|
| 页面水平边距 | 60rpx（大于常规 32rpx） |
| 输入框风格 | 底部分隔线风格（非边框），TDesign Input 的 borderless 模式 + 自定义底部 border |
| 登录按钮 | 全宽圆角（shape="round"），文字"登 录"中间有空格 |
| 顶部装饰图 | ≈ 540rpx 高，使用占位图 |

**预期产出**：
- [ ] `src/pages/login/index.vue`
- [ ] 更新 `src/pages.json`（新增登录页路由，置于第一项）
- [ ] 更新 `src/constants/routes.ts`（新增 `PAGE_LOGIN`）

---

## 四、API 接口清单

| 序号 | 接口名称 | 方法 | 所属服务 | 是否已有 | 备注 |
|------|---------|------|---------|---------|------|
| A1 | 手机号密码登录 `/login/login` | POST | did-app | 是 | 直接使用 `didappLogin` |

---

## 五、资源方案总览

### 组件

| 组件 | 来源 | 操作 | 对应任务 |
|------|------|------|---------|
| `<t-input>` | TDesign | 直接使用 | — |
| `<t-button>` | TDesign | 直接使用 | — |

### Store

| Store 名称 | 操作 | 需求概述 | 对应任务 |
|-----------|------|---------|---------|
| （不使用 Store） | — | token/用户信息通过 `setStorageSync` 直接持久化 | — |

### Hook

| Hook 名称 | 操作 | 需求概述 | 对应任务 |
|-----------|------|---------|---------|
| `useFormValidation` | 直接使用 | 表单校验（手机号格式 + 密码规则） | — |
| `useLoading` | 直接使用 | 登录按钮 loading 态管理 | — |

### 工具函数

| 函数名 | 操作 | 需求概述 | 对应任务 |
|--------|------|---------|---------|
| `setStorageSync` | 直接使用 | 持久化存储 token 和用户信息，有效期 6 小时 | — |
| `router` | 直接使用 | 预留路由跳转能力 | — |

---

## 六、决策记录

> 记录用户在 Spec 生成过程中确认的所有决策，供复盘追溯。

| # | 决策问题 | 用户决定 | 确认时间 |
|---|---------|---------|---------|
| D1 | 登录成功后跳转哪个页面？ | 不跳转页面 | 2026-03-20 |
| D2 | token 和用户信息怎么存？ | 使用 `setStorageSync` 持久化存储，有效期 6 小时，不创建 Store | 2026-03-20 |
| D3 | 登录失败的提示方式？ | toast 提示 | 2026-03-20 |
| D4 | "创建新的企业账号"点击后跳哪？ | 暂不跳转，`console.log` 占位 | 2026-03-20 |
| D5 | "忘记密码？"点击后跳哪？ | 暂不跳转，`console.log` 占位 | 2026-03-20 |
| D6 | 登录页的导航栏配置？ | `navigationStyle: "custom"` | 2026-03-20 |
| D7 | 登录页是否作为应用启动页？ | 是，pages.json 中第一项 | 2026-03-20 |

---

## 七、执行顺序

1. T1：创建登录页（含更新 pages.json 和 routes.ts）

---

## 变更记录

### v1 — 初始创建（2026-03-20）
- 根据 UI 清单 + 交互文档 + 用户决策生成定稿
- 任务简化为 1 个（仅 create-page），因所有 API / Hook / Util 已存在，不新建 Store
