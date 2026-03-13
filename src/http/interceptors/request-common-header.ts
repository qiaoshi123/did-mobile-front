import type { CoreRequestOptions } from '../core/types'

/**
 * 网络请求前拦截器
 * @desc 添加公共参数请求头
 */
export const requestCommonHeaderInterceptor = async (options: CoreRequestOptions) => {
    options.header = {
        ...options.header,
        equipmentType: '1'
    }
    return options
}
