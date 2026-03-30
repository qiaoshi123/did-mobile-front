<template>
    <view class="page-register">
        <!-- ========== 表单区域 ========== -->
        <view class="form-section">
            <!-- 企业账户名 -->
            <t-input
                :value="formData.userName"
                label="企业账户名"
                placeholder="请输入企业账户名"
                @change="onUserNameChange"
            />

            <!-- 手机号/邮箱 -->
            <t-input
                :value="formData.phoneOrEmail"
                label="手机号/邮箱"
                placeholder="请输入手机号或邮箱"
                @change="onPhoneOrEmailChange"
            >
                <template #suffix>
                    <view class="code-suffix">
                        <view class="code-suffix__line" />
                        <view
                            class="code-suffix__btn"
                            :class="{ 'code-suffix__btn--disabled': isCounting || sending }"
                            @click="onSendCode"
                        >
                            {{ isCounting ? `${remaining}s` : '发送验证码' }}
                        </view>
                    </view>
                </template>
            </t-input>

            <!-- 密码 -->
            <t-input
                :value="formData.password"
                label="密码"
                :type="passwordToggle.inputType.value"
                placeholder="请输入密码"
                :suffix-icon="{ name: passwordToggle.visible.value ? 'browse' : 'browse-off', ariaLabel: '切换密码可见' }"
                @change="onPasswordChange"
                @click="onPasswordIconClick"
            />

            <!-- 确认密码 -->
            <t-input
                :value="formData.confirmPassword"
                label="确认密码"
                :type="confirmPasswordToggle.inputType.value"
                placeholder="请再次输入密码"
                :suffix-icon="{ name: confirmPasswordToggle.visible.value ? 'browse' : 'browse-off', ariaLabel: '切换密码可见' }"
                @change="onConfirmPasswordChange"
                @click="onConfirmPasswordIconClick"
            />

            <!-- 管理员名称 -->
            <t-input
                :value="formData.adminName"
                label="管理员名称"
                placeholder="请输入管理员名称"
                @change="onAdminNameChange"
            />

            <!-- 验证码 -->
            <t-input
                :value="formData.authCode"
                label="验证码"
                placeholder="请输入验证码"
                @change="onAuthCodeChange"
            />
        </view>

        <!-- ========== 协议勾选区域 ========== -->
        <view class="agreement-section">
            <t-checkbox
                :checked="agreed"
                borderless
                label="我已阅读并同意相关协议"
                @change="onAgreementChange"
            />
        </view>

        <!-- ========== 下一步按钮 ========== -->
        <view class="action-section">
            <t-button
                theme="primary"
                size="large"
                block
                :loading="submitLoading"
                @click="onSubmit"
            >
                下一步
            </t-button>
        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive, ref, computed, toRaw } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { usePasswordToggle, useFormValidation, useLoading, useSendCode } from '@/hooks'
import { useAuthStore } from '@/store'
import { didappCreateUser } from '@/http'
import { router, validateAccountName, validatePhone, validateEmail, validatePassword, validateAdminName } from '@/utils'
import { PAGE_HOME } from '@/constants/routes'

// ========== 状态 ==========

const formData = reactive({
    userName: '',
    phoneOrEmail: '',
    password: '',
    confirmPassword: '',
    adminName: '',
    authCode: '',
})

/** 邀请码（从路由 query 参数获取） */
const invitationCode = ref('')

/** 协议是否勾选 */
const agreed = ref(false)

// ========== Store ==========

const authStore = useAuthStore()

// ========== Hooks ==========

/** 密码切换 */
const passwordToggle = usePasswordToggle()

/** 确认密码切换 */
const confirmPasswordToggle = usePasswordToggle()

/** 提交加载态 */
const { loading: submitLoading, withLoading } = useLoading()

/** 手机号/邮箱自动识别类型 */
const receiverType = computed<'phone' | 'email'>(() => {
    return validatePhone(formData.phoneOrEmail) === '' ? 'phone' : 'email'
})

/** 验证码发送 + 倒计时 */
const { remaining, isCounting, sending, send } = useSendCode({
    countdown: 60,
    beforeSend: () => {
        const value = formData.phoneOrEmail
        if (!value) return '请输入手机号或邮箱'
        const phoneError = validatePhone(value)
        const emailError = validateEmail(value)
        if (phoneError && emailError) return '手机号或邮箱格式不正确'
        return ''
    },
})

