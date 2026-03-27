import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DidappUserInfo } from '@/http/services/did-app/model-types'

/** 认证 Store */
export const useAuthStore = defineStore('auth', () => {
    // ========== State ==========

    /** 登录令牌 */
    const token = ref<string>('')

    /** 用户信息 */
    const userInfo = ref<DidappUserInfo | null>(null)

    // ========== Getters ==========

    /** 是否已登录 */
    const isLoggedIn = computed(() => !!token.value)

    // ========== Actions ==========

    /** 设置 token */
    const setToken = (value: string) => {
        token.value = value
    }

    /** 清除 token */
    const clearToken = () => {
        token.value = ''
    }

    /** 设置用户信息 */
    const setUserInfo = (info: DidappUserInfo) => {
        userInfo.value = info
    }

    /** 清除用户信息 */
    const clearUserInfo = () => {
        userInfo.value = null
    }

    /** 重置所有认证状态 */
    const reset = () => {
        token.value = ''
        userInfo.value = null
    }

    return {
        // State
        token,
        userInfo,
        // Getters
        isLoggedIn,
        // Actions
        setToken,
        clearToken,
        setUserInfo,
        clearUserInfo,
        reset,
    }
}, {
    persist: true,
})
