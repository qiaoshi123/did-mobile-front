/**
 * useFormValidation — 通用表单校验逻辑
 * @desc 封装表单校验的常见模式：规则配置、字段级校验、整体提交校验
 *       支持自定义校验规则和异步校验
 *
 * @example
 * ```ts
 * import { useFormValidation } from '@/hooks'
 *
 * const { errors, validate, validateField, resetValidation, isValid } = useFormValidation({
 *     rules: {
 *         phone: [
 *             { required: true, message: '请输入手机号' },
 *             { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
 *         ],
 *         name: [
 *             { required: true, message: '请输入姓名' },
 *             { minLength: 2, message: '姓名至少 2 个字符' },
 *         ],
 *     },
 * })
 *
 * // 整体校验
 * const valid = validate({ phone: '13800138000', name: '张三' })
 *
 * // 单字段校验
 * validateField('phone', '138')
 * ```
 */

import { ref, computed, type Ref, type ComputedRef } from 'vue'

/** 单条校验规则 */
export interface ValidationRule {
    /** 是否必填 */
    required?: boolean
    /** 正则表达式校验 */
    pattern?: RegExp
    /** 最小长度 */
    minLength?: number
    /** 最大长度 */
    maxLength?: number
    /** 最小值（数字） */
    min?: number
    /** 最大值（数字） */
    max?: number
    /** 校验失败时的提示信息 */
    message: string
    /** 自定义校验函数，返回 true 表示通过 */
    validator?: (value: unknown) => boolean | Promise<boolean>
}

/** 字段校验规则映射 */
export type ValidationRules = Record<string, ValidationRule[]>

/** useFormValidation 配置项 */
export interface UseFormValidationOptions {
    /** 字段校验规则 */
    rules: ValidationRules
}

/** useFormValidation 返回值 */
export interface UseFormValidationReturn {
    /** 各字段的错误信息（无错误时为空字符串） */
    errors: Ref<Record<string, string>>
    /** 整体表单是否校验通过 */
    isValid: ComputedRef<boolean>
    /**
     * 校验全部字段
     * @param formData - 表单数据对象
     * @returns 是否校验通过
     */
    validate: (formData: Record<string, unknown>) => Promise<boolean>
    /**
     * 校验单个字段
     * @param field - 字段名
     * @param value - 字段值
     * @returns 是否校验通过
     */
    validateField: (field: string, value: unknown) => Promise<boolean>
    /** 重置所有校验状态 */
    resetValidation: () => void
}

/**
 * 校验单个值是否符合规则
 * @param value - 待校验值
 * @param rule - 校验规则
 * @returns 是否通过
 */
const checkRule = async (value: unknown, rule: ValidationRule): Promise<boolean> => {
    // 必填校验
    if (rule.required) {
        if (value === undefined || value === null || value === '') {
            return false
        }
    }

    // 非必填且值为空时，跳过后续校验
    if (!rule.required && (value === undefined || value === null || value === '')) {
        return true
    }

    // 正则校验
    if (rule.pattern && typeof value === 'string') {
        if (!rule.pattern.test(value)) return false
    }

    // 长度校验
    if (typeof value === 'string') {
        if (rule.minLength !== undefined && value.length < rule.minLength) return false
        if (rule.maxLength !== undefined && value.length > rule.maxLength) return false
    }

    // 数值范围校验
    if (typeof value === 'number') {
        if (rule.min !== undefined && value < rule.min) return false
        if (rule.max !== undefined && value > rule.max) return false
    }

    // 自定义校验函数
    if (rule.validator) {
        return await rule.validator(value)
    }

    return true
}

/**
 * 通用表单校验 Hook
 * @param options - 配置项
 * @returns 校验状态和控制方法
 */
export const useFormValidation = (options: UseFormValidationOptions): UseFormValidationReturn => {
    const { rules } = options

    /** 各字段的错误信息 */
    const errors = ref<Record<string, string>>({})

    /** 整体表单是否校验通过 */
    const isValid = computed(() => {
        return Object.values(errors.value).every((msg) => msg === '')
    })

    /**
     * 校验单个字段
     * @param field - 字段名
     * @param value - 字段值
     * @returns 是否校验通过
     */
    const validateField = async (field: string, value: unknown): Promise<boolean> => {
        const fieldRules = rules[field]
        if (!fieldRules) {
            errors.value[field] = ''
            return true
        }

        for (const rule of fieldRules) {
            const passed = await checkRule(value, rule)
            if (!passed) {
                errors.value[field] = rule.message
                return false
            }
        }

        errors.value[field] = ''
        return true
    }

    /**
     * 校验全部字段
     * @param formData - 表单数据对象
     * @returns 是否全部校验通过
     */
    const validate = async (formData: Record<string, unknown>): Promise<boolean> => {
        let allValid = true

        for (const field of Object.keys(rules)) {
            const valid = await validateField(field, formData[field])
            if (!valid) {
                allValid = false
            }
        }

        return allValid
    }

    /** 重置所有校验状态 */
    const resetValidation = () => {
        errors.value = {}
    }

    return {
        errors,
        isValid,
        validate,
        validateField,
        resetValidation,
    }
}
