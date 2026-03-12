/**
 * 跨服务共享的业务类型
 * @desc 被 2 个及以上服务共同使用的类型放在这里，不加服务前缀
 */

// ========== 分页相关 ==========

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
