---
name: create-api
description: 创建、编写、新增、封装 API 接口。当用户提到以下任意场景时必须使用此技能： 编写API、写接口、创建接口、新增接口、封装API、添加API、对接接口、接入接口、 调用后端接口、根据文档写API、根据接口文档编写、按照API文档实现、 新建服务模块、添加服务模块。 触发关键词包括但不限于：API、api、接口、interface、endpoint、服务端、后端接口、 接口文档、API文档、swagger、请求封装。 只要涉及 HTTP 请求的接口封装工作，都应该触发此技能。
allowed-tools: []
disable: false
---

# 创建 API 接口封装

## 功能说明

基于项目 `src/http/` 分层架构，规范化地创建 API 封装代码。支持两种场景：

1. **在已有服务中新增 API 接口**（高频）
2. **新建一个服务模块**（低频）

> **⚠️ 强制约束：执行此技能时，必须严格遵守 `.codebuddy/rules/05-API规范.md` 中定义的所有规范，包括但不限于：文件结构、类型命名、拦截器选配、禁止事项和检查清单。如有冲突，以 `05-API规范.md` 为准。**

---

## 项目架构概览

```
src/http/
├── index.ts                       # 🔑 统一导出入口（业务层推荐从 '@/http' 导入）
├── core/                          # 核心引擎层（🔒 不允许修改）
│   ├── types.ts                   # CoreRequestOptions, CoreResponse<T>, CoreResponseCode
│   ├── request.ts                 # ApiRequest 类（基于 uni.request + 拦截器链）
│   └── index.ts                   # 统一导出
│
├── interceptors/                  # 公共拦截器层（✏️ 可扩展，跨服务共享）
│   ├── request-common-header.ts   # 公共请求头拦截器
│   ├── request-auth-header.ts     # 鉴权请求头拦截器
│   ├── response-check-auth.ts     # token 校验拦截器
│   ├── response-replace-error-msg.ts  # 错误码中文映射拦截器（工厂模式）
│   └── index.ts                   # 统一导出
│
├── shared-types.ts                # 跨服务共享的业务类型（多个服务都用到的类型放这里）
│
└── services/                      # 业务服务层
    └── <service-name>/            # 每个服务一个文件夹
        ├── client.ts              # 实例化 ApiRequest，配置网关/拦截器（含 H5/非H5 条件编译）
        ├── errors.ts              # 🆕 可选：该服务专属的错误码映射（使用 responseReplaceErrorMsg 时创建）
        ├── interceptors.ts        # 🆕 可选：该服务专属的拦截器（按需创建）
        ├── api-types.ts           # 接口请求参数和响应数据的 TS 类型
        ├── model-types.ts         # 业务模型的 TS 类型（当前服务内跨接口复用）
        └── index.ts               # API 函数聚合导出（业务层唯一调用入口）
```

### `http/index.ts` 统一导出说明

`src/http/index.ts` 是整个 HTTP 模块的总入口，它聚合导出了：
- **核心层**：`CoreResponseCode`、`CoreResponse` 等核心类型
- **公共拦截器**：`requestCommonHeaderInterceptor`、`responseReplaceErrorMsg` 等跨服务共享拦截器
- **共享类型**：`PageParams`、`PageResult` 等跨服务通用类型
- **各服务 API 函数**：通过 `export *` 重导出各服务 `index.ts` 中的 API 函数
- **各服务业务类型**：通过 `export type *` 重导出各服务的 `api-types.ts` 和 `model-types.ts` 中的类型

**业务层导入方式：**

```typescript
// ✅ 推荐：从统一入口导入（简洁）
import { didGetUserInfo } from '@/http'
import type { DidGetUserInfoResult, PageParams } from '@/http'

// ✅ 也支持：从具体服务导入（当需要明确来源时）
import { didGetUserInfo } from '@/http/services/did'
import type { DidGetUserInfoResult } from '@/http/services/did/api-types'
```

> **⚠️ 维护要求：** 新增服务时，必须在 `src/http/index.ts` 中添加对应的 `export *` 和 `export type *` 语句。

### 已有服务 & 网关配置

