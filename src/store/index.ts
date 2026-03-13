import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

// ========== Store 统一导出 ==========
export * from './counter'
