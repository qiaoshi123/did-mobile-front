/**
 * usePagination — 通用分页列表逻辑
 * @desc 封装分页列表的常见逻辑：页码管理、加载更多、下拉刷新、空状态判断
 *       适用于配合 uni-app 的 onReachBottom / onPullDownRefresh 使用
 *
 * @example
 * ```ts
 * import { usePagination } from '@/hooks'
 * import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
 * import { didappGetList } from '@/http'
 * import type { DidappListItem } from '@/http'
 *
 * const {
 *     list,
 *     loading,
 *     refreshing,
 *     finished,
 *     isEmpty,
 *     loadMore,
 *     refresh,
 * } = usePagination<DidappListItem>({
 *     fetchData: async (page, pageSize) => {
 *         const res = await didappGetList({ page, pageSize })
 *         if (res.ok) {
 *             return { list: res.data.list, total: res.data.total }
 *         }
 *         return { list: [], total: 0 }
 *     },
 * })
 *
 * onReachBottom(() => loadMore())
 * onPullDownRefresh(() => refresh())
 * ```
 */

import { ref, computed, type Ref, type ComputedRef } from 'vue'

/** usePagination 配置项 */
export interface UsePaginationOptions<T> {
    /**
     * 数据请求函数
     * @param page - 当前页码（从 1 开始）
     * @param pageSize - 每页数量
     * @returns 包含列表数据和总条数的对象
     */
    fetchData: (page: number, pageSize: number) => Promise<{ list: T[]; total: number }>
    /** 每页数量，默认 20 */
    pageSize?: number
    /** 是否立即加载第一页，默认 false */
    immediate?: boolean
}

/** usePagination 返回值 */
export interface UsePaginationReturn<T> {
    /** 列表数据 */
    list: Ref<T[]>
    /** 是否正在加载 */
    loading: Ref<boolean>
    /** 是否正在下拉刷新 */
    refreshing: Ref<boolean>
    /** 是否已加载全部数据 */
    finished: ComputedRef<boolean>
    /** 列表是否为空（已加载完成且无数据） */
    isEmpty: ComputedRef<boolean>
    /** 当前页码 */
    currentPage: Ref<number>
    /** 总条数 */
    total: Ref<number>
    /** 加载更多（下一页） */
    loadMore: () => Promise<void>
    /** 下拉刷新（重置到第一页） */
    refresh: () => Promise<void>
    /** 重置状态（清空列表和页码） */
    reset: () => void
}

/**
 * 通用分页列表 Hook
 * @param options - 配置项
 * @returns 分页列表状态和控制方法
 */
export const usePagination = <T>(options: UsePaginationOptions<T>): UsePaginationReturn<T> => {
    const { fetchData, pageSize = 20, immediate = false } = options

    /** 列表数据 */
    const list = ref<T[]>([]) as Ref<T[]>

    /** 是否正在加载 */
    const loading = ref(false)

    /** 是否正在下拉刷新 */
    const refreshing = ref(false)

    /** 当前页码 */
    const currentPage = ref(0)

    /** 总条数 */
    const total = ref(0)

    /** 是否已加载全部数据 */
    const finished = computed(() => list.value.length >= total.value && currentPage.value > 0)

    /** 列表是否为空（已加载完成且无数据） */
    const isEmpty = computed(() => !loading.value && !refreshing.value && list.value.length === 0 && currentPage.value > 0)

    /**
     * 加载更多（下一页）
     * 如果正在加载或已加载全部，则直接返回
     */
    const loadMore = async () => {
        if (loading.value || finished.value) return

        loading.value = true
        try {
            const nextPage = currentPage.value + 1
            const result = await fetchData(nextPage, pageSize)
            list.value = [...list.value, ...result.list]
            total.value = result.total
            currentPage.value = nextPage
        } finally {
            loading.value = false
        }
    }

    /**
     * 下拉刷新（重置到第一页）
     * 刷新完成后自动调用 uni.stopPullDownRefresh()
     */
    const refresh = async () => {
        refreshing.value = true
        try {
            const result = await fetchData(1, pageSize)
            list.value = result.list as T[]
            total.value = result.total
            currentPage.value = 1
        } finally {
            refreshing.value = false
            uni.stopPullDownRefresh()
        }
    }

    /** 重置状态（清空列表和页码） */
    const reset = () => {
        list.value = []
        currentPage.value = 0
        total.value = 0
        loading.value = false
        refreshing.value = false
    }

    // 立即加载第一页
    if (immediate) {
        loadMore()
    }

    return {
        list,
        loading,
        refreshing,
        finished,
        isEmpty,
        currentPage,
        total,
        loadMore,
        refresh,
        reset,
    }
}