> 📖 已有服务列表、网关配置详情请参阅 `.codebuddy/rules/05-API规范.md` 中「一、架构总览 → 已有服务」和「二、网关配置」章节，此处不重复列出，以 Rule 为单一数据源。
>
> ⚠️ **兜底机制：** 如果执行时发现 `src/http/services/` 下存在 Rule 中未列出的服务目录，请先读取该服务的 `client.ts` 获取 client 变量名、baseUrl 和拦截器配置后再继续。

### 核心类型速查

```typescript
// 请求选项（可选传入）
interface CoreRequestOptions {
    header?: Record<string, string>
    params?: Record<string, any>     // GET 查询参数 或 通用参数
    data?: any                       // POST 请求体
    timeout?: number
    loading?: boolean
    loadingText?: string
}

// 统一响应结构
interface CoreResponse<T = any> {
    code: number    // 业务状态码
    data: T         // 响应数据
    msg: string     // 提示信息
    ok: boolean     // ✅ 业务是否成功（由 ApiRequest 根据 successCodes 自动设置，推荐用此字段判断成功）
}
```

---

## 场景一：在已有服务中新增 API 接口

### 步骤总览

0. **识别公共参数**（必须先做）— 读取该服务 `client.ts` 中引用的所有拦截器源码，识别已被自动注入的 header / params / data 字段
1. 在 `api-types.ts` 中定义请求参数和响应数据类型（**排除**第 0 步识别出的公共参数）
2. 如有可复用的业务模型，在 `model-types.ts` 中定义
3. 在 `index.ts` 中编写 API 函数并导出（**不传入**第 0 步识别出的公共参数）
4. 如接口有新的错误码，在 `errors.ts` 中补充映射

### 详细模板

#### 第 0 步（必须先做）：识别公共参数 — 读取拦截器源码

> ⚠️ **这一步在每次接入新 API 时都必须执行，不可跳过。**

**目的：** 识别出拦截器已经自动注入的 header、params、data 等字段，避免在 API 函数中重复传入。

**操作：**
1. 读取该服务的 `client.ts`，找到 `requestInterceptors` 数组中引用的所有请求拦截器
2. 逐一读取这些拦截器的源码文件（包括公共拦截器 `src/http/interceptors/` 下的和服务私有拦截器 `./interceptors.ts`）
3. 分析每个请求拦截器自动设置了哪些字段（如 `options.header.xxx = ...`、`options.params.xxx = ...`、`options.data.xxx = ...`）
4. 记录下所有已被拦截器自动注入的字段名列表

**后续步骤中的排除规则：**
- **定义类型时**：接口文档中属于公共参数的字段，不纳入该接口的 Params/Body 类型定义
- **编写 API 函数时**：不在函数参数或调用 options 中重复传入这些字段
- **判断依据**：如果接口文档中的某个 header / query / body 字段与拦截器自动注入的字段同名，则视为公共参数，由拦截器统一处理

#### 第 1 步：定义接口类型 — `api-types.ts`

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
    createdAt: string
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

// ========== 获取 XXX 列表 ==========

/** 获取 XXX 列表 - 请求参数 */
export interface <ServicePrefix>GetXxxListParams {
    page: number
    pageSize: number
    keyword?: string
}

/** 获取 XXX 列表 - 响应数据 */
export interface <ServicePrefix>GetXxxListResult {
    list: <ServicePrefix>XxxItem[]
    total: number
    page: number
    pageSize: number
}

/** 列表项类型（如果只在此接口使用就放在 api-types，当前服务内跨接口复用放 model-types，跨服务共用放 shared-types） */
export interface <ServicePrefix>XxxItem {
    id: string
    name: string
}
```

**命名规范（防止跨服务类型名冲突）：**
- 所有类型名必须加 **服务前缀**：`{ServicePrefix}{Action}{Resource}{Params|Body|Result}`
- 服务前缀规则：将服务名转为大驼峰（如 `did` → `Did`，`did-app` → `Didapp`，去掉连字符并首字母大写）
- 完整前缀对照表见 `.codebuddy/rules/05-API规范.md` 中「3.3 api-types.ts」和「3.6 index.ts」章节
- Action 常用词：`Get`、`Create`、`Update`、`Delete`、`Query`、`Submit`

#### 第 2 步：定义业务模型（可选） — `model-types.ts`

```typescript
// src/http/services/<service-name>/model-types.ts

