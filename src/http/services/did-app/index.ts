import { didappClient } from "./client";
import type {
    DidappAuthCodeVerifyBody,
    DidappLoginBody,
    DidappLoginResult,
    DidappGetHealthResult,
    DidappPrivateKeyBackupBody,
    DidappPrivateKeyRecoveryBody,
    DidappPrivateKeyRecoveryResult,
    DidappSendEnKeyBody,
} from './api-types'
import type { DidappUserInfo } from './model-types'

// ========== 登录模块 ==========

/** 验证码验证 */
export const didappAuthCodeVerify = (data: DidappAuthCodeVerifyBody) => {
    return didappClient.post<null>('/login/authCodeVerify', { data })
}

/** 登录 */
export const didappLogin = (data: DidappLoginBody) => {
    return didappClient.post<DidappLoginResult>('/login/login', { data })
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
