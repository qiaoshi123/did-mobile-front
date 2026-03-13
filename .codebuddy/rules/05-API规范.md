# API 规范

本文档定义基于 `src/http/` 分层架构的网络请求封装和使用规范。

---

## 一、架构总览

项目采用 **core + interceptors + services** 三层架构，对接三个网关（app / tdh / invoice），每个网关下可能有多个服务。

```
src/http/
├── core/                          # 核心引擎层 — 纯机制，无业务逻辑（🔒 不允许修改）
│   ├── types.ts                   # 核心类型：CoreRequestOptions, CoreResponse<T>, CoreResponseCode
│   ├── request.ts                 # ApiRequest 类：请求封装 + 拦截器链执行
│   └── index.ts                   # 统一导出
│
├── interceptors/                  # 公共拦截器层 — 跨服务共享的拦截器（✏️ 可扩展）
│   ├── request-common-header.ts   # 公共请求头拦截器
│   ├── request-auth-header.ts     # 鉴权请求头拦截器
│   ├── response-check-auth.ts     # token 校验拦截器
│   ├── response-replace-error-msg.ts  # 错误码中文映射拦截器（工厂模式）
│   └── index.ts                   # 统一导出
│
├── shared-types.ts                # 跨服务共享的业务类型
│
└── services/                      # 业务服务层 — 每个服务独立封装
    └── <service-name>/            # 服务目录（标准文件 + 可选文件）
        ├── client.ts              # 创建 ApiRequest 实例，配置网关/拦截器（含 H5/非H5 条件编译）
        ├── errors.ts              # 🆕 可选：错误码 → 中文信息映射表（使用 responseReplaceErrorMsg 时创建）
        ├── interceptors.ts        # 🆕 可选：该服务专属的拦截器（只有本服务使用时创建）
        ├── api-types.ts           # 接口的请求参数 & 响应数据类型
        ├── model-types.ts         # 当前服务内跨接口复用的业务模型类型
        └── index.ts               # API 函数聚合，业务层唯一调用入口
```

### 核心层关键设计

| 模块 | 说明 |
|------|------|
| `ApiRequest` 类 | 基于 `uni.request` 封装，构造时注入 `baseUrl`、`timeout`、`successCodes`、请求拦截器数组、响应拦截器数组 |
| 拦截器链 | 请求前按顺序执行 `requestInterceptors`，响应后按顺序执行 `responseInterceptors` |
| `CoreResponse<T>` | 统一响应结构：`{ code: number, data: T, msg: string, ok: boolean }`，`ok` 由 `ApiRequest` 根据 `successCodes` 自动设置 |
| `successCodes` | `ApiRequest` 构造参数，指定该服务的成功状态码，默认 `[CoreResponseCode.SUCCESS]`（即 200000），支持传单个数字或数组 |

### 拦截器分层

拦截器按使用范围分为两级，与类型的分层规则对称：

| 使用范围 | 存放位置 | 说明 |
|---------|---------|------|
| 跨服务共享（2 个及以上服务使用） | `src/http/interceptors/` | 每个拦截器独立一个文件，通过 `index.ts` 统一导出 |
| 单个服务专属 | `src/http/services/<name>/interceptors.ts` | 可选文件，仅在有服务私有拦截器时创建 |

**拦截器放置决策流程：**

```
这个拦截器被几个服务使用？
  ├── 只有 1 个服务 → 放该服务目录下的 interceptors.ts
  └── 2 个及以上服务 → 放 interceptors/ 目录（每个拦截器独立文件）
```

> **提升规则：** 当服务私有拦截器被第 2 个服务需要时，应将其从 `services/<name>/interceptors.ts` 提升到 `interceptors/` 目录。

**公共拦截器一览：**

| 拦截器 | 文件 | 类型 | 说明 |
|--------|------|------|------|
| `requestCommonHeaderInterceptor` | `request-common-header.ts` | 请求拦截器 | 添加公共请求头参数 |
| `requestAuthHeaderInterceptor` | `request-auth-header.ts` | 请求拦截器 | 添加用户登录态 token |
| `responseCheckAuthInterceptor` | `response-check-auth.ts` | 响应拦截器 | 检查 token 过期/失效 |
| `responseReplaceErrorMsg` | `response-replace-error-msg.ts` | 响应拦截器（工厂） | 高阶函数，接收错误码映射表，替换 msg 为中文 |

