---
name: create-api
description: 创建、编写、新增、封装 API 接口。当用户提到以下任意场景时必须使用此技能： 编写API、写接口、创建接口、新增接口、封装API、添加API、对接接口、接入接口、 调用后端接口、根据文档写API、根据接口文档编写、按照API文档实现、 新建服务模块、添加服务模块。 触发关键词包括但不限于：API、api、接口、interface、endpoint、服务端、后端接口、 接口文档、API文档、swagger、请求封装。 只要涉及 HTTP 请求的接口封装工作，都应该触发此技能。
allowed-tools: []
disable: false
---

# 创建 API 接口封装

## 必须遵循的规范

执行此技能前，**必须先读取以下 Rule 文件**，所有生成的代码须严格遵守：

- `.codebuddy/rules/05-API规范.mdc` — API 架构、服务清单、拦截器、文件职责、类型放置、禁止事项

> 编码规范（TypeScript、命名约定、格式化规则）已作为 always apply rule 自动生效，无需手动读取。

---

## 支持场景

1. **在已有服务中新增 API 接口**（高频）
2. **新建一个服务模块**（低频）

---

## 场景一：在已有服务中新增 API 接口

### 步骤总览

0. **识别公共参数**（必须先做）— 读取该服务 `client.ts` 中引用的所有拦截器源码，识别已被自动注入的 header / params / data 字段
1. 在 `api-types.ts` 中定义请求参数和响应数据类型（**排除**第 0 步识别出的公共参数）
2. 如有可复用的业务模型，在 `model-types.ts` 中定义
3. 在 `index.ts` 中编写 API 函数并导出（**不传入**第 0 步识别出的公共参数）
4. 如接口有新的错误码，在 `errors.ts` 中补充映射

### 第 0 步（必须先做）：识别公共参数

> ⚠️ **每次接入新 API 时都必须执行，不可跳过。**

**操作：**
1. 读取该服务的 `client.ts`，找到 `requestInterceptors` 数组中引用的所有请求拦截器
2. 逐一读取这些拦截器的源码文件（公共拦截器在 `src/http/interceptors/`，私有拦截器在服务目录下 `interceptors.ts`）
3. 分析每个请求拦截器自动设置了哪些字段（如 `options.header.xxx`、`options.params.xxx`、`options.data.xxx`）
4. 记录已被自动注入的字段名列表

**后续排除规则：**
- 定义类型时：公共参数不纳入该接口的 Params/Body 类型
- 编写 API 函数时：不重复传入公共参数
- 判断依据：接口文档中的字段与拦截器自动注入的字段同名，则视为公共参数

### 第 1 步：定义接口类型 — `api-types.ts`

```typescript
// src/http/services/<service-name>/api-types.ts

// ========== 获取 XXX 信息 ==========

/** 获取 XXX 信息 - 请求参数 */
export interface <ServicePrefix>GetXxxInfoParams {
    id: string
}

/** 获取 XXX 信息 - 响应数据 */
export interface <ServicePrefix>GetXxxInfoResult {
    id: string
    name: string
    status: number
}

// ========== 创建 XXX ==========

/** 创建 XXX - 请求体 */
export interface <ServicePrefix>CreateXxxBody {
    name: string
    description?: string
}

/** 创建 XXX - 响应数据 */
export interface <ServicePrefix>CreateXxxResult {
    id: string
}
```

**当多个接口的 Result 结构完全一致时**（如登录和创建账号都返回 `{ token, useInfo }`），使用 type alias 引用 `model-types.ts` 中的共用子结构：

```typescript
// api-types.ts
import type { <ServicePrefix>AuthResult } from './model-types'

/** 登录 - 响应数据 */
export type <ServicePrefix>LoginResult = <ServicePrefix>AuthResult

/** 创建账号 - 响应数据 */
export type <ServicePrefix>CreateUserResult = <ServicePrefix>AuthResult
```

> ⚠️ **禁止**直接将一个接口的 Result 类型用于另一个接口（如 `LoginResult` 用于 `createUser`），必须各自独立定义。

**命名规范：**
- 类型名必须加服务前缀：`{ServicePrefix}{Action}{Resource}{Params|Body|Result}`
- GET 请求参数后缀 `Params`，POST 请求体后缀 `Body`，响应数据后缀 `Result`
- 用 `// ========== 接口名 ==========` 注释分隔不同接口
- 所有字段必须有明确类型，可选字段用 `?`，每个类型需要 JSDoc 注释

