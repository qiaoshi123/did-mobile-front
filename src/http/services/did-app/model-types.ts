//使用 TS 类型定义 接口使用到的业务模型类型
// 注意：分页类型（PageParams、PageResult）已迁移到 src/http/shared-types.ts，请从那里引入

/** 用户信息 */
export interface DidappUserInfo {
    /** 用户ID */
    userId: string
    /** 企业名 */
    userName: string
    /** 邮箱或者手机号码 */
    phoneOrEmail: string
    /** 企业邀请码 */
    invitationCode: string
    /** 1.表示境外企业，其他表示境内企业 */
    type: number
    /** 管理员角色(0主管理员;1一级管理员;2二级管理员) */
    memberType: number
    /** 企业DID */
    enterpriseDid: string
    /** 企业DID标识 */
    enterprisePubKey: string
    /** 个人DID */
    personDid: string
    /** 头像图片链接 */
    headImg: string
    /** 管理员名称 */
    adminName: string
    /** VC是否失效 */
    vcInvalid: boolean
}