**新增公共拦截器规范：**
- 每个拦截器独立一个文件，文件名用 kebab-case（如 `request-xxx.ts`、`response-xxx.ts`）
- 请求拦截器文件名以 `request-` 开头，响应拦截器以 `response-` 开头
- 必须在 `interceptors/index.ts` 中导出
- 如果是工厂函数（如 `responseReplaceErrorMsg`），需在公共拦截器一览表中标注"工厂"

### 已有服务

| 服务 | 目录 | client 变量 |
|------|------|------------|
| DID 身份服务 | `services/did/` | `didClient` |
| DID App 服务 | `services/did-app/` | `didappClient` |
| 发票服务 | `services/invoice/` | `invoiceClient` |
| 存证服务 | `services/tdh/` | `tdhClient` |

> 各服务的网关、baseUrl 拼接规则、拦截器组合各不相同，具体请查看对应服务的 `client.ts`。

### `http/index.ts` 统一导出

`src/http/index.ts` 是整个 HTTP 模块的总入口，聚合导出了：
- **核心层**：`CoreResponseCode`、`CoreResponse` 等核心类型
- **公共拦截器**：`requestCommonHeaderInterceptor`、`responseReplaceErrorMsg` 等跨服务共享拦截器
- **共享类型**：`PageParams`、`PageResult` 等跨服务通用类型
- **各服务 API 函数**：通过 `export *` 重导出各服务 `index.ts` 中的 API 函数
- **各服务业务类型**：通过 `export type *` 重导出各服务的 `api-types.ts` 和 `model-types.ts` 中的类型

**业务层推荐导入方式：**

```typescript
// ✅ 推荐：从统一入口导入（简洁，路径短）
import { didGetUserInfo } from '@/http'
import type { DidGetUserInfoResult, PageParams } from '@/http'

// ✅ 也支持：从具体服务导入（当需要明确来源时）
import { didGetUserInfo } from '@/http/services/did'
import type { DidGetUserInfoResult } from '@/http/services/did/api-types'
```

> **⚠️ 维护要求：** 新增服务时，必须在 `src/http/index.ts` 中添加对应的 `export *` 和 `export type *` 语句。

---

## 二、网关配置

### 数据源

网关配置的唯一数据源是 `src/config/gateway.json`，包含三部分：

| 字段 | 说明 |
|------|------|
| `runtimeEnv` | 当前运行环境（`dev` / `preview` / `production` / `sywl`） |
| `gatewayName` | 网关名称标识（`app` / `tdh` / `invoice`），H5 环境下作为代理路径前缀 |
| `gatewayConfig` | 各环境对应的网关真实地址 |

`src/config/index.ts` 从 `gateway.json` 读取并导出 `runtimeEnv`、`GATEWAY_NAME`、`GATEWAY_CONFIG`。
`vite.config.ts` 同样从 `gateway.json` 读取，动态生成 H5 本地开发反向代理配置。

### H5 跨域方案（条件编译 baseUrl）

由于 H5 环境存在浏览器跨域限制，所有服务的 `client.ts` 均采用 uni-app 条件编译区分 baseUrl：

- **H5 环境**（`#ifdef H5`）：使用 `/${GATEWAY_NAME.xxx}/...` 相对路径，请求发到同源域名
  - 本地开发：由 Vite proxy 按网关名前缀转发到真实网关
  - 生产部署：由 Nginx 按网关名前缀反向代理到真实网关
- **非 H5 环境**（`#ifndef H5`）：使用 `${GATEWAY_CONFIG[runtimeEnv][GATEWAY_NAME.xxx]}/...` 绝对路径直连

### 规范

- 新增网关必须同时添加到 `gateway.json` 的 `gatewayName` 和所有环境的 `gatewayConfig` 中
- 服务的 `client.ts` 通过 `GATEWAY_CONFIG`、`GATEWAY_NAME`、`runtimeEnv` 引用网关地址
- 不允许在服务代码中硬编码网关 URL 或环境名称
- 切换环境只需修改 `gateway.json` 中的 `"runtimeEnv"` 字段
- 新建服务时，先查看 `gateway.json` 确认已有哪些网关可用

---

## 三、服务模块文件规范

