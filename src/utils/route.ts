/**
 * 路由工具函数
 * 所有页面跳转必须通过 router 对象，禁止直接调用 uni.navigateTo 等原生 API
 */

export const router = {
  /** 跳转到普通页面 */
  to(url: string, params?: Record<string, string>) {
    let path = url
    if (params) {
      const query = Object.entries(params)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join('&')
      path += `?${query}`
    }
    return uni.navigateTo({ url: path })
  },

  /** 跳转到 tabBar 页面 */
  toTab(url: string) {
    return uni.switchTab({ url })
  },

  /** 返回上一页 */
  back(delta = 1) {
    return uni.navigateBack({ delta })
  },

  /** 替换当前页面（关闭当前页，打开新页面） */
  replace(url: string) {
    return uni.redirectTo({ url })
  },

  /** 关闭所有页面并打开指定页面 */
  relaunch(url: string) {
    return uni.reLaunch({ url })
  },
}
