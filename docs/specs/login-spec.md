# 登录页 Spec

> **状态**：✅ 已定稿
> **来源**：`docs/ui-analysis/login-ui-inventory.md` + `docs/Interactions/login-desc.md`
> **生成日期**：2026-03-23

---

## 一、决策记录

| # | 决策问题 | 最终决定 | 说明 |
|---|---------|---------|------|
| D1 | `didappLogin` 接口是否直接使用 | ✅ 直接使用 | 已有 API，无需修改 |
| D2 | 登录成功后跳转页面 | ⚠️ 待定 | 后续确认目标路由 |
| D3 | token 存储方式 | 不存 Store，持久化存 Storage | 使用 `setStorageSync` 存储 token |
| D4 | 表单验证时机 | 提交时统一校验 | 点击登录按钮后一次性校验 |
| D5 | 验证失败提示方式 | toast 提示 | 使用 `uni.showToast` |
| D6 | "创建新的企业账号"跳转 | ⚠️ 待定 | 预留空跳转 |
| D7 | "忘记密码？"跳转 | ⚠️ 待定 | 预留空跳转 |
| D8 | 导航栏配置 | `navigationStyle: custom` | 全屏页面，不渲染导航栏 |

---

## 二、任务清单

| # | 任务名称 | 类型 | Skill | 预估文件变更 |
|---|---------|------|-------|-------------|
| T1 | 创建登录页 | 页面 | create-page | 新建 `src/pages/login/index.vue`，修改 `src/pages.json`、`src/constants/routes.ts` |

> **说明**：原 T1（新建 useUserStore）已取消，因用户决定不使用 Store 存储，直接持久化到 Storage。

---

## 三、依赖资源清单

### 3.1 API 接口

| 接口函数 | 路径 | 状态 | 请求体 | 响应体 |
|---------|------|------|--------|--------|
| `didappLogin` | POST `/login/login` | ✅ 已有 | `DidappLoginBody { phoneOrEmail, password }` | `DidappLoginResult { token, useInfo }` |

**导入方式**：
```ts
import { didappLogin } from '@/http/services/did-app'
```

### 3.2 已有 Hooks

| Hook | 导入路径 | 用途 | 关键 API |
|------|---------|------|---------|
| `useFormValidation` | `@/hooks` | 表单校验 | `{ errors, validate, validateField, resetValidation, isValid }` |
| `useLoading` | `@/hooks` | 登录按钮加载态 | `{ loading, withLoading }` |

### 3.3 已有 Utils

| 工具 | 导入路径 | 用途 | 关键 API |
|------|---------|------|---------|
| `router` | `@/utils` | 页面跳转 | `router.to(url)` / `router.replace(url)` / `router.relaunch(url)` |
| `setStorageSync` | `@/utils` | 持久化存储 token | `setStorageSync<string>('token', token)` |

### 3.4 TDesign 组件

| 组件 | 用途 | 关键 Props |
|------|------|-----------|
| `<t-input>` | 企业账号输入框、密码输入框 | `placeholder`、`type`、`prefixIcon`、`suffixIcon` |
| `<t-button>` | 登录按钮 | `theme="primary"`、`block`、`loading`、`@tap` |
| `<t-icon>` | 用户图标、锁图标、密码显隐图标、盾牌图标 | `name`、`size`、`color` |

### 3.5 路由常量

| 常量 | 值 | 状态 |
|------|---|------|
| `PAGE_LOGIN` | `/pages/login/index` | 🆕 需新增到 `src/constants/routes.ts` |

---

## 四、T1：创建登录页

### 4.1 文件变更清单

| 操作 | 文件路径 | 说明 |
|------|---------|------|
| 新建 | `src/pages/login/index.vue` | 登录页主文件 |
| 修改 | `src/pages.json` | 新增登录页路由配置 |
| 修改 | `src/constants/routes.ts` | 新增 `PAGE_LOGIN` 常量 |

### 4.2 路由配置

在 `src/pages.json` 的 `pages` 数组中新增：

```json
{
    "path": "pages/login/index",
    "style": {
        "navigationStyle": "custom"
    }
}
```

在 `src/constants/routes.ts` 中新增：

```ts
/** 登录页 */
export const PAGE_LOGIN = '/pages/login/index'
```

### 4.3 页面结构

```
login/index.vue
├── <template>
│   └── view.login-page（页面根容器）
│       ├── 区域 1：品牌装饰区 .brand-section
│       │   ├── image（品牌 3D 装饰图，750×540rpx 占位图）
│       │   └── t-icon（右上角蓝色盾牌图标，绝对定位）
│       ├── 区域 2：表单输入区 .form-section
│       │   ├── 企业账号输入行 .input-row
│       │   │   ├── t-icon（蓝色用户图标）
│       │   │   └── t-input（placeholder: "请输入企业账号名"）
│       │   ├── 分隔线 .divider
│       │   ├── 密码输入行 .input-row
│       │   │   ├── t-icon（蓝色锁图标）
│       │   │   ├── t-input（placeholder: "请输入密码"，type: password）
│       │   │   └── t-icon（密码显隐切换图标，@tap 切换）
│       │   └── 分隔线 .divider
│       ├── 区域 3：辅助链接区 .links-section
│       │   ├── text（"创建新的企业账号"，品牌蓝色，@tap 预留跳转）
│       │   └── text（"忘记密码？"，灰色，@tap 预留跳转）
│       └── 区域 4：登录按钮区 .button-section
│           └── t-button（"登 录"，theme=primary，block，:loading）
├── <script setup lang="ts">
└── <style lang="scss" scoped>
```