### 3.1 `client.ts` — 服务客户端

**职责：** 创建 `ApiRequest` 实例，配置网关地址和拦截器组合。使用 uni-app 条件编译区分 H5/非H5 环境的 baseUrl。

```typescript
import { GATEWAY_CONFIG, GATEWAY_NAME, runtimeEnv } from '@/config'
import { ApiRequest } from '../../core'
import {
    requestCommonHeaderInterceptor,
    requestAuthHeaderInterceptor,     // 需要鉴权时引入
    responseCheckAuthInterceptor,     // 需要 token 校验时引入
    responseReplaceErrorMsg,          // 需要错误码映射时引入
} from '../../interceptors'
import { xxxErrors } from './errors'  // 使用 responseReplaceErrorMsg 时引入

/**
 * <服务中文名>服务端
 * 网关：使用 <网关名> 网关
 * H5环境baseUrl："/<gateway名称标识>/<url-pattern>/<version>/<service-name>"
 * 非H5环境baseUrl规则："<gateway具体地址>/<url-pattern>/<version>/<service-name>"
 */
const version = 'v1'
let baseUrl = ''
// #ifdef H5
baseUrl = `/${GATEWAY_NAME.<gateway>}/<url-pattern>/${version}/<service-name>`
// #endif

// #ifndef H5
baseUrl = `${GATEWAY_CONFIG[runtimeEnv][GATEWAY_NAME.<gateway>]}/<url-pattern>/${version}/<service-name>`
// #endif

const xxxClient = new ApiRequest({
    baseUrl,
    // successCodes: 默认为 [CoreResponseCode.SUCCESS]（即 200000）
    // 如果该服务的成功码不同，在此指定，如：successCodes: 0 或 successCodes: [0, 200]
    requestInterceptors: [
        requestCommonHeaderInterceptor,
        requestAuthHeaderInterceptor,     // 可选：需要鉴权时添加
    ],
    responseInterceptors: [
        responseCheckAuthInterceptor,     // 可选：需要 token 校验时添加
        responseReplaceErrorMsg(xxxErrors), // 可选：需要错误码映射时添加
    ],
})
export { xxxClient }
```

**条件编译说明：**
- `#ifdef H5`：H5 环境使用相对路径 `/${GATEWAY_NAME.xxx}/...`，请求发到同源域名，由 Vite proxy（开发）或 Nginx（生产）转发
- `#ifndef H5`：App/小程序环境使用绝对路径直连，无跨域限制
- `runtimeEnv` 动态控制环境切换，不要硬编码 `dev` / `production` 等环境名
- `GATEWAY_NAME` 提供网关名称标识，确保 H5 路径前缀与 Vite proxy / Nginx 配置一致

> **注意：** 除 `requestCommonHeaderInterceptor` 必选外，其余拦截器均由各服务根据业务需求自行决定是否使用。不使用的拦截器直接删除对应行和 import 即可。

**拦截器选配规则：**

| 拦截器 | 来源 | 必选/可选 | 说明 |
|--------|------|----------|------|
| `requestCommonHeaderInterceptor` | `interceptors/` | **必选** | 添加公共请求头参数 |
| `requestAuthHeaderInterceptor` | `interceptors/` | 可选 | 需要用户登录态时添加 |
| `responseCheckAuthInterceptor` | `interceptors/` | 可选 | 需要检测 token 失效/过期时添加 |
| `responseReplaceErrorMsg(errors)` | `interceptors/` | 可选 | 高阶函数（工厂模式），接收错误码映射表，有 errors 映射需求时添加 |
| 服务私有拦截器 | `./interceptors.ts` | 按需 | 仅当前服务使用的特殊拦截器，从本服务目录导入 |

**命名规范：**
- client 变量名：`<serviceName>Client`（小驼峰，如 `didClient`、`invoiceClient`）
- 必须在注释中说明所属网关和 baseUrl 拼接规则

### 3.2 `errors.ts` — 错误码映射

**职责：** 定义该服务所有已知业务错误码到中文提示的映射。仅在使用 `responseReplaceErrorMsg` 拦截器时需要此文件。

```typescript
// 有内容时，推荐显式声明类型
export const xxxErrors: Record<number | string, string> = {
    300100: '参数错误',
    401104: '数据库错误',
    500006: '上链失败',
}

// 空对象初始化时，可省略类型标注
export const xxxErrors = {}
```