/** <服务名> - 用户 DID 信息（当前服务内多个接口共用） */
export interface <ServicePrefix>DIDInfo {
    did: string
    publicKey: string
    status: 'active' | 'revoked'
    createdAt: string
}
```

**什么时候放 `model-types.ts`：**
- 一个类型被 **当前服务内 2 个及以上接口** 引用时
- 代表一个独立的 **业务实体**（如用户、文件、授权记录等）
- 类型名同样需要加 **服务前缀**（如 `DidDIDInfo`、`TdhFileRecord`）

#### 第 2.5 步：跨服务共享类型（可选） — `shared-types.ts`

如果某个类型被 **多个服务** 共同使用（如分页结构、公共枚举、基础实体），放到 `src/http/shared-types.ts`：

```typescript
// src/http/shared-types.ts

/** 通用分页请求参数 */
export interface PageParams {
    page: number
    pageSize: number
}

/** 通用分页响应结构 */
export interface PageResult<T = any> {
    list: T[]
    total: number
    page: number
    pageSize: number
}
```

**类型提升规则：**
- 当一个类型从仅 1 个服务使用变成被 2 个及以上服务引用时，应将其从服务的 `model-types.ts` 提升到 `shared-types.ts`，并去掉服务前缀
- 提升后需在原服务 `model-types.ts` 中添加迁移注释，提示后续从 `shared-types.ts` 引入

**类型放置决策流程：**

```
这个类型被几个服务使用？
  ├── 只有 1 个服务 → 被几个接口使用？
  │     ├── 只有 1 个接口 → 放 api-types.ts
  │     └── 2 个及以上 → 放 model-types.ts
  └── 2 个及以上服务 → 放 shared-types.ts（不加服务前缀）
