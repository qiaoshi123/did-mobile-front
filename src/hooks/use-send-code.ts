import { ref, onUnmounted } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { useLoading } from './use-loading'
import { didappSendPhoneAuthCode, didappSendEmailAuthCode } from '@/http/services/did-app'

/** 接收方类型：手机号或邮箱 */
type ReceiverType = 'phone' | 'email'

/** UseSendCode 配置项 */
export interface UseSendCodeOptions {
    /** 倒计时秒数，默认 60 */
    countdown?: number
    /** 发送前的自定义校验，返回空字符串表示通过，返回错误信息字符串表示校验失败 */
    beforeSend?: () => string
}

/** UseSendCode 返回值类型 */
export interface UseSendCodeReturn {
    /** 倒计时剩余秒数 */
    remaining: Ref<number>
    /** 是否正在倒计时 */
    isCounting: Ref<boolean>
    /** 是否正在发送（请求中） */
    sending: ComputedRef<boolean>
    /**
     * 发送验证码
     * @param receiver - 接收方（手机号或邮箱）
     * @param type - 接收方类型
     */
    send: (receiver: string, type: ReceiverType) => Promise<void>
}

/**
 * 验证码发送 + 倒计时 Hook
 * @description 封装验证码发送请求和倒计时逻辑，支持手机号和邮箱两种方式
 * @param options - 配置项
 * @returns 倒计时状态和发送方法
 * @example
 * ```ts
 * const { remaining, isCounting, sending, send } = useSendCode({
 *     countdown: 60,
 *     beforeSend: () => validatePhone(phoneValue.value),
 * })
 *
 * // 发送手机验证码
 * await send('13800138000', 'phone')
 *
 * // 发送邮箱验证码
 * await send('user@example.com', 'email')
 * ```
 */
export const useSendCode = (options: UseSendCodeOptions = {}): UseSendCodeReturn => {
    const { countdown = 60, beforeSend } = options

    // ========== State ==========
    const remaining = ref(0)
    const isCounting = ref(false)
    const { loading: sending, withLoading } = useLoading()

    let timer: ReturnType<typeof setInterval> | null = null

    // ========== Methods ==========

    /** 启动倒计时 */
    const startCountdown = () => {
        remaining.value = countdown
        isCounting.value = true
        timer = setInterval(() => {
            remaining.value--
            if (remaining.value <= 0) {
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
        remaining.value = 0
        isCounting.value = false
    }

    /**
     * 发送验证码
     * @param receiver - 接收方（手机号或邮箱）
     * @param type - 接收方类型
     */
    const send = async (receiver: string, type: ReceiverType) => {
        // 倒计时中不允许重复发送
        if (isCounting.value) return

        // 发送前自定义校验：返回空字符串表示通过，非空为错误信息
        if (beforeSend) {
            const errorMsg = beforeSend()
            if (errorMsg) {
                uni.showToast({ title: errorMsg, icon: 'none' })
                return
            }
        }

        await withLoading(async () => {
            if (type === 'phone') {
                await didappSendPhoneAuthCode({ phone: receiver })
            } else {
                await didappSendEmailAuthCode({ email: receiver })
            }
            startCountdown()
        })
    }

    // ========== 清理 ==========
    onUnmounted(() => {
        stopCountdown()
    })

    return {
        remaining,
        isCounting,
        sending,
        send,
    }
}