**规范：**
- 变量命名：`<serviceName>Errors`
- 推荐声明类型为 `Record<number | string, string>`，但不强制（实际代码中多数省略了类型标注）
- key 为数字类型的业务错误码，value 为用户可读的中文描述
- 随着接口开发逐步补充，不要求一次性写完
- 初始化时可以为空对象 `{}`

### 3.3 `api-types.ts` — 接口类型定义

**职责：** 定义每个接口的请求参数类型和响应数据类型。

```typescript
// ========== 获取用户信息 ==========

/** 获取用户信息 - 请求参数 */
export interface DidGetUserInfoParams {
    userId: string
}

/** 获取用户信息 - 响应数据 */
export interface DidGetUserInfoResult {
    userId: string
    name: string
    avatar: string
    did: string
}

// ========== 创建 DID ==========

/** 创建 DID - 请求体 */
export interface DidCreateDIDBody {
    publicKey: string
    algorithm: string
}

/** 创建 DID - 响应数据 */
export interface DidCreateDIDResult {
    did: string
    txHash: string
}
```

**命名规范（防止跨服务类型名冲突）：**
- 所有类型名必须加 **服务前缀**：`{ServicePrefix}{Action}{Resource}{Params|Body|Result}`
- 服务前缀对照表：

| 服务 | 类型前缀 | 示例 |
|------|---------|------|
| did | `Did` | `DidGetUserInfoParams`、`DidCreateDIDResult` |
| did-app | `Didapp` | `DidappGetFileListParams` |
| invoice | `Invoice` | `InvoiceCreateOrderBody` |
| tdh | `Tdh` | `TdhQueryFileInfoResult` |
| 新服务 | 首字母大写驼峰 | 与 client 变量名前缀对应 |

- GET 请求参数后缀：`Params`
- POST 请求体后缀：`Body`
- 响应数据后缀：`Result`
- Action 动词：`Get` / `Create` / `Update` / `Delete` / `Query` / `Submit` / `Upload`

**类型编写规范：**
- 所有类型名必须加服务前缀
- 使用 `// ========== 接口名 ==========` 注释分隔不同接口的类型组
- 所有字段必须有明确的类型，禁止使用 `any`
- 可选字段用 `?` 标注
- 枚举值用联合类型（如 `status: 'active' | 'revoked'`）或独立 enum
- 嵌套对象提取为独立 interface（同样加服务前缀）
- 每个类型都需要 JSDoc 注释说明用途

### 3.4 `model-types.ts` — 业务模型类型

**职责：** 定义在**当前服务内**被多个接口共享的业务实体类型。

```typescript
/** Did - DID 身份信息 */
export interface DidDIDInfo {
    did: string
    publicKey: string
    status: 'active' | 'revoked'
    createdAt: string
}
```

**放置原则和前缀规则：**
- 被当前服务内 **2 个及以上接口** 引用的类型 → 放 `model-types.ts`，**加服务前缀**
- 仅被 **1 个接口** 使用的类型 → 放 `api-types.ts`，**加服务前缀**
- 被 **多个服务** 共用的类型 → 放 `src/http/shared-types.ts`，**不加服务前缀**
- 代表独立业务实体的类型（用户、文件、记录等）→ 放 `model-types.ts`

### 3.5 `shared-types.ts` — 跨服务共享类型

**路径：** `src/http/shared-types.ts`（与 `core/`、`services/` 同级）

**职责：** 定义被 2 个及以上服务共同使用的类型。

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

**规范：**
- 跨服务共享类型 **不加** 服务前缀（因为不属于任何特定服务）
- 服务中使用时通过 `import type { PageParams } from '../../shared-types'` 引入
- 新增共享类型前，先检查是否已存在类似定义，避免重复

**类型提升规则：**
- 当一个类型从仅在 1 个服务使用变成被 2 个及以上服务引用时，应将其从服务的 `model-types.ts` 提升到 `shared-types.ts`，并去掉服务前缀
- 提升后需在原服务文件中添加迁移注释，提示从 `shared-types.ts` 引入

**类型放置决策流程：**

