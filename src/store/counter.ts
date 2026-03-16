import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/** 计数器 Store */
export const useCounterStore = defineStore('counter', () => {
    /** 当前计数值 */
    const count = ref(0)

    /** 双倍计数 */
    const doubleCount = computed(() => count.value * 2)

    /** 计数 +1 */
    const increment = () => {
        count.value++
    }

    /** 计数 -1 */
    const decrement = () => {
        count.value--
    }

    /** 重置计数 */
    const reset = () => {
        count.value = 0
    }

    return {

        count,
        doubleCount,
        increment,
        decrement,
        reset,
    }
}, {
    persist: true
})
