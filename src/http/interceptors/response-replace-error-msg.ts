import type { CoreResponse } from '../core/types'

/**
 * 网络请求后拦截器
 * @desc 通过code码，msg转换为异常错误中文信息
 */
export const responseReplaceErrorMsg = (errors: Record<number | string, string>) => {
    return async function (response: CoreResponse) {
        if (response.code in errors) {
            response.msg = errors[response.code]
        }
        return response
    }
}
