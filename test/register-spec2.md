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
| 导航栏 | 系统默认 |
| tabBar 页面 | 否 |

### 功能概述

用户注册页面，包含企业账户名、手机号/邮箱、密码、确认密码、管理员名称、验证码等表单字段的填写与校验，协议勾选确认，调用注册 API 完成注册后跳转至登录页面。邀请码通过路由 query 参数接收。

### 交互要点

- 企业账户名：3-10 位，不含空格，支持汉字、字母、数字、下划线、减号，只能以汉字或字母开头
- 手机号/邮箱：分别进行手机格式校验和邮箱格式校验
- 密码：6-16 位，必须包含数字和字母，可点击小眼睛切换明文/密文
- 确认密码：6-16 位，必须包含数字和字母，需与密码一致，可点击小眼睛切换明文/密文
- 管理员名称：非空，3-10 位，仅支持汉字
- 验证码：非空，点击发送后触发倒计时
- 协议勾选：单选，必须勾选后才能提交
- 下一步按钮：检查协议勾选 → 表单校验 → 调用注册 API → 注册成功跳转登录页
- 邀请码：通过路由 query 参数接收，不在表单中展示

---

## 二、任务清单（Task List）

> 每个任务 = 一次 create-xxx Skill 调用。
> 按依赖顺序排列。
> 状态：⬜ 待执行 / 🔄 执行中 / ✅ 已完成

| 序号 | 任务名称 | 触发 Skill | 依赖 | 状态 |
|------|---------|-----------|------|------|
| T1 | 创建表单校验工具函数 | create-util | — | ⬜ |
| T2 | 创建用户 Store | create-store | — | ⬜ |
| T3 | 创建验证码倒计时 Hook | create-hook | — | ⬜ |
| T4 | 创建密码显隐切换 Hook | create-hook | — | ⬜ |
| T5 | 新增路由常量 | create-util | — | ⬜ |
| T6 | 创建注册页面逻辑 | create-logic | T1, T2, T3, T4, T5 | ⬜ |

---

## 三、任务详情

### T1：创建表单校验工具函数

**触发 Skill**：`create-util`

**需求描述**：

在 `src/utils/` 下创建表单校验相关的工具函数文件，包含以下校验函数：

1. **企业账户名校验**：校验 3-10 位，不含空格，支持汉字、字母、数字、下划线、减号组合，只能以汉字或字母开头
2. **手机号格式校验**：校验中国大陆 11 位手机号格式
3. **邮箱格式校验**：校验标准邮箱地址格式
4. **密码格式校验**：校验 6-16 位，必须同时包含数字和字母
5. **管理员名称校验**：校验非空，3-10 位，仅支持汉字

每个校验函数都是纯函数，适用于 `useFormValidation` Hook 的校验规则配置。

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/utils/validators.ts`
- [ ] 更新 `src/utils/index.ts`（新增导出）

---

### T2：创建用户 Store

**触发 Skill**：`create-store`

**需求描述**：

在 `src/store/` 下创建用户相关的 Store，用于存储登录/注册后的用户认证信息，需要满足：

1. 存储登录凭证（token），供请求拦截器跨模块使用
2. 存储用户基本信息（从注册/登录 API 返回的 `DidappAuthResult` 中获取的 `useInfo` 对象，包含用户 ID、用户名等）
3. 支持持久化（使用项目已配置的 pinia-plugin-persistedstate）
4. 提供清除用户信息的能力（用于退出登录场景）

该 Store 将被请求拦截器（`requestAuthHeaderInterceptor`）、注册页、登录页及其他业务页面共同使用。

**使用的已有资源**：
- Pinia 实例及持久化插件（`src/store/index.ts` 已配置）
- `DidappAuthResult`、`DidappUserInfo` 类型（`src/http/services/did-app/model-types.ts`）

**预期产出**：
- [ ] `src/store/user.ts`
- [ ] 更新 `src/store/index.ts`（新增导出）

---

### T3：创建验证码倒计时 Hook

**触发 Skill**：`create-hook`

**需求描述**：

在 `src/hooks/` 下创建验证码倒计时 Hook，封装以下功能：

1. 管理倒计时秒数的响应式状态
2. 提供启动倒计时的方法（启动后按秒递减）
3. 暴露当前是否处于倒计时中的状态（用于禁用发送按钮）
4. 倒计时结束后自动重置状态
5. 组件卸载时自动清除定时器，防止内存泄漏

该 Hook 将用于注册页发送手机验证码和邮箱验证码的场景，登录页等其他页面也可复用。

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/hooks/use-countdown/index.ts`
- [ ] 更新 `src/hooks/index.ts`（新增导出）

---

### T4：创建密码显隐切换 Hook

**触发 Skill**：`create-hook`

**需求描述**：

在 `src/hooks/` 下创建密码显隐切换 Hook，封装以下功能：

1. 管理密码是否可见的响应式状态
2. 提供切换显隐的方法
3. 暴露当前的输入框类型（密文对应 password 类型，明文对应 text 类型）

