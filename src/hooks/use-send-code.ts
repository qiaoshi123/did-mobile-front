import { ref, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { didappSendPhoneAuthCode, didappSendEmailAuthCode } from '@/http/services/did-app'
import { getContactType } from '@/utils'

/** UseSendCode 配置项 */
export interface UseSendCodeOptions {
    /** 倒计时总秒数，默认 60 */
    duration?: number
}

/** UseSendCode 返回值类型 */
export interface UseSendCodeReturn {
    /** 当前倒计时剩余秒数 */
    countdown: Ref<number>
    /** 是否在倒计时中 */
    isCounting: Ref<boolean>
    /** 是否正在发送中（加载态） */
    sending: Ref<boolean>
    /** 发送验证码 */
    sendCode: (contact: string) => Promise<boolean>
}

/**
 * 发送验证码 Hook（含倒计时）
 * @description 整合验证码发送逻辑和倒计时功能，自动根据联系方式类型调用对应接口
 * @param options - 配置项
 * @returns 倒计时状态、发送状态和发送方法
 * @example
 * ```ts
 * const { countdown, isCounting, sending, sendCode } = useSendCode()
 * await sendCode('13800138000')
 * ```
 */
export const useSendCode = (options: UseSendCodeOptions = {}): UseSendCodeReturn => {
    const { duration = 60 } = options

    // ========== State ==========

    /** 当前倒计时剩余秒数 */
    const countdown = ref(0)

    /** 是否在倒计时中 */
    const isCounting = ref(false)

    /** 是否正在发送中 */
    const sending = ref(false)

    /** 定时器 ID */
    let timer: ReturnType<typeof setInterval> | null = null

    // ========== Methods ==========

    /** 启动倒计时 */
    const startCountdown = () => {
        countdown.value = duration
        isCounting.value = true
        timer = setInterval(() => {
            countdown.value--
            if (countdown.value <= 0) {
                stopCountdown()
            }
        }, 1000)
    }

    /** 停止倒计时 */
    const stopCountdown = () => {
        if (timer) {
            clearInterval(timer)
            timer = null
        }
        countdown.value = 0
        isCounting.value = false
    }

    /**
     * 发送验证码
     * @param contact - 手机号或邮箱
     * @returns 是否发送成功
     */
    const sendCode = async (contact: string): Promise<boolean> => {
        if (isCounting.value || sending.value) return false

        const contactType = getContactType(contact)

        if (contactType === 'unknown') {
            uni.showToast({ title: '请输入正确的手机号或邮箱', icon: 'none' })
            return false
        }

        sending.value = true
        try {
            if (contactType === 'phone') {
                await didappSendPhoneAuthCode({ phone: contact })
            } else {
                await didappSendEmailAuthCode({ email: contact })
            }
            startCountdown()
            uni.showToast({ title: '验证码已发送', icon: 'success' })
            return true
        } catch {
            uni.showToast({ title: '验证码发送失败', icon: 'none' })
            return false
        } finally {
            sending.value = false
        }
    }

    // ========== 清理 ==========

    onUnmounted(() => {
        stopCountdown()
    })

    return {
        countdown,
        isCounting,
        sending,
        sendCode,
    }
}
