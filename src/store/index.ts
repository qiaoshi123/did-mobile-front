/**
 * Pinia Store 初始化与统一导出
 * @desc 创建 Pinia 实例，注册持久化插件（基于 uni.storage）
 *       业务层统一从 `@/store` 导入 Store
 */
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState({
    storage: {
        getItem: uni.getStorageSync,
        setItem: uni.setStorageSync,
    },
}))

export default pinia

// ========== Store 统一导出 ==========

/** 计数器 Store（示例），包含 count 状态和 increment 方法 */
export * from './counter'

/** 认证 Store，管理 token 和用户信息，支持持久化 */
export * from './auth'
