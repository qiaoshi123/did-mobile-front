/**
 * HTTP 模块统一导出
 * @desc 业务层（页面/组件/Store）统一从 '@/http' 导入 API 函数和类型
 */

// ========== 核心层 ==========
// 导出核心类型和工具（如 CoreResponseCode、CoreResponse 等）
export * from './core'

// ========== 公共拦截器 ==========
// 导出跨服务共享的拦截器
export * from './interceptors'

// ========== 跨服务共享类型 ==========
export type * from './shared-types'

// ========== 各服务 API 函数 ==========
// 业务层通过此处导入 API 函数，如：import { didGetUserInfo, tdhQueryFile } from '@/http'
export * from './services/did'
export * from './services/did-app'
export * from './services/invoice'
export * from './services/tdh'

// ========== 各服务类型 ==========
// 业务层通过此处导入类型，如：import type { DidGetUserInfoResult } from '@/http'
export type * from './services/did/api-types'
export type * from './services/did/model-types'
export type * from './services/did-app/api-types'
export type * from './services/did-app/model-types'
export type * from './services/invoice/api-types'
export type * from './services/invoice/model-types'
export type * from './services/tdh/api-types'
export type * from './services/tdh/model-types'
