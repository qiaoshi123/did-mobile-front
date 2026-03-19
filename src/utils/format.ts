import dayjs from 'dayjs'
import type { ConfigType } from 'dayjs'

/**
 * 日期格式化
 * @param date - 可被 dayjs 解析的值（Date / string / number / undefined）
 * @param template - 格式模板，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 * @example
 * formatDate(1710000000000) // '2024-03-10 04:00:00'
 * formatDate('2024-03-10', 'MM/DD') // '03/10'
 */
export const formatDate = (date?: ConfigType, template = 'YYYY-MM-DD HH:mm:ss'): string => {
    return dayjs(date).format(template)
}

/**
 * 格式化为日期（不含时间）
 * @param date - 可被 dayjs 解析的值
 * @returns 'YYYY-MM-DD' 格式字符串
 */
export const formatDateOnly = (date?: ConfigType): string => {
    return dayjs(date).format('YYYY-MM-DD')
}

/**
 * 格式化为时间（不含日期）
 * @param date - 可被 dayjs 解析的值
 * @returns 'HH:mm:ss' 格式字符串
 */
export const formatTimeOnly = (date?: ConfigType): string => {
    return dayjs(date).format('HH:mm:ss')
}

/**
 * 相对时间描述（如 "3分钟前"、"2小时前"、"昨天"）
 * @param date - 可被 dayjs 解析的值
 * @returns 人类可读的相对时间字符串
 */
export const formatRelativeTime = (date: ConfigType): string => {
    const now = dayjs()
    const target = dayjs(date)
    const diffSeconds = now.diff(target, 'second')
    const diffMinutes = now.diff(target, 'minute')
    const diffHours = now.diff(target, 'hour')
    const diffDays = now.diff(target, 'day')

    if (diffSeconds < 60) return '刚刚'
    if (diffMinutes < 60) return `${diffMinutes}分钟前`
    if (diffHours < 24) return `${diffHours}小时前`
    if (diffDays < 2) return '昨天'
    if (diffDays < 7) return `${diffDays}天前`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`

    return target.format('YYYY-MM-DD')
}

/**
 * 格式化手机号（中间四位用 * 替代）
 * @param phone - 11 位手机号
 * @returns 格式化后的手机号，如 138****1234
 */
export const formatPhone = (phone: string): string => {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化金额（保留 2 位小数，千分位分隔）
 * @param amount - 金额数值
 * @param decimals - 小数位数，默认 2
 * @returns 格式化后的金额字符串，如 '1,234.56'
 */
export const formatPrice = (amount: number, decimals = 2): string => {
    return amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 计算两个日期之间的天数差
 * @param start - 开始日期
 * @param end - 结束日期，默认当前时间
 * @returns 天数差（正数表示 end > start）
 */
export const diffDays = (start: ConfigType, end?: ConfigType): number => {
    return dayjs(end).diff(dayjs(start), 'day')
}

/**
 * 判断日期是否为今天
 * @param date - 可被 dayjs 解析的值
 * @returns 是否为今天
 */
export const isToday = (date: ConfigType): boolean => {
    return dayjs(date).isSame(dayjs(), 'day')
}

/**
 * 获取指定日期的开始时间（00:00:00）
 * @param date - 可被 dayjs 解析的值
 * @returns ISO 格式的日期字符串
 */
export const getStartOfDay = (date?: ConfigType): string => {
    return dayjs(date).startOf('day').format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 获取指定日期的结束时间（23:59:59）
 * @param date - 可被 dayjs 解析的值
 * @returns ISO 格式的日期字符串
 */
export const getEndOfDay = (date?: ConfigType): string => {
    return dayjs(date).endOf('day').format('YYYY-MM-DD HH:mm:ss')
}