该 Hook 将用于注册页的密码字段和确认密码字段（各自独立实例），登录页等其他页面也可复用。

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/hooks/use-password-toggle/index.ts`
- [ ] 更新 `src/hooks/index.ts`（新增导出）

---

### T5：新增路由常量

**触发 Skill**：`create-util`

**需求描述**：

在路由常量文件中新增以下常量：

1. 注册页路由常量（路径 `/pages/register/index`）
2. 登录页路由常量（路径 `/pages/login/index`）

同时在 `pages.json` 中新增注册页的路由配置。

**使用的已有资源**：
- `src/constants/routes.ts`（已有 `PAGE_HOME`）
- `src/pages.json`（已有路由配置结构）

**预期产出**：
- [ ] 更新 `src/constants/routes.ts`（新增 `PAGE_REGISTER`、`PAGE_LOGIN`）
- [ ] 更新 `src/pages.json`（新增注册页路由配置）

---

### T6：创建注册页面逻辑

**触发 Skill**：`create-logic`

**需求描述**：

在 `src/pages/register/` 下创建注册页面，编写页面的 script setup 逻辑，需要实现：

1. **表单数据管理**：管理企业账户名、手机号/邮箱、密码、确认密码、管理员名称、验证码的表单数据
2. **路由参数接收**：页面加载时从路由 query 参数中获取邀请码
3. **表单校验集成**：使用 `useFormValidation` Hook 配合 T1 产出的校验工具函数，配置各字段的校验规则。确认密码的一致性校验在页面内实现（与密码值比较）
4. **密码显隐切换**：分别为密码字段和确认密码字段创建 T4 产出的密码显隐 Hook 实例
5. **发送验证码**：发送手机验证码调用 `didappSendPhoneAuthCode` API，发送邮箱验证码调用 `didappSendEmailAuthCode` API，发送成功后启动 T3 产出的倒计时 Hook
6. **协议勾选状态**：管理协议勾选的响应式状态
7. **注册提交流程**：点击下一步按钮 → 检查协议是否勾选（未勾选提示） → 执行表单校验 → 调用 `didappCreateUser` API（入参包含邀请码） → 将返回的 token 和用户信息存入 T2 产出的用户 Store → 跳转登录页
8. **加载态管理**：使用 `useLoading` Hook 管理注册请求的加载状态

**使用的已有资源**：
- `didappCreateUser` API（`src/http/services/did-app`）
- `didappSendPhoneAuthCode` API（`src/http/services/did-app`）
- `didappSendEmailAuthCode` API（`src/http/services/did-app`）
- `useFormValidation` Hook（`@/hooks`）
- `useLoading` Hook（`@/hooks`）
- `router` Util（`@/utils`）
- T1 产出的校验工具函数（`@/utils`）
- T2 产出的用户 Store（`@/store`）
- T3 产出的验证码倒计时 Hook（`@/hooks`）
- T4 产出的密码显隐切换 Hook（`@/hooks`）
- T5 产出的路由常量（`@/constants/routes`）

**预期产出**：
- [ ] `src/pages/register/index.vue`

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
| user | 新建 | 存储登录凭证和用户信息，支持持久化 | T2 |

### Hook

| Hook 名称 | 操作 | 需求概述 | 对应任务 |
|-----------|------|---------|---------|
| useFormValidation | 直接使用 | 表单校验框架 | — |
| useLoading | 直接使用 | 加载态管理 | — |
| useCountdown | 新建 | 验证码发送后的倒计时逻辑 | T3 |
| usePasswordToggle | 新建 | 密码明文/密文切换 | T4 |

### 工具函数

| 函数名 | 操作 | 需求概述 | 对应任务 |
|--------|------|---------|---------|
| router | 直接使用 | 页面跳转 | — |
| 企业账户名校验 | 新建 | 校验格式规则 | T1 |
| 手机号校验 | 新建 | 校验中国大陆手机号格式 | T1 |
| 邮箱校验 | 新建 | 校验标准邮箱格式 | T1 |
| 密码校验 | 新建 | 校验密码格式规则 | T1 |
| 管理员名称校验 | 新建 | 校验汉字和长度 | T1 |

### 路由常量

| 常量名 | 操作 | 路径 | 对应任务 |
|--------|------|------|---------|
| PAGE_HOME | 直接使用 | `/pages/index/index` | — |
| PAGE_REGISTER | 新增 | `/pages/register/index` | T5 |
| PAGE_LOGIN | 新增 | `/pages/login/index` | T5 |

---

## 六、决策记录

| # | 决策问题 | 用户决定 | 确认时间 |
|---|---------|---------|---------|
| D1 | 企业账户名/手机号/邮箱/密码/管理员名称校验函数是否抽为 Util | ✅ 抽离 | 2026-03-26 |
| D2 | 确认密码一致性校验是否抽为 Util | ❌ 不抽离，页面内实现 | 2026-03-26 |
| D3 | 密码明文/密文切换是否抽为 Hook | ✅ 抽离 | 2026-03-26 |
| D4 | 验证码倒计时是否抽为 Hook | ✅ 抽离 | 2026-03-26 |
| D5 | 是否创建用户 Store（存 token + userInfo） | ✅ 抽离 | 2026-03-26 |
| D6 | invitationCode（邀请码）如何处理 | 通过路由 query 参数接收 | 2026-03-26 |
| D7 | 是否新增 PAGE_REGISTER 和 PAGE_LOGIN 路由常量 | ✅ 新增 | 2026-03-26 |

---

## 七、执行顺序

1. T1：创建表单校验工具函数
2. T2：创建用户 Store
3. T3：创建验证码倒计时 Hook
4. T4：创建密码显隐切换 Hook
5. T5：新增路由常量
6. T6：创建注册页面逻辑（依赖 T1-T5 全部完成）

---

## 变更记录

### v1 — 初始创建（2026-03-26）
- 基于交互文档 `register-desc.md` 生成注册页面实施计划
- 用户确认全部 7 项决策