```
这个类型被几个服务使用？
  ├── 只有 1 个服务 → 被几个接口使用？
  │     ├── 只有 1 个接口 → 放 api-types.ts（加服务前缀）
  │     └── 2 个及以上 → 放 model-types.ts（加服务前缀）
  └── 2 个及以上服务 → 放 shared-types.ts（不加前缀）
```

### 3.6 `index.ts` — API 函数聚合

**职责：** 该服务所有 API 的唯一出口，业务层只能从这里 import。

```typescript
import { didClient } from './client'
import type {
    DidGetUserInfoParams,
    DidGetUserInfoResult,
    DidCreateDIDBody,
    DidCreateDIDResult,
} from './api-types'

// ========== 用户模块 ==========

/** 获取用户信息 */
export const didGetUserInfo = (params: DidGetUserInfoParams) => {
    return didClient.get<DidGetUserInfoResult>('/user/info', { params })
}

// ========== DID 模块 ==========

/** 创建 DID */
export const didCreateDID = (data: DidCreateDIDBody) => {
    return didClient.post<DidCreateDIDResult>('/did/create', { data })
}

/** 删除 DID */
export const didDeleteDID = (did: string) => {
    return didClient.post<null>('/did/delete', { data: { did } })
}
```

**函数命名规范（防止跨服务函数名冲突）：**
- 函数名必须加 **服务前缀**（小驼峰）：`{servicePrefix}{Action}{Resource}`
- 服务前缀对照表：

| 服务 | 函数前缀 | 示例 |
|------|---------|------|
| did | `did` | `didGetUserInfo`、`didCreateDID` |
| did-app | `didapp` | `didappGetFileList`、`didappSubmitOrder` |
| invoice | `invoice` | `invoiceCreateOrder`、`invoiceGetDetail` |
| tdh | `tdh` | `tdhQueryFile`、`tdhCreateAuth` |
| 新服务 | 小驼峰服务名 | 与 client 变量名前缀一致 |

**其他编写规范：**
- 使用 `export const` + 箭头函数定义每个 API
- 每个函数必须有 JSDoc 注释
- GET 请求：参数传 `{ params: xxx }`
- POST 请求：数据传 `{ data: xxx }`
- 泛型 `<T>` 对应 `CoreResponse<T>` 中的 `T`，即接口返回的业务数据类型
- 接口无有效响应数据时泛型传 `null`
- 使用 `// ========== 模块名 ==========` 注释按业务模块分组
- 不在此文件中定义任何类型，类型全部从 `api-types.ts`、`model-types.ts` 或 `shared-types.ts` import

---

## 四、业务层调用规范

### 正确调用方式

