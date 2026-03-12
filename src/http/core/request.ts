import { CoreRequestOptions, CoreResponse, CoreResponseCode } from './types'

/**
 * API 请求封装类
 * 基于 uni.request 封装，提供拦截器功能
 */
export class ApiRequest {
    /** 基础 URL */
    private baseUrl: string = ''

    /** 请求超时时间 */
    private timeout: number = 30000

    /** 该服务实例的成功状态码（支持多个） */
    private successCodes: number[]

    /** 请求拦截器 */
    private requestInterceptors: ((options: CoreRequestOptions) => Promise<CoreRequestOptions>)[] = []

    /** 响应拦截器 */
    private responseInterceptors: ((response: CoreResponse) => Promise<CoreResponse>)[] = []

    constructor(options: {
        baseUrl: string,
        timeout?: number,
        /** 该服务的成功状态码，默认 [CoreResponseCode.SUCCESS]，支持传单个或数组 */
        successCodes?: number | number[],
        requestInterceptors?: ((options: CoreRequestOptions) => Promise<CoreRequestOptions>)[],
        responseInterceptors?: ((response: CoreResponse) => Promise<CoreResponse>)[]
    }) {
        this.baseUrl = options.baseUrl;
        options.timeout!! && (this.timeout = options.timeout);
        const codes = options.successCodes ?? [CoreResponseCode.SUCCESS]
        this.successCodes = Array.isArray(codes) ? codes : [codes]
        options.requestInterceptors!! && (this.requestInterceptors = options.requestInterceptors);
        options.responseInterceptors!! && (this.responseInterceptors = options.responseInterceptors);
    }

    /**
     * GET 请求
     */
    async get<T = any>(url: string, options?: CoreRequestOptions): Promise<CoreResponse<T>> {
        return this.request<T>('GET', url, options)
    }

    /**
     * POST 请求
     */
    async post<T = any>(url: string, options?: CoreRequestOptions): Promise<CoreResponse<T>> {
        return this.request<T>('POST', url, { ...options })
    }

    /**
     * 统一请求方法
     */
    private async request<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        options?: CoreRequestOptions
    ): Promise<CoreResponse<T>> {
        let finalOptions: CoreRequestOptions = {
            timeout: options?.timeout ?? this.timeout,
            loading: options?.loading ?? false,
            loadingText: options?.loadingText ?? '',
            header: options?.header ?? {},
            params: options?.params ?? {},
            data: options?.data ?? {},
        }
        for (const interceptor of this.requestInterceptors) {
            finalOptions = await interceptor(finalOptions);
        }
        if (finalOptions.loading) {
            uni.showLoading({ title: finalOptions.loadingText, mask: false })
        }
        try {
            const response = await uni.request({
                url: this.baseUrl + url,
                method,
                header: finalOptions.header,
                data: finalOptions.params || finalOptions.data,
                timeout: finalOptions.timeout,
            })
            if (finalOptions.loading) {
                uni.hideLoading()
            }
            let result = response.data as CoreResponse<T>;
            for (const interceptor of this.responseInterceptors) {
                result = await interceptor(result)
            }
            // 所有拦截器执行完毕后，根据 successCodes 自动设置 ok
            result.ok = this.successCodes.includes(result.code)
            return result;
        } catch (error: any) {
            if (finalOptions.loading) {
                uni.hideLoading()
            }
            return {
                code: -1,
                data: null as any,
                msg: error.message || '网络请求失败',
                ok: false,
            };
        }
    }
}


