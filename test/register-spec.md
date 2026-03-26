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
| 导航栏 | 系统默认 |
| tabBar 页面 | 否 |

### 功能概述

注册页面提供企业账号注册能力。用户填写企业账户名、手机号/邮箱、密码、管理员名称、验证码等信息，勾选协议后提交注册。注册成功后将 token 和用户信息存入全局 Store，并跳转登录页。`invitationCode` 字段通过页面路由参数传入。

### 交互要点

- 企业账户名：3-10位，不含空格，汉字/字母/数字/下划线/减号组合，只能以汉字或字母开头
- 手机号/邮箱：手机格式正则校验，邮箱格式正则校验
- 密码：6-16位，包含数字和字母，支持明文/密文切换
- 确认密码：6-16位，与密码一致，支持明文/密文切换
- 管理员名称：非空，3-10位，汉字
- 验证码：非空，发送后倒计时
- 协议勾选：单选，必须勾选才能提交
- 提交流程：检查协议勾选 → 表单验证 → 调用注册 API → 存储 token/用户信息 → 跳转登录页
- `invitationCode`：从路由参数读取，不在表单中展示

---

## 二、任务清单（Task List）

> 每个任务 = 一次 create-xxx Skill 调用。
> 按依赖顺序排列。
> 状态：⬜ 待执行 / 🔄 执行中 / ✅ 已完成

| 序号 | 任务名称 | 触发 Skill | 依赖 | 状态 |
|------|---------|-----------|------|------|
| T1 | 创建表单校验工具函数 | create-util | — | ⬜ |
| T2 | 创建密码可见性切换 Hook | create-hook | — | ⬜ |
| T3 | 创建验证码倒计时 Hook | create-hook | — | ⬜ |
| T4 | 创建用户 Store（持久化） | create-store | — | ⬜ |
| T5 | 创建注册页逻辑 | create-logic | T1, T2, T3, T4 | ⬜ |

---

## 三、任务详情

### T1：创建表单校验工具函数

**触发 Skill**：`create-util`

**需求描述**：
创建一组表单校验工具函数，提供以下校验能力：
1. **企业账户名校验**：3-10位，不能包含空格，汉字/字母/数字/下划线/减号组合，只能以汉字或字母开头
2. **手机号格式校验**：中国大陆手机号正则校验
3. **邮箱格式校验**：标准邮箱格式正则校验
4. **密码校验**：6-16位，必须包含数字和字母
5. **中文姓名校验**：3-10位汉字（用于管理员名称）

每个校验函数为纯函数，接收字符串参数，返回布尔值。

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/utils/validate.ts`
- [ ] 更新 `src/utils/index.ts` 导出

---

### T2：创建密码可见性切换 Hook

**触发 Skill**：`create-hook`

**需求描述**：
创建 `usePasswordVisibility` Hook，管理密码输入框的明文/密文切换状态。提供：
- 响应式的密码可见性状态
- 切换可见性的方法

需支持同一页面内多个密码输入框独立控制（注册页有"密码"和"确认密码"两个字段）。

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/hooks/use-password-visibility.ts`
- [ ] 更新 `src/hooks/index.ts` 导出

---

### T3：创建验证码倒计时 Hook

**触发 Skill**：`create-hook`

**需求描述**：
创建 `useCountdown` Hook，管理验证码发送后的倒计时逻辑。提供：
- 响应式的剩余秒数
- 是否正在倒计时的状态
- 启动倒计时的方法
- 组件卸载时自动清理定时器

**使用的已有资源**：
- 无

**预期产出**：
- [ ] `src/hooks/use-countdown.ts`
- [ ] 更新 `src/hooks/index.ts` 导出

---

### T4：创建用户 Store（持久化）

**触发 Skill**：`create-store`

**需求描述**：
创建 `useUserStore`，用于全局存储鉴权凭证和用户信息。需求：
- 存储 `token`（string）和 `userInfo`（`DidappUserInfo` 类型，来自 `@/http/services/did-app/model-types`）
- 提供设置 token + userInfo 的 action（用于登录/注册成功后调用）
- 提供清除 token + userInfo 的 action（用于退出登录）
- 提供判断是否已登录的 getter
- **启用持久化**（项目已配置 `pinia-plugin-persistedstate`，Store 中开启 `persist: true` 即可）

**使用的已有资源**：
- `DidappUserInfo` 类型（`src/http/services/did-app/model-types.ts`）
- `pinia-plugin-persistedstate` 持久化插件（已在 `src/store/index.ts` 中配置）

**预期产出**：
- [ ] `src/store/user.ts`
- [ ] 更新 `src/store/index.ts` 导出

---

### T5：创建注册页逻辑

**触发 Skill**：`create-logic`

**需求描述**：
为注册页（`src/pages/register/index.vue`）编写 `<script setup>` 逻辑，实现完整的注册交互流程：