```typescript
// ✅ 推荐：从统一入口 @/http 导入
import { didGetUserInfo, didCreateDID } from '@/http'
import type { DidGetUserInfoResult } from '@/http'

// 在 setup / 方法中调用
const loadUser = async () => {
    const res = await didGetUserInfo({ userId: '123' })
    if (res.ok) {
        // 成功 — 使用 res.data（已有完整类型推导）
        userData.value = res.data
    } else {
        // 失败 — msg 已被拦截器替换为中文
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

### 带 loading 的请求

```typescript
const submitData = async () => {
    const res = await didCreateDID({
        publicKey: 'xxx',
        algorithm: 'Ed25519',
    })
    // loading 和 loadingText 在 options 中配置
    // 实际使用时可以在调用处传入
}
```

---

## 五、禁止事项

| 序号 | 禁止行为 | 说明 |
|------|---------|------|
| 1 | **禁止直接使用 `uni.request`** | 所有请求必须通过 `ApiRequest` 实例发起 |
| 2 | **禁止在页面/组件中直接 import `client`** | 必须通过服务 `index.ts` 导出的 API 函数调用 |
| 3 | **禁止在 `index.ts` 以外编写 API 函数** | `index.ts` 是 API 的唯一聚合出口 |
| 4 | **禁止硬编码网关地址或环境名称** | 必须通过 `GATEWAY_CONFIG[runtimeEnv]` + `GATEWAY_NAME` 引用，不要直接写 `GATEWAY_CONFIG.dev` |
| 5 | **禁止跨服务 import `client`** | 每个服务使用自己的 client 实例 |
| 6 | **禁止修改 `core/` 层代码** | 除非是架构级别的升级。新增拦截器应放到 `interceptors/` 或服务目录的 `interceptors.ts` |
| 7 | **禁止 API 函数不定义类型** | 请求参数和响应数据必须有完整的 TS 类型 |
| 8 | **禁止在类型中使用 `any`** | 明确每个字段的类型 |
| 9 | **禁止类型名/函数名不加服务前缀** | 所有 api-types、model-types 中的类型和 index.ts 中的函数都必须加服务前缀，防止跨服务命名冲突 |
| 10 | **禁止跨服务 import 另一个服务的类型** | 如需共用，必须提取到 `shared-types.ts` |
| 11 | **禁止在 API 函数中重复传入拦截器已自动注入的公共参数** | 接入新 API 前，必须先读取该服务 `client.ts` 中所有请求拦截器的源码，识别已被自动注入的 header / params / data 字段。接口文档中与拦截器字段同名的参数属于公共参数，不在 API 函数中重复传入，也不纳入该接口的类型定义 |

---

## 六、新增 API 检查清单

每次新增 API 接口时，按以下清单逐项确认：

- [ ] **已读取该服务所有请求拦截器的源码，识别出已被自动注入的公共参数（header / params / data 字段）**
- [ ] **接口文档中属于公共参数的字段，未被写入类型定义和 API 函数中**
- [ ] `api-types.ts` 中定义了请求参数类型（`Params` 或 `Body`）
- [ ] `api-types.ts` 中定义了响应数据类型（`Result`）
- [ ] **类型名和函数名都加了服务前缀**（如 `DidGetUserInfoParams`、`didGetUserInfo`）
- [ ] 当前服务内跨接口复用的类型放在了 `model-types.ts`
- [ ] 跨服务共享的类型放在了 `src/http/shared-types.ts`
- [ ] `index.ts` 中编写了 API 函数，使用正确的 HTTP 方法（`get` / `post`）
- [ ] API 函数有 JSDoc 注释
- [ ] 泛型传入了正确的响应数据类型
- [ ] GET 用 `{ params }`，POST 用 `{ data }`
- [ ] 业务层使用 `res.ok` 判断成功，不再手写 `res.code === CoreResponseCode.SUCCESS`
- [ ] 如有新业务错误码，已添加到 `errors.ts`
- [ ] API 函数通过 `export` 导出
- [ ] 类型命名遵循 `{ServicePrefix}{Action}{Resource}{Params|Body|Result}` 规范

---

## 七、新建服务检查清单

创建全新服务模块时，按以下清单确认：

- [ ] 在 `src/http/services/` 下创建了服务目录
- [ ] 创建了必要文件：`client.ts`、`api-types.ts`、`model-types.ts`、`index.ts`
- [ ] 如使用 `responseReplaceErrorMsg`，已创建 `errors.ts` 并导出正确命名的错误码映射对象
- [ ] `client.ts` 中使用 `#ifdef H5` / `#ifndef H5` 条件编译设置 H5 相对路径和非 H5 绝对路径
- [ ] `client.ts` 中使用 `GATEWAY_CONFIG[runtimeEnv][GATEWAY_NAME.xxx]` 引用网关地址，不硬编码环境名
- [ ] `client.ts` 中从 `@/config` 导入了 `GATEWAY_CONFIG`、`GATEWAY_NAME`、`runtimeEnv` 三个变量
- [ ] `client.ts` 中确认 `successCodes` 设置（默认 200000，若不同需显式指定）
- [ ] `client.ts` 注释说明了所属网关、H5 baseUrl 和非 H5 baseUrl 拼接规则
- [ ] 拦截器组合符合业务需求（`requestCommonHeaderInterceptor` 必选，其余按需）
- [ ] 拦截器 import 来源正确（公共拦截器从 `../../interceptors`，私有拦截器从 `./interceptors`）
- [ ] 如有服务私有拦截器，已创建 `interceptors.ts` 文件
- [ ] 如需新网关，已在 `gateway.json` 的 `gatewayName` 和所有环境的 `gatewayConfig` 中添加
- [ ] 确定了该服务的类型前缀（大驼峰）和函数前缀（小驼峰），并记录到前缀对照表
- [ ] 已在 `src/http/index.ts` 中追加 `export *` 导出 API 函数
- [ ] 已在 `src/http/index.ts` 中追加 `export type *` 导出 `api-types.ts` 和 `model-types.ts`
