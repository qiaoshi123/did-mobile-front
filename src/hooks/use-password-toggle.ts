import { ref } from 'vue'
import type { Ref } from 'vue'

/** UsePasswordToggle 返回值类型 */
export interface UsePasswordToggleReturn {
    /** 当前密码是否可见 */
    visible: Ref<boolean>
    /** 密码输入框的 type 值（'text' 明文 / 'password' 密文） */
    inputType: Ref<'text' | 'password'>
    /** 切换密码可见性 */
    toggleVisible: () => void
}

/**
 * 密码明文/密文切换 Hook
 * @description 管理密码输入框的显示/隐藏状态和切换操作，每次调用返回独立实例
 * @returns 密码可见性状态和切换方法
 * @example
 * ```ts
 * const { visible, inputType, toggleVisible } = usePasswordToggle()
 * // 绑定到 t-input：<t-input :type="inputType" />
 * // 绑定到眼睛图标：@click="toggleVisible"
 * ```
 */
export const usePasswordToggle = (): UsePasswordToggleReturn => {
    // ========== State ==========
    const visible = ref(false)
    const inputType = ref<'text' | 'password'>('password')

    // ========== Methods ==========
    const toggleVisible = () => {
        visible.value = !visible.value
        inputType.value = visible.value ? 'text' : 'password'
    }

    return {
        visible,
        inputType,
        toggleVisible,
    }
}
