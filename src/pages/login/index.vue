<template>
    <view class="page-login">
        <!-- 区域 1：品牌装饰区 -->
        <view class="brand-section">
            <image
                class="brand-section__image"
                src="https://dummyimage.com/750x540"
                mode="widthFix"
            />
            <t-icon
                class="brand-section__shield"
                name="secured"
                size="80rpx"
                color="var(--td-brand-color)"
            />
        </view>

        <!-- 区域 2：表单输入区 -->
        <view class="form-section">
            <view class="form-section__input-row">
                <t-icon
                    name="user"
                    size="48rpx"
                    color="var(--td-brand-color)"
                />
                <t-input
                    class="form-section__input"
                    :value="formData.phoneOrEmail"
                    placeholder="请输入企业账号名"
                    borderless
                    @change="onPhoneOrEmailChange"
                />
            </view>
            <view class="form-section__divider" />

            <view class="form-section__input-row">
                <t-icon
                    name="lock-on"
                    size="48rpx"
                    color="var(--td-brand-color)"
                />
                <t-input
                    class="form-section__input"
                    :value="formData.password"
                    :type="passwordType"
                    placeholder="请输入密码"
                    borderless
                    @change="onPasswordChange"
                />
                <t-icon
                    :name="passwordVisible ? 'browse' : 'browse-off'"
                    size="40rpx"
                    color="var(--td-text-color-placeholder)"
                    @click="onTogglePassword"
                />
            </view>
            <view class="form-section__divider" />
        </view>

        <!-- 区域 3：辅助链接区 -->
        <view class="links-section">
            <text
                class="links-section__create"
                @tap="onCreateAccount"
            >
                创建新的企业账号
            </text>
            <text
                class="links-section__forgot"
                @tap="onForgotPassword"
            >
                忘记密码？
            </text>
        </view>

        <!-- 区域 4：登录按钮区 -->
        <view class="button-section">
            <t-button
                theme="primary"
                size="large"
                block
                :loading="loading"
                @tap="onLoginTap"
            >
                登 录
            </t-button>
        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { didappLogin } from '@/http/services/did-app'
import { useFormValidation, useLoading } from '@/hooks'
import { setStorageSync } from '@/utils'

// ========== 类型 ==========

// ========== 状态 ==========

/** 表单数据 */
const formData = reactive({
    phoneOrEmail: '',
    password: '',
})

/** 密码是否可见 */
const passwordVisible = ref(false)

/** 密码输入框 type */
const passwordType = computed(() => passwordVisible.value ? 'text' : 'password')

// ========== Hooks ==========

const { validate, errors } = useFormValidation({
    rules: {
        phoneOrEmail: [
            { required: true, message: '请输入企业账号名' },
        ],
        password: [
            { required: true, message: '请输入密码' },
            { minLength: 6, message: '密码至少 6 位' },
        ],
    },
})

const { loading, withLoading } = useLoading()

// ========== 事件处理 ==========

/** 企业账号输入变化 */
const onPhoneOrEmailChange = (context: { value: string }) => {
    formData.phoneOrEmail = context.value
}

/** 密码输入变化 */
const onPasswordChange = (context: { value: string }) => {
    formData.password = context.value
}

/** 密码显隐切换 */
const onTogglePassword = () => {
    passwordVisible.value = !passwordVisible.value
}

/** 登录按钮点击 */
const onLoginTap = async () => {
    const valid = await validate(formData)
    if (!valid) {
        // 取第一条错误信息 toast 提示
        const firstError = Object.values(errors.value).find((msg) => msg !== '')
        if (firstError) {
            uni.showToast({ title: firstError, icon: 'none' })
        }
        return
    }


    await withLoading(async () => {
        const res = await didappLogin(formData)
        if (res.ok) {
            setStorageSync('token', res.data.token)
            // TODO: 确认登录成功后的跳转目标（D2 待定）
            // router.relaunch(PAGE_HOME)
        } else {
            uni.showToast({ title: res.msg, icon: 'none' })
        }
    })
}

/** 创建新的企业账号 */
const onCreateAccount = () => {
    // 待定（D6），暂不跳转
    uni.showToast({ title: '功能开发中', icon: 'none' })
}

/** 忘记密码 */
const onForgotPassword = () => {
    // 待定（D7），暂不跳转
    uni.showToast({ title: '功能开发中', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.page-login {
    min-height: 100vh;
    background-color: var(--td-bg-color-container);

    // 区域 1：品牌装饰区
    .brand-section {
        position: relative;
        width: 750rpx;
        height: 540rpx;

        &__image {
            width: 750rpx;
            height: 540rpx;
        }

        &__shield {
            position: absolute;
            top: 40rpx;
            right: 40rpx;
        }
    }

    // 区域 2：表单输入区
    .form-section {
        padding: 40rpx 48rpx 0;

        &__input-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 100rpx;
            gap: 24rpx;
        }

        &__input {
            flex: 1;
            --td-input-vertical-padding: 0;
            --td-input-bg-color: transparent;
            --td-input-border-color: transparent;
        }

        &__divider {
            height: 1px;
            background-color: var(--td-border-level-1-color);
            margin-left: 72rpx;
        }
    }

    // 区域 3：辅助链接区
    .links-section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 24rpx 48rpx 0;

        &__create {
            font-size: 26rpx;
            font-weight: 400;
            color: var(--td-brand-color);
        }

        &__forgot {
            font-size: 26rpx;
            font-weight: 400;
            color: var(--td-text-color-secondary);
        }
    }

    // 区域 4：登录按钮区
    .button-section {
        padding: 48rpx 48rpx 0;

        :deep(.t-button) {
            height: 96rpx;
            border-radius: 16rpx;
            font-size: 32rpx;
            font-weight: 500;
        }
    }
}
</style>
