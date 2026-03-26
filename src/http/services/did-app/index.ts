/**
 * did-app 服务 API 函数聚合
 * @desc 所有 did-app 服务的 API 函数在此编写和导出
 *       函数命名前缀：didapp（如 didappLogin、didappGetUserInfo）
 *       类型命名前缀：Didapp（如 DidappLoginBody、DidappLoginResult）
 */
import { didappClient } from './client'
import type {
    DidappCreateUserBody,
    DidappCreateUserResult,
    DidappSendPhoneAuthCodeBody,
    DidappSendEmailAuthCodeBody,
    DidappAuthCodeVerifyBody,
    DidappLoginBody,
    DidappLoginResult,
    DidappCodeLoginBody,
    DidappCodeLoginResult,
    DidappGetHealthResult,
    DidappPrivateKeyBackupBody,
    DidappPrivateKeyRecoveryBody,
    DidappPrivateKeyRecoveryResult,
    DidappSendEnKeyBody,
} from './api-types'
import type { DidappUserInfo } from './model-types'

// ========== 账号模块 ==========

/** 创建企业账号 */
export const didappCreateUser = (data: DidappCreateUserBody) => {
    return didappClient.post<DidappCreateUserResult>('/login/createUser', { data })
}

// ========== 验证码模块 ==========

/** 获取手机验证码 */
export const didappSendPhoneAuthCode = (data: DidappSendPhoneAuthCodeBody) => {
    return didappClient.post<null>('/login/authCode', { data })
}

/** 获取邮箱验证码 */
export const didappSendEmailAuthCode = (data: DidappSendEmailAuthCodeBody) => {
    return didappClient.post<null>('/login/emailAuthCode', { data })
}

// ========== 登录模块 ==========

/** 验证码验证 */
export const didappAuthCodeVerify = (data: DidappAuthCodeVerifyBody) => {
    return didappClient.post<null>('/login/authCodeVerify', { data })
}

/** 登录 */
export const didappLogin = (data: DidappLoginBody) => {
    return didappClient.post<DidappLoginResult>('/login/login', { data })
}

/** 通过code登录（小程序 wx.login 凭证） */
export const didappCodeLogin = (data: DidappCodeLoginBody) => {
    return didappClient.post<DidappCodeLoginResult>('/login/codeLogin', { data })
}

// ========== 用户模块 ==========

/** 获取用户信息 */
export const didappGetUserInfo = () => {
    return didappClient.post<DidappUserInfo>('/auth/getUserInfo')
}

// ========== 健康检查模块 ==========

/** 获取app后台信息 */
export const didappGetHealth = () => {
    return didappClient.get<DidappGetHealthResult>('/health')
}

// ========== 私钥管理模块 ==========

/** 云备份私钥 */
export const didappPrivateKeyBackup = (data: DidappPrivateKeyBackupBody) => {
    return didappClient.post<null>('/auth/privateKeyBackup', { data })
}

/** 私钥恢复 */
export const didappPrivateKeyRecovery = (data: DidappPrivateKeyRecoveryBody) => {
    return didappClient.post<DidappPrivateKeyRecoveryResult>('/auth/privateKeyRecovery', { data })
}

// ========== 管理员审核模块 ==========

/** 主管理员审核（发送 EnKey） */
export const didappSendEnKey = (data: DidappSendEnKeyBody) => {
    return didappClient.post<null>('/auth/sendEnKey', { data })
}
