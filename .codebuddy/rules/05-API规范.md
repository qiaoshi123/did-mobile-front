---
alwaysApply: false
description: HTTP 请求模块的架构与 API 封装规范。当需要新增 API、新建服务、修改拦截器时读取此规则。
---

# API 规范

## 架构总览

项目采用 **core + interceptors + services** 三层架构，对接 3 个网关（app / tdh / invoice），4 个后端微服务。

```
src/http/
├── core/                # 核心引擎层（🔒 不允许修改）
├── interceptors/        # 公共拦截器层（✏️ 可扩展）
├── shared-types.ts      # 跨服务共享类型
├── index.ts             # 统一导出入口
└── services/            # 业务服务层
    └── <service-name>/
        ├── client.ts       # 服务客户端（必须）
        ├── api-types.ts    # 接口请求/响应类型（必须）
        ├── index.ts        # API 函数聚合（必须）
        ├── model-types.ts  # 跨接口复用的业务模型类型（可选）
        ├── errors.ts       # 错误码中文映射表（可选）
        └── interceptors.ts # 服务私有拦截器（可选）
```

## 核心层关键设计

- `ApiRequest` 类基于 `uni.request` 封装，构造时注入 `baseUrl`、`timeout`、`successCodes`、请求/响应拦截器数组
- `CoreResponse<T>` 统一响应结构：`{ code, data, msg, ok }`，`ok` 由引擎根据 `successCodes` 自动设置
- `successCodes` 默认为 `[200000]`，如服务成功码不同需在 `client.ts` 中显式指定

## 已有服务

| 服务 | 目录 | client 变量 | 类型前缀 | 函数前缀 |
|------|------|------------|---------|---------|
| DID 身份服务 | `services/did/` | `didClient` | `Did` | `did` |
| DID App 服务 | `services/did-app/` | `didappClient` | `Didapp` | `didapp` |
| 发票服务 | `services/invoice/` | `invoiceClient` | `Invoice` | `invoice` |
| 存证服务 | `services/tdh/` | `tdhClient` | `Tdh` | `tdh` |

## 拦截器规范

### 分层规则

- 被 2 个及以上服务使用 → 放 `interceptors/` 目录（每个独立文件）
- 仅 1 个服务使用 → 放该服务目录下的 `interceptors.ts`
- 当私有拦截器被第 2 个服务需要时，提升到 `interceptors/` 目录

### 公共拦截器一览

| 拦截器 | 类型 | 必选/可选 | 说明 |
|--------|------|----------|------|
| `requestCommonHeaderInterceptor` | 请求 | **必选** | 添加公共请求头参数 |
| `requestAuthHeaderInterceptor` | 请求 | 可选 | 添加用户登录态 token |
| `responseCheckAuthInterceptor` | 响应 | 可选 | 检查 token 过期/失效 |
| `responseReplaceErrorMsg(errors)` | 响应（工厂） | 可选 | 接收错误码映射表，替换 msg 为中文 |

### 新增拦截器命名

- 请求拦截器文件名以 `request-` 开头，响应拦截器以 `response-` 开头
- 文件名 kebab-case，必须在 `interceptors/index.ts` 中导出

## 网关配置

- 唯一数据源：`src/config/gateway.json`，包含 `runtimeEnv`、`gatewayName`、`gatewayConfig`
- `src/config/index.ts` 导出 `runtimeEnv`、`GATEWAY_NAME`、`GATEWAY_CONFIG`
- `vite.config.ts` 同样读取 `gateway.json` 生成 H5 开发环境反向代理配置
- 切换环境只需修改 `gateway.json` 的 `runtimeEnv` 字段

### H5 跨域方案

所有服务的 `client.ts` 使用 uni-app 条件编译区分 baseUrl：

- **H5**（`#ifdef H5`）：相对路径 `/${GATEWAY_NAME.xxx}/...`，由 Vite proxy 或 Nginx 转发
- **非 H5**（`#ifndef H5`）：绝对路径 `${GATEWAY_CONFIG[runtimeEnv][GATEWAY_NAME.xxx]}/...` 直连

## 命名契约

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 服务目录 | kebab-case | `did-app` |
| client 变量 | `<serviceName>Client`（小驼峰） | `didappClient` |
| 类型名 | `{ServicePrefix}{Action}{Resource}{Params\|Body\|Result}`（PascalCase） | `DidGetInfoParams` |
| 函数名 | `{servicePrefix}{Action}{Resource}`（小驼峰） | `didGetInfo` |
| GET 请求参数后缀 | `Params` | `DidGetInfoParams` |
| POST 请求体后缀 | `Body` | `DidCreateInfoBody` |
| 响应数据后缀 | `Result` | `DidGetInfoResult` |
| 错误码变量 | `<serviceName>Errors` | `didappErrors` |

## 类型放置规则

| 使用范围 | 放置位置 | 是否加服务前缀 |
|---------|---------|--------------|
| 仅 1 个接口 | 该服务 `api-types.ts` | 是 |
| 当前服务内 ≥ 2 个接口共用 | 该服务 `model-types.ts` | 是 |
| ≥ 2 个服务共用 | `shared-types.ts` | 否 |

当类型使用范围扩大时，按上述规则提升位置。

## 统一导出（`http/index.ts`）

- 聚合导出核心类型、公共拦截器、共享类型、各服务 API 函数和业务类型
- 业务层从 `@/http` 统一导入，不直接 import 服务内部文件
- 新增服务时必须在此文件追加 `export *` 和 `export type *`

## 业务层调用约束

- 从 `@/http` 导入 API 函数和类型
- 使用 `res.ok` 判断成功，不手写 `res.code === CoreResponseCode.SUCCESS`
- 失败时 `res.msg` 已被拦截器替换为中文，可直接展示

## 公共参数原则

接入新 API 前，必须先识别该服务拦截器已自动注入的公共参数。接口文档中与拦截器字段同名的参数属于公共参数，不纳入类型定义，不在 API 函数中传入。

## 禁止事项

| 序号 | 禁止行为 |
|------|---------|
| 1 | 禁止直接使用 `uni.request` |
| 2 | 禁止在页面/组件中直接 import `client` |
| 3 | 禁止在 `index.ts` 以外编写 API 函数 |
| 4 | 禁止硬编码网关地址或环境名称 |
| 5 | 禁止跨服务 import `client` |
| 6 | 禁止修改 `core/` 层代码 |
| 7 | 禁止类型名/函数名不加服务前缀 |
| 8 | 禁止跨服务 import 另一个服务的类型（需共用则提取到 `shared-types.ts`） |
| 9 | 禁止重复传入拦截器已自动注入的公共参数 |
