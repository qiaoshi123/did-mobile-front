/**
 * 表单校验工具函数
 * @desc 提供企业账户名、手机号、邮箱、密码、管理员名称等通用校验函数
 *       校验通过返回 undefined，不通过返回对应的错误信息字符串
 */

/**
 * 校验企业账户名
 * 规则：3-10 位，不能含空格，汉字/字母/数字/下划线/减号组合，只能以汉字或字母开头
 * @param value - 待校验的企业账户名
 * @returns 校验通过返回 undefined，不通过返回错误信息
 * @example
 * ```ts
 * validateUserName('张三企业') // => undefined
 * validateUserName('12abc') // => '3-10位，汉字/字母开头，支持汉字、字母、数字、下划线、减号'
 * ```
 */
export const validateUserName = (value: string): string | undefined => {
    const reg = /^[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z0-9_-]{2,9}$/
    if (!reg.test(value) || value.includes(' ')) {
        return '3-10位，汉字/字母开头，支持汉字、字母、数字、下划线、减号'
    }
    return undefined
}

/**
 * 校验手机号格式
 * 规则：中国大陆手机号，1 开头，第二位 3-9，共 11 位数字
 * @param value - 待校验的手机号
 * @returns 校验通过返回 undefined，不通过返回错误信息
 * @example
 * ```ts
 * validatePhone('13800138000') // => undefined
 * validatePhone('12345678901') // => '请输入正确的手机号'
 * ```
 */
export const validatePhone = (value: string): string | undefined => {
    const reg = /^1[3-9]\d{9}$/
    if (!reg.test(value)) {
        return '请输入正确的手机号'
    }
    return undefined
}

/**
 * 校验邮箱格式
 * @param value - 待校验的邮箱
 * @returns 校验通过返回 undefined，不通过返回错误信息
 * @example
 * ```ts
 * validateEmail('test@example.com') // => undefined
 * validateEmail('invalid-email') // => '请输入正确的邮箱地址'
 * ```
 */
export const validateEmail = (value: string): string | undefined => {
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!reg.test(value)) {
        return '请输入正确的邮箱地址'
    }
    return undefined
}

/**
 * 校验密码格式
 * 规则：6-16 位，必须同时包含数字和字母
 * @param value - 待校验的密码
 * @returns 校验通过返回 undefined，不通过返回错误信息
 * @example
 * ```ts
 * validatePassword('abc123') // => undefined
 * validatePassword('123456') // => '密码需6-16位，包含数字和字母'
 * ```
 */
export const validatePassword = (value: string): string | undefined => {
    if (value.length < 6 || value.length > 16) {
        return '密码需6-16位，包含数字和字母'
    }
    const hasLetter = /[a-zA-Z]/.test(value)
    const hasNumber = /\d/.test(value)
    if (!hasLetter || !hasNumber) {
        return '密码需6-16位，包含数字和字母'
    }
    return undefined
}

/**
 * 校验管理员名称
 * 规则：非空，3-10 位，纯汉字
 * @param value - 待校验的管理员名称
 * @returns 校验通过返回 undefined，不通过返回错误信息
 * @example
 * ```ts
 * validateAdminName('张三丰') // => undefined
 * validateAdminName('abc') // => '管理员名称需3-10位汉字'
 * ```
 */
export const validateAdminName = (value: string): string | undefined => {
    const reg = /^[\u4e00-\u9fa5]{3,10}$/
    if (!reg.test(value)) {
        return '管理员名称需3-10位汉字'
    }
    return undefined
}

/**
 * 判断输入值是手机号还是邮箱
 * @param value - 待判断的联系方式
 * @returns 'phone' | 'email' | 'unknown'
 * @example
 * ```ts
 * getContactType('13800138000') // => 'phone'
 * getContactType('test@example.com') // => 'email'
 * getContactType('invalid') // => 'unknown'
 * ```
 */
export const getContactType = (value: string): 'phone' | 'email' | 'unknown' => {
    if (!validatePhone(value)) return 'phone'
    if (!validateEmail(value)) return 'email'
    return 'unknown'
}
