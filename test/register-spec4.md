# 注册页面 — 实施计划（Spec）

> **状态**：🟢 定稿
> **关联交互文档**：`docs/Interactions/register-desc.md`
> **生成日期**：2026-03-26

---

## 一、需求摘要

### 页面基本信息

| 项目 | 内容 |
|------|------|
| 页面名称 | 注册页面 |
| 页面路由 | `/pages/register/index` |
| 路径常量名 | `PAGE_REGISTER` |
| 页面类型 | 表单页 |
| 主包/分包 | 主包 |
| 导航栏标题 | 注册 |
| 导航栏字体颜色 | 继承全局 |
| 导航栏背景色 | 继承全局 |
| 导航栏模式 | 系统默认 |
| tabBar 页面 | 否 |

### 功能概述

企业注册页面，用户填写企业账户名、手机号/邮箱、密码、管理员名称等信息，获取验证码后完成注册。注册成功后跳转到登录页面。邀请码通过页面路由 query 参数传入。

### 交互要点

- 表单包含：企业账户名、手机号/邮箱、密码、确认密码、管理员名称、验证码共 6 个输入字段
- 密码和确认密码支持点击小眼睛切换明文/密文显示
- 验证码发送后启动倒计时，防止频繁发送
- 页面底部有协议勾选（单选），必须勾选才能提交
- 点击"下一步"按钮：先检查协议勾选 → 表单校验 → 调用注册 API → 成功后跳转登录页
- 邀请码字段从路由 query 参数中获取，不在表单中展示

---

## 二、任务清单（Task List）

> 每个任务 = 一次 create-xxx Skill 调用。
> 按依赖顺序排列。
> 状态：⬜ 待执行 / 🔄 执行中 / ✅ 已完成

| 序号 | 任务名称 | 触发 Skill | 依赖 | 状态 |
|------|---------|-----------|------|------|
| T1 | 注册页面路由配置 | create-route | — | ⬜ |
| T2 | 创建表单校验工具函数 | create-util | — | ⬜ |
| T3 | 创建 Auth Store | create-store | — | ⬜ |
| T4 | 创建验证码倒计时 Hook | create-hook | — | ⬜ |
| T5 | 创建密码可见性切换 Hook | create-hook | — | ⬜ |
| T6 | 创建注册页面逻辑 | create-logic | T1, T2, T3, T4, T5 | ⬜ |

---

## 三、任务详情

### T1：注册页面路由配置

**触发 Skill**：`create-route`

**需求描述**：

配置注册页面和登录页面的路由。包括：

1. 在路由常量文件中新增注册页面和登录页面的路径常量。注册页面为主包页面，路径为 `pages/register/index`；登录页面为主包页面，路径为 `pages/login/index`
2. 在 `pages.json` 中注册注册页面的路由配置，页面标题为"注册"，导航栏样式继承全局默认配置

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/constants/routes.ts`（修改，新增 `PAGE_REGISTER` 和 `PAGE_LOGIN` 常量）
- [ ] `src/pages.json`（修改，新增注册页面路由）

---

### T2：创建表单校验工具函数

**触发 Skill**：`create-util`

**需求描述**：

创建注册页面所需的校验工具函数文件，包含以下校验函数，用于配合 `useFormValidation` Hook 的 validator 规则使用：

1. **企业账户名校验**：3-10 位字符，不能包含空格，仅允许汉字、字母、数字、下划线、减号的组合，只能以汉字或字母开头
2. **手机号格式校验**：校验中国大陆 11 位手机号格式
3. **邮箱格式校验**：校验标准邮箱地址格式
4. **密码格式校验**：6-16 位字符，必须同时包含数字和字母
5. **确认密码一致性校验**：校验两次输入的密码是否一致
6. **管理员名称校验**：3-10 位字符，仅允许汉字

由于手机号/邮箱共用同一个输入框，还需要一个辅助函数用于判断用户输入的是手机号还是邮箱。

所有校验函数需要在 `src/utils/index.ts` 中统一导出。

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/utils/validate.ts`（新建）
- [ ] `src/utils/index.ts`（修改，新增导出）

---

### T3：创建 Auth Store

**触发 Skill**：`create-store`

**需求描述**：

创建认证状态管理 Store，用于存储登录凭证（token）和用户信息。

功能需求：
- 存储登录/注册成功后返回的 token
- 存储用户信息（类型为 `DidappUserInfo`，来自 `src/http/services/did-app/model-types.ts`）
- 提供设置认证信息的方法（同时设置 token 和用户信息）
- 提供清除认证信息的方法（用于登出等场景）
- 提供判断是否已登录的计算属性
- 开启持久化（参考已有 `counter.ts` Store 的持久化配置方式）