### 4.4 响应式数据

```ts
/** 表单数据 */
const formData = reactive({
    phoneOrEmail: '',
    password: '',
})

/** 密码是否可见 */
const passwordVisible = ref(false)

/** 密码输入框 type */
const passwordType = computed(() => passwordVisible.value ? 'text' : 'password')
```

### 4.5 表单校验规则

使用 `useFormValidation`，提交时统一校验，失败时 toast 第一条错误信息：

```ts
const { validate } = useFormValidation({
    rules: {
        phoneOrEmail: [
            { required: true, message: '请输入企业账号名' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
        ],
        password: [
            { required: true, message: '请输入密码' },
            { minLength: 6, message: '密码至少 6 位' },
            { maxLength: 16, message: '密码最多 16 位' },
            {
                pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}$/,
                message: '密码需包含数字、字母和特殊字符',
            },
        ],
    },
})
```

### 4.6 核心逻辑

#### 登录处理流程

```
onLoginTap()
  → validate(formData)
  → 校验失败 → uni.showToast({ title: 第一条错误信息, icon: 'none' })
  → 校验通过 → withLoading(async () => {
      const res = await didappLogin(formData)
      setStorageSync('token', res.data.token)
      // 跳转目标待定（D2）
      // router.relaunch(PAGE_HOME)  // 待确认后启用
  })
  → 请求异常 → 由 http 拦截器统一处理
```

#### 密码显隐切换

```
onTogglePassword()
  → passwordVisible.value = !passwordVisible.value
```

#### 辅助链接跳转（预留）

```
onCreateAccount()
  → // 待定（D6），暂不跳转
  → uni.showToast({ title: '功能开发中', icon: 'none' })

onForgotPassword()
  → // 待定（D7），暂不跳转
  → uni.showToast({ title: '功能开发中', icon: 'none' })
```

### 4.7 样式要点

| 属性 | 值 | 说明 |
|------|---|------|
| 页面背景 | 上半品牌装饰图，下半白色 `var(--td-bg-color-container)` | — |
| 页面水平边距 | `padding: 0 48rpx` | 表单区、链接区、按钮区统一 |
| 品牌装饰图尺寸 | `750rpx × 540rpx` | 占位图 |
| 右上角盾牌图标 | 绝对定位，蓝色，`≈80rpx × 80rpx` | — |
| 输入行高度 | `≈100rpx` | 图标与输入框 `gap: 24rpx` |
| 分隔线 | `var(--td-border-level-1-color)` 1px | 从图标右侧延伸至右边距 |
| 品牌区 → 表单区间距 | `40rpx` | — |
| 两输入行间距 | `40rpx` | — |
| 表单区 → 链接区间距 | `24rpx` | — |
| 链接区 → 按钮间距 | `48rpx` | — |
| 登录按钮 | 宽 `654rpx`，高 `96rpx`，圆角 `16rpx` | `var(--td-brand-color)` 背景 |
| 按钮文字 | "登 录"（中间有空格），`32rpx`，font-weight: 500 | — |
| 创建账号链接 | `26rpx`，`var(--td-brand-color)` | 左侧 |
| 忘记密码链接 | `26rpx`，`var(--td-text-color-secondary)` | 右侧 |
| 图标色 | 用户/锁图标：`var(--td-brand-color)`；密码显隐：`var(--td-text-color-placeholder)` | — |

### 4.8 导入清单

```ts
// 值导入
import { reactive, ref, computed } from 'vue'
import { didappLogin } from '@/http/services/did-app'
import { useFormValidation, useLoading } from '@/hooks'
import { setStorageSync } from '@/utils'

// 类型导入（如需要）
import type { DidappLoginBody } from '@/http/services/did-app/api-types'
```

---

## 五、待定事项

| # | 事项 | 影响范围 | 当前处理 |
|---|------|---------|---------|
| D2 | 登录成功后跳转页面 | `onLoginTap` 中跳转目标 | 预留注释 `// TODO: 确认跳转目标` |
| D6 | "创建新的企业账号"跳转目标 | `onCreateAccount` 方法 | toast "功能开发中" |
| D7 | "忘记密码？"跳转目标 | `onForgotPassword` 方法 | toast "功能开发中" |

---

## 六、验收标准

- [ ] 页面渲染完整：品牌装饰图 + 表单 + 链接 + 按钮均正确展示
- [ ] 表单输入正常：企业账号和密码输入框可正常输入
- [ ] 密码显隐切换：点击眼睛图标可切换密码明文/密文
- [ ] 表单校验：提交时校验，失败时 toast 提示
- [ ] 登录请求：校验通过后调用 `didappLogin`，token 存入 Storage
- [ ] 加载态：登录请求期间按钮显示 loading 状态
- [ ] 辅助链接：点击后 toast "功能开发中"
- [ ] 导航栏：无导航栏（全屏页面）
- [ ] 样式还原：间距、颜色、字号与 UI 清单一致，使用 TDesign 变量
