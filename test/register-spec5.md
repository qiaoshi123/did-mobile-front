# 注册页 — 实施计划（Spec）

> **状态**：🟢 定稿
> **关联交互文档**：`docs/Interactions/register-desc.md`
> **生成日期**：2026-03-26

---

## 一、需求摘要

### 页面基本信息

| 项目 | 内容 |
|------|------|
| 页面名称 | 注册页 |
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

企业账号注册页面，用户填写企业账户名、管理员名称、手机号/邮箱、密码、验证码等信息，勾选协议后提交注册。注册成功后跳转到登录页面。邀请码通过路由参数传入，不在表单中展示。

### 交互要点

- 表单包含：企业账户名、手机号/邮箱、密码、确认密码、管理员名称、验证码共 6 个输入字段
- 邀请码从路由 query 参数中获取，不展示输入框
- 密码和确认密码字段支持明文/密文切换（小眼睛图标）
- 验证码发送前需判断手机号/邮箱格式，调用对应 API 发送验证码
- 发送验证码后启动倒计时
- 页面底部有协议勾选（单选，必须勾选才能注册）
- 点击注册按钮：检查协议勾选 → 表单校验 → 调用注册 API → 注册成功后存储 token 和用户信息到全局 Store → 跳转登录页

---

## 二、任务清单（Task List）

> 每个任务 = 一次 create-xxx Skill 调用。
> 按依赖顺序排列。
> 状态：⬜ 待执行 / 🔄 执行中 / ✅ 已完成

| 序号 | 任务名称 | 触发 Skill | 依赖 | 状态 |
|------|---------|-----------|------|------|
| T1 | 注册页路由配置 | create-route | — | ✅ |
| T2 | 创建 Auth Store | create-store | — | ✅ |
| T3 | 创建表单校验工具函数 | create-util | — | ✅ |
| T4 | 创建密码明文/密文切换 Hook | create-hook | — | ✅ |
| T5 | 创建验证码 Hook | create-hook | — | ✅ |
| T6 | 注册页逻辑代码 | create-logic | T1、T2、T3、T4、T5 | ✅ |

---

## 三、任务详情

### T1：注册页路由配置

**触发 Skill**：`create-route`

**需求描述**：

在主包中新增注册页路由。页面路径为 `pages/register/index`，路由常量名为 `PAGE_REGISTER`。导航栏标题为"注册"，导航栏字体颜色和背景色继承全局配置，使用系统默认导航栏模式，非 tabBar 页面。

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/pages.json`（新增注册页路由条目）
- [ ] `src/constants/routes.ts`（新增 `PAGE_REGISTER` 常量）

---

### T2：创建 Auth Store

**触发 Skill**：`create-store`

**需求描述**：

创建认证 Store（`useAuthStore`），用于全局存储登录凭证（token）和用户信息。

Store 需要的功能：
- 存储登录令牌（token），供请求拦截器读取以设置请求头
- 存储用户信息（对应 `DidappUserInfo` 类型），供个人中心、权限判断等多页面使用
- 提供设置认证信息的方法（登录/注册成功后调用，一次性存入 token 和用户信息）
- 提供清除认证信息的方法（退出登录时调用）
- 提供判断是否已登录的计算属性
- 开启持久化（token 和用户信息需要跨页面/重启保留）

**使用的已有资源**：
- `DidappUserInfo` 类型（来自 `src/http/services/did-app/model-types.ts`）
- `DidappAuthResult` 类型（来自 `src/http/services/did-app/model-types.ts`）

**预期产出**：
- [ ] `src/store/auth.ts`
- [ ] `src/store/index.ts`（新增 Auth Store 的导出）

---

### T3：创建表单校验工具函数

**触发 Skill**：`create-util`

**需求描述**：

在 `src/utils/` 下创建校验工具函数文件，包含以下校验函数：

1. **企业账户名校验**：校验是否为 3-10 位，不含空格，只允许汉字、字母、数字、下划线、减号或其组合，且必须以汉字或字母开头
2. **手机号格式校验**：校验中国大陆 11 位手机号格式
3. **邮箱格式校验**：校验标准邮箱地址格式
4. **密码格式校验**：校验 6-16 位，必须同时包含数字和字母
5. **管理员名称校验**：校验 3-10 位，仅允许汉字

所有函数为纯校验函数，校验通过返回通过标识，校验失败返回对应的错误提示信息。函数命名遵循 `validate` 前缀规范。

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/utils/validate.ts`
- [ ] `src/utils/index.ts`（新增校验函数的导出）

