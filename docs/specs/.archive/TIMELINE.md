# Spec 执行时间线

> 记录每个 Spec 从完成到归档的时间线，便于回顾项目演进历程。

| 完成日期 | Spec 名称 | 任务数 | 涉及文件 | 决策摘要 |
|---------|----------|-------|---------|---------|
| 2026-03-27 | 注册页 — 实施计划 | 6 | `pages.json`、`routes.ts`、`auth.ts`、`validate.ts`、`use-password-toggle.ts`、`use-send-code.ts`、`register/index.vue` | 主包表单页；Auth Store 持久化；校验函数抽 util；密码切换和验证码倒计时各抽 Hook；点击时统一校验 Toast 提示 |
| 2026-03-27 | 注册页表单校验优化 | 2 | `validate.ts`、`register/index.vue` | 校验函数返回值从 boolean 改为 `true \| string`，错误文案下沉到 util 层 |
| 2026-03-27 | 校验函数返回值策略改造（undefined 语义） | 2 | `validate.ts`、`register/index.vue` | 返回值从 `true \| string` 改为 `string \| undefined`，不修改 useFormValidation Hook |
| 2026-03-27 | 校验函数命名重构 | 3 | `validate.ts`、`index.ts`、`register/index.vue`、`use-send-code.ts` | `is` 前缀统一改为 `validate` 前缀；`getContactType` 保持不变 |
