/**
 * 公共拦截器统一导出
 * @desc 所有跨服务共享的请求/响应拦截器在此聚合导出
 *       每个拦截器为独立文件，按 request-* / response-* 命名
 *       新增/修改拦截器时，须在此文件的导出语句上方附带 JSDoc
 */

// ========== 请求拦截器（request） ==========

/**
 * 公共请求头拦截器（请求拦截器 · 必选）
 * @desc 自动注入所有服务通用的 header 字段（如 platform、version 等）
 *       每个服务的 client.ts 都应引用此拦截器
 */
export { requestCommonHeaderInterceptor } from './request-common-header'

/**
 * 鉴权请求头拦截器（请求拦截器 · 可选）
 * @desc 自动注入 Authorization / token 等鉴权 header
 *       仅需要登录态的服务使用
 */
export { requestAuthHeaderInterceptor } from './request-auth-header'

// ========== 响应拦截器（response） ==========

/**
 * 登录态校验拦截器（响应拦截器 · 可选）
 * @desc 检查响应中的鉴权状态，token 过期时自动跳转登录页
 *       仅需要登录态的服务使用
 */
export { responseCheckAuthInterceptor } from './response-check-auth'

/**
 * 错误码中文映射拦截器（响应拦截器 · 可选 · 工厂函数）
 * @desc 接收一个 `Record<number, string>` 错误码映射表，返回一个响应拦截器
 *       该拦截器会自动将 `res.msg` 替换为映射表中的中文描述
 * @example
 * ```ts
 * import { didErrors } from './errors'
 * responseReplaceErrorMsg(didErrors) // 返回 ResponseInterceptor
 * ```
 */
export { responseReplaceErrorMsg } from './response-replace-error-msg'
