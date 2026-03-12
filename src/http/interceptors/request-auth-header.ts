import type { CoreRequestOptions } from '../core/types'

/**
 * 网络请求前拦截器
 * @desc 添加用户登录态token请求头
 */
export const requestAuthHeaderInterceptor = async (options: CoreRequestOptions) => {
    return options
}
