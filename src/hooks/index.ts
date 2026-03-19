/**
 * Hooks（Composables）统一导出
 * @desc 所有 `src/hooks/` 下的可复用有状态组合函数在此聚合导出
 *       业务层统一从 `@/hooks` 导入，禁止直接从具体文件导入
 *       每组 re-export 按功能分组，并附带注释说明
 *
 * @example
 * ```ts
 * // 业务层使用：
 * import { useLoading, usePagination } from '@/hooks'
 *
 * const { loading, startLoading, stopLoading } = useLoading()
 * ```
 */

// ========== 加载态管理 ==========
/** 统一的加载状态管理，提供 loading 状态及 startLoading / stopLoading 方法 */
export { useLoading } from './use-loading'

// ========== 分页列表 ==========
/** 通用分页列表逻辑，封装页码管理、加载更多、下拉刷新 */
export { usePagination } from './use-pagination'

// ========== 表单校验 ==========
/** 通用表单校验逻辑，支持规则配置、实时校验、提交前校验 */
export { useFormValidation } from './use-form-validation'