### 第 2 步：定义业务模型（可选） — `model-types.ts`

**定位约束：**
- `model-types.ts` 只存放**与接口无关的独立业务实体**和**被多个接口共用的子结构**
- **禁止**在 `model-types.ts` 中存放以接口命名的 `XxxResult` / `XxxBody` / `XxxParams` 类型——这些始终留在 `api-types.ts`

**提取时机：**
- 当一个类型被当前服务内 2 个及以上接口引用时，提取到 `model-types.ts`
- 类型名同样加服务前缀，使用**业务语义命名**（如 `DidappUserInfo`、`DidappAuthResult`）

**代码模板：**

```typescript
// src/http/services/<service-name>/model-types.ts

/** 用户基础信息 */
export interface <ServicePrefix>UserInfo {
    /** 用户 ID */
    id: string
    /** 用户昵称 */
    nickname: string
}

/** 鉴权结果（登录、注册等接口共用） */
export interface <ServicePrefix>AuthResult {
    /** 访问令牌 */
    token: string
    /** 用户信息 */
    userInfo: <ServicePrefix>UserInfo
}
```

**禁止示例：**
- ❌ `DidappLoginResult` 放在 `model-types.ts`（以接口命名，应留在 `api-types.ts`）
- ✅ `DidappAuthResult` 放在 `model-types.ts`（业务语义命名，被多个接口共用）

### 第 3 步：编写 API 函数 — `index.ts`

```typescript
// src/http/services/<service-name>/index.ts
import { <serviceName>Client } from './client'
import type {
    <ServicePrefix>GetXxxInfoParams,
    <ServicePrefix>GetXxxInfoResult,
    <ServicePrefix>CreateXxxBody,
    <ServicePrefix>CreateXxxResult,
} from './api-types'

// ========== XXX 模块 ==========

/** 获取 XXX 信息 */
export const <servicePrefix>GetXxxInfo = (params: <ServicePrefix>GetXxxInfoParams) => {
    return <serviceName>Client.get<<ServicePrefix>GetXxxInfoResult>('/xxx/info', { params })
}

/** 创建 XXX */
export const <servicePrefix>CreateXxx = (data: <ServicePrefix>CreateXxxBody) => {
    return <serviceName>Client.post<<ServicePrefix>CreateXxxResult>('/xxx/create', { data })
}

/** 删除 XXX */
export const <servicePrefix>DeleteXxx = (id: string) => {
    return <serviceName>Client.post<null>('/xxx/delete', { data: { id } })
}
```

**编写规范：**
- 函数名加服务前缀（小驼峰）：`<servicePrefix>{Action}{Resource}`
- 使用 `export const` + 箭头函数，必须有 JSDoc 注释
- GET 请求传 `{ params }`，POST 请求传 `{ data }`
- 泛型传响应数据类型，无有效数据时传 `null`
- 用 `// ========== 模块名 ==========` 按业务模块分组

### 第 4 步：补充错误码（如需要） — `errors.ts`

在 `errors.ts` 中追加新的错误码映射即可。

---

## 场景二：新建一个服务模块

### 前置信息收集

创建新服务前，必须确认以下信息（如用户未提供，需主动询问）：

| 信息 | 说明 | 示例 |
|------|------|------|
| 服务名称 | 英文小写，用作目录名和 client 变量名 | `did`、`invoice` |
| 所属网关 | 已有网关见 `src/config/gateway.json` | `app`、`tdh`、`invoice` |
| API 版本号 | URL 路径中的版本标识 | `v1`、`v10700` |
| baseUrl 拼接规则 | 网关地址后的 URL 路径 | `{gateway}/api/{version}/did` |
| 是否需要鉴权 | 是否添加 `requestAuthHeaderInterceptor` | 是/否 |
| 是否需要 token 校验 | 是否添加 `responseCheckAuthInterceptor` | 是/否 |
| 是否需要错误码映射 | 是否使用 `responseReplaceErrorMsg` | 是/否 |
| successCodes | 成功状态码，默认 `200000` | `200000`、`0` |

### 创建步骤

