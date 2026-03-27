/**
 * 工具函数统一导出
 * @desc 业务层统一从 `@/utils` 导入，禁止直接从具体文件导入
 *       每组 re-export 按功能模块分组，并附带注释说明
 */

// ========== 路由工具 ==========
/** 路由跳转封装，提供 navigateTo / redirectTo / switchTab 等方法 */
export { router } from './route'

// ========== 路由守卫 ==========
/** 路由守卫初始化函数，在 app 启动时调用 */
export { setupRouteGuard } from './route-guard'

// ========== Storage 封装 ==========
/** 对 uni.setStorageSync / getStorageSync 等的类型安全封装 */
export {
    setStorageSync,
    getStorageSync,
    removeStorageSync,
    clearStorageSync,
    setStorage,
    getStorage,
    removeStorage,
    clearStorage,
} from './storage'

// ========== 格式化工具 ==========
/** 日期、手机号、价格等常用格式化函数 */
export {
    formatDate,
    formatDateOnly,
    formatTimeOnly,
    formatRelativeTime,
    formatPhone,
    formatPrice,
    diffDays,
    isToday,
    getStartOfDay,
    getEndOfDay,
} from './format'

// ========== 校验工具 ==========
/** 企业账户名、手机号、邮箱、密码、管理员名称等通用校验函数 */
export {
} from './validate'
