# Spec 归档时间线

| 完成日期 | Spec 名称 | 任务数 | 涉及文件 | 决策摘要 |
|---------|----------|-------|---------|---------|
| 2026-03-27 | 注册页 — 实施计划（Spec） | 6 | src/constants/routes.ts、src/pages.json、src/utils/validate.ts、src/utils/index.ts、src/hooks/use-password-toggle.ts、src/hooks/use-send-code.ts、src/store/auth.ts、src/store/index.ts、src/pages/register/index.vue | 主包页面、仅提交时校验、校验函数全部抽离到 validate.ts、密码/验证码/协议组件不抽离、router.replace 跳转首页、60s 倒计时、同一输入框自动识别手机号/邮箱、invitationCode 从路由 query 获取、password base64 编码 |
| 2026-03-27 | 注册页 — 实施计划（Spec）v3 变更重执行 | 3（T2、T4、T6） | src/utils/validate.ts、src/utils/index.ts、src/hooks/use-send-code.ts、src/pages/register/index.vue | 校验函数改为 validate 前缀、返回错误信息字符串或空字符串、校验失败 Toast 提示第一条错误不 inline 展示、beforeSend 适配新返回值 |
