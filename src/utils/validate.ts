/**
 * 通用校验工具函数
 * @desc 企业账户名、手机号、邮箱、密码、管理员名称等格式校验
 *       校验通过返回空字符串，校验失败返回对应的错误提示信息字符串
 */

/**
 * 校验企业账户名格式
 * @param value - 待校验的企业账户名
 * @returns 校验通过返回空字符串，失败返回错误提示信息
 * @example
 * ```ts
 * validateAccountName('张三企业') // => ''
 * validateAccountName('ab') // => '企业账户名需为3-10位...'
 * validateAccountName('123abc') // => '企业账户名只能以汉字或字母开头'
 * ```
 */
export const validateAccountName = (value: string): string => {
    if (!value) return '请输入企业账户名'
    if (value.includes(' ')) return '企业账户名不能包含空格'
    if (!/^[\u4e00-\u9fa5a-zA-Z]/.test(value)) return '企业账户名只能以汉字或字母开头'
    if (!/^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/.test(value)) return '企业账户名只允许汉字、字母、数字、下划线、减号'
    if (value.length < 3 || value.length > 10) return '企业账户名需为3-10位'
    return ''
}

/**
 * 校验中国大陆手机号格式
 * @param value - 待校验的手机号
 * @returns 校验通过返回空字符串，失败返回错误提示信息
 * @example
 * ```ts
 * validatePhone('13800138000') // => ''
 * validatePhone('12345') // => '请输入正确的手机号'
 * ```
 */
export const validatePhone = (value: string): string => {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '请输入正确的手机号'
    return ''
}

/**
 * 校验邮箱地址格式
 * @param value - 待校验的邮箱地址
 * @returns 校验通过返回空字符串，失败返回错误提示信息
 * @example
 * ```ts
 * validateEmail('user@example.com') // => ''
 * validateEmail('invalid-email') // => '请输入正确的邮箱地址'
 * ```
 */
export const validateEmail = (value: string): string => {
    if (!value) return '请输入邮箱地址'
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return '请输入正确的邮箱地址'
    return ''
}

/**
 * 校验密码格式
 * @param value - 待校验的密码
 * @returns 校验通过返回空字符串，失败返回错误提示信息
 * @example
 * ```ts
 * validatePassword('abc123') // => ''
 * validatePassword('abcdef') // => '密码必须同时包含数字和字母'
 * validatePassword('123456') // => '密码必须同时包含数字和字母'
 * ```
 */
export const validatePassword = (value: string): string => {
    if (!value) return '请输入密码'
    if (value.length < 6 || value.length > 16) return '密码需为6-16位'
    if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) return '密码必须同时包含数字和字母'
    return ''
}

/**
 * 校验管理员名称格式
 * @param value - 待校验的管理员名称
 * @returns 校验通过返回空字符串，失败返回错误提示信息
 * @example
 * ```ts
 * validateAdminName('张三丰') // => ''
 * validateAdminName('ab') // => '管理员名称仅允许汉字'
 * validateAdminName('张') // => '管理员名称需为3-10位'
 * ```
 */
export const validateAdminName = (value: string): string => {
    if (!value) return '请输入管理员名称'
    if (!/^[\u4e00-\u9fa5]+$/.test(value)) return '管理员名称仅允许汉字'
    if (value.length < 3 || value.length > 10) return '管理员名称需为3-10位'
    return ''
}