---

### T4：创建密码明文/密文切换 Hook

**触发 Skill**：`create-hook`

**需求描述**：

创建密码明文/密文切换 Hook（`usePasswordToggle`），封装密码字段的显示模式切换逻辑。

功能需求：
- 管理密码是否以明文显示的状态
- 提供切换显示模式的方法
- 支持同时管理多个独立的密码字段（如注册页的密码和确认密码字段各自独立切换）

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/hooks/use-password-toggle.ts`
- [ ] `src/hooks/index.ts`（新增 Hook 的导出）

---

### T5：创建验证码 Hook

**触发 Skill**：`create-hook`

**需求描述**：

创建验证码 Hook（`useAuthCode`），封装发送验证码和倒计时逻辑。

功能需求：
- 发送验证码前，根据输入值判断是手机号还是邮箱，分别调用对应的 API
- 发送成功后自动启动倒计时（默认 60 秒）
- 暴露倒计时剩余秒数，供页面显示
- 暴露是否在倒计时中的状态，用于禁用发送按钮
- 提供发送验证码的方法
- 组件卸载时自动清除定时器

**使用的已有资源**：
- `didappSendPhoneAuthCode` API（来自 `src/http/services/did-app`）
- `didappSendEmailAuthCode` API（来自 `src/http/services/did-app`）

**预期产出**：
- [ ] `src/hooks/use-auth-code.ts`
- [ ] `src/hooks/index.ts`（新增 Hook 的导出）

---

### T6：注册页逻辑代码

**触发 Skill**：`create-logic`

**需求描述**：

创建注册页的完整逻辑代码（`<script setup>` 部分），实现注册表单的交互和提交流程。

功能需求：
1. 页面加载时从路由 query 参数中获取邀请码（`invitationCode`）
2. 表单数据管理：企业账户名、手机号/邮箱、密码、确认密码、管理员名称、验证码
3. 使用 `useFormValidation` 配置所有字段的校验规则，校验规则函数从 `@/utils` 导入
4. 确认密码的一致性校验（与密码字段值比较）在页面内实现
5. 使用 `usePasswordToggle` 管理密码和确认密码的明文/密文切换（两个字段独立控制）
6. 使用 `useAuthCode` 处理验证码发送和倒计时
7. 协议勾选状态管理（布尔值）
8. 注册提交流程：检查协议是否勾选（未勾选则提示）→ 执行表单校验 → 调用 `didappCreateUser` API（传入表单数据和邀请码）→ 注册成功后将返回的 token 和用户信息存入 Auth Store → 跳转到登录页
9. 使用 `useLoading` 管理注册按钮的加载状态

**使用的已有资源**：
- `useFormValidation` Hook（来自 `@/hooks`）
- `useLoading` Hook（来自 `@/hooks`）
- `usePasswordToggle` Hook（来自 `@/hooks`，T4 新建）
- `useAuthCode` Hook（来自 `@/hooks`，T5 新建）
- `useAuthStore` Store（来自 `@/store`，T2 新建）
- 校验工具函数（来自 `@/utils`，T3 新建）
- `didappCreateUser` API（来自 `src/http/services/did-app`）
- `router` 工具（来自 `@/utils`）
- `PAGE_LOGIN`（⚠️ 待确认：当前路由常量中仅有 `PAGE_HOME`，登录页路由常量是否已有？跳转登录页时使用路由路径字符串或待登录页 Spec 补充后使用常量）

**预期产出**：
- [ ] `src/pages/register/index.vue`

---

## 四、API 接口清单

| 序号 | 接口名称 | 方法 | 所属服务 | 是否已有 | 备注 |
|------|---------|------|---------|---------|------|
| A1 | didappCreateUser（创建企业账号） | POST | did-app | 是 | 直接使用 |
| A2 | didappSendPhoneAuthCode（获取手机验证码） | POST | did-app | 是 | 直接使用 |
| A3 | didappSendEmailAuthCode（获取邮箱验证码） | POST | did-app | 是 | 直接使用 |

---

## 五、资源方案总览

### Store

| Store 名称 | 操作 | 需求概述 | 对应任务 |
|-----------|------|---------|---------|
| useAuthStore | 新建 | 存储 token + 用户信息，支持持久化 | T2 |

### Hook

| Hook 名称 | 操作 | 需求概述 | 对应任务 |
|-----------|------|---------|---------|
| useFormValidation | 直接使用 | 表单校验框架 | — |
| useLoading | 直接使用 | 注册按钮加载状态 | — |
| usePasswordToggle | 新建 | 密码明文/密文切换 | T4 |
| useAuthCode | 新建 | 发送验证码 + 倒计时 | T5 |

### 工具函数

| 函数名 | 操作 | 需求概述 | 对应任务 |
|--------|------|---------|---------|
| validateUserName | 新建 | 企业账户名校验 | T3 |
| validatePhone | 新建 | 手机号格式校验 | T3 |
| validateEmail | 新建 | 邮箱格式校验 | T3 |
| validatePassword | 新建 | 密码格式校验 | T3 |
| validateAdminName | 新建 | 管理员名称校验 | T3 |
| router | 直接使用 | 路由跳转 | — |

### 路由常量

| 常量名 | 操作 | 路由路径 | 对应任务 |
|--------|------|---------|---------|
| PAGE_REGISTER | 新建 | `/pages/register/index` | T1 |

---

## 六、决策记录

| # | 决策问题 | 用户决定 | 确认时间 |
|---|---------|---------|---------|
| D1 | 注册页分包归属 | A）主包（`pages/register/index`） | 2026-03-26 |
| D2 | 导航栏标题 | A）标题为"注册" | 2026-03-26 |
| D3 | `invitationCode` 字段处理方式 | C）从路由参数 query 中获取，不在表单中展示 | 2026-03-26 |
| D4 | 校验规则抽离 | A）全部抽离为 Util（企业账户名/手机号/邮箱/密码/管理员名称） | 2026-03-26 |
| D5 | 密码明文/密文切换 | A）抽离为 Hook（`usePasswordToggle`） | 2026-03-26 |
| D6 | 获取验证码 + 倒计时 | A）合并为一个 Hook（`useAuthCode`） | 2026-03-26 |
| D7 | Auth Store | A）新建 `src/store/auth.ts`，存储 token + 用户信息，支持持久化 | 2026-03-26 |
| D8 | 确认密码一致性校验 | 页面内实现（依赖密码字段值，与具体表单绑定） | 2026-03-26 |
| D9 | 验证码非空校验 | 页面内实现（useFormValidation 的 required 规则直接覆盖） | 2026-03-26 |
| D10 | 协议勾选状态管理 | 页面内实现（仅一个布尔状态 + 勾选前提示） | 2026-03-26 |
| D11 | 注册提交编排流程 | 页面内实现（纯业务编排：校验 → 调 API → 存储 → 跳转） | 2026-03-26 |

---

## 七、执行顺序

1. T1：注册页路由配置（无依赖，优先执行）
2. T2：创建 Auth Store（无依赖，可与 T1 并行）
3. T3：创建表单校验工具函数（无依赖，可与 T1、T2 并行）
4. T4：创建密码明文/密文切换 Hook（无依赖，可与 T1~T3 并行）
5. T5：创建验证码 Hook（无依赖，可与 T1~T4 并行）
6. T6：注册页逻辑代码（依赖 T1~T5 全部完成后执行）

---

## 变更记录

### v1 — 初始创建（2026-03-26）
- 创建注册页实施计划
- 确认 7 项显式决策 + 4 项隐含决策
- 拆分为 6 个任务：路由配置、Auth Store、校验工具函数、密码切换 Hook、验证码 Hook、页面逻辑
