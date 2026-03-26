# 注册功能实施提案（Spec）

> **来源**：`docs/Interactions/register-desc.md`
> **状态**：✅ 已确认，待实施

---

## 一、任务清单（执行顺序）

| # | 任务 | Skill | 目标文件 | 依赖 |
|---|------|-------|---------|------|
| 1 | 新建校验工具函数 | `create-util` | `src/utils/validate.ts` | 无 |
| 2 | 新建用户 Store | `create-store` | `src/store/user.ts` | 无 |
| 3 | 新建密码可见性切换 Hook | `create-hook` | `src/hooks/use-password-visibility.ts` | 无 |
| 4 | 新建验证码倒计时 Hook | `create-hook` | `src/hooks/use-auth-code.ts` | 任务 1（校验函数） |
| 5 | 新增路由配置与常量 | 手动 | `src/pages.json` + `src/constants/routes.ts` | 无 |
| 6 | 注册页面逻辑 | `create-logic` | `src/pages/register/index.vue` | 任务 1-5 |

---

## 二、任务详细规格

### 任务 1：新建校验工具函数

- **文件**：`src/utils/validate.ts`
- **导出注册**：在 `src/utils/index.ts` 中添加 re-export
- **函数清单**：

| 函数名 | 签名 | 规则 | 返回值 |
|--------|------|------|--------|
| `validateUserName` | `(value: string) => true \| string` | 3-10位；不含空格；汉字/字母/数字/下划线/减号组合；汉字或字母开头 | `true` 或错误信息字符串 |
| `validatePhone` | `(value: string) => boolean` | 中国大陆手机号正则：`/^1[3-9]\d{9}$/` | 布尔值 |
| `validateEmail` | `(value: string) => boolean` | 邮箱格式正则 | 布尔值 |
| `validatePassword` | `(value: string) => true \| string` | 6-16位；必须同时包含数字和字母 | `true` 或错误信息字符串 |
| `validateAdminName` | `(value: string) => true \| string` | 非空；3-10位；仅汉字 | `true` 或错误信息字符串 |
| `isPhone` | `(value: string) => boolean` | 判断字符串是手机号还是邮箱（用于发送验证码时区分 API） | 布尔值 |

#### `validateUserName` 详细规则

```ts
/** 企业账户名校验 */
export const validateUserName = (value: string): true | string => {
    if (value.length < 3 || value.length > 10) return '企业账户名需3-10位'
    if (/\s/.test(value)) return '企业账户名不能包含空格'
    if (!/^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/.test(value)) return '只能包含汉字、字母、数字、下划线、减号'
    if (!/^[\u4e00-\u9fa5a-zA-Z]/.test(value)) return '必须以汉字或字母开头'
    return true
}
```

---

### 任务 2：新建用户 Store

- **文件**：`src/store/user.ts`
- **Store 名称**：`useUserStore`
- **Pinia ID**：`'user'`
- **导出注册**：在 `src/store/index.ts` 中添加 `export * from './user'`

#### State

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `token` | `string` | `''` | 登录令牌 |
| `userInfo` | `DidappUserInfo \| null` | `null` | 用户信息对象 |

#### Actions

| 方法名 | 签名 | 说明 |
|--------|------|------|
| `setAuth` | `(data: DidappAuthResult) => void` | 同时设置 token 和 userInfo |
| `clearAuth` | `() => void` | 清空 token 和 userInfo（登出时使用） |

#### Getters

| 名称 | 返回类型 | 说明 |
|------|---------|------|
| `isLoggedIn` | `boolean` | `token !== ''` |

#### 持久化配置

```ts
persist: {
    paths: ['token', 'userInfo'],
}
```

#### 类型导入

```ts
import type { DidappAuthResult, DidappUserInfo } from '@/http/services/did-app/model-types'
```

> ⚠️ **注意**：`DidappAuthResult` 在 `model-types.ts` 中定义，但未在 `api-types.ts` 的 re-export 中直接导出。Store 文件应直接从 `model-types` 导入。

---

### 任务 3：新建密码可见性切换 Hook

- **文件**：`src/hooks/use-password-visibility.ts`
- **Hook 名称**：`usePasswordVisibility`
- **导出注册**：在 `src/hooks/index.ts` 中添加 re-export