/** 表单校验 */
const { errors, validate } = useFormValidation({
    rules: {
        userName: [
            { required: true, message: '请输入企业账户名' },
            {
                validator: (value: unknown) => {
                    const msg = validateAccountName(value as string)
                    return msg || true
                },
            },
        ],
        phoneOrEmail: [
            { required: true, message: '请输入手机号或邮箱' },
            {
                validator: (value: unknown) => {
                    const v = value as string
                    const phoneError = validatePhone(v)
                    const emailError = validateEmail(v)
                    if (phoneError && emailError) return '手机号或邮箱格式不正确'
                    return true
                },
            },
        ],
        password: [
            { required: true, message: '请输入密码' },
            {
                validator: (value: unknown) => {
                    const msg = validatePassword(value as string)
                    return msg || true
                },
            },
        ],
        confirmPassword: [
            { required: true, message: '请再次输入密码' },
            {
                validator: (value: unknown) => {
                    if ((value as string) !== formData.password) return '两次输入的密码不一致'
                    return true
                },
            },
        ],
        adminName: [
            { required: true, message: '请输入管理员名称' },
            {
                validator: (value: unknown) => {
                    const msg = validateAdminName(value as string)
                    return msg || true
                },
            },
        ],
        authCode: [
            { required: true, message: '请输入验证码' },
        ],
    },
})

// ========== 生命周期 ==========

onLoad((options) => {
    if (options?.invitationCode) {
        invitationCode.value = options.invitationCode as string
    }
})

// ========== 事件处理 ==========

/** 企业账户名输入 */
const onUserNameChange = (ctx: { value: string }) => {
    formData.userName = ctx.value
}

/** 手机号/邮箱输入 */
const onPhoneOrEmailChange = (ctx: { value: string }) => {
    formData.phoneOrEmail = ctx.value
}

/** 密码输入 */
const onPasswordChange = (ctx: { value: string }) => {
    formData.password = ctx.value
}

/** 确认密码输入 */
const onConfirmPasswordChange = (ctx: { value: string }) => {
    formData.confirmPassword = ctx.value
}

/** 管理员名称输入 */
const onAdminNameChange = (ctx: { value: string }) => {
    formData.adminName = ctx.value
}

/** 验证码输入 */
const onAuthCodeChange = (ctx: { value: string }) => {
    formData.authCode = ctx.value
}

/** 密码可见性切换 */
const onPasswordIconClick = (ctx: { trigger: string }) => {
    if (ctx.trigger === 'suffix-icon') {
        passwordToggle.toggleVisible()
    }
}

/** 确认密码可见性切换 */
const onConfirmPasswordIconClick = (ctx: { trigger: string }) => {
    if (ctx.trigger === 'suffix-icon') {
        confirmPasswordToggle.toggleVisible()
    }
}

/** 发送验证码 */
const onSendCode = () => {
    send(formData.phoneOrEmail, receiverType.value)
}

/** 协议勾选变化 */
const onAgreementChange = (ctx: { checked: boolean }) => {
    agreed.value = ctx.checked
}

/** 提交注册 */
const onSubmit = async () => {
    // 1. 检查协议勾选
    if (!agreed.value) {
        uni.showToast({ title: '请先阅读并同意相关协议', icon: 'none' })
        return
    }

    // 2. 表单校验
    const rawData = toRaw(formData)
    const valid = await validate(rawData as Record<string, unknown>)
    if (!valid) {
        // Toast 提示第一条错误信息
        const firstError = Object.values(errors.value).find((msg) => msg !== '')
        if (firstError) {
            uni.showToast({ title: firstError, icon: 'none' })
        }
        return
    }

    // 3. 对 password 进行 base64 编码后调用注册 API
    await withLoading(async () => {
        const bytes = new TextEncoder().encode(formData.password)
        const encodedPassword = uni.arrayBufferToBase64(
            bytes.buffer as ArrayBuffer,
        )

        const res = await didappCreateUser({
            userName: formData.userName,
            adminName: formData.adminName,
            password: encodedPassword,
            invitationCode: invitationCode.value,
            phoneOrEmail: formData.phoneOrEmail,
            authCode: formData.authCode,
        })

        if (res.ok) {
            // 注册成功：存储认证信息 → 跳转首页
            authStore.setAuth(res.data)
            router.replace(PAGE_HOME)
        } else {
            uni.showToast({ title: res.msg, icon: 'none' })
        }
    })
}
</script>

<style lang="scss" scoped>
.page-register {
    min-height: 100vh;
    background: var(--td-bg-color-page);

    .form-section {
        padding: 32rpx 0;
    }

    .code-suffix {
        display: flex;
        align-items: center;

        &__line {
            width: 1px;
            height: 48rpx;
            background-color: var(--td-component-stroke);
            margin-right: 32rpx;
        }

        &__btn {
            color: var(--td-brand-color);
            font-size: 28rpx;
            white-space: nowrap;

            &--disabled {
                color: var(--td-text-color-disabled);
            }
        }
    }

    .agreement-section {
        padding: 0 32rpx;
    }

    .action-section {
        padding: 48rpx 32rpx;
    }
}
</style>
