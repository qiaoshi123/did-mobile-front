/**
 * useLoading — 统一的加载态管理
 * @desc 封装组件/页面级别的加载状态，避免在每个页面重复声明 loading ref
 *       支持多个并发加载任务的计数管理
 *
 * @example
 * ```ts
 * import { useLoading } from '@/hooks'
 *
 * const { loading, startLoading, stopLoading, withLoading } = useLoading()
 *
 * // 方式一：手动控制
 * startLoading()
 * await fetchData()
 * stopLoading()
 *
 * // 方式二：自动包装（推荐）
 * await withLoading(async () => {
 *     await fetchData()
 * })
 * ```
 */

import { ref, computed, type ComputedRef } from 'vue'

/** useLoading 配置项 */
export interface UseLoadingOptions {
    /** 初始加载状态，默认 false */
    initialLoading?: boolean
}

/** useLoading 返回值 */
export interface UseLoadingReturn {
    /** 当前是否处于加载状态 */
    loading: ComputedRef<boolean>
    /** 开始加载（计数 +1） */
    startLoading: () => void
    /** 结束加载（计数 -1，最小为 0） */
    stopLoading: () => void
    /**
     * 自动包装异步函数，执行前 startLoading，执行后 stopLoading
     * @param fn - 异步函数
     * @returns 异步函数的返回值
     */
    withLoading: <T>(fn: () => Promise<T>) => Promise<T>
}

/**
 * 统一的加载态管理 Hook
 * @param options - 配置项
 * @returns 加载状态和控制方法
 */
export const useLoading = (options: UseLoadingOptions = {}): UseLoadingReturn => {
    const { initialLoading = false } = options

    /** 加载任务计数器 */
    const loadingCount = ref(initialLoading ? 1 : 0)

    /** 当前是否处于加载状态 */
    const loading = computed(() => loadingCount.value > 0)

    /** 开始加载（计数 +1） */
    const startLoading = () => {
        loadingCount.value++
    }

    /** 结束加载（计数 -1，最小为 0） */
    const stopLoading = () => {
        if (loadingCount.value > 0) {
            loadingCount.value--
        }
    }

    /**
     * 自动包装异步函数，执行前 startLoading，执行后 stopLoading
     * @param fn - 异步函数
     * @returns 异步函数的返回值
     */
    const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
        startLoading()
        try {
            return await fn()
        } finally {
            stopLoading()
        }
    }

    return {
        loading,
        startLoading,
        stopLoading,
        withLoading,
    }
}