#### 接口定义

```ts
interface UsePasswordVisibilityReturn {
    /** 密码是否可见 */
    visible: Ref<boolean>
    /** 输入框 type 值（'text' | 'password'） */
    inputType: ComputedRef<'text' | 'password'>
    /** 切换可见性 */
    toggleVisibility: () => void
}
```

#### 实现要点

- `visible` 默认 `false`（密文状态）
- `inputType` 根据 `visible` 计算：`visible ? 'text' : 'password'`
- `toggleVisibility` 切换 `visible` 布尔值

---

### 任务 4：新建验证码倒计时 Hook

- **文件**：`src/hooks/use-auth-code.ts`
- **Hook 名称**：`useAuthCode`
- **导出注册**：在 `src/hooks/index.ts` 中添加 re-export

#### 接口定义

```ts
interface UseAuthCodeOptions {
    /** 倒计时秒数，默认 60 */
    duration?: number
}

interface UseAuthCodeReturn {
    /** 剩余秒数（0 表示可重新发送） */
    countdown: Ref<number>
    /** 是否正在倒计时 */
    isCounting: ComputedRef<boolean>
    /** 按钮显示文案（如 "获取验证码" / "60s 后重试"） */
    buttonText: ComputedRef<string>
    /** 发送验证码（内部自动判断手机/邮箱并调用对应 API） */
    sendCode: (phoneOrEmail: string) => Promise<boolean>
}
```

#### 实现要点

- 使用 `isPhone` 工具函数（来自 `src/utils/validate.ts`）判断手机/邮箱
- 手机 → 调用 `didappSendPhoneAuthCode({ phone })`
- 邮箱 → 调用 `didappSendEmailAuthCode({ email })`
- 发送前校验格式：手机用 `validatePhone`，邮箱用 `validateEmail`；不通过则 `uni.showToast` 提示并返回 `false`
- 发送成功后启动 `setInterval` 倒计时
- 组件卸载时清除定时器（`onUnmounted`）
- 发送失败时 `uni.showToast` 提示错误信息，不启动倒计时

---

### 任务 5：新增路由配置与常量

#### 5.1 `src/constants/routes.ts` — 添加常量

```ts
/** 注册页 */
export const PAGE_REGISTER = '/pages/register/index'

/** 登录页 */
export const PAGE_LOGIN = '/pages/login/index'
```

#### 5.2 `src/pages.json` — 添加注册页路由

在 `pages` 数组中新增：

```json
{
    "path": "pages/register/index",
    "style": {
        "navigationBarTitleText": "注册"
    }
}
```

---

### 任务 6：注册页面逻辑

- **文件**：`src/pages/register/index.vue`（新建目录 `src/pages/register/`）
- **Skill**：`create-logic`

#### 页面参数

| 参数名 | 来源 | 说明 |
|--------|------|------|
| `invitationCode` | 路由参数（`onLoad` 的 `query`） | 邀请码，从路由参数中获取 |

#### 表单字段（`reactive`）

| 字段 | 类型 | 默认值 | 对应 API 字段 |
|------|------|--------|--------------|
| `userName` | `string` | `''` | `userName` |
| `phoneOrEmail` | `string` | `''` | `phoneOrEmail` |
| `password` | `string` | `''` | `password` |
| `confirmPassword` | `string` | `''` | — （仅前端校验） |
| `adminName` | `string` | `''` | `adminName` |
| `authCode` | `string` | `''` | `authCode` |

#### 页面状态

| 状态 | 类型 | 来源 | 说明 |
|------|------|------|------|
| `invitationCode` | `ref<string>` | `onLoad` query 参数 | 邀请码 |
| `agreedProtocol` | `ref<boolean>` | 页面内 | 协议勾选状态 |
| `loading` / `withLoading` | — | `useLoading()` | 提交按钮加载态 |
| `passwordVisibility` | — | `usePasswordVisibility()` | 密码框可见性（实例 1） |
| `confirmPasswordVisibility` | — | `usePasswordVisibility()` | 确认密码框可见性（实例 2） |
| `authCode` hook | — | `useAuthCode()` | 验证码倒计时 |
| `errors` / `validate` | — | `useFormValidation(rules)` | 表单校验 |