Store 需要在 `src/store/index.ts` 中统一导出。

**使用的已有资源**：
- `DidappUserInfo` 类型（`src/http/services/did-app/model-types.ts`）

**预期产出**：
- [ ] `src/store/auth.ts`（新建）
- [ ] `src/store/index.ts`（修改，新增导出）

---

### T4：创建验证码倒计时 Hook

**触发 Skill**：`create-hook`

**需求描述**：

创建验证码发送及倒计时管理 Hook，封装验证码发送流程和倒计时逻辑。

功能需求：
- 暴露倒计时剩余秒数（响应式）
- 暴露是否正在倒计时的状态
- 提供发送验证码的方法：接收一个异步发送函数作为参数（因为手机验证码和邮箱验证码调用不同的 API），发送成功后启动倒计时
- 默认倒计时时长为 60 秒，支持自定义
- 倒计时期间禁止重复发送
- 组件卸载时自动清除定时器

Hook 需要在 `src/hooks/index.ts` 中统一导出。

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/hooks/use-auth-code.ts`（新建）
- [ ] `src/hooks/index.ts`（修改，新增导出）

---

### T5：创建密码可见性切换 Hook

**触发 Skill**：`create-hook`

**需求描述**：

创建密码明文/密文显示切换 Hook，封装密码输入框的显示状态管理。

功能需求：
- 暴露当前是否为明文显示的状态（响应式）
- 提供切换显示/隐藏的方法
- 暴露当前输入框应使用的 type 值（明文时为 text，密文时为 password）

Hook 需要在 `src/hooks/index.ts` 中统一导出。

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/hooks/use-password-visibility.ts`（新建）
- [ ] `src/hooks/index.ts`（修改，新增导出）

---

### T6：创建注册页面逻辑

**触发 Skill**：`create-logic`

**需求描述**：

创建注册页面的完整 Vue 组件（含 template、script setup、style），实现注册表单的交互逻辑。

表单字段：
- 企业账户名
- 手机号/邮箱（共用一个输入框）
- 密码（支持明文/密文切换）
- 确认密码（支持明文/密文切换）
- 管理员名称
- 验证码（附带发送验证码按钮）

页面逻辑：
1. 页面加载时从路由 query 参数中读取邀请码（`invitationCode`）
2. 使用 `useFormValidation` 配置所有字段的校验规则，校验函数从 `src/utils/validate.ts` 引入
3. 使用两个 `usePasswordVisibility` 实例分别控制密码和确认密码的明文/密文切换
4. 使用 `useAuthCode` 管理验证码发送和倒计时
5. 验证码发送前需先判断用户输入的是手机号还是邮箱，分别调用 `didappSendPhoneAuthCode` 或 `didappSendEmailAuthCode`
6. 协议勾选状态管理（页面级 boolean 状态）
7. 点击"下一步"按钮的流程：检查协议是否勾选 → 执行表单校验 → 调用 `didappCreateUser` API → 将返回的 token 和用户信息存入 Auth Store → 跳转登录页
8. 使用 `useLoading` 管理注册 API 调用的加载状态

**使用的已有资源**：
- `useFormValidation` Hook（`src/hooks/use-form-validation.ts`）
- `useLoading` Hook（`src/hooks/use-loading.ts`）
- `usePasswordVisibility` Hook（T5 产出）
- `useAuthCode` Hook（T4 产出）
- `useAuthStore`（T3 产出）
- 校验工具函数（T2 产出）
- `didappCreateUser` API（`src/http/services/did-app/index.ts`）
- `didappSendPhoneAuthCode` API（`src/http/services/did-app/index.ts`）
- `didappSendEmailAuthCode` API（`src/http/services/did-app/index.ts`）
- `router` 工具（`src/utils/router.ts`）
- `PAGE_REGISTER`、`PAGE_LOGIN` 路由常量（T1 产出）

**预期产出**：
- [ ] `src/pages/register/index.vue`（新建）

---

## 四、API 接口清单

| 序号 | 接口名称 | 方法 | 所属服务 | 是否已有 | 备注 |
|------|---------|------|---------|---------|------|
| A1 | didappCreateUser | POST | did-app | 是 | 直接使用 |
| A2 | didappSendPhoneAuthCode | POST | did-app | 是 | 直接使用 |
| A3 | didappSendEmailAuthCode | POST | did-app | 是 | 直接使用 |

---

## 五、资源方案总览

### Store

