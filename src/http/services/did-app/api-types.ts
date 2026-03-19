//接口类型定义文件
//使用 TS 类型定义 接口的 Params/Body

// ========== 创建企业账号 ==========

import type { DidappAuthResult } from './model-types'

/** 创建企业账号 - 请求体 */
export interface DidappCreateUserBody {
    /** 企业名 */
    userName: string
    /** 主管理员名称 */
    adminName: string
    /** 密码 */
    password: string
    /** 邀请码 */
    invitationCode: string
    /** 主管理员电话或者邮箱 */
    phoneOrEmail: string
    /** 验证码 */
    authCode: string
}

/** 创建企业账号 - 响应数据 */
export type DidappCreateUserResult = DidappAuthResult

// ========== 验证码验证 ==========

/** 验证码验证 - 请求体 */
export interface DidappAuthCodeVerifyBody {
    /** 手机号或者邮箱地址 */
    phoneOrEmail: string
    /** 验证码 */
    authCode: string
}

// ========== 登录 ==========

/** 登录 - 请求体 */
export interface DidappLoginBody {
    /** 手机号或者邮箱 */
    phoneOrEmail: string
    /** 密码 */
    password: string
}

/** 登录 - 响应数据 */
export type DidappLoginResult = DidappAuthResult

// ========== 通过code登录 ==========

/** 通过code登录 - 请求体 */
export interface DidappCodeLoginBody {
    /** 小程序 wx.login() 获取的临时登录凭证code */
    code: string
}

/** 通过code登录 - 响应数据 */
export type DidappCodeLoginResult = DidappAuthResult

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
