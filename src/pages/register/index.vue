<template>
    <view></view>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useFormValidation, useLoading, usePasswordToggle, useSendCode } from '@/hooks'
import { useAuthStore } from '@/store'
import { didappCreateUser } from '@/http/services/did-app'
import {
    validateUserName,
    validatePhone,
    validateEmail,
    validatePassword,
    validateAdminName,
    router,
} from '@/utils'
import { PAGE_HOME } from '@/constants/routes'

// ========== 状态 ==========

/** 表单数据 */
const formData = reactive({
    userName: '',
    phoneOrEmail: '',
    password: '',
    confirmPassword: '',
    adminName: '',
    authCode: '',
})

/** 协议勾选状态 */
const isAgreed = ref(false)

/** 邀请码（从路由 query 中获取） */
const invitationCode = ref('')

// ========== Hooks ==========

const { loading, withLoading } = useLoading()

/** 密码可见性切换 */
const {
    passwordVisible: pwdVisible,
    togglePasswordVisible: togglePwdVisible,
} = usePasswordToggle()

/** 确认密码可见性切换 */
const {
    passwordVisible: confirmPwdVisible,
    togglePasswordVisible: toggleConfirmPwdVisible,
} = usePasswordToggle()

/** 发送验证码 + 倒计时 */
const { countdown, isCounting, sending, sendCode } = useSendCode()

/** 表单校验 */
const { errors, validate } = useFormValidation({
    rules: {
        userName: [
            { required: true, message: '请输入企业账户名' },
            {
                validator: (value: unknown) => validateUserName(value as string) ?? true,
            },
        ],
        phoneOrEmail: [
            { required: true, message: '请输入手机号/邮箱' },
            {
                validator: (value: unknown) => {
                    const v = value as string
                    if (!validatePhone(v) || !validateEmail(v)) return true
                    return '请输入正确的手机号或邮箱'
                },
            },
        ],
        password: [
            { required: true, message: '请输入密码' },
            {
                validator: (value: unknown) => validatePassword(value as string) ?? true,
            },
        ],
        confirmPassword: [
            { required: true, message: '请输入确认密码' },
            {
                validator: (value: unknown) => {
                    const result = validatePassword(value as string)
                    if (result) return result
                    if ((value as string) !== formData.password) {
                        return '两次密码输入不一致'
                    }
                    return true
                },
            },
        ],
        adminName: [
            { required: true, message: '请输入管理员名称' },
            {
                validator: (value: unknown) => validateAdminName(value as string) ?? true,
            },
        ],
        authCode: [
            { required: true, message: '请输入验证码' },
        ],
    },
})

// ========== 生命周期 ==========

onLoad((query) => {
    if (query?.invitationCode) {
        invitationCode.value = query.invitationCode
    }
})

// ========== 事件处理 ==========

/** 发送验证码 */
const onSendCode = async () => {
    await sendCode(formData.phoneOrEmail)
}

/** 点击下一步按钮 */
const onSubmit = async () => {
    // 1. 检查协议勾选
    if (!isAgreed.value) {
        uni.showToast({ title: '请先同意协议', icon: 'none' })
        return
    }

    // 2. 表单校验
    const valid = await validate(formData as unknown as Record<string, unknown>)
    if (!valid) {
        // 找到第一条错误提示
        const firstError = Object.values(errors.value).find((msg) => msg !== '')
        if (firstError) {
            uni.showToast({ title: firstError, icon: 'none' })
        }
        return
    }

    // 3. 调用注册接口
    const authStore = useAuthStore()

    await withLoading(async () => {
        const res = await didappCreateUser(toRaw({
            userName: formData.userName,
            adminName: formData.adminName,
            password: formData.password,
            invitationCode: invitationCode.value,
            phoneOrEmail: formData.phoneOrEmail,
            authCode: formData.authCode,
        }))

        if (res.ok) {
            // 4. 存储 token 和用户信息
            authStore.setToken(res.data.token)
            authStore.setUserInfo(res.data.useInfo)

            // 5. 跳转首页
            router.replace(PAGE_HOME)
        } else {
            uni.showToast({ title: res.msg, icon: 'none' })
        }
    })
}
</script>