1. **路由参数读取**：页面 `onLoad` 时读取路由参数中的 `invitationCode`
2. **表单数据**：管理企业账户名、手机号/邮箱、密码、确认密码、管理员名称、验证码等字段
3. **表单校验**：使用 `useFormValidation` 配合 T1 创建的校验工具函数，对每个字段配置校验规则；确认密码需与密码字段一致性校验
4. **密码可见性**：使用 `usePasswordVisibility`（T2）分别管理密码和确认密码的明文/密文切换
5. **验证码发送**：判断手机号/邮箱格式，调用对应的 `didappSendPhoneAuthCode` 或 `didappSendEmailAuthCode` API；发送成功后使用 `useCountdown`（T3）启动倒计时
6. **协议勾选**：管理勾选状态，提交前检查是否已勾选
7. **注册提交**：点击提交 → 检查协议勾选 → 执行表单校验 → 调用 `didappCreateUser` API（`invitationCode` 使用路由参数值） → 将返回的 token 和 userInfo 存入 `useUserStore`（T4） → 跳转登录页
8. **加载态**：使用 `useLoading` 管理提交和发送验证码的加载状态

**使用的已有资源**：
- `didappCreateUser` API（`@/http/services/did-app`）
- `didappSendPhoneAuthCode` API（`@/http/services/did-app`）
- `didappSendEmailAuthCode` API（`@/http/services/did-app`）
- `useFormValidation` Hook（`@/hooks`）
- `useLoading` Hook（`@/hooks`）
- `usePasswordVisibility` Hook（T2 产出）
- `useCountdown` Hook（T3 产出）
- `useUserStore` Store（T4 产出）
- `router` Util（`@/utils`）
- 校验工具函数（T1 产出）

**预期产出**：
- [ ] `src/pages/register/index.vue`（含 `<script setup>` 逻辑）
- [ ] 更新 `src/pages.json` 添加注册页路由
- [ ] 更新 `src/constants/routes.ts` 添加 `PAGE_REGISTER`

---

## 四、API 接口清单

| 序号 | 接口名称 | 方法 | 所属服务 | 是否已有 | 备注 |
|------|---------|------|---------|---------|------|
| A1 | `didappCreateUser` | POST | did-app | 是 | 直接使用 |
| A2 | `didappSendPhoneAuthCode` | POST | did-app | 是 | 直接使用 |
| A3 | `didappSendEmailAuthCode` | POST | did-app | 是 | 直接使用 |

---

## 五、资源方案总览

### Store

| Store 名称 | 操作 | 需求概述 | 对应任务 |
|-----------|------|---------|---------|
| `useUserStore` | 新建 | 存储 token + userInfo，启用持久化 | T4 |

### Hook

| Hook 名称 | 操作 | 需求概述 | 对应任务 |
|-----------|------|---------|---------|
| `useFormValidation` | 直接使用 | 表单校验框架 | — |
| `useLoading` | 直接使用 | 加载态管理 | — |
| `usePasswordVisibility` | 新建 | 密码明文/密文切换 | T2 |
| `useCountdown` | 新建 | 验证码倒计时 | T3 |

### 工具函数

| 函数名 | 操作 | 需求概述 | 对应任务 |
|--------|------|---------|---------|
| `validateUserName` | 新建 | 企业账户名校验 | T1 |
| `validatePhone` | 新建 | 手机号格式校验 | T1 |
| `validateEmail` | 新建 | 邮箱格式校验 | T1 |
| `validatePassword` | 新建 | 密码格式校验 | T1 |
| `validateChineseName` | 新建 | 中文姓名校验 | T1 |
| `router` | 直接使用 | 路由跳转 | — |

---

## 六、决策记录

| # | 决策问题 | 用户决定 | 确认时间 |
|---|---------|---------|---------|
| D1 | 企业账户名校验规则 → 抽离为 Util 还是页面内实现？ | 抽离 Util | 2026-03-26 |
| D2 | 手机号格式校验 → 抽离为 Util 还是页面内实现？ | 抽离 Util | 2026-03-26 |
| D3 | 邮箱格式校验 → 抽离为 Util 还是页面内实现？ | 抽离 Util | 2026-03-26 |
| D4 | 密码校验规则 → 抽离为 Util 还是页面内实现？ | 抽离 Util | 2026-03-26 |
| D5 | 管理员名称校验（汉字）→ 抽离为 Util 还是页面内实现？ | 抽离 Util | 2026-03-26 |
| D6 | 密码明文/密文切换 → 抽离为 Hook 还是页面内实现？ | 抽离 Hook | 2026-03-26 |
| D7 | 验证码倒计时 → 抽离为 Hook 还是页面内实现？ | 抽离 Hook | 2026-03-26 |
| D8 | 注册返回的 token + userInfo 需要全局存储 → 创建 Store？ | 创建 Store 并持久化 | 2026-03-26 |
| D9 | `invitationCode` 字段 API 需要但交互文档未设计 UI → 如何处理？ | 从页面路由参数读取 | 2026-03-26 |

---

## 七、执行顺序

1. T1：创建表单校验工具函数
2. T2：创建密码可见性切换 Hook
3. T3：创建验证码倒计时 Hook
4. T4：创建用户 Store（持久化）
5. T5：创建注册页逻辑

> T1 ~ T4 无相互依赖，可按任意顺序执行；T5 依赖 T1-T4 全部完成后执行。

---

## 变更记录

### v1 — 初始创建（2026-03-26）
- 基于交互文档 `docs/Interactions/register-desc.md` 生成注册页实施计划
- 用户确认 9 项决策（D1-D9）
