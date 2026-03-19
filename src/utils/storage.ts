/**
 * Storage 封装
 * 对 uni-app Storage API 的统一封装，提供类型安全的存取能力
 * 支持同步/异步操作、JSON 序列化/反序列化、过期时间
 */

/** Storage 存储项的包装结构（带过期时间） */
interface StorageWrapper<T> {
    /** 实际存储的数据 */
    data: T
    /** 过期时间戳（毫秒），null 表示永不过期 */
    expire: number | null
}

/** setStorage 的选项参数 */
interface SetStorageOptions {
    /** 过期时间（毫秒），不传则永不过期 */
    expireIn?: number
}

// ==================== 同步操作 ====================

/**
 * 同步写入 Storage
 * @param key - 存储键名
 * @param value - 存储值（自动 JSON 序列化）
 * @param options - 可选配置（如过期时间）
 */
export const setStorageSync = <T>(key: string, value: T, options?: SetStorageOptions): void => {
    const wrapper: StorageWrapper<T> = {
        data: value,
        expire: options?.expireIn ? Date.now() + options.expireIn : null,
    }
    uni.setStorageSync(key, JSON.stringify(wrapper))
}

/**
 * 同步读取 Storage
 * @param key - 存储键名
 * @returns 存储值，不存在或已过期返回 null
 */
export const getStorageSync = <T>(key: string): T | null => {
    const raw = uni.getStorageSync(key)
    if (!raw) return null

    try {
        const wrapper = JSON.parse(raw as string) as StorageWrapper<T>

        // 检查是否过期
        if (wrapper.expire !== null && wrapper.expire < Date.now()) {
            removeStorageSync(key)
            return null
        }

        return wrapper.data
    } catch {
        // 兼容非包装格式的旧数据
        return raw as T
    }
}

/**
 * 同步删除 Storage 中的指定项
 * @param key - 存储键名
 */
export const removeStorageSync = (key: string): void => {
    uni.removeStorageSync(key)
}

/**
 * 同步清空所有 Storage 数据
 */
export const clearStorageSync = (): void => {
    uni.clearStorageSync()
}

// ==================== 异步操作 ====================

/**
 * 异步写入 Storage
 * @param key - 存储键名
 * @param value - 存储值（自动 JSON 序列化）
 * @param options - 可选配置（如过期时间）
 * @returns Promise
 */
export const setStorage = <T>(key: string, value: T, options?: SetStorageOptions): Promise<void> => {
    const wrapper: StorageWrapper<T> = {
        data: value,
        expire: options?.expireIn ? Date.now() + options.expireIn : null,
    }
    return new Promise((resolve, reject) => {
        uni.setStorage({
            key,
            data: JSON.stringify(wrapper),
            success: () => resolve(),
            fail: (err) => reject(err),
        })
    })
}

/**
 * 异步读取 Storage
 * @param key - 存储键名
 * @returns Promise，不存在或已过期返回 null
 */
export const getStorage = <T>(key: string): Promise<T | null> => {
    return new Promise((resolve) => {
        uni.getStorage({
            key,
            success: (res) => {
                try {
                    const wrapper = JSON.parse(res.data as string) as StorageWrapper<T>

                    if (wrapper.expire !== null && wrapper.expire < Date.now()) {
                        removeStorage(key).then(() => resolve(null))
                        return
                    }

                    resolve(wrapper.data)
                } catch {
                    // 兼容非包装格式的旧数据
                    resolve(res.data as T)
                }
            },
            fail: () => resolve(null),
        })
    })
}

/**
 * 异步删除 Storage 中的指定项
 * @param key - 存储键名
 * @returns Promise
 */
export const removeStorage = (key: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        uni.removeStorage({
            key,
            success: () => resolve(),
            fail: (err) => reject(err),
        })
    })
}

/**
 * 异步清空所有 Storage 数据
 * @returns Promise
 */
export const clearStorage = (): Promise<void> => {
    return new Promise((resolve) => {
        uni.clearStorage()
        resolve()
    })
}
