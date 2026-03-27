import { ref } from 'vue'
import type { Ref } from 'vue'

/** UsePasswordToggle 返回值类型 */
export interface UsePasswordToggleReturn {
    /** 密码是否可见 */
    passwordVisible: Ref<boolean>
    /** 切换密码可见性 */
    togglePasswordVisible: () => void
}

/**
 * 密码明文/密文切换 Hook
 * @returns 密码可见性状态和切换方法
 * @example
 * ```ts
 * const { passwordVisible, togglePasswordVisible } = usePasswordToggle()
 * ```
 */
export const usePasswordToggle = (): UsePasswordToggleReturn => {
    // ========== State ==========

    /** 密码是否可见 */
    const passwordVisible = ref(false)

    // ========== Methods ==========

    /** 切换密码可见性 */
    const togglePasswordVisible = () => {
        passwordVisible.value = !passwordVisible.value
    }

    return {
        passwordVisible,
        togglePasswordVisible,
    }
}