```

#### 第 3 步：编写 API 函数 — `index.ts`

```typescript
// src/http/services/<service-name>/index.ts
import { <serviceName>Client } from './client'
import type {
    <ServicePrefix>GetXxxInfoParams,
    <ServicePrefix>GetXxxInfoResult,
    <ServicePrefix>CreateXxxBody,
    <ServicePrefix>CreateXxxResult,
    <ServicePrefix>GetXxxListParams,
    <ServicePrefix>GetXxxListResult,
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

/** 获取 XXX 列表 */
export const <servicePrefix>GetXxxList = (params: <ServicePrefix>GetXxxListParams) => {
    return <serviceName>Client.get<<ServicePrefix>GetXxxListResult>('/xxx/list', { params })
}

/** 删除 XXX */
export const <servicePrefix>DeleteXxx = (id: string) => {
    return <serviceName>Client.post<null>('/xxx/delete', { data: { id } })
}
```

**函数命名规范（防止跨服务函数名冲突）：**
- 函数名必须加 **服务前缀**（小驼峰）：`<servicePrefix>{Action}{Resource}`
- 服务前缀规则：将服务名转为小驼峰（如 `did` → `did`，`did-app` → `didapp`），与 client 变量名前缀一致
- 完整前缀对照表见 `.codebuddy/rules/05-API规范.md` 中「3.6 index.ts」章节

**其他编写规范：**
- 每个 API 函数使用 `export const` + 箭头函数
- 必须添加 JSDoc 注释说明接口用途
- GET 请求参数传 `{ params }`，POST 请求数据传 `{ data }`
- 泛型 `<T>` 传响应数据的类型（即 `CoreResponse<T>` 中的 `T`）
- 如果响应无有效 data，泛型传 `null`
- 使用 `// ========== 模块名 ==========` 注释分隔不同业务模块
- 按业务模块分组排列，不要随意穿插

#### 第 4 步：补充错误码（如需要） — `errors.ts`

```typescript
// src/http/services/<service-name>/errors.ts
export const <serviceName>Errors: Record<number | string, string> = {
    300100: '参数错误',
    300101: '时间格式错误',
    401104: '数据库错误',
    // ... 新增的错误码
}
```

---

## 场景二：新建一个服务模块

### 前置信息收集

创建新服务前，必须确认以下信息（如用户未提供，需主动询问）：

| 信息 | 说明 | 示例 |
|------|------|------|
| 服务名称 | 英文小写，用作目录名和 client 变量名 | `did`、`invoice` |
| 所属网关 | 已有网关见 `src/config/gateway.json` 的 `gatewayName` 字段，如需新网关需同步添加 | `app`、`tdh`、`invoice` |
| API 版本号 | URL 路径中的版本标识 | `v1`、`v10700` |
| baseUrl 拼接规则 | 网关地址后的 URL 路径拼接方式 | `{gateway}/api/{version}/did` |
| 是否需要鉴权 | 是否添加 `requestAuthHeaderInterceptor` | 是/否 |
| 是否需要 token 校验 | 是否添加 `responseCheckAuthInterceptor` | 是/否 |
| 是否需要错误码映射 | 是否使用 `responseReplaceErrorMsg`，及初始 errors 内容 | 是（空对象）/ 否 |
| successCodes | 成功状态码，默认 `200000`，不同则需指定 | `200000`、`0` |

### 创建步骤

#### 1. 创建目录和 5 个文件

```
src/http/services/<service-name>/
├── client.ts
├── errors.ts          # 可选：使用 responseReplaceErrorMsg 时创建
├── api-types.ts
├── model-types.ts
└── index.ts
```

#### 2. `client.ts` — 实例化 ApiRequest

```typescript
import { GATEWAY_CONFIG, GATEWAY_NAME, runtimeEnv } from '@/config'
import { ApiRequest } from '../../core'
import {
    requestCommonHeaderInterceptor,
    requestAuthHeaderInterceptor,     // 需要鉴权时引入
    responseCheckAuthInterceptor,     // 需要 token 校验时引入
    responseReplaceErrorMsg,          // 需要错误码映射时引入
} from '../../interceptors'
import { <serviceName>Errors } from './errors'  // 使用 responseReplaceErrorMsg 时引入

/**
 * <服务中文名>服务端
 * 网关：使用 <网关名> 网关
 * H5环境baseUrl："/<gateway名称标识>/<url-pattern>/<version>/<service-name>"
 * 非H5环境baseUrl规则："<gateway具体地址>/<url-pattern>/<version>/<service-name>"
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
    // successCodes: 默认为 [CoreResponseCode.SUCCESS]（即 200000）
    // 如果该服务的成功码不同，在此指定，如：successCodes: 0 或 successCodes: [0, 200]
    requestInterceptors: [
        requestCommonHeaderInterceptor,
        requestAuthHeaderInterceptor,     // 可选：需要鉴权时添加
    ],
    responseInterceptors: [
        responseCheckAuthInterceptor,     // 可选：需要 token 校验时添加
        responseReplaceErrorMsg(<serviceName>Errors), // 可选：需要错误码映射时添加
    ],
})
export { <serviceName>Client }
```

**条件编译说明（H5 跨域方案）：**
- **H5 环境**（`#ifdef H5`）：baseUrl 使用 `/${GATEWAY_NAME.xxx}/...` 相对路径，请求发到同源的当前域名，避免跨域
  - 本地开发：由 `vite.config.ts` 的 proxy 根据网关名前缀转发到真实网关
  - 生产部署：由 Nginx 根据网关名前缀反向代理到真实网关
- **非 H5 环境**（`#ifndef H5`）：baseUrl 使用 `${GATEWAY_CONFIG[runtimeEnv][GATEWAY_NAME.xxx]}/...` 绝对路径直连，因为 App/小程序原生没有跨域限制
- `runtimeEnv` 控制环境切换，不再硬编码 `dev` / `production` 等

> **注意：** 除 `requestCommonHeaderInterceptor` 必选外，其余拦截器均由各服务根据业务需求自行决定是否使用。不使用的拦截器直接删除对应行和 import 即可。
>
> 📖 拦截器选配规则和放置决策流程见 `.codebuddy/rules/05-API规范.md` 中「3.1 client.ts」章节的拦截器选配表格。

#### 3. `errors.ts` — 初始化错误码映射（使用 `responseReplaceErrorMsg` 时创建）

```typescript
export const <serviceName>Errors = {}
```

> 如果该服务不使用 `responseReplaceErrorMsg` 拦截器，则**不需要**创建此文件。

#### 4. `api-types.ts` — 初始化接口类型文件

```typescript
// 接口类型定义文件
// 使用 TS 类型定义接口的 Params/Body 和 Result

export {}
```

#### 5. `model-types.ts` — 初始化业务模型文件

```typescript
// 使用 TS 类型定义接口使用到的业务模型类型

export {}
```

#### 6. `index.ts` — 初始化 API 聚合文件

```typescript
import { <serviceName>Client } from './client'
```

#### 7. 更新 `src/http/index.ts` — 注册新服务到统一导出

在 `src/http/index.ts` 中追加以下内容：

```typescript
// ========== 各服务 API 函数 ==========
export * from './services/<service-name>'

// ========== 各服务类型 ==========
export type * from './services/<service-name>/api-types'
export type * from './services/<service-name>/model-types'
```

---

## 业务层调用规范

### 正确的调用方式

```typescript
// ✅ 推荐：从统一入口导入 API 函数、核心类型、业务类型
import { didGetXxxInfo, didCreateXxx } from '@/http'
import type { DidGetXxxInfoResult } from '@/http'

const loadData = async () => {
    const res = await didGetXxxInfo({ id: '123' })
    if (res.ok) {
        // 处理成功数据 — res.data 已有完整类型推导
        console.log(res.data)
    } else {
        // 处理业务错误（msg 已被拦截器替换为中文）
        uni.showToast({ title: res.msg, icon: 'none' })
    }
}
```

```typescript
// ✅ 同一页面混用多个服务 — 函数名天然不冲突
import { didGetUserInfo, didappGetUserInfo } from '@/http'
import type { DidGetUserInfoResult, DidappGetUserInfoResult } from '@/http'
```

```typescript
// ✅ 也支持从具体服务路径导入（当需要明确来源时）
import { didGetUserInfo } from '@/http/services/did'
import type { DidGetUserInfoResult } from '@/http/services/did/api-types'
```

### 禁止事项

- ❌ **禁止**直接使用 `uni.request` 发请求
- ❌ **禁止**在页面/组件中直接 `import client`，应通过 `index.ts` 导出的函数调用
- ❌ **禁止**在 `index.ts` 以外的地方编写 API 调用函数
- ❌ **禁止**硬编码 API 路径和网关地址
- ❌ **禁止**跨服务 import 另一个服务的 `client`
- ❌ **禁止**跨服务 import 另一个服务的类型（如需共用，必须提取到 `shared-types.ts`）
- ❌ **禁止**修改 `core/` 层的任何文件（除非架构升级）。新增拦截器放 `interceptors/` 或服务目录

---

## 检查清单

新增 API 时，确认以下事项：

- [ ] **已执行第 0 步：读取了该服务所有请求拦截器源码，识别出公共参数**
- [ ] **接口文档中属于公共参数的字段，未被写入类型定义和 API 函数中**
- [ ] 请求参数和响应数据都有完整的 TS 类型定义
- [ ] **类型名和函数名都加了服务前缀**（防止跨服务冲突）
- [ ] API 函数有 JSDoc 注释
- [ ] GET 请求用 `{ params }`，POST 请求用 `{ data }`
- [ ] 泛型传入了正确的响应数据类型
- [ ] 如有新错误码，已添加到 `errors.ts`
- [ ] 所有 API 函数都通过 `index.ts` 导出
- [ ] 单接口专用类型放 `api-types.ts`，服务内跨接口复用放 `model-types.ts`
- [ ] 跨服务共享的类型放 `src/http/shared-types.ts`（不加服务前缀）
- [ ] 如为新建服务，已在 `src/http/index.ts` 中添加 `export *` 和 `export type *`
- [ ] 如为新建服务，`client.ts` 中使用 `#ifdef H5` / `#ifndef H5` 条件编译设置 baseUrl
- [ ] 如为新建服务，`client.ts` 中使用 `GATEWAY_CONFIG[runtimeEnv]` 而非硬编码环境
- [ ] 如需新网关，已在 `gateway.json` 的 `gatewayName` 和所有环境的 `gatewayConfig` 中添加
