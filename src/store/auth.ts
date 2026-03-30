import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DidappUserInfo, DidappAuthResult } from '@/http/services/did-app/model-types'

/** 认证状态管理 Store */
export const useAuthStore = defineStore('auth', () => {
    // ========== State ==========

    /** 登录令牌 */
    const token = ref('')

    /** 用户信息 */
    const userInfo = ref<DidappUserInfo | null>(null)

    // ========== Getters ==========

    /** 是否已登录 */
    const isLoggedIn = computed(() => !!token.value)

    // ========== Actions ==========

    /**
     * 设置认证信息（接收注册/登录 API 返回的完整结果并存入）
     * @param result - 注册/登录 API 返回的鉴权结果
     */
    const setAuth = (result: DidappAuthResult) => {
        token.value = result.token
        userInfo.value = result.userInfo
    }
    /** 清除认证信息（登出） */
    const clearAuth = () => {
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
        setAuth,
        clearAuth,
    }
}, {
    persist: true,
})
