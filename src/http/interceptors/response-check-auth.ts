import { CoreResponseCode, CoreResponse } from '../core/types'

/**
 * 网络请求后拦截器
 * @desc 检查用户登录态token状态 和 刷新登录态token
 */
export const responseCheckAuthInterceptor = async (response: CoreResponse) => {
    if (response.code === CoreResponseCode.TOKEN_INVALID || response.code === CoreResponseCode.TOKEN_EXPIRED) {

    }
    return response
}
