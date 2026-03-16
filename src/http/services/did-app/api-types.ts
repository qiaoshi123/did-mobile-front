//接口类型定义文件
//使用 TS 类型定义 接口的 Params/Body

// ========== 验证码验证 ==========

/** 验证码验证 - 请求体 */
export interface DidappAuthCodeVerifyBody {
    /** 手机号或者邮箱地址 */
    phoneOrEmail: string
    /** 验证码 */
    authCode: string
}

// ========== 登录 ==========

import type { DidappUserInfo } from './model-types'

/** 登录 - 请求体 */
export interface DidappLoginBody {
    /** 手机号或者邮箱 */
    phoneOrEmail: string
    /** 密码 */
    password: string
}

/** 登录 - 响应数据 */
export interface DidappLoginResult {
    /** 登录令牌 */
    token: string
    /** 用户信息 */
    useInfo: DidappUserInfo
}

// ========== 获取app后台信息 ==========

/** 获取app后台信息 - 响应数据 */
export interface DidappGetHealthResult {
    /** app后台版本 */
    version: string
    /** 服务名 */
    app_chinese_name: string
    /** DID签发机构 */
    didIssuer: string
    /** 是否开启个人认证，true表示开启 */
    personAuthEnable: boolean
    /** 下载链接 */
    downloadLink: string
}

// ========== 云备份私钥 ==========

/** 云备份私钥 - 请求体 */
export interface DidappPrivateKeyBackupBody {
    /** 私钥(base64编码) */
    priKey: string
    /** 接受私钥碎片的电话或者邮箱 */
    phoneOrEmail: string[]
}

// ========== 私钥恢复 ==========

/** 私钥恢复 - 请求体 */
export interface DidappPrivateKeyRecoveryBody {
    /** 其中1/3份私钥(base64编码) */
    priKey: string
}

/** 私钥恢复 - 响应数据 */
export interface DidappPrivateKeyRecoveryResult {
    /** 后端恢复的私钥(base64编码) */
    privateKey: string
}

// ========== 主管理员审核（发送 EnKey） ==========

/** 主管理员审核 - 请求体 */
export interface DidappSendEnKeyBody {
    /** 审核状态，1表示审核通过，2表示拒绝 */
    status: number
    /** 子管理员公钥加密的enkey */
    enKey: string
    /** 子管理员公钥标识 */
    pubKey: string
    /** 子管理员的手机或者邮箱 */
    phoneOrEmail: string
}