| Store 名称 | 操作 | 需求概述 | 对应任务 |
|-----------|------|---------|---------|
| useAuthStore | 新建 | 存储 token 和用户信息，支持持久化 | T3 |

### Hook

| Hook 名称 | 操作 | 需求概述 | 对应任务 |
|-----------|------|---------|---------|
| useFormValidation | 直接使用 | 表单校验框架 | — |
| useLoading | 直接使用 | 加载态管理 | — |
| useAuthCode | 新建 | 验证码发送及倒计时管理 | T4 |
| usePasswordVisibility | 新建 | 密码明文/密文切换 | T5 |

### 工具函数

| 函数名 | 操作 | 需求概述 | 对应任务 |
|--------|------|---------|---------|
| 企业账户名校验 | 新建 | 3-10 位，汉字/字母/数字/下划线/减号，汉字或字母开头 | T2 |
| 手机号格式校验 | 新建 | 中国大陆 11 位手机号校验 | T2 |
| 邮箱格式校验 | 新建 | 标准邮箱地址格式校验 | T2 |
| 密码格式校验 | 新建 | 6-16 位，含数字和字母 | T2 |
| 确认密码一致性校验 | 新建 | 两次密码一致性校验 | T2 |
| 管理员名称校验 | 新建 | 3-10 位汉字 | T2 |
| 手机号/邮箱类型判断 | 新建 | 判断输入是手机号还是邮箱 | T2 |
| router | 直接使用 | 页面跳转工具 | — |

### 路由配置

| 资源 | 操作 | 说明 | 对应任务 |
|------|------|------|---------|
| `PAGE_REGISTER` 常量 | 新建 | 路径 `/pages/register/index` | T1 |
| `PAGE_LOGIN` 常量 | 新建 | 路径 `/pages/login/index` | T1 |
| 注册页面路由（pages.json） | 新建 | 主包，导航栏标题"注册"，样式继承全局 | T1 |

---

## 六、决策记录

| # | 决策问题 | 用户决定 | 确认时间 |
|---|---------|---------|---------|
| D1 | 页面分包归属：注册页面放主包还是分包 | 主包（`pages/register/index`） | 2026-03-26 |
| D2 | 校验规则函数存放位置：抽离到 utils 还是页面内实现 | 抽离到 `src/utils/validate.ts` 作为通用校验函数 | 2026-03-26 |
| D3 | 验证码倒计时逻辑：抽离为 Hook 还是页面内实现 | 抽离为 `src/hooks/use-auth-code.ts` Hook | 2026-03-26 |
| D4 | 密码明文/密文切换逻辑：抽离为 Hook 还是页面内实现 | 抽离为 `src/hooks/use-password-visibility.ts` Hook | 2026-03-26 |
| D5 | Auth Store（token + 用户信息）：创建全局 Store 还是页面自行存储 | 创建 `src/store/auth.ts` 全局 Store，开启持久化 | 2026-03-26 |
| D6 | API 中 invitationCode 字段：交互文档未设计对应 UI 输入 | 从页面路由 query 参数中获取 | 2026-03-26 |
| D7 | 验证码非空校验（L7）：仅 required 校验 | 页面内实现，直接使用 useFormValidation 的 required 规则 | 2026-03-26 |
| D8 | 协议勾选状态管理（L10）：仅一个 boolean ref | 页面内实现，纯页面级状态 | 2026-03-26 |

---

## 七、执行顺序

1. T1：注册页面路由配置
2. T2：创建表单校验工具函数
3. T3：创建 Auth Store
4. T4：创建验证码倒计时 Hook
5. T5：创建密码可见性切换 Hook
6. T6：创建注册页面逻辑

> T1~T5 之间无依赖关系，可并行执行。T6 依赖 T1~T5 的全部产出，必须最后执行。

---

## 变更记录

### v2 — 适配 create-route Skill（2026-03-26）
- 合并原 T1（新增路由常量）和原 T2（注册页面路由配置）为新 T1，触发 Skill 改为 `create-route`
- 任务总数从 7 个精简为 6 个，重新编号 T1~T6
- 页面基本信息表新增导航栏配置详细字段（标题、字体颜色、背景色、模式）
- 新增 D1 决策记录：页面分包归属（主包）
- 资源方案总览"路由常量"改为"路由配置"，增加 pages.json 配置信息

### v1 — 初始创建（2026-03-26）
- 根据交互文档 `docs/Interactions/register-desc.md` 创建注册页面实施计划
- 确认 5 项抽离决策 + 2 项隐含决策（页面内实现）
- 所有 API 已存在，无需新建接口