#### 校验规则配置（传入 `useFormValidation`）

```ts
const rules: ValidationRules = {
    userName: [
        { required: true, message: '请输入企业账户名' },
        { validator: (v) => validateUserName(v as string) },
    ],
    phoneOrEmail: [
        { required: true, message: '请输入手机号或邮箱' },
        {
            validator: (v) => {
                const val = v as string
                return validatePhone(val) || validateEmail(val) || '请输入正确的手机号或邮箱'
            },
        },
    ],
    password: [
        { required: true, message: '请输入密码' },
        { validator: (v) => validatePassword(v as string) },
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码' },
        {
            validator: (v) => {
                return (v as string) === form.password || '两次密码不一致'
            },
        },
    ],
    adminName: [
        { required: true, message: '请输入管理员名称' },
        { validator: (v) => validateAdminName(v as string) },
    ],
    authCode: [
        { required: true, message: '请输入验证码' },
    ],
}
```

#### 主要方法

| 方法名 | 类型 | 说明 |
|--------|------|------|
| `onLoad` | 生命周期 | 从 `query.invitationCode` 获取邀请码 |
| `onSendCode` | 事件处理 | 调用 `authCodeHook.sendCode(form.phoneOrEmail)` |
| `onSubmit` | 事件处理 | 注册提交主流程 |

#### `onSubmit` 流程

```
1. 检查 agreedProtocol → 未勾选则 showToast('请先同意协议') 并 return
2. await validate(form) → 不通过则 return
3. await withLoading(async () => {
     const res = await didappCreateUser({
         userName: form.userName,
         adminName: form.adminName,
         password: form.password,
         invitationCode: invitationCode.value,
         phoneOrEmail: form.phoneOrEmail,
         authCode: form.authCode,
     })
     // 存储认证信息
     const userStore = useUserStore()
     userStore.setAuth(res)
     // 提示成功
     uni.showToast({ title: '注册成功', icon: 'success' })
     // 跳转登录页
     router.replace(PAGE_LOGIN)
   })
```

#### 依赖导入清单

```ts
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useFormValidation, useLoading, usePasswordVisibility, useAuthCode } from '@/hooks'
import { validateUserName, validatePhone, validateEmail, validatePassword, validateAdminName } from '@/utils'
import { didappCreateUser } from '@/http/services/did-app'
import { useUserStore } from '@/store'
import { router } from '@/utils'
import { PAGE_LOGIN } from '@/constants/routes'
import type { ValidationRules } from '@/hooks/use-form-validation'
```

---

## 三、资源复用清单

| 资源 | 路径 | 使用方式 |
|------|------|---------|
| `didappCreateUser` | `src/http/services/did-app/index.ts` | 直接调用 |
| `didappSendPhoneAuthCode` | 同上 | 在 `useAuthCode` 内部调用 |
| `didappSendEmailAuthCode` | 同上 | 在 `useAuthCode` 内部调用 |
| `useLoading` | `src/hooks/use-loading.ts` | 注册按钮加载态 |
| `useFormValidation` | `src/hooks/use-form-validation.ts` | 表单校验框架 |
| `router` | `src/utils/route.ts` | 注册成功后跳转 |
| `DidappAuthResult` | `src/http/services/did-app/model-types.ts` | Store 类型引用 |
| `DidappUserInfo` | 同上 | Store 类型引用 |

---

## 四、文件变更清单

| 操作 | 文件路径 |
|------|---------|
| 🆕 新建 | `src/utils/validate.ts` |
| 🆕 新建 | `src/store/user.ts` |
| 🆕 新建 | `src/hooks/use-password-visibility.ts` |
| 🆕 新建 | `src/hooks/use-auth-code.ts` |
| 🆕 新建 | `src/pages/register/index.vue` |
| ✏️ 修改 | `src/utils/index.ts`（添加 validate re-export） |
| ✏️ 修改 | `src/store/index.ts`（添加 user re-export） |
| ✏️ 修改 | `src/hooks/index.ts`（添加 2 个 re-export） |
| ✏️ 修改 | `src/constants/routes.ts`（添加 PAGE_REGISTER、PAGE_LOGIN） |
| ✏️ 修改 | `src/pages.json`（添加注册页路由） |
