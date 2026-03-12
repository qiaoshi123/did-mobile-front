/**
 * API 请求/响应类型定义
 */

// 请求选项
export interface CoreRequestOptions {
    /** 请求头 */
    header?: Record<string, string>
    /** 请求参数 */
    params?: Record<string, any>
    /** 请求体数据 */
    data?: any
    /** 请求超时时间（ms） */
    timeout?: number
    /** 是否显示加载中 */
    loading?: boolean
    /** 加载文本 */
    loadingText?: string
}

// 响应结果
export interface CoreResponse<T = any> {
    /** 状态码 */
    code: number
    /** 响应数据 */
    data: T
    /** 提示信息 */
    msg: string
    /** 业务是否成功（由 ApiRequest 根据 successCodes 自动设置） */
    ok: boolean
}



// 业务错误码
export enum CoreResponseCode {
    SUCCESS = 200000,
    TOKEN_EXPIRED = 400002,
    TOKEN_INVALID = 400003,
}