#### 1. 创建目录和文件

```
src/http/services/<service-name>/
├── client.ts          # 必须
├── api-types.ts       # 必须
├── model-types.ts     # 必须
├── index.ts           # 必须
├── errors.ts          # 可选：使用 responseReplaceErrorMsg 时创建
└── interceptors.ts    # 可选：有服务私有拦截器时创建
```

#### 2. `client.ts` — 实例化 ApiRequest

```typescript
import { GATEWAY_CONFIG, GATEWAY_NAME, runtimeEnv } from '@/config'
import { ApiRequest } from '../../core'
import {
    requestCommonHeaderInterceptor,
    requestAuthHeaderInterceptor,
    responseCheckAuthInterceptor,
    responseReplaceErrorMsg,
} from '../../interceptors'
import { <serviceName>Errors } from './errors'

/**
 * <服务中文名>服务端
 * 网关：<网关名>
 * @typePrefix <ServicePrefix> — 类型命名前缀（如 <ServicePrefix>GetXxxParams）
 * @functionPrefix <servicePrefix> — 函数命名前缀（如 <servicePrefix>GetXxx）
 * @clientName <serviceName>Client
 */
const version = '<version>'
let baseUrl = ''
// #ifdef H5
baseUrl = `/${GATEWAY_NAME.<gateway>}/<url-pattern>/${version}/<service-name>`
// #endif

// #ifndef H5
baseUrl = `${GATEWAY_CONFIG[runtimeEnv][GATEWAY_NAME.<gateway>]}/<url-pattern>/${version}/<service-name>`
// #endif

const <serviceName>Client = new ApiRequest({
    baseUrl,
    requestInterceptors: [
        requestCommonHeaderInterceptor,
        requestAuthHeaderInterceptor,     // 可选
    ],
    responseInterceptors: [
        responseCheckAuthInterceptor,     // 可选
        responseReplaceErrorMsg(<serviceName>Errors), // 可选
    ],
})
export { <serviceName>Client }
```

> 除 `requestCommonHeaderInterceptor` 必选外，其余拦截器按需选用，不用的直接删除。

#### 3. 初始化其他文件

- `errors.ts`：`export const <serviceName>Errors = {}`
- `api-types.ts`：`export {}`
- `model-types.ts`：`export {}`
- `index.ts`：`import { <serviceName>Client } from './client'`

#### 4. 注册到统一导出

在 `src/http/index.ts` 中追加：

```typescript
export * from './services/<service-name>'
export type * from './services/<service-name>/api-types'
export type * from './services/<service-name>/model-types'
```

---

## 业务层调用示例

```typescript
// ✅ 从统一入口导入
import { didGetXxxInfo } from '@/http'
import type { DidGetXxxInfoResult } from '@/http'

const res = await didGetXxxInfo({ id: '123' })
if (res.ok) {
    console.log(res.data)
} else {
    uni.showToast({ title: res.msg, icon: 'none' })
}
```

---

## 检查清单

- [ ] 已执行第 0 步：读取了该服务所有请求拦截器源码，识别出公共参数
- [ ] 公共参数未被写入类型定义和 API 函数中
- [ ] 请求参数和响应数据都有完整的 TS 类型定义
- [ ] 类型名和函数名都加了服务前缀
- [ ] 每个接口有自己独立命名的 Result 类型（禁止复用另一个接口的 Result）
- [ ] 多接口结构相同时，共用子结构已提取到 `model-types.ts`，各 Result 通过 type alias 引用
- [ ] `model-types.ts` 中没有以接口命名的 `XxxResult` / `XxxBody` / `XxxParams` 类型
- [ ] API 函数有 JSDoc 注释
- [ ] GET 用 `{ params }`，POST 用 `{ data }`
- [ ] 泛型传入了正确的响应数据类型
- [ ] 所有 API 函数都通过 `index.ts` 导出
- [ ] 如为新建服务，已在 `src/http/index.ts` 中注册导出
- [ ] 如为新建服务，`client.ts` 中使用了条件编译设置 baseUrl
- [ ] **多端兼容性检查**：API 封装中使用的每个全局 API / 构造函数，确认它属于 ECMAScript 语言规范而非浏览器/Node.js 宿主环境提供的；不确定时先搜索 MDN 确认其所属规范
